/// <reference path="../typings/main.d.ts" />
"use strict";
var program = require('commander');
var request = require('request');
var fs = require('fs');
var _ = require("lodash");
var Promise = require('promise');
var typesMap = {
    "integer": "number",
    "object": "any"
};
var StringWriter = (function () {
    function StringWriter() {
        this.buffer = "";
    }
    StringWriter.prototype.write = function (chunk) {
        this.buffer += chunk;
    };
    StringWriter.prototype.end = function () {
    };
    StringWriter.prototype.toString = function () {
        return this.buffer;
    };
    return StringWriter;
}());
var StreamWriter = (function () {
    function StreamWriter(stream) {
        this.stream = stream;
    }
    StreamWriter.prototype.write = function (chunk) {
        this.stream.write(chunk);
    };
    StreamWriter.prototype.end = function () {
        this.stream.end();
    };
    return StreamWriter;
}());
var IndentedTextWriter = (function () {
    function IndentedTextWriter(writer, newLine, tabString) {
        if (newLine === void 0) { newLine = "\r\n"; }
        if (tabString === void 0) { tabString = "    "; }
        this.writer = writer;
        this.newLine = newLine;
        this.tabString = tabString;
        this.indent = 0;
    }
    IndentedTextWriter.prototype.write = function (chunk) {
        this.writer.write(chunk);
    };
    IndentedTextWriter.prototype.startIndentedLine = function (chunk) {
        if (chunk === void 0) { chunk = ""; }
        this.write(Array(this.indent + 1).join(this.tabString) + chunk);
    };
    IndentedTextWriter.prototype.writeLine = function (chunk) {
        if (chunk === void 0) { chunk = ""; }
        this.startIndentedLine(chunk + this.newLine);
    };
    IndentedTextWriter.prototype.end = function () {
        this.writer.end();
    };
    return IndentedTextWriter;
}());
var TypescriptTextWriter = (function () {
    function TypescriptTextWriter(writer) {
        this.writer = writer;
    }
    TypescriptTextWriter.prototype.braces = function (text, context) {
        this.writer.writeLine(text + " {");
        this.writer.indent++;
        context(this);
        this.writer.indent--;
        this.writer.writeLine("}");
    };
    TypescriptTextWriter.prototype.reference = function (path) {
        this.writer.writeLine("/// <reference path=\"" + path + "\" />");
    };
    TypescriptTextWriter.prototype.namespace = function (name, context) {
        this.writer.writeLine();
        this.braces("namespace " + name, context);
    };
    TypescriptTextWriter.prototype.declareNamespace = function (name, context) {
        this.writer.writeLine();
        this.braces("declare namespace " + name, context);
    };
    TypescriptTextWriter.prototype.interface = function (name, context) {
        this.writer.writeLine();
        this.braces("interface " + name, context);
    };
    TypescriptTextWriter.prototype.anonymysType = function (context) {
        this.writer.write("{");
        this.writer.writeLine();
        this.writer.indent++;
        context(this);
        this.writer.indent--;
        this.writer.startIndentedLine("}");
    };
    TypescriptTextWriter.prototype.property = function (name, type, required) {
        if (required === void 0) { required = true; }
        if (typeof type === 'function') {
            this.writer.startIndentedLine("" + name + (required ? "" : "?") + ": ");
            type(this);
            this.writer.write(",");
            this.writer.writeLine();
        }
        else if (typeof type === 'string') {
            this.writer.writeLine("" + name + (required ? "" : "?") + ": " + type + ",");
        }
    };
    TypescriptTextWriter.prototype.comment = function (text) {
        var _this = this;
        if (text === void 0) { text = ""; }
        var lines = text.split(/\r\n|\r|\n|\u000a\u000d|\u000a|\u000d|\u240a/g);
        _.forEach(lines, function (line) { return _this.writer.writeLine("// " + line); });
    };
    TypescriptTextWriter.prototype.method = function (name, parameters, returnType) {
        this.writer.writeLine(name + "(" + parameters.map(function (p) { return p.parameter + ": " + p.type; }).join(", ") + "): " + returnType + ";");
    };
    TypescriptTextWriter.prototype.writeLine = function (chunk) {
        if (chunk === void 0) { chunk = ""; }
        this.writer.writeLine(chunk);
    };
    TypescriptTextWriter.prototype.write = function (chunk) {
        if (chunk === void 0) { chunk = ""; }
        this.writer.write(chunk);
    };
    TypescriptTextWriter.prototype.end = function () {
        this.writer.end();
    };
    return TypescriptTextWriter;
}());
function processResource(resource) {
    var childs = _.map(resource.resources || {}, function (value) { return processResource(value); });
    return _.union(_.map(resource.methods || {}, function (value) { return value; }), childs);
}
function getNamespace(path) {
    var parts = path.split('.');
    if (parts.length > 0) {
        parts.splice(parts.length - 1);
        var n = _.camelCase(parts.join('.'));
        return parts.join('.');
    }
    else
        return null;
}
function getName(path) {
    var parts = path.split('.');
    if (parts.length > 0)
        return _.last(parts);
    else
        return null;
}
function formatParameters(method, out) {
    out("{");
    _.forEach(method.parameters, function (data, key) {
        out("\t" + key + ": " + (typesMap[data.type] || data.type) + ",");
    });
    out("}");
    //return "{ \r\n\t\t" + _.map(method.parameters, (data, key) => key + ": " + (typesMap[data.type] || data.type)).join(", \r\n\t\t") + "\r\n\t\t }";
}
function firstLetterUp(text) {
    return text[0].toUpperCase() + text.substring(1);
}
function getMethodParameterInterfaceName(resource, method) {
    return firstLetterUp(resource) + firstLetterUp(getName(method.id)) + "Request";
}
function getType(type) {
    if (type.type === "array") {
        return function (writer) {
            var child = getType(type.items);
            if (typeof child === "string") {
                writer.write(child);
            }
            else if (typeof child === "function") {
                child(writer);
            }
            writer.write("[]");
        };
    }
    else if (type.type === "object" && type.properties) {
        return function (writer) {
            writer.anonymysType(function () {
                return _.forEach(type.properties, function (data, key) {
                    writer.comment(formatComment(data.description));
                    writer.property(key, getType(data), data.required || false);
                });
            });
        };
    }
    else if (type.type) {
        return typesMap[type.type] || type.type;
    }
    else if (type.$ref) {
        return type.$ref;
    }
    else
        throw Error();
}
function formatComment(comment) {
    if (!comment)
        return "";
    return comment;
}
function getMethodReturn(method) {
    if (method.response) {
        return "PromiseLike<ApiResult<" + method.response.$ref + ">>";
    }
    else {
        return "PromiseLike<void>";
    }
}
var App = (function () {
    function App(base) {
        if (base === void 0) { base = __dirname + "/../out/"; }
        this.base = base;
        this.typingsDirectory = base + "/typings";
        if (!fs.existsSync(this.base)) {
            fs.mkdirSync(this.base);
        }
        if (!fs.existsSync(this.typingsDirectory)) {
            fs.mkdirSync(this.typingsDirectory);
        }
        console.log("base directory: " + this.base);
        console.log("typings directory: " + this.typingsDirectory);
        console.log();
    }
    App.parseVersion = function (version) {
        var major, minor, patch;
        var match = version.match(/v(\d+)(?:\.(\d+))?(.*)?/);
        if (match) {
            major = match[1];
            minor = match[2];
            patch = match[3];
            return "" + major + (minor ? "." + minor : "") + (patch ? "-" + patch : "");
        }
    };
    // writes specified resource definition
    App.prototype.writeResources = function (out, resources) {
        var _this = this;
        _.forEach(resources, function (resource, resourceName) {
            var resourceInterfaceName = resourceName[0].toUpperCase() + resourceName.substring(1) + "Resource";
            _this.writeResources(out, resource.resources);
            _.forEach(resource.methods, function (method, name) {
                out.interface(getMethodParameterInterfaceName(resourceName, method), function () {
                    _.forEach(method.parameters, function (parameter, key) {
                        out.comment(formatComment(parameter.description));
                        out.property(key, typesMap[parameter.type] || parameter.type, parameter.required || false);
                    });
                });
            });
            out.interface(resourceInterfaceName, function () {
                _.forEach(resource.methods, function (method, name) {
                    out.comment(formatComment(method.description));
                    out.method(getName(method.id), [{ parameter: "request", type: getMethodParameterInterfaceName(resourceName, method) }], getMethodReturn(method));
                });
                _.forEach(resource.resources, function (childResource, childResourceName) {
                    var childResourceInterfaceName = childResourceName[0].toUpperCase() + childResourceName.substring(1) + "Resource";
                    out.property(childResourceName, childResourceInterfaceName);
                });
            });
            out.writeLine();
            out.writeLine("var " + resourceName + ": " + resourceInterfaceName + "; ");
            out.writeLine();
        });
    };
    /// writes api description for specified JSON object
    App.prototype.processApi = function (api, actualVersion) {
        var _this = this;
        console.log("Generating " + api.id + " definitions...");
        var destinationDirectory = this.typingsDirectory + " /" + api.name + "-" + api.version;
        if (!fs.existsSync(destinationDirectory)) {
            fs.mkdirSync(destinationDirectory);
        }
        var methods = _(processResource(api)).flatten(true).map(function (x) {
            return {
                namespace: getNamespace(x.id),
                name: getName(x.id),
                method: x
            };
        }).value(), grouped = _.groupBy(methods, function (method) { return method.namespace; }), filename = api.name + (actualVersion ? "" : "-" + api.version) + ".d.ts", stream = fs.createWriteStream(destinationDirectory + "/" + filename), writer = new TypescriptTextWriter(new IndentedTextWriter(new StreamWriter(stream)));
        writer.reference("gapi.d.ts");
        writer.declareNamespace("gapi", function () {
            writer.namespace("client", function () {
                _.forEach(api.schemas, function (schema, key) {
                    writer.interface(schema.id, function () {
                        _.forEach(schema.properties, function (data, key) {
                            writer.comment(formatComment(data.description));
                            writer.property(key, getType(data), data.required || false);
                        });
                    });
                });
                _this.writeResources(writer, api.resources);
            });
        });
        writer.end();
        var typingsStream = fs.createWriteStream(destinationDirectory + "/typings.json");
        typingsStream.write(JSON.stringify({
            "name": api.name,
            "main": filename,
            "version": App.parseVersion(api.version),
            "author": "Bolisov Alexey",
            "description": api.description,
            "homepage": "https://github.com/bolisov/typings-gapi",
            "dependencies": {
                "gapi": "github:bolisov/typings-gapi/gapi"
            }
        }));
        typingsStream.end();
        // typingsWriter.writeLine("{");
        // typingsWriter.indent += 1;
        // typingsWriter.writeLine(`"name": "${api.name}"`);
        // typingsWriter.writeLine(`"main": "${api.name}.d.ts"`);
        // typingsWriter.writeLine(`"homepage": "https://github.com/bolisov"`);
        // typingsWriter.writeLine(`"dependencies": {`);
        // typingsWriter.indent += 1;
        // typingsWriter.writeLine(`"gapi.client": "https://github.com/bolisov"`);
        // typingsWriter.indent -= 1;
        // typingsWriter.writeLine(`}`);        
        // typingsWriter.indent -= 1;
        // typingsWriter.writeLine("}")
        // typingsWriter.end();
    };
    App.prototype.request = function (url) {
        return new Promise(function (resolve, reject) {
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var api = JSON.parse(body);
                    resolve(api);
                }
                else {
                    console.error("Got an error: ", error, ", status code: ", response.statusCode);
                    reject(error);
                }
            });
        });
    };
    App.prototype.filterServices = function (apis, service, allVersions) {
        apis = _.filter(apis, function (api) { return service == null || api.name === service; });
        apis = _.filter(apis, function (api) { return allVersions || api.preferred; });
        return apis;
    };
    App.prototype.processService = function (url, actualVersion) {
        var _this = this;
        return this
            .request(url)
            .then(function (api) { return _this.processApi(api, actualVersion); });
    };
    App.prototype.discover = function (service, allVersions) {
        var _this = this;
        if (service === void 0) { service = null; }
        if (allVersions === void 0) { allVersions = false; }
        console.log("Discovering Google services...");
        var services = null;
        return this
            .request("https://www.googleapis.com/discovery/v1/apis")
            .then(function (apis) { return _this.filterServices(apis.items, service, allVersions); })
            .then(function (items) {
            services = items;
            if (items.length === 0) {
                console.error("Can't find services");
                throw Error("Can't find services");
            }
            else {
                return items.reduce(function (cur, api) { return cur.then(function () { return _this.processService(api.discoveryRestUrl, api.preferred); }); }, Promise.resolve(null));
            }
        })
            .then(function () {
            _.forEach(_.groupBy(services, function (service) { return service.name; }), function (versions, service) {
                var typingsStream = fs.createWriteStream(_this.typingsDirectory + "/" + service + ".json"), v = _.reduce(versions, function (current, api) {
                    current[App.parseVersion(api.version)] = "https://github.com/bolisov/typings-gapi/" + api.name + "-" + api.version;
                    return current;
                }, {});
                typingsStream.write(JSON.stringify({
                    "versions": v
                }));
                typingsStream.end();
            });
        });
    };
    return App;
}());
exports.App = App;
var params = program
    .version("0.0.1")
    .allowUnknownOption(false)
    .option("-u, --url [url]", "process only specific REST service definition by url")
    .option("-s, --service [name]", "process only specific REST service definition by name")
    .option("-o, --out", "output directory")
    .parse(process.argv);
var app = new App(params.out);
if (params.url) {
    app
        .processService(params.url, true)
        .then(function () { return console.log("Done"); });
}
else {
    app
        .discover(params.service, true)
        .then(function () { return console.log("Done"); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWFwaS10eXBpbmdzLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nb29nbGUtYXBpLXR5cGluZ3MtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZDQUE2Qzs7QUFFN0MsSUFBWSxPQUFPLFdBQU0sV0FBVyxDQUFDLENBQUE7QUFDckMsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxFQUFFLFdBQU0sSUFBSSxDQUFDLENBQUE7QUFDekIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsSUFBSSxRQUFRLEdBQUc7SUFDWCxTQUFTLEVBQUUsUUFBUTtJQUNuQixRQUFRLEVBQUUsS0FBSztDQUNsQixDQUFBO0FBT0Q7SUFBQTtRQUVZLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFheEIsQ0FBQztJQVhVLDRCQUFLLEdBQVosVUFBYSxLQUFhO1FBQ3RCLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFTSwwQkFBRyxHQUFWO0lBRUEsQ0FBQztJQUVNLCtCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQUVEO0lBRUksc0JBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBRTFDLENBQUM7SUFFRCw0QkFBSyxHQUFMLFVBQU0sS0FBYTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCwwQkFBRyxHQUFIO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztB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LENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNMLFVBQUM7QUFBRCxDQUFDLEFBbE5ELElBa05DO0FBbE5ZLFdBQUcsTUFrTmYsQ0FBQTtBQUVELElBQUksTUFBTSxHQUFRLE9BQU87S0FDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUNoQixrQkFBa0IsQ0FBQyxLQUFLLENBQUM7S0FDekIsTUFBTSxDQUFDLGlCQUFpQixFQUFFLHNEQUFzRCxDQUFDO0tBQ2pGLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSx1REFBdUQsQ0FBQztLQUV2RixNQUFNLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDO0tBQ3ZDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRTlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2IsR0FBRztTQUNFLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztTQUNoQyxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBQ0QsSUFBSSxDQUFDLENBQUM7SUFDRixHQUFHO1NBQ0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO1NBQzlCLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgcHJvZ3JhbSBmcm9tICdjb21tYW5kZXInO1xyXG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gJ3Byb21pc2UnO1xyXG5cclxudmFyIHR5cGVzTWFwID0ge1xyXG4gICAgXCJpbnRlZ2VyXCI6IFwibnVtYmVyXCIsXHJcbiAgICBcIm9iamVjdFwiOiBcImFueVwiXHJcbn1cclxuXHJcbmludGVyZmFjZSBJVGV4dFdyaXRlciB7XHJcbiAgICB3cml0ZShjaHVuaz8pO1xyXG4gICAgZW5kKCk7XHJcbn1cclxuXHJcbmNsYXNzIFN0cmluZ1dyaXRlciBpbXBsZW1lbnRzIElUZXh0V3JpdGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGJ1ZmZlciA9IFwiXCI7XHJcblxyXG4gICAgcHVibGljIHdyaXRlKGNodW5rOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlciArPSBjaHVuaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5kKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdHJlYW1Xcml0ZXIgaW1wbGVtZW50cyBJVGV4dFdyaXRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJlYW06IGZzLldyaXRlU3RyZWFtKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlKGNodW5rOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZShjaHVuayk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5kKCkge1xyXG4gICAgICAgIHRoaXMuc3RyZWFtLmVuZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBJbmRlbnRlZFRleHRXcml0ZXIge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3cml0ZXI6IElUZXh0V3JpdGVyLCBwdWJsaWMgbmV3TGluZSA9IFwiXFxyXFxuXCIsIHB1YmxpYyB0YWJTdHJpbmcgPSBcIiAgICBcIikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5kZW50ID0gMDtcclxuXHJcbiAgICBwdWJsaWMgd3JpdGUoY2h1bms6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlKGNodW5rKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRJbmRlbnRlZExpbmUoY2h1bmsgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZShBcnJheSh0aGlzLmluZGVudCArIDEpLmpvaW4odGhpcy50YWJTdHJpbmcpICsgY2h1bmspO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3cml0ZUxpbmUoY2h1bmsgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEluZGVudGVkTGluZShjaHVuayArIHRoaXMubmV3TGluZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZCgpIHtcclxuICAgICAgICB0aGlzLndyaXRlci5lbmQoKTtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElUeXBlc2NyaXB0VGV4dFdyaXRlciB7XHJcbiAgICBuYW1lc3BhY2UobmFtZTogc3RyaW5nLCBjb250ZXh0OiAod3JpdGVyOiBUeXBlc2NyaXB0VGV4dFdyaXRlcikgPT4gdm9pZCk7XHJcbn1cclxuXHJcbnR5cGUgVHlwZXNjcmlwdFdyaXRlckNhbGxiYWNrID0gKHdyaXRlcikgPT4gdm9pZDtcclxuXHJcbmNsYXNzIFR5cGVzY3JpcHRUZXh0V3JpdGVyIGltcGxlbWVudHMgSVR5cGVzY3JpcHRUZXh0V3JpdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd3JpdGVyOiBJbmRlbnRlZFRleHRXcml0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJyYWNlcyh0ZXh0OiBzdHJpbmcsIGNvbnRleHQ6ICh3cml0ZXI6IFR5cGVzY3JpcHRUZXh0V3JpdGVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKHRleHQgKyBcIiB7XCIpO1xyXG4gICAgICAgIHRoaXMud3JpdGVyLmluZGVudCsrO1xyXG4gICAgICAgIGNvbnRleHQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cml0ZXIuaW5kZW50LS07XHJcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKFwifVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVmZXJlbmNlKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlTGluZShgLy8vIDxyZWZlcmVuY2UgcGF0aD1cIiR7cGF0aH1cIiAvPmApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuYW1lc3BhY2UobmFtZTogc3RyaW5nLCBjb250ZXh0OiBUeXBlc2NyaXB0V3JpdGVyQ2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLndyaXRlci53cml0ZUxpbmUoKTtcclxuICAgICAgICB0aGlzLmJyYWNlcyhgbmFtZXNwYWNlICR7bmFtZX1gLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVjbGFyZU5hbWVzcGFjZShuYW1lOiBzdHJpbmcsIGNvbnRleHQ6IFR5cGVzY3JpcHRXcml0ZXJDYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlTGluZSgpO1xyXG4gICAgICAgIHRoaXMuYnJhY2VzKGBkZWNsYXJlIG5hbWVzcGFjZSAke25hbWV9YCwgY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZShuYW1lOiBzdHJpbmcsIGNvbnRleHQ6IFR5cGVzY3JpcHRXcml0ZXJDYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlTGluZSgpO1xyXG4gICAgICAgIHRoaXMuYnJhY2VzKGBpbnRlcmZhY2UgJHtuYW1lfWAsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhbm9ueW15c1R5cGUoY29udGV4dDogVHlwZXNjcmlwdFdyaXRlckNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGUoXCJ7XCIpO1xyXG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlTGluZSgpO1xyXG4gICAgICAgIHRoaXMud3JpdGVyLmluZGVudCsrO1xyXG4gICAgICAgIGNvbnRleHQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cml0ZXIuaW5kZW50LS07XHJcbiAgICAgICAgdGhpcy53cml0ZXIuc3RhcnRJbmRlbnRlZExpbmUoXCJ9XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcm9wZXJ0eShuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZyB8IFR5cGVzY3JpcHRXcml0ZXJDYWxsYmFjaywgcmVxdWlyZWQgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVyLnN0YXJ0SW5kZW50ZWRMaW5lKGAke25hbWV9JHtyZXF1aXJlZCA/IFwiXCIgOiBcIj9cIn06IGApO1xyXG4gICAgICAgICAgICB0eXBlKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlci53cml0ZShcIixcIik7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVyLndyaXRlTGluZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKGAke25hbWV9JHtyZXF1aXJlZCA/IFwiXCIgOiBcIj9cIn06ICR7dHlwZX0sYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29tbWVudCh0ZXh0OiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdCgvXFxyXFxufFxccnxcXG58XFx1MDAwYVxcdTAwMGR8XFx1MDAwYXxcXHUwMDBkfFxcdTI0MGEvZyk7XHJcbiAgICAgICAgXy5mb3JFYWNoKGxpbmVzLCBsaW5lID0+IHRoaXMud3JpdGVyLndyaXRlTGluZShgLy8gJHtsaW5lfWApKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWV0aG9kKG5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogW3sgcGFyYW1ldGVyOiBzdHJpbmcsIHR5cGU6IHN0cmluZyB9XSwgcmV0dXJuVHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKGAke25hbWV9KCR7cGFyYW1ldGVycy5tYXAocCA9PiBwLnBhcmFtZXRlciArIFwiOiBcIiArIHAudHlwZSkuam9pbihcIiwgXCIpfSk6ICR7cmV0dXJuVHlwZX07YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdyaXRlTGluZShjaHVuayA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLndyaXRlci53cml0ZUxpbmUoY2h1bmspO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3cml0ZShjaHVuayA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLndyaXRlci53cml0ZShjaHVuayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZCgpIHtcclxuICAgICAgICB0aGlzLndyaXRlci5lbmQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1Jlc291cmNlKHJlc291cmNlKSB7XHJcbiAgICB2YXIgY2hpbGRzID0gXy5tYXAocmVzb3VyY2UucmVzb3VyY2VzIHx8IHt9LCB2YWx1ZSA9PiBwcm9jZXNzUmVzb3VyY2UodmFsdWUpKTtcclxuICAgIHJldHVybiBfLnVuaW9uKF8ubWFwKHJlc291cmNlLm1ldGhvZHMgfHwge30sIHZhbHVlID0+IHZhbHVlKSwgY2hpbGRzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TmFtZXNwYWNlKHBhdGg6IHN0cmluZykge1xyXG4gICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgnLicpO1xyXG5cclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcGFydHMuc3BsaWNlKHBhcnRzLmxlbmd0aCAtIDEpXHJcblxyXG4gICAgICAgIHZhciBuOiBzdHJpbmcgPSBfLmNhbWVsQ2FzZShwYXJ0cy5qb2luKCcuJykpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKCcuJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5hbWUocGF0aDogc3RyaW5nKSB7XHJcbiAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XHJcblxyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgcmV0dXJuIF8ubGFzdChwYXJ0cyk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdFBhcmFtZXRlcnMobWV0aG9kLCBvdXQ6IChsaW5lKSA9PiB2b2lkKSB7XHJcblxyXG4gICAgb3V0KFwie1wiKTtcclxuXHJcbiAgICBfLmZvckVhY2gobWV0aG9kLnBhcmFtZXRlcnMsIChkYXRhLCBrZXkpID0+IHtcclxuICAgICAgICBvdXQoXCJcXHRcIiArIGtleSArIFwiOiBcIiArICh0eXBlc01hcFtkYXRhLnR5cGVdIHx8IGRhdGEudHlwZSkgKyBcIixcIik7XHJcbiAgICB9KVxyXG5cclxuICAgIG91dChcIn1cIik7XHJcblxyXG4gICAgLy9yZXR1cm4gXCJ7IFxcclxcblxcdFxcdFwiICsgXy5tYXAobWV0aG9kLnBhcmFtZXRlcnMsIChkYXRhLCBrZXkpID0+IGtleSArIFwiOiBcIiArICh0eXBlc01hcFtkYXRhLnR5cGVdIHx8IGRhdGEudHlwZSkpLmpvaW4oXCIsIFxcclxcblxcdFxcdFwiKSArIFwiXFxyXFxuXFx0XFx0IH1cIjtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlyc3RMZXR0ZXJVcCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0ZXh0WzBdLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnN1YnN0cmluZygxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWV0aG9kUGFyYW1ldGVySW50ZXJmYWNlTmFtZShyZXNvdXJjZSwgbWV0aG9kOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5NZXRob2QpIHtcclxuICAgIHJldHVybiBmaXJzdExldHRlclVwKHJlc291cmNlKSArIGZpcnN0TGV0dGVyVXAoZ2V0TmFtZShtZXRob2QuaWQpKSArIFwiUmVxdWVzdFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUeXBlKHR5cGU6IGFueSk6IHN0cmluZyB8IFR5cGVzY3JpcHRXcml0ZXJDYWxsYmFjayB7XHJcbiAgICBpZiAodHlwZS50eXBlID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICByZXR1cm4gKHdyaXRlcjogVHlwZXNjcmlwdFRleHRXcml0ZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gZ2V0VHlwZSh0eXBlLml0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZShjaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkKHdyaXRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd3JpdGVyLndyaXRlKFwiW11cIik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUudHlwZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlLnByb3BlcnRpZXMpIHtcclxuICAgICAgICByZXR1cm4gKHdyaXRlcjogVHlwZXNjcmlwdFRleHRXcml0ZXIpID0+IHtcclxuICAgICAgICAgICAgd3JpdGVyLmFub255bXlzVHlwZSgoKSA9PlxyXG4gICAgICAgICAgICAgICAgXy5mb3JFYWNoKHR5cGUucHJvcGVydGllcywgKGRhdGE6IGFueSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVyLmNvbW1lbnQoZm9ybWF0Q29tbWVudChkYXRhLmRlc2NyaXB0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVyLnByb3BlcnR5KGtleSwgZ2V0VHlwZShkYXRhKSwgZGF0YS5yZXF1aXJlZCB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZS50eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVzTWFwW3R5cGUudHlwZV0gfHwgdHlwZS50eXBlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZS4kcmVmKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGUuJHJlZjtcclxuICAgIH1cclxuICAgIGVsc2UgdGhyb3cgRXJyb3IoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0Q29tbWVudChjb21tZW50OiBzdHJpbmcpIHtcclxuICAgIGlmICghY29tbWVudCkgcmV0dXJuIFwiXCI7XHJcblxyXG4gICAgcmV0dXJuIGNvbW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1ldGhvZFJldHVybihtZXRob2Q6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLk1ldGhvZCkge1xyXG5cclxuICAgIGlmIChtZXRob2QucmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gXCJQcm9taXNlTGlrZTxBcGlSZXN1bHQ8XCIgKyBtZXRob2QucmVzcG9uc2UuJHJlZiArIFwiPj5cIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlByb21pc2VMaWtlPHZvaWQ+XCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG5cclxuICAgIHByaXZhdGUgdHlwaW5nc0RpcmVjdG9yeTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZSA9IF9fZGlybmFtZSArIFwiLy4uL291dC9cIikge1xyXG4gICAgICAgIHRoaXMudHlwaW5nc0RpcmVjdG9yeSA9IGJhc2UgKyBcIi90eXBpbmdzXCI7XHJcblxyXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyh0aGlzLmJhc2UpKSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyh0aGlzLmJhc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHRoaXMudHlwaW5nc0RpcmVjdG9yeSkpIHtcclxuICAgICAgICAgICAgZnMubWtkaXJTeW5jKHRoaXMudHlwaW5nc0RpcmVjdG9yeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhgYmFzZSBkaXJlY3Rvcnk6ICR7dGhpcy5iYXNlfWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGB0eXBpbmdzIGRpcmVjdG9yeTogJHt0aGlzLnR5cGluZ3NEaXJlY3Rvcnl9YCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGFyc2VWZXJzaW9uKHZlcnNpb246IHN0cmluZykge1xyXG4gICAgICAgIHZhciBtYWpvciwgbWlub3IsIHBhdGNoO1xyXG4gICAgICAgIHZhciBtYXRjaCA9IHZlcnNpb24ubWF0Y2goL3YoXFxkKykoPzpcXC4oXFxkKykpPyguKik/Lyk7XHJcblxyXG4gICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICBtYWpvciA9IG1hdGNoWzFdO1xyXG4gICAgICAgICAgICBtaW5vciA9IG1hdGNoWzJdO1xyXG4gICAgICAgICAgICBwYXRjaCA9IG1hdGNoWzNdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke21ham9yfSR7bWlub3IgPyBcIi5cIiArIG1pbm9yIDogXCJcIn0ke3BhdGNoID8gXCItXCIgKyBwYXRjaCA6IFwiXCJ9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHdyaXRlcyBzcGVjaWZpZWQgcmVzb3VyY2UgZGVmaW5pdGlvblxyXG4gICAgcHJpdmF0ZSB3cml0ZVJlc291cmNlcyhvdXQ6IFR5cGVzY3JpcHRUZXh0V3JpdGVyLCByZXNvdXJjZXM6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLlJlc291cmNlcykge1xyXG5cclxuICAgICAgICBfLmZvckVhY2gocmVzb3VyY2VzLCAocmVzb3VyY2U6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLlJlc291cmNlLCByZXNvdXJjZU5hbWU6IHN0cmluZykgPT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc291cmNlSW50ZXJmYWNlTmFtZSA9IHJlc291cmNlTmFtZVswXS50b1VwcGVyQ2FzZSgpICsgcmVzb3VyY2VOYW1lLnN1YnN0cmluZygxKSArIFwiUmVzb3VyY2VcIjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVSZXNvdXJjZXMob3V0LCByZXNvdXJjZS5yZXNvdXJjZXMpO1xyXG5cclxuICAgICAgICAgICAgXy5mb3JFYWNoKHJlc291cmNlLm1ldGhvZHMsIChtZXRob2Q6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLk1ldGhvZCwgbmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvdXQuaW50ZXJmYWNlKGdldE1ldGhvZFBhcmFtZXRlckludGVyZmFjZU5hbWUocmVzb3VyY2VOYW1lLCBtZXRob2QpLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKG1ldGhvZC5wYXJhbWV0ZXJzLCAocGFyYW1ldGVyOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5QYXJhbWV0ZXIsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQuY29tbWVudChmb3JtYXRDb21tZW50KHBhcmFtZXRlci5kZXNjcmlwdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQucHJvcGVydHkoa2V5LCB0eXBlc01hcFtwYXJhbWV0ZXIudHlwZV0gfHwgcGFyYW1ldGVyLnR5cGUsIHBhcmFtZXRlci5yZXF1aXJlZCB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBvdXQuaW50ZXJmYWNlKHJlc291cmNlSW50ZXJmYWNlTmFtZSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIF8uZm9yRWFjaChyZXNvdXJjZS5tZXRob2RzLCAobWV0aG9kOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5NZXRob2QsIG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dC5jb21tZW50KGZvcm1hdENvbW1lbnQobWV0aG9kLmRlc2NyaXB0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0Lm1ldGhvZChnZXROYW1lKG1ldGhvZC5pZCksIFt7IHBhcmFtZXRlcjogXCJyZXF1ZXN0XCIsIHR5cGU6IGdldE1ldGhvZFBhcmFtZXRlckludGVyZmFjZU5hbWUocmVzb3VyY2VOYW1lLCBtZXRob2QpIH1dLCBnZXRNZXRob2RSZXR1cm4obWV0aG9kKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBfLmZvckVhY2gocmVzb3VyY2UucmVzb3VyY2VzLCAoY2hpbGRSZXNvdXJjZTogZ2FwaS5kaXNjb3ZlcnkuZGVzY3JpcHRpb24uUmVzb3VyY2UsIGNoaWxkUmVzb3VyY2VOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRSZXNvdXJjZUludGVyZmFjZU5hbWUgPSBjaGlsZFJlc291cmNlTmFtZVswXS50b1VwcGVyQ2FzZSgpICsgY2hpbGRSZXNvdXJjZU5hbWUuc3Vic3RyaW5nKDEpICsgXCJSZXNvdXJjZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIG91dC5wcm9wZXJ0eShjaGlsZFJlc291cmNlTmFtZSwgY2hpbGRSZXNvdXJjZUludGVyZmFjZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG91dC53cml0ZUxpbmUoKTtcclxuXHJcbiAgICAgICAgICAgIG91dC53cml0ZUxpbmUoYHZhciAke3Jlc291cmNlTmFtZSB9OiAke3Jlc291cmNlSW50ZXJmYWNlTmFtZSB9OyBgKTtcclxuICAgICAgICAgICAgb3V0LndyaXRlTGluZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLyB3cml0ZXMgYXBpIGRlc2NyaXB0aW9uIGZvciBzcGVjaWZpZWQgSlNPTiBvYmplY3RcclxuICAgIHByaXZhdGUgcHJvY2Vzc0FwaShhcGk6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLkFwaSwgYWN0dWFsVmVyc2lvbjogYm9vbGVhbikge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhgR2VuZXJhdGluZyAke2FwaS5pZCB9IGRlZmluaXRpb25zLi4uYCk7XHJcblxyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbkRpcmVjdG9yeSA9IGAke3RoaXMudHlwaW5nc0RpcmVjdG9yeSB9IC8ke2FwaS5uYW1lfS0ke2FwaS52ZXJzaW9ufWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGVzdGluYXRpb25EaXJlY3RvcnkpKSB7XHJcbiAgICAgICAgICAgICAgICBmcy5ta2RpclN5bmMoZGVzdGluYXRpb25EaXJlY3RvcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbWV0aG9kcyA9IF8ocHJvY2Vzc1Jlc291cmNlKGFwaSkpLmZsYXR0ZW4odHJ1ZSkubWFwKCh4OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBnZXROYW1lc3BhY2UoeC5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2V0TmFtZSh4LmlkKSxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGdyb3VwZWQgPSBfLmdyb3VwQnkobWV0aG9kcywgbWV0aG9kID0+IG1ldGhvZC5uYW1lc3BhY2UpLFxyXG4gICAgICAgICAgICAgICAgZmlsZW5hbWUgPSBhcGkubmFtZSArIChhY3R1YWxWZXJzaW9uID8gXCJcIiA6IFwiLVwiICsgYXBpLnZlcnNpb24pICsgXCIuZC50c1wiLFxyXG4gICAgICAgICAgICAgICAgc3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdGluYXRpb25EaXJlY3RvcnkgKyBcIi9cIiArIGZpbGVuYW1lKSxcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9IG5ldyBUeXBlc2NyaXB0VGV4dFdyaXRlcihuZXcgSW5kZW50ZWRUZXh0V3JpdGVyKG5ldyBTdHJlYW1Xcml0ZXIoc3RyZWFtKSkpO1xyXG5cclxuICAgICAgICAgICAgd3JpdGVyLnJlZmVyZW5jZShcImdhcGkuZC50c1wiKTtcclxuXHJcbiAgICAgICAgICAgIHdyaXRlci5kZWNsYXJlTmFtZXNwYWNlKFwiZ2FwaVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIubmFtZXNwYWNlKFwiY2xpZW50XCIsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKGFwaS5zY2hlbWFzLCAoc2NoZW1hOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5TY2hlbWEsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZXIuaW50ZXJmYWNlKHNjaGVtYS5pZCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5wcm9wZXJ0aWVzLCAoZGF0YTogYW55LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZXIuY29tbWVudChmb3JtYXRDb21tZW50KGRhdGEuZGVzY3JpcHRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZXIucHJvcGVydHkoa2V5LCBnZXRUeXBlKGRhdGEpLCBkYXRhLnJlcXVpcmVkIHx8IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVSZXNvdXJjZXMod3JpdGVyLCBhcGkucmVzb3VyY2VzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHdyaXRlci5lbmQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBpbmdzU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdGluYXRpb25EaXJlY3RvcnkgKyBcIi90eXBpbmdzLmpzb25cIik7XHJcblxyXG4gICAgICAgICAgICB0eXBpbmdzU3RyZWFtLndyaXRlKEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBhcGkubmFtZSxcclxuICAgICAgICAgICAgICAgIFwibWFpblwiOiBmaWxlbmFtZSxcclxuICAgICAgICAgICAgICAgIFwidmVyc2lvblwiOiBBcHAucGFyc2VWZXJzaW9uKGFwaS52ZXJzaW9uKSxcclxuICAgICAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiQm9saXNvdiBBbGV4ZXlcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogYXBpLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9ib2xpc292L3R5cGluZ3MtZ2FwaVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2FwaVwiOiBcImdpdGh1Yjpib2xpc292L3R5cGluZ3MtZ2FwaS9nYXBpXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdHlwaW5nc1N0cmVhbS5lbmQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHR5cGluZ3NXcml0ZXIud3JpdGVMaW5lKFwie1wiKTtcclxuICAgICAgICAgICAgLy8gdHlwaW5nc1dyaXRlci5pbmRlbnQgKz0gMTtcclxuICAgICAgICAgICAgLy8gdHlwaW5nc1dyaXRlci53cml0ZUxpbmUoYFwibmFtZVwiOiBcIiR7YXBpLm5hbWV9XCJgKTtcclxuICAgICAgICAgICAgLy8gdHlwaW5nc1dyaXRlci53cml0ZUxpbmUoYFwibWFpblwiOiBcIiR7YXBpLm5hbWV9LmQudHNcImApO1xyXG4gICAgICAgICAgICAvLyB0eXBpbmdzV3JpdGVyLndyaXRlTGluZShgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9ib2xpc292XCJgKTtcclxuICAgICAgICAgICAgLy8gdHlwaW5nc1dyaXRlci53cml0ZUxpbmUoYFwiZGVwZW5kZW5jaWVzXCI6IHtgKTtcclxuICAgICAgICAgICAgLy8gdHlwaW5nc1dyaXRlci5pbmRlbnQgKz0gMTtcclxuICAgICAgICAgICAgLy8gdHlwaW5nc1dyaXRlci53cml0ZUxpbmUoYFwiZ2FwaS5jbGllbnRcIjogXCJodHRwczovL2dpdGh1Yi5jb20vYm9saXNvdlwiYCk7XHJcbiAgICAgICAgICAgIC8vIHR5cGluZ3NXcml0ZXIuaW5kZW50IC09IDE7XHJcbiAgICAgICAgICAgIC8vIHR5cGluZ3NXcml0ZXIud3JpdGVMaW5lKGB9YCk7ICAgICAgICBcclxuICAgICAgICAgICAgLy8gdHlwaW5nc1dyaXRlci5pbmRlbnQgLT0gMTtcclxuICAgICAgICAgICAgLy8gdHlwaW5nc1dyaXRlci53cml0ZUxpbmUoXCJ9XCIpXHJcbiAgICAgICAgICAgIC8vIHR5cGluZ3NXcml0ZXIuZW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVxdWVzdCh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QodXJsLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwaSA9IEpTT04ucGFyc2UoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhcGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkdvdCBhbiBlcnJvcjogXCIsIGVycm9yLCBcIiwgc3RhdHVzIGNvZGU6IFwiLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbHRlclNlcnZpY2VzKGFwaXM6IGdhcGkuZGlzY292ZXJ5LmRpcmVjdG9yeS5BcGlbXSwgc2VydmljZTogc3RyaW5nLCBhbGxWZXJzaW9uczogYm9vbGVhbikge1xyXG4gICAgICAgIGFwaXMgPSBfLmZpbHRlcihhcGlzLCBhcGkgPT4gc2VydmljZSA9PSBudWxsIHx8IGFwaS5uYW1lID09PSBzZXJ2aWNlKTtcclxuICAgICAgICBhcGlzID0gXy5maWx0ZXIoYXBpcywgKGFwaTogZ2FwaS5kaXNjb3ZlcnkuZGlyZWN0b3J5LkFwaSkgPT4gYWxsVmVyc2lvbnMgfHwgYXBpLnByZWZlcnJlZCk7XHJcbiAgICAgICAgcmV0dXJuIGFwaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb2Nlc3NTZXJ2aWNlKHVybDogc3RyaW5nLCBhY3R1YWxWZXJzaW9uOiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICAgICAgLnJlcXVlc3QodXJsKVxyXG4gICAgICAgICAgICAudGhlbigoYXBpOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5BcGkpID0+IHRoaXMucHJvY2Vzc0FwaShhcGksIGFjdHVhbFZlcnNpb24pKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNjb3ZlcihzZXJ2aWNlOiBzdHJpbmcgPSBudWxsLCBhbGxWZXJzaW9uczogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEaXNjb3ZlcmluZyBHb29nbGUgc2VydmljZXMuLi5cIik7XHJcbiAgICAgICAgbGV0IHNlcnZpY2VzOiBnYXBpLmRpc2NvdmVyeS5kaXJlY3RvcnkuQXBpW10gPSBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgICAgICAucmVxdWVzdChcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKChhcGlzOiBnYXBpLmRpc2NvdmVyeS5kaXJlY3RvcnkuQXBpcykgPT4gdGhpcy5maWx0ZXJTZXJ2aWNlcyhhcGlzLml0ZW1zLCBzZXJ2aWNlLCBhbGxWZXJzaW9ucykpXHJcbiAgICAgICAgICAgIC50aGVuKGl0ZW1zID0+IHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2VzID0gaXRlbXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbid0IGZpbmQgc2VydmljZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJDYW4ndCBmaW5kIHNlcnZpY2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMucmVkdWNlKChjdXIsIGFwaTogYW55KSA9PiBjdXIudGhlbigoKSA9PiB0aGlzLnByb2Nlc3NTZXJ2aWNlKGFwaS5kaXNjb3ZlcnlSZXN0VXJsLCBhcGkucHJlZmVycmVkKSksIFByb21pc2UucmVzb2x2ZShudWxsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBfLmZvckVhY2goXHJcbiAgICAgICAgICAgICAgICAgICAgXy5ncm91cEJ5KHNlcnZpY2VzLCBzZXJ2aWNlID0+IHNlcnZpY2UubmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHZlcnNpb25zLCBzZXJ2aWNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwaW5nc1N0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGAke3RoaXMudHlwaW5nc0RpcmVjdG9yeX0vJHtzZXJ2aWNlfS5qc29uYCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gXy5yZWR1Y2UodmVyc2lvbnMsIChjdXJyZW50LCBhcGkpID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFtBcHAucGFyc2VWZXJzaW9uKGFwaS52ZXJzaW9uKV0gPSBgaHR0cHM6Ly9naXRodWIuY29tL2JvbGlzb3YvdHlwaW5ncy1nYXBpLyR7YXBpLm5hbWV9LSR7YXBpLnZlcnNpb259YDsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwaW5nc1N0cmVhbS53cml0ZShKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZlcnNpb25zXCI6IHZcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwaW5nc1N0cmVhbS5lbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBwYXJhbXM6IGFueSA9IHByb2dyYW1cclxuICAgIC52ZXJzaW9uKFwiMC4wLjFcIilcclxuICAgIC5hbGxvd1Vua25vd25PcHRpb24oZmFsc2UpXHJcbiAgICAub3B0aW9uKFwiLXUsIC0tdXJsIFt1cmxdXCIsIFwicHJvY2VzcyBvbmx5IHNwZWNpZmljIFJFU1Qgc2VydmljZSBkZWZpbml0aW9uIGJ5IHVybFwiKVxyXG4gICAgLm9wdGlvbihcIi1zLCAtLXNlcnZpY2UgW25hbWVdXCIsIFwicHJvY2VzcyBvbmx5IHNwZWNpZmljIFJFU1Qgc2VydmljZSBkZWZpbml0aW9uIGJ5IG5hbWVcIilcclxuICAgIC8vLm9wdGlvbihcIi1hLCAtLWFsbFwiLCBcImluY2x1ZGUgcHJldmlvdXNseSB2ZXJzaW9uc1wiLCB0cnVlKVxyXG4gICAgLm9wdGlvbihcIi1vLCAtLW91dFwiLCBcIm91dHB1dCBkaXJlY3RvcnlcIilcclxuICAgIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xyXG5cclxudmFyIGFwcCA9IG5ldyBBcHAocGFyYW1zLm91dCk7XHJcblxyXG5pZiAocGFyYW1zLnVybCkge1xyXG4gICAgYXBwXHJcbiAgICAgICAgLnByb2Nlc3NTZXJ2aWNlKHBhcmFtcy51cmwsIHRydWUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJEb25lXCIpKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGFwcFxyXG4gICAgICAgIC5kaXNjb3ZlcihwYXJhbXMuc2VydmljZSwgdHJ1ZSlcclxuICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkRvbmVcIikpO1xyXG59Il19