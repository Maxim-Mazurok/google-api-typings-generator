/// <reference path="typings\main.d.ts" />
/// <reference path="result.d.ts" />
"use strict";
//gmail.users.messages.
var request = require('request');
var fs = require('fs');
var _ = require("lodash");
var typesMap = {
    "integer": "number"
};
function output(line) {
}
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
function getMethodParameterInterfaceName(method) {
    var n = method.name;
    return n[0].toUpperCase() + n.substring(1) + "Parameters";
}
function getType(type, ref, items) {
    if (type === "array") {
        return getType(items.type, items.$ref, null) + '[]';
    }
    else if (type) {
        return typesMap[type] || type;
    }
    else if (ref) {
        return ref;
    }
    else
        throw Error();
}
function formatComment(comment) {
    if (!comment)
        return "";
    return comment
        .replace(String.fromCharCode(0xa, 0xd), "")
        .replace("\n", "")
        .replace("\r", "")
        .replace(String.fromCharCode(0xa), "")
        .replace(String.fromCharCode(0xd), "")
        .replace(String.fromCharCode(0x000a), "")
        .replace(String.fromCharCode(0x000d), "")
        .replace(String.fromCharCode(0x240A), "");
}
function getMethodReturn(method) {
    if (method.method.response) {
        return "PromiseLike<ApiResult<" + method.method.response.$ref + ">>";
    }
    else {
        return "PromiseLike<void>";
    }
}
function processApi(api) {
    var methods = _(processResource(api)).flatten(true).map(function (x) {
        return {
            namespace: getNamespace(x.id),
            name: getName(x.id),
            method: x
        };
    }).value(), grouped = _.groupBy(methods, function (method) { return method.namespace; }), out = fs.createWriteStream(__dirname + "/gmail.d.ts");
    //out.write("declare namespace gmail {\r\n");
    out.write("declare namespace gapi {\r\n");
    out.write("\tdeclare namespace client {\r\n");
    _.forEach(api.schemas, function (data, key) {
        out.write("\r\n");
        out.write("\tinterface " + data.id + " {\r\n");
        _.forEach(data.properties, function (data, key) {
            out.write("\t\t// " + formatComment(data.description) + "\r\n");
            out.write("\t\t" + key + (data.required ? "" : "?") + ": " + getType(data.type, data.$ref, data.items) + ",\r\n");
        });
        out.write("\t}\r\n");
    });
    _.forEach(grouped, function (namespace, name) {
        out.write("\r\n");
        var paths = name.split(".");
        _.forEach(paths, function (ns, index) {
            out.write("declare namespace " + ns + " { \r\n");
        });
        //out.write("interface " + name + " { \r\n");
        _.forEach(namespace, function (method) {
            out.write("\r\n");
            out.write("\tinterface " + getMethodParameterInterfaceName(method) + " {\r\n");
            _.forEach(method.method.parameters, function (data, key) {
                out.write("\t\t// " + data.description + "\r\n");
                out.write("\t\t" + key + (data.required ? "" : "?") + ": " + (typesMap[data.type] || data.type) + ",\r\n");
            });
            out.write("\t}\r\n");
            out.write("\t// " + method.method.description + "\r\n");
            out.write("\tfunction " + method.name + " (prms: " + getMethodParameterInterfaceName(method) + ") : " + getMethodReturn(method) + ";\r\n");
        });
        _.forEach(paths, function (ns, index) {
            out.write("}\r\n");
        });
        //out.write("}\r\n");
    });
    out.write("\t}\r\n");
    out.write("}\r\n");
    out.end();
}
request("https://content.googleapis.com/discovery/v1/apis/gmail/v1/rest", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var api = JSON.parse(body);
        processApi(api);
    }
    else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode);
    }
});
