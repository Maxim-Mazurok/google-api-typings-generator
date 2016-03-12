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
        if (typeof chunk === "string") {
            this.writer.write(chunk);
        }
        else if (typeof chunk === "function") {
            chunk(this);
        }
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
    TypescriptTextWriter.prototype.module = function (name, context) {
        this.writer.writeLine();
        this.braces("declare module " + name, context);
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
        var _this = this;
        this.writer.writeLine("${name} (");
        _.forEach(parameters, function (parameter, index) {
            _this.writer.write(parameter.parameter + ": ");
            _this.writer.write(parameter.type);
            if (index + 1 < parameters.length) {
                _this.writer.writeLine(",");
            }
        });
        this.writer.startIndentedLine(") : " + returnType + ";");
        //this.writer.writeLine(`${name}(${parameters.map(p => p.parameter + ": " + p.type).join(", ")}): ${returnType};`);
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
    App.prototype.getResourceTypeName = function (resourceName) {
        return resourceName[0].toUpperCase() + resourceName.substring(1) + "Resource";
    };
    // writes specified resource definition
    App.prototype.writeResources = function (out, resources) {
        var _this = this;
        _.forEach(resources, function (resource, resourceName) {
            var resourceInterfaceName = _this.getResourceTypeName(resourceName);
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
                    out.method(getName(method.id), [{ parameter: "request", type: getType(method) }], getMethodReturn(method));
                });
                _.forEach(resource.resources, function (childResource, childResourceName) {
                    var childResourceInterfaceName = childResourceName[0].toUpperCase() + childResourceName.substring(1) + "Resource";
                    out.property(childResourceName, childResourceInterfaceName);
                });
            });
            out.writeLine();
            // out.writeLine(`var ${resourceName}: ${resourceInterfaceName}; `);
            // out.writeLine();
        });
    };
    App.prototype.getTypingsDirectory = function (api, version) {
        return this.typingsDirectory + "/gapi.client." + api + "-" + version;
    };
    /// writes api description for specified JSON object
    App.prototype.processApi = function (api, actualVersion) {
        var _this = this;
        console.log("Generating " + api.id + " definitions...");
        var destinationDirectory = this.getTypingsDirectory(api.name, api.version);
        if (!fs.existsSync(destinationDirectory)) {
            fs.mkdirSync(destinationDirectory);
        }
        var methods = _(processResource(api)).flatten(true).map(function (x) {
            return {
                namespace: getNamespace(x.id),
                name: getName(x.id),
                method: x
            };
        }).value(), grouped = _.groupBy(methods, function (method) { return method.namespace; }), filename = "gapi.client." + api.name + (actualVersion ? "" : "-" + api.version) + ".d.ts", stream = fs.createWriteStream(destinationDirectory + "/" + filename), writer = new TypescriptTextWriter(new IndentedTextWriter(new StreamWriter(stream))), rootNamespace = "gapi.client." + api.name + "." + api.version.replace(/\./, "_");
        writer.comment("Type definitions for " + api.ownerName + " " + api.title + " " + api.version);
        writer.comment("Project: " + api.documentationLink);
        writer.comment("Definitions by: Bolisov Alexey");
        writer.writeLine();
        writer.reference("../gapi.client/gapi.client.d.ts");
        // write main namespace
        writer.module(rootNamespace, function () {
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
        // expose root resources to gapi.client namespace
        writer.module("gapi.client", function () {
            _.forEach(api.resources, function (resource, resourceName) {
                writer.writeLine("var " + resourceName + ": " + rootNamespace + "." + _this.getResourceTypeName(resourceName) + "; ");
                writer.writeLine();
            });
        });
        writer.end();
        var typingsStream = fs.createWriteStream(destinationDirectory + "/typings.json");
        typingsStream.write(JSON.stringify({
            "name": api.name,
            "main": filename,
            "version": App.parseVersion(api.version),
            "author": "Typed by Bolisov Alexey",
            "description": api.description,
            "homepage": "https://github.com/bolisov/typings-gapi",
            "dependencies": {
                "gapi.client": "github:bolisov/typings-gapi/gapi.client"
            }
        }));
        typingsStream.end();
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
                    current[App.parseVersion(api.version)] = _this.getTypingsDirectory(api.name, api.version);
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
        .then(function () { return console.log("Done"); }, function (error) { return console.error(error); });
}
else {
    app
        .discover(params.service, true)
        .then(function () { return console.log("Done"); }, function (error) { return console.error(error); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWFwaS10eXBpbmdzLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nb29nbGUtYXBpLXR5cGluZ3MtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZDQUE2Qzs7QUFFN0MsSUFBWSxPQUFPLFdBQU0sV0FBVyxDQUFDLENBQUE7QUFDckMsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxFQUFFLFdBQU0sSUFBSSxDQUFDLENBQUE7QUFDekIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsSUFBSSxRQUFRLEdBQUc7SUFDWCxTQUFTLEVBQUUsUUFBUTtJQUNuQixRQUFRLEVBQUUsS0FBSztDQUNsQixDQUFBO0FBUUQ7SUFBQTtRQUVZLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFheEIsQ0FBQztJQVhVLDRCQUFLLEdBQVosVUFBYSxLQUFhO1FBQ3RCLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFTSwwQkFBRyxHQUFWO0lBRUEsQ0FBQztJQUVNLCtCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQUVEO0lBRUksc0JBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBRTFDLENBQUM7SUFFRCw0QkFBSyxHQUFMLFVBQU0sS0FBYTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCwwQkFBRyxHQUFIO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztB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O0FBQ3hFLENBQUM7QUFDRCxJQUFJLENBQUMsQ0FBQztJQUNGLEdBQUc7U0FDRSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7U0FDOUIsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFuQixDQUFtQixFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgcHJvZ3JhbSBmcm9tICdjb21tYW5kZXInO1xyXG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gJ3Byb21pc2UnO1xyXG5cclxudmFyIHR5cGVzTWFwID0ge1xyXG4gICAgXCJpbnRlZ2VyXCI6IFwibnVtYmVyXCIsXHJcbiAgICBcIm9iamVjdFwiOiBcImFueVwiXHJcbn1cclxuXHJcbmludGVyZmFjZSBJVGV4dFdyaXRlciB7XHJcbiAgICB3cml0ZShjaHVuaz8pO1xyXG4gICAgZW5kKCk7XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTdHJpbmdXcml0ZXIgaW1wbGVtZW50cyBJVGV4dFdyaXRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBidWZmZXIgPSBcIlwiO1xyXG5cclxuICAgIHB1YmxpYyB3cml0ZShjaHVuazogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgKz0gY2h1bms7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuZCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlcjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RyZWFtV3JpdGVyIGltcGxlbWVudHMgSVRleHRXcml0ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RyZWFtOiBmcy5Xcml0ZVN0cmVhbSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB3cml0ZShjaHVuazogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdHJlYW0ud3JpdGUoY2h1bmspO1xyXG4gICAgfVxyXG5cclxuICAgIGVuZCgpIHtcclxuICAgICAgICB0aGlzLnN0cmVhbS5lbmQoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSW5kZW50ZWRUZXh0V3JpdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd3JpdGVyOiBJVGV4dFdyaXRlciwgcHVibGljIG5ld0xpbmUgPSBcIlxcclxcblwiLCBwdWJsaWMgdGFiU3RyaW5nID0gXCIgICAgXCIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluZGVudCA9IDA7XHJcblxyXG4gICAgcHVibGljIHdyaXRlKGNodW5rOiBzdHJpbmcgfCBUeXBlc2NyaXB0V3JpdGVyQ2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodHlwZW9mIGNodW5rID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVyLndyaXRlKGNodW5rKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNodW5rID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgY2h1bmsodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydEluZGVudGVkTGluZShjaHVuayA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLndyaXRlKEFycmF5KHRoaXMuaW5kZW50ICsgMSkuam9pbih0aGlzLnRhYlN0cmluZykgKyBjaHVuayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdyaXRlTGluZShjaHVuayA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW5kZW50ZWRMaW5lKGNodW5rICsgdGhpcy5uZXdMaW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5kKCkge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLmVuZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVR5cGVzY3JpcHRUZXh0V3JpdGVyIHtcclxuICAgIG5hbWVzcGFjZShuYW1lOiBzdHJpbmcsIGNvbnRleHQ6ICh3cml0ZXI6IFR5cGVzY3JpcHRUZXh0V3JpdGVyKSA9PiB2b2lkKTtcclxufVxyXG5cclxudHlwZSBUeXBlc2NyaXB0V3JpdGVyQ2FsbGJhY2sgPSAod3JpdGVyKSA9PiB2b2lkO1xyXG5cclxuY2xhc3MgVHlwZXNjcmlwdFRleHRXcml0ZXIgaW1wbGVtZW50cyBJVHlwZXNjcmlwdFRleHRXcml0ZXIge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3cml0ZXI6IEluZGVudGVkVGV4dFdyaXRlcikge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnJhY2VzKHRleHQ6IHN0cmluZywgY29udGV4dDogKHdyaXRlcjogVHlwZXNjcmlwdFRleHRXcml0ZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLndyaXRlci53cml0ZUxpbmUodGV4dCArIFwiIHtcIik7XHJcbiAgICAgICAgdGhpcy53cml0ZXIuaW5kZW50Kys7XHJcbiAgICAgICAgY29udGV4dCh0aGlzKTtcclxuICAgICAgICB0aGlzLndyaXRlci5pbmRlbnQtLTtcclxuICAgICAgICB0aGlzLndyaXRlci53cml0ZUxpbmUoXCJ9XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWZlcmVuY2UocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKGAvLy8gPHJlZmVyZW5jZSBwYXRoPVwiJHtwYXRofVwiIC8+YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5hbWVzcGFjZShuYW1lOiBzdHJpbmcsIGNvbnRleHQ6IFR5cGVzY3JpcHRXcml0ZXJDYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlTGluZSgpO1xyXG4gICAgICAgIHRoaXMuYnJhY2VzKGBuYW1lc3BhY2UgJHtuYW1lfWAsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb2R1bGUobmFtZTogc3RyaW5nLCBjb250ZXh0OiBUeXBlc2NyaXB0V3JpdGVyQ2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLndyaXRlci53cml0ZUxpbmUoKTtcclxuICAgICAgICB0aGlzLmJyYWNlcyhgZGVjbGFyZSBtb2R1bGUgJHtuYW1lfWAsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWNsYXJlTmFtZXNwYWNlKG5hbWU6IHN0cmluZywgY29udGV4dDogVHlwZXNjcmlwdFdyaXRlckNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKCk7XHJcbiAgICAgICAgdGhpcy5icmFjZXMoYGRlY2xhcmUgbmFtZXNwYWNlICR7bmFtZX1gLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlKG5hbWU6IHN0cmluZywgY29udGV4dDogVHlwZXNjcmlwdFdyaXRlckNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKCk7XHJcbiAgICAgICAgdGhpcy5icmFjZXMoYGludGVyZmFjZSAke25hbWV9YCwgY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFub255bXlzVHlwZShjb250ZXh0OiBUeXBlc2NyaXB0V3JpdGVyQ2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLndyaXRlci53cml0ZShcIntcIik7XHJcbiAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKCk7XHJcbiAgICAgICAgdGhpcy53cml0ZXIuaW5kZW50Kys7XHJcbiAgICAgICAgY29udGV4dCh0aGlzKTtcclxuICAgICAgICB0aGlzLndyaXRlci5pbmRlbnQtLTtcclxuICAgICAgICB0aGlzLndyaXRlci5zdGFydEluZGVudGVkTGluZShcIn1cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb3BlcnR5KG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nIHwgVHlwZXNjcmlwdFdyaXRlckNhbGxiYWNrLCByZXF1aXJlZCA9IHRydWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy53cml0ZXIuc3RhcnRJbmRlbnRlZExpbmUoYCR7bmFtZX0ke3JlcXVpcmVkID8gXCJcIiA6IFwiP1wifTogYCk7XHJcbiAgICAgICAgICAgIHR5cGUodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVyLndyaXRlKFwiLFwiKTtcclxuICAgICAgICAgICAgdGhpcy53cml0ZXIud3JpdGVMaW5lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlci53cml0ZUxpbmUoYCR7bmFtZX0ke3JlcXVpcmVkID8gXCJcIiA6IFwiP1wifTogJHt0eXBlfSxgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb21tZW50KHRleHQ6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB2YXIgbGluZXMgPSB0ZXh0LnNwbGl0KC9cXHJcXG58XFxyfFxcbnxcXHUwMDBhXFx1MDAwZHxcXHUwMDBhfFxcdTAwMGR8XFx1MjQwYS9nKTtcclxuICAgICAgICBfLmZvckVhY2gobGluZXMsIGxpbmUgPT4gdGhpcy53cml0ZXIud3JpdGVMaW5lKGAvLyAke2xpbmV9YCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtZXRob2QobmFtZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBbeyBwYXJhbWV0ZXI6IHN0cmluZywgdHlwZTogc3RyaW5nIHwgVHlwZXNjcmlwdFdyaXRlckNhbGxiYWNrIH1dLCByZXR1cm5UeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLndyaXRlci53cml0ZUxpbmUoXCIke25hbWV9IChcIik7XHJcblxyXG4gICAgICAgIF8uZm9yRWFjaChwYXJhbWV0ZXJzLCAocGFyYW1ldGVyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlci53cml0ZShwYXJhbWV0ZXIucGFyYW1ldGVyICsgXCI6IFwiKTtcclxuICAgICAgICAgICAgdGhpcy53cml0ZXIud3JpdGUocGFyYW1ldGVyLnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8IHBhcmFtZXRlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRlci53cml0ZUxpbmUoXCIsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMud3JpdGVyLnN0YXJ0SW5kZW50ZWRMaW5lKGApIDogJHtyZXR1cm5UeXBlfTtgKTtcclxuXHJcbiAgICAgICAgLy90aGlzLndyaXRlci53cml0ZUxpbmUoYCR7bmFtZX0oJHtwYXJhbWV0ZXJzLm1hcChwID0+IHAucGFyYW1ldGVyICsgXCI6IFwiICsgcC50eXBlKS5qb2luKFwiLCBcIil9KTogJHtyZXR1cm5UeXBlfTtgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd3JpdGVMaW5lKGNodW5rID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlTGluZShjaHVuayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdyaXRlKGNodW5rID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLndyaXRlKGNodW5rKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5kKCkge1xyXG4gICAgICAgIHRoaXMud3JpdGVyLmVuZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzUmVzb3VyY2UocmVzb3VyY2UpIHtcclxuICAgIHZhciBjaGlsZHMgPSBfLm1hcChyZXNvdXJjZS5yZXNvdXJjZXMgfHwge30sIHZhbHVlID0+IHByb2Nlc3NSZXNvdXJjZSh2YWx1ZSkpO1xyXG4gICAgcmV0dXJuIF8udW5pb24oXy5tYXAocmVzb3VyY2UubWV0aG9kcyB8fCB7fSwgdmFsdWUgPT4gdmFsdWUpLCBjaGlsZHMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROYW1lc3BhY2UocGF0aDogc3RyaW5nKSB7XHJcbiAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XHJcblxyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBwYXJ0cy5zcGxpY2UocGFydHMubGVuZ3RoIC0gMSlcclxuXHJcbiAgICAgICAgdmFyIG46IHN0cmluZyA9IF8uY2FtZWxDYXNlKHBhcnRzLmpvaW4oJy4nKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oJy4nKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TmFtZShwYXRoOiBzdHJpbmcpIHtcclxuICAgIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoJy4nKTtcclxuXHJcbiAgICBpZiAocGFydHMubGVuZ3RoID4gMClcclxuICAgICAgICByZXR1cm4gXy5sYXN0KHBhcnRzKTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0UGFyYW1ldGVycyhtZXRob2QsIG91dDogKGxpbmUpID0+IHZvaWQpIHtcclxuXHJcbiAgICBvdXQoXCJ7XCIpO1xyXG5cclxuICAgIF8uZm9yRWFjaChtZXRob2QucGFyYW1ldGVycywgKGRhdGEsIGtleSkgPT4ge1xyXG4gICAgICAgIG91dChcIlxcdFwiICsga2V5ICsgXCI6IFwiICsgKHR5cGVzTWFwW2RhdGEudHlwZV0gfHwgZGF0YS50eXBlKSArIFwiLFwiKTtcclxuICAgIH0pXHJcblxyXG4gICAgb3V0KFwifVwiKTtcclxuXHJcbiAgICAvL3JldHVybiBcInsgXFxyXFxuXFx0XFx0XCIgKyBfLm1hcChtZXRob2QucGFyYW1ldGVycywgKGRhdGEsIGtleSkgPT4ga2V5ICsgXCI6IFwiICsgKHR5cGVzTWFwW2RhdGEudHlwZV0gfHwgZGF0YS50eXBlKSkuam9pbihcIiwgXFxyXFxuXFx0XFx0XCIpICsgXCJcXHJcXG5cXHRcXHQgfVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaXJzdExldHRlclVwKHRleHQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRleHRbMF0udG9VcHBlckNhc2UoKSArIHRleHQuc3Vic3RyaW5nKDEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNZXRob2RQYXJhbWV0ZXJJbnRlcmZhY2VOYW1lKHJlc291cmNlLCBtZXRob2Q6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLk1ldGhvZCkge1xyXG4gICAgcmV0dXJuIGZpcnN0TGV0dGVyVXAocmVzb3VyY2UpICsgZmlyc3RMZXR0ZXJVcChnZXROYW1lKG1ldGhvZC5pZCkpICsgXCJSZXF1ZXN0XCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFR5cGUodHlwZTogYW55KTogc3RyaW5nIHwgVHlwZXNjcmlwdFdyaXRlckNhbGxiYWNrIHtcclxuICAgIGlmICh0eXBlLnR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgIHJldHVybiAod3JpdGVyOiBUeXBlc2NyaXB0VGV4dFdyaXRlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBnZXRUeXBlKHR5cGUuaXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKGNoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQod3JpdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3cml0ZXIud3JpdGUoXCJbXVwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZS50eXBlID09PSBcIm9iamVjdFwiICYmIHR5cGUucHJvcGVydGllcykge1xyXG4gICAgICAgIHJldHVybiAod3JpdGVyOiBUeXBlc2NyaXB0VGV4dFdyaXRlcikgPT4ge1xyXG4gICAgICAgICAgICB3cml0ZXIuYW5vbnlteXNUeXBlKCgpID0+XHJcbiAgICAgICAgICAgICAgICBfLmZvckVhY2godHlwZS5wcm9wZXJ0aWVzLCAoZGF0YTogYW55LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZXIuY29tbWVudChmb3JtYXRDb21tZW50KGRhdGEuZGVzY3JpcHRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZXIucHJvcGVydHkoa2V5LCBnZXRUeXBlKGRhdGEpLCBkYXRhLnJlcXVpcmVkIHx8IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlLnR5cGUpIHtcclxuICAgICAgICByZXR1cm4gdHlwZXNNYXBbdHlwZS50eXBlXSB8fCB0eXBlLnR5cGU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlLiRyZWYpIHtcclxuICAgICAgICByZXR1cm4gdHlwZS4kcmVmO1xyXG4gICAgfVxyXG4gICAgZWxzZSB0aHJvdyBFcnJvcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXRDb21tZW50KGNvbW1lbnQ6IHN0cmluZykge1xyXG4gICAgaWYgKCFjb21tZW50KSByZXR1cm4gXCJcIjtcclxuXHJcbiAgICByZXR1cm4gY29tbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TWV0aG9kUmV0dXJuKG1ldGhvZDogZ2FwaS5kaXNjb3ZlcnkuZGVzY3JpcHRpb24uTWV0aG9kKSB7XHJcblxyXG4gICAgaWYgKG1ldGhvZC5yZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiBcIlByb21pc2VMaWtlPEFwaVJlc3VsdDxcIiArIG1ldGhvZC5yZXNwb25zZS4kcmVmICsgXCI+PlwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiUHJvbWlzZUxpa2U8dm9pZD5cIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcblxyXG4gICAgcHJpdmF0ZSB0eXBpbmdzRGlyZWN0b3J5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlID0gX19kaXJuYW1lICsgXCIvLi4vb3V0L1wiKSB7XHJcbiAgICAgICAgdGhpcy50eXBpbmdzRGlyZWN0b3J5ID0gYmFzZSArIFwiL3R5cGluZ3NcIjtcclxuXHJcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHRoaXMuYmFzZSkpIHtcclxuICAgICAgICAgICAgZnMubWtkaXJTeW5jKHRoaXMuYmFzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmModGhpcy50eXBpbmdzRGlyZWN0b3J5KSkge1xyXG4gICAgICAgICAgICBmcy5ta2RpclN5bmModGhpcy50eXBpbmdzRGlyZWN0b3J5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBiYXNlIGRpcmVjdG9yeTogJHt0aGlzLmJhc2V9YCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYHR5cGluZ3MgZGlyZWN0b3J5OiAke3RoaXMudHlwaW5nc0RpcmVjdG9yeX1gKTtcclxuICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwYXJzZVZlcnNpb24odmVyc2lvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIG1ham9yLCBtaW5vciwgcGF0Y2g7XHJcbiAgICAgICAgdmFyIG1hdGNoID0gdmVyc2lvbi5tYXRjaCgvdihcXGQrKSg/OlxcLihcXGQrKSk/KC4qKT8vKTtcclxuXHJcbiAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIG1ham9yID0gbWF0Y2hbMV07XHJcbiAgICAgICAgICAgIG1pbm9yID0gbWF0Y2hbMl07XHJcbiAgICAgICAgICAgIHBhdGNoID0gbWF0Y2hbM107XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7bWFqb3J9JHttaW5vciA/IFwiLlwiICsgbWlub3IgOiBcIlwifSR7cGF0Y2ggPyBcIi1cIiArIHBhdGNoIDogXCJcIn1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZVR5cGVOYW1lKHJlc291cmNlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlTmFtZVswXS50b1VwcGVyQ2FzZSgpICsgcmVzb3VyY2VOYW1lLnN1YnN0cmluZygxKSArIFwiUmVzb3VyY2VcIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3cml0ZXMgc3BlY2lmaWVkIHJlc291cmNlIGRlZmluaXRpb25cclxuICAgIHByaXZhdGUgd3JpdGVSZXNvdXJjZXMob3V0OiBUeXBlc2NyaXB0VGV4dFdyaXRlciwgcmVzb3VyY2VzOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5SZXNvdXJjZXMpIHtcclxuXHJcbiAgICAgICAgXy5mb3JFYWNoKHJlc291cmNlcywgKHJlc291cmNlOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5SZXNvdXJjZSwgcmVzb3VyY2VOYW1lOiBzdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXNvdXJjZUludGVyZmFjZU5hbWUgPSB0aGlzLmdldFJlc291cmNlVHlwZU5hbWUocmVzb3VyY2VOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVSZXNvdXJjZXMob3V0LCByZXNvdXJjZS5yZXNvdXJjZXMpO1xyXG5cclxuICAgICAgICAgICAgXy5mb3JFYWNoKHJlc291cmNlLm1ldGhvZHMsIChtZXRob2Q6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLk1ldGhvZCwgbmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvdXQuaW50ZXJmYWNlKGdldE1ldGhvZFBhcmFtZXRlckludGVyZmFjZU5hbWUocmVzb3VyY2VOYW1lLCBtZXRob2QpLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKG1ldGhvZC5wYXJhbWV0ZXJzLCAocGFyYW1ldGVyOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5QYXJhbWV0ZXIsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQuY29tbWVudChmb3JtYXRDb21tZW50KHBhcmFtZXRlci5kZXNjcmlwdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQucHJvcGVydHkoa2V5LCB0eXBlc01hcFtwYXJhbWV0ZXIudHlwZV0gfHwgcGFyYW1ldGVyLnR5cGUsIHBhcmFtZXRlci5yZXF1aXJlZCB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBvdXQuaW50ZXJmYWNlKHJlc291cmNlSW50ZXJmYWNlTmFtZSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIF8uZm9yRWFjaChyZXNvdXJjZS5tZXRob2RzLCAobWV0aG9kOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5NZXRob2QsIG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dC5jb21tZW50KGZvcm1hdENvbW1lbnQobWV0aG9kLmRlc2NyaXB0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0Lm1ldGhvZChnZXROYW1lKG1ldGhvZC5pZCksIFt7IHBhcmFtZXRlcjogXCJyZXF1ZXN0XCIsIHR5cGU6IGdldFR5cGUobWV0aG9kKSB9XSwgZ2V0TWV0aG9kUmV0dXJuKG1ldGhvZCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgXy5mb3JFYWNoKHJlc291cmNlLnJlc291cmNlcywgKGNoaWxkUmVzb3VyY2U6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLlJlc291cmNlLCBjaGlsZFJlc291cmNlTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkUmVzb3VyY2VJbnRlcmZhY2VOYW1lID0gY2hpbGRSZXNvdXJjZU5hbWVbMF0udG9VcHBlckNhc2UoKSArIGNoaWxkUmVzb3VyY2VOYW1lLnN1YnN0cmluZygxKSArIFwiUmVzb3VyY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICBvdXQucHJvcGVydHkoY2hpbGRSZXNvdXJjZU5hbWUsIGNoaWxkUmVzb3VyY2VJbnRlcmZhY2VOYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBvdXQud3JpdGVMaW5lKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBvdXQud3JpdGVMaW5lKGB2YXIgJHtyZXNvdXJjZU5hbWV9OiAke3Jlc291cmNlSW50ZXJmYWNlTmFtZX07IGApO1xyXG4gICAgICAgICAgICAvLyBvdXQud3JpdGVMaW5lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUeXBpbmdzRGlyZWN0b3J5KGFwaTogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy50eXBpbmdzRGlyZWN0b3J5fS9nYXBpLmNsaWVudC4ke2FwaX0tJHt2ZXJzaW9ufWA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vIHdyaXRlcyBhcGkgZGVzY3JpcHRpb24gZm9yIHNwZWNpZmllZCBKU09OIG9iamVjdFxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzQXBpKGFwaTogZ2FwaS5kaXNjb3ZlcnkuZGVzY3JpcHRpb24uQXBpLCBhY3R1YWxWZXJzaW9uOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBHZW5lcmF0aW5nICR7YXBpLmlkfSBkZWZpbml0aW9ucy4uLmApO1xyXG5cclxuICAgICAgICB2YXIgZGVzdGluYXRpb25EaXJlY3RvcnkgPSB0aGlzLmdldFR5cGluZ3NEaXJlY3RvcnkoYXBpLm5hbWUsIGFwaS52ZXJzaW9uKTtcclxuXHJcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRlc3RpbmF0aW9uRGlyZWN0b3J5KSkge1xyXG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGVzdGluYXRpb25EaXJlY3RvcnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1ldGhvZHMgPSBfKHByb2Nlc3NSZXNvdXJjZShhcGkpKS5mbGF0dGVuKHRydWUpLm1hcCgoeDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IGdldE5hbWVzcGFjZSh4LmlkKSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGdldE5hbWUoeC5pZCksXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IHhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnZhbHVlKCksXHJcbiAgICAgICAgICAgIGdyb3VwZWQgPSBfLmdyb3VwQnkobWV0aG9kcywgbWV0aG9kID0+IG1ldGhvZC5uYW1lc3BhY2UpLFxyXG4gICAgICAgICAgICBmaWxlbmFtZSA9IFwiZ2FwaS5jbGllbnQuXCIgKyBhcGkubmFtZSArIChhY3R1YWxWZXJzaW9uID8gXCJcIiA6IFwiLVwiICsgYXBpLnZlcnNpb24pICsgXCIuZC50c1wiLFxyXG4gICAgICAgICAgICBzdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0aW5hdGlvbkRpcmVjdG9yeSArIFwiL1wiICsgZmlsZW5hbWUpLFxyXG4gICAgICAgICAgICB3cml0ZXIgPSBuZXcgVHlwZXNjcmlwdFRleHRXcml0ZXIobmV3IEluZGVudGVkVGV4dFdyaXRlcihuZXcgU3RyZWFtV3JpdGVyKHN0cmVhbSkpKSxcclxuICAgICAgICAgICAgcm9vdE5hbWVzcGFjZSA9IGBnYXBpLmNsaWVudC4ke2FwaS5uYW1lfS4ke2FwaS52ZXJzaW9uLnJlcGxhY2UoL1xcLi8sIFwiX1wiKX1gO1xyXG5cclxuICAgICAgICB3cml0ZXIuY29tbWVudChgVHlwZSBkZWZpbml0aW9ucyBmb3IgJHthcGkub3duZXJOYW1lfSAke2FwaS50aXRsZX0gJHthcGkudmVyc2lvbn1gKTtcclxuICAgICAgICB3cml0ZXIuY29tbWVudChgUHJvamVjdDogJHthcGkuZG9jdW1lbnRhdGlvbkxpbmt9YCk7XHJcbiAgICAgICAgd3JpdGVyLmNvbW1lbnQoYERlZmluaXRpb25zIGJ5OiBCb2xpc292IEFsZXhleWApO1xyXG4gICAgICAgIHdyaXRlci53cml0ZUxpbmUoKTtcclxuICAgICAgICB3cml0ZXIucmVmZXJlbmNlKFwiLi4vZ2FwaS5jbGllbnQvZ2FwaS5jbGllbnQuZC50c1wiKTtcclxuXHJcbiAgICAgICAgLy8gd3JpdGUgbWFpbiBuYW1lc3BhY2VcclxuICAgICAgICB3cml0ZXIubW9kdWxlKHJvb3ROYW1lc3BhY2UsICgpID0+IHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKGFwaS5zY2hlbWFzLCAoc2NoZW1hOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5TY2hlbWEsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLmludGVyZmFjZShzY2hlbWEuaWQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnByb3BlcnRpZXMsIChkYXRhOiBhbnksIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZXIuY29tbWVudChmb3JtYXRDb21tZW50KGRhdGEuZGVzY3JpcHRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVyLnByb3BlcnR5KGtleSwgZ2V0VHlwZShkYXRhKSwgZGF0YS5yZXF1aXJlZCB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53cml0ZVJlc291cmNlcyh3cml0ZXIsIGFwaS5yZXNvdXJjZXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBleHBvc2Ugcm9vdCByZXNvdXJjZXMgdG8gZ2FwaS5jbGllbnQgbmFtZXNwYWNlXHJcbiAgICAgICAgd3JpdGVyLm1vZHVsZShgZ2FwaS5jbGllbnRgLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChhcGkucmVzb3VyY2VzLCAocmVzb3VyY2U6IGdhcGkuZGlzY292ZXJ5LmRlc2NyaXB0aW9uLlJlc291cmNlLCByZXNvdXJjZU5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLndyaXRlTGluZShgdmFyICR7cmVzb3VyY2VOYW1lfTogJHtyb290TmFtZXNwYWNlfS4ke3RoaXMuZ2V0UmVzb3VyY2VUeXBlTmFtZShyZXNvdXJjZU5hbWUpfTsgYCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGVMaW5lKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdyaXRlci5lbmQoKTtcclxuXHJcbiAgICAgICAgdmFyIHR5cGluZ3NTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0aW5hdGlvbkRpcmVjdG9yeSArIFwiL3R5cGluZ3MuanNvblwiKTtcclxuXHJcbiAgICAgICAgdHlwaW5nc1N0cmVhbS53cml0ZShKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBhcGkubmFtZSxcclxuICAgICAgICAgICAgXCJtYWluXCI6IGZpbGVuYW1lLFxyXG4gICAgICAgICAgICBcInZlcnNpb25cIjogQXBwLnBhcnNlVmVyc2lvbihhcGkudmVyc2lvbiksXHJcbiAgICAgICAgICAgIFwiYXV0aG9yXCI6IFwiVHlwZWQgYnkgQm9saXNvdiBBbGV4ZXlcIixcclxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBhcGkuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vYm9saXNvdi90eXBpbmdzLWdhcGlcIixcclxuICAgICAgICAgICAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJnYXBpLmNsaWVudFwiOiBcImdpdGh1Yjpib2xpc292L3R5cGluZ3MtZ2FwaS9nYXBpLmNsaWVudFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIHR5cGluZ3NTdHJlYW0uZW5kKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVxdWVzdCh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QodXJsLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwaSA9IEpTT04ucGFyc2UoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhcGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkdvdCBhbiBlcnJvcjogXCIsIGVycm9yLCBcIiwgc3RhdHVzIGNvZGU6IFwiLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbHRlclNlcnZpY2VzKGFwaXM6IGdhcGkuZGlzY292ZXJ5LmRpcmVjdG9yeS5BcGlbXSwgc2VydmljZTogc3RyaW5nLCBhbGxWZXJzaW9uczogYm9vbGVhbikge1xyXG4gICAgICAgIGFwaXMgPSBfLmZpbHRlcihhcGlzLCBhcGkgPT4gc2VydmljZSA9PSBudWxsIHx8IGFwaS5uYW1lID09PSBzZXJ2aWNlKTtcclxuICAgICAgICBhcGlzID0gXy5maWx0ZXIoYXBpcywgKGFwaTogZ2FwaS5kaXNjb3ZlcnkuZGlyZWN0b3J5LkFwaSkgPT4gYWxsVmVyc2lvbnMgfHwgYXBpLnByZWZlcnJlZCk7XHJcbiAgICAgICAgcmV0dXJuIGFwaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb2Nlc3NTZXJ2aWNlKHVybDogc3RyaW5nLCBhY3R1YWxWZXJzaW9uOiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICAgICAgLnJlcXVlc3QodXJsKVxyXG4gICAgICAgICAgICAudGhlbigoYXBpOiBnYXBpLmRpc2NvdmVyeS5kZXNjcmlwdGlvbi5BcGkpID0+IHRoaXMucHJvY2Vzc0FwaShhcGksIGFjdHVhbFZlcnNpb24pKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNjb3ZlcihzZXJ2aWNlOiBzdHJpbmcgPSBudWxsLCBhbGxWZXJzaW9uczogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEaXNjb3ZlcmluZyBHb29nbGUgc2VydmljZXMuLi5cIik7XHJcbiAgICAgICAgbGV0IHNlcnZpY2VzOiBnYXBpLmRpc2NvdmVyeS5kaXJlY3RvcnkuQXBpW10gPSBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgICAgICAucmVxdWVzdChcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKChhcGlzOiBnYXBpLmRpc2NvdmVyeS5kaXJlY3RvcnkuQXBpcykgPT4gdGhpcy5maWx0ZXJTZXJ2aWNlcyhhcGlzLml0ZW1zLCBzZXJ2aWNlLCBhbGxWZXJzaW9ucykpXHJcbiAgICAgICAgICAgIC50aGVuKGl0ZW1zID0+IHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2VzID0gaXRlbXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbid0IGZpbmQgc2VydmljZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJDYW4ndCBmaW5kIHNlcnZpY2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMucmVkdWNlKChjdXIsIGFwaTogYW55KSA9PiBjdXIudGhlbigoKSA9PiB0aGlzLnByb2Nlc3NTZXJ2aWNlKGFwaS5kaXNjb3ZlcnlSZXN0VXJsLCBhcGkucHJlZmVycmVkKSksIFByb21pc2UucmVzb2x2ZShudWxsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBfLmZvckVhY2goXHJcbiAgICAgICAgICAgICAgICAgICAgXy5ncm91cEJ5KHNlcnZpY2VzLCBzZXJ2aWNlID0+IHNlcnZpY2UubmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHZlcnNpb25zLCBzZXJ2aWNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwaW5nc1N0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGAke3RoaXMudHlwaW5nc0RpcmVjdG9yeX0vJHtzZXJ2aWNlfS5qc29uYCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gXy5yZWR1Y2UodmVyc2lvbnMsIChjdXJyZW50LCBhcGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50W0FwcC5wYXJzZVZlcnNpb24oYXBpLnZlcnNpb24pXSA9IHRoaXMuZ2V0VHlwaW5nc0RpcmVjdG9yeShhcGkubmFtZSwgYXBpLnZlcnNpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwaW5nc1N0cmVhbS53cml0ZShKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZlcnNpb25zXCI6IHZcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwaW5nc1N0cmVhbS5lbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBwYXJhbXM6IGFueSA9IHByb2dyYW1cclxuICAgIC52ZXJzaW9uKFwiMC4wLjFcIilcclxuICAgIC5hbGxvd1Vua25vd25PcHRpb24oZmFsc2UpXHJcbiAgICAub3B0aW9uKFwiLXUsIC0tdXJsIFt1cmxdXCIsIFwicHJvY2VzcyBvbmx5IHNwZWNpZmljIFJFU1Qgc2VydmljZSBkZWZpbml0aW9uIGJ5IHVybFwiKVxyXG4gICAgLm9wdGlvbihcIi1zLCAtLXNlcnZpY2UgW25hbWVdXCIsIFwicHJvY2VzcyBvbmx5IHNwZWNpZmljIFJFU1Qgc2VydmljZSBkZWZpbml0aW9uIGJ5IG5hbWVcIilcclxuICAgIC8vLm9wdGlvbihcIi1hLCAtLWFsbFwiLCBcImluY2x1ZGUgcHJldmlvdXNseSB2ZXJzaW9uc1wiLCB0cnVlKVxyXG4gICAgLm9wdGlvbihcIi1vLCAtLW91dFwiLCBcIm91dHB1dCBkaXJlY3RvcnlcIilcclxuICAgIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xyXG5cclxudmFyIGFwcCA9IG5ldyBBcHAocGFyYW1zLm91dCk7XHJcblxyXG5pZiAocGFyYW1zLnVybCkge1xyXG4gICAgYXBwXHJcbiAgICAgICAgLnByb2Nlc3NTZXJ2aWNlKHBhcmFtcy51cmwsIHRydWUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJEb25lXCIpLCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBhcHBcclxuICAgICAgICAuZGlzY292ZXIocGFyYW1zLnNlcnZpY2UsIHRydWUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJEb25lXCIpLCBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbn0iXX0=