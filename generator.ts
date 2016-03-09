/// <reference path="typings\main.d.ts" />

// var request = require('request');
// var fs = require('fs');


import * as request from 'request';
import * as fs from 'fs';
import * as _ from "lodash";

var typesMap = {
    "integer": "number",
    "object": "any"
}

class IndentedTextWriter {
    constructor(private stream: fs.WriteStream, private newLine, private tabString = "\t") {

    }

    public indent = 0;

    write(chunk: string) {
        this.stream.write(chunk);
    }

    writeLine(chunk = "") {
        this.write(Array(this.indent + 1).join(this.tabString) + chunk + this.newLine);
    }

    end() {
        this.stream.end();
    }
}

function processResource(resource) {
    var childs = _.map(resource.resources || {}, value => processResource(value));
    return _.union(_.map(resource.methods || {}, value => value), childs);
}

function getNamespace(path: string) {
    var parts = path.split('.');

    if (parts.length > 0) {
        parts.splice(parts.length - 1)

        var n: string = _.camelCase(parts.join('.'));
        return parts.join('.');
    }
    else
        return null;
}

function getName(path: string) {
    var parts = path.split('.');

    if (parts.length > 0)
        return _.last(parts);
    else
        return null;
}

function formatParameters(method, out: (line) => void) {

    out("{");

    _.forEach(method.parameters, (data, key) => {
        out("\t" + key + ": " + (typesMap[data.type] || data.type) + ",");
    })

    out("}");

    //return "{ \r\n\t\t" + _.map(method.parameters, (data, key) => key + ": " + (typesMap[data.type] || data.type)).join(", \r\n\t\t") + "\r\n\t\t }";
}

function firstLetterUp(text: string) {
    return text[0].toUpperCase() + text.substring(1);
}

function getMethodParameterInterfaceName(resource, method) {
    return firstLetterUp(resource) + firstLetterUp(getName(method.id)) + "Parameters";
}

function getType(type: string, ref: string, items) {
    if (type === "array") {
        return getType(items.type, items.$ref, items.items) + '[]';
    }
    else if (type) {
        return typesMap[type] || type;
    }
    else if (ref) {
        return ref;
    }
    else throw Error();
}

function formatComment(comment: string) {
    if (!comment) return "";

    return comment
        //.replace(String.fromCharCode(0xa, 0xd), "")
        .replace(/\r\n/g, "+++++")
        .replace(/\n/g, "+++++")
        .replace(/\r/g, "+++++")
        .replace(/\u000a\u000d/g, "+++++")
        .replace(/\u000a/g, "+++++")
        .replace(/\u000d/g, "+++++")
        .replace(/\u240a/g, "+++++")        
        .replace(String.fromCharCode(0x000a), "+++++")
        .replace(String.fromCharCode(0x000d), "+++++")
        .replace(String.fromCharCode(0x240A), "+++++")
        .replace(/\+\+\+\+\+/g, "\r\n// ")        
        ;
}

function getMethodReturn(method) {

    if (method.response) {
        return "PromiseLike<ApiResult<" + method.response.$ref + ">>";
    }
    else {
        return "PromiseLike<void>";
    }

}

function writeResources(out: IndentedTextWriter, resources: any[]) {
    _.forEach(resources, (resource, resourceName: string) => {
        var resourceInterfaceName = resourceName[0].toUpperCase() + resourceName.substring(1) + "Resource";

        writeResources(out, resource.resources || []);

        _.forEach(resource.methods, (method, name: string) => {
            out.writeLine("interface " + getMethodParameterInterfaceName(resourceName, method) + " {");

            out.indent++;
            _.forEach(method.parameters, (data, key) => {
                out.writeLine("// " + formatComment(data.description));
                out.writeLine(key + (data.required ? "" : "?") + ": " + (typesMap[data.type] || data.type) + ",");
            });
            out.indent--;

            out.writeLine("}");
            out.writeLine();
        });

        out.writeLine("interface " + resourceInterfaceName + " {");

        out.indent++;
        _.forEach(resource.methods, (method, name: string) => {
            out.writeLine();
            out.writeLine("// " + formatComment(method.description));
            out.writeLine("" + getName(method.id) + " (prms: " + getMethodParameterInterfaceName(resourceName, method) + ") : " + getMethodReturn(method) + ";");
        });

        _.forEach(resource.resources, (childResource, childResourceName: string) => {
            out.writeLine();
            var childResourceInterfaceName = childResourceName[0].toUpperCase() + childResourceName.substring(1) + "Resource";

            out.writeLine(childResourceName + ": " + childResourceInterfaceName + ";");
        });
        out.indent--;

        out.writeLine("}");
        out.writeLine();

        out.writeLine("var " + resourceName + ": " + resourceInterfaceName + ";");
        out.writeLine();
    });
}

function processApi(api) {

    var methods = _(processResource(api)).flatten(true).map((x: any) => {
        return {
            namespace: getNamespace(x.id),
            name: getName(x.id),
            method: x
        }
    }).value(),
        grouped = _.groupBy(methods, method => method.namespace),
        stream = fs.createWriteStream(__dirname + "/out/" + api.id.replace(":", ".") + ".d.ts"),
        writer = new IndentedTextWriter(stream, "\r\n");

    writer.writeLine("/// <reference path=\"gapi.d.ts\" />");
    writer.writeLine();

    writer.writeLine("declare namespace gapi {");

    writer.indent++;
    writer.writeLine("namespace client {");

    writer.indent++;
    _.forEach(api.schemas, (data, key) => {
        writer.writeLine("");
        writer.writeLine("interface " + data.id + " {");

        writer.indent++;
        _.forEach(data.properties, (data, key) => {
            writer.writeLine("// " + formatComment(data.description));
            writer.writeLine("" + key + (data.required ? "" : "?") + ": " + getType(data.type, data.$ref, data.items) + ",");
        })
        writer.indent--;

        writer.writeLine("}");
    });

    writeResources(writer, api.resources);
    writer.indent--;

    // // if (api.resources.length === 1 && (api.resources[0].methods == null || methods.length === 0)) {
    // //     out.write("\t\tnamespace " + getName(api.resources[0].id) + " {\r\n");

    // //     writeResources(out, api.resources[0].resources);

    // //     out.write("\t\t}\r\n");
    // // }
    // // else {
    // //     //writeResources(out, api.resources);
    // //     throw "Many root resources not expected";        
    // // }

    // _.forEach(grouped, (namespace, name) => {
    //     out.write("\r\n");

    //     var paths = name.split(".");

    //     _.forEach(paths, (ns, index) => {
    //         out.write("declare namespace " + ns + " { \r\n");
    //     });


    //     _.forEach(namespace, method => {
    //         out.write("\r\n");

    //         out.write("\tinterface " + getMethodParameterInterfaceName(method) + " {\r\n");

    //         _.forEach(method.method.parameters, (data, key) => {
    //             out.write("\t\t// " + data.description + "\r\n");
    //             out.write("\t\t" + key + (data.required ? "" : "?") + ": " + (typesMap[data.type] || data.type) + ",\r\n");
    //         })

    //         out.write("\t}\r\n");

    //         out.write("\t// " + method.method.description + "\r\n");
    //         out.write("\tfunction " + method.name + " (prms: " + getMethodParameterInterfaceName(method) + ") : " + getMethodReturn(method) + ";\r\n");
    //     });

    //     _.forEach(paths, (ns, index) => {
    //         out.write("}\r\n");
    //     });

    // });

    writer.writeLine("}");
    writer.indent--;
    writer.writeLine("}");
    writer.end();

}

request("https://www.googleapis.com/discovery/v1/apis", (error, response, body) => {
    if (!error && response.statusCode == 200) {
        var apis = JSON.parse(body);

        _.each(apis.items, apid => {
            request(apid.discoveryRestUrl,
           // "https://adexchangebuyer.googleapis.com/$discovery/rest?version=v2beta1", 
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var api = JSON.parse(body);
                    processApi(api);
                } else {
                    console.log("Got an error: ", error, ", status code: ", response.statusCode);
                }
            });
        })
        
    } else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode);
    }
});

