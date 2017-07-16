"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const request = require("request");
const fs = require("fs");
const _ = require("lodash");
const doT = require("dot");
var typesMap = {
    "integer": "number",
    "object": "any"
};
class StringWriter {
    constructor() {
        this.buffer = "";
    }
    write(chunk) {
        this.buffer += chunk;
    }
    end() {
    }
    toString() {
        return this.buffer;
    }
}
class StreamWriter {
    constructor(stream) {
        this.stream = stream;
    }
    write(chunk) {
        this.stream.write(chunk);
    }
    end() {
        this.stream.end();
    }
}
class IndentedTextWriter {
    constructor(writer, newLine = "\r\n", tabString = "    ") {
        this.writer = writer;
        this.newLine = newLine;
        this.tabString = tabString;
        this.indent = 0;
    }
    write(chunk) {
        this.writer.write(chunk);
    }
    startIndentedLine(chunk = "") {
        this.write(Array(this.indent + 1).join(this.tabString) + chunk);
    }
    writeLine(chunk = "") {
        this.startIndentedLine(chunk + this.newLine);
    }
    end() {
        this.writer.end();
    }
}
class TypescriptTextWriter {
    constructor(writer) {
        this.writer = writer;
    }
    braces(text, context) {
        this.writer.writeLine(text + " {");
        this.writer.indent++;
        context(this);
        this.writer.indent--;
        this.writer.writeLine("}");
    }
    reference(path) {
        this.writer.writeLine(`/// <reference path="${path}" />`);
    }
    namespace(name, context) {
        this.writer.writeLine();
        this.braces(`namespace ${name}`, context);
    }
    module(name, context) {
        this.writer.writeLine();
        this.braces(`declare module ${name}`, context);
    }
    declareNamespace(name, context) {
        this.writer.writeLine();
        this.braces(`declare namespace ${name}`, context);
    }
    interface(name, context) {
        this.writer.writeLine();
        this.braces(`interface ${name}`, context);
    }
    anonymysType(context) {
        this.writer.write("{");
        this.writer.writeLine();
        this.writer.indent++;
        context(this);
        this.writer.indent--;
        this.writer.startIndentedLine("}");
    }
    property(name, type, required = true) {
        if (typeof type === 'function') {
            this.writer.startIndentedLine(`${name}${required ? "" : "?"}: `);
            type(this);
            this.writer.write(",");
            this.writer.writeLine();
        }
        else if (typeof type === 'string') {
            this.writer.writeLine(`${name}${required ? "" : "?"}: ${type},`);
        }
    }
    comment(text = "") {
        var lines = text.split(/\r\n|\r|\n|\u000a\u000d|\u000a|\u000d|\u240a/g);
        _.forEach(lines, line => this.writer.writeLine(`// ${line}`));
    }
    method(name, parameters, returnType) {
        this.writer.startIndentedLine(`${name} (`);
        _.forEach(parameters, (parameter, index) => {
            this.write(parameter.parameter + ": ");
            this.write(parameter.type);
            if (index + 1 < parameters.length) {
                this.writeLine(",");
            }
        });
        this.writer.write(`) : ${returnType};`);
        this.writer.writeLine();
        //this.writer.writeLine(`${name}(${parameters.map(p => p.parameter + ": " + p.type).join(", ")}): ${returnType};`);
    }
    writeLine(chunk = "") {
        this.writer.writeLine(chunk);
    }
    write(chunk = "") {
        if (typeof chunk === "string") {
            this.writer.write(chunk);
        }
        else if (typeof chunk === "function") {
            chunk(this);
        }
    }
    end() {
        this.writer.end();
    }
}
function processResource(resource) {
    var childs = _.flatten(_.map(resource.resources || {}, value => processResource(value)));
    const methodsArray = _.map(resource.methods || {}, value => value);
    return [...methodsArray, ...childs];
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
    _.forEach(method.parameters, (data, key) => {
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
        return (writer) => {
            let child = getType(type.items);
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
        return (writer) => {
            writer.anonymysType(() => _.forEach(type.properties, (data, key) => {
                writer.comment(formatComment(data.description));
                writer.property(key, getType(data), data.required || false);
            }));
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
        return "gapi.client.Request<" + method.response.$ref + ">";
    }
    else {
        return "gapi.client.Request<void>";
    }
}
class App {
    constructor(base = __dirname + "/../out/") {
        this.base = base;
        this.readmeTpl = this.loadReadmeTemplate();
        this.typingsDirectory = base + "/typings";
        if (!fs.existsSync(this.base)) {
            fs.mkdirSync(this.base);
        }
        if (!fs.existsSync(this.typingsDirectory)) {
            fs.mkdirSync(this.typingsDirectory);
        }
        console.log(`base directory: ${this.base}`);
        console.log(`typings directory: ${this.typingsDirectory}`);
        console.log();
    }
    loadReadmeTemplate() {
        var filename = '';
        if (fs.existsSync('readme.dot')) {
            filename = 'readme.dot';
        }
        else if (fs.existsSync('../readme.dot')) {
            filename = '../readme.dot';
        }
        else {
            throw Error('Can\'t find readme.md file template');
        }
        doT.templateSettings.strip = false;
        return doT.template(fs.readFileSync(filename, "utf-8"));
    }
    static parseVersion(version) {
        var major, minor, patch;
        var match = version.match(/v(\d+)?(?:\.(\d+))?(.*)?/);
        if (match) {
            major = match[1] || 0;
            minor = match[2];
            patch = match[3];
            return `${major}${minor ? "." + minor : ""}${patch ? "-" + patch : ""}`;
        }
    }
    getResourceTypeName(resourceName) {
        return resourceName[0].toUpperCase() + resourceName.substring(1) + "Resource";
    }
    // writes specified resource definition
    writeResources(out, resources) {
        _.forEach(resources, (resource, resourceName) => {
            var resourceInterfaceName = this.getResourceTypeName(resourceName);
            this.writeResources(out, resource.resources);
            out.interface(resourceInterfaceName, () => {
                _.forEach(resource.methods, (method, name) => {
                    out.comment(formatComment(method.description));
                    out.method(getName(method.id), [{
                            parameter: "request",
                            type: (writer) => {
                                writer.anonymysType(() => _.forEach(method.parameters, (data, key) => {
                                    writer.comment(formatComment(data.description));
                                    writer.property(key, getType(data), data.required || false);
                                }));
                            }
                        }], getMethodReturn(method));
                    out.writeLine();
                });
                _.forEach(resource.resources, (childResource, childResourceName) => {
                    var childResourceInterfaceName = childResourceName[0].toUpperCase() + childResourceName.substring(1) + "Resource";
                    out.property(childResourceName, childResourceInterfaceName);
                });
            });
            out.writeLine();
        });
    }
    getTypingsUrl(api, version) {
        return `https://guthub.com/bolisov/typings-gapi/typings/${this.getTypingsName(api, version)}`;
    }
    getTypingsName(api, version) {
        if (version == null)
            return `gapi.client.${api}`;
        else
            return `gapi.client.${api}-${version}`;
    }
    getTypingsDirectory(api, version) {
        return `${this.typingsDirectory}/${this.getTypingsName(api, version)}`;
    }
    /// writes api description for specified JSON object
    processApi(api, actualVersion) {
        console.log(`Generating ${api.id} definitions...`);
        var destinationDirectory = this.getTypingsDirectory(api.name, api.version);
        if (!fs.existsSync(destinationDirectory)) {
            fs.mkdirSync(destinationDirectory);
        }
        const rawMethods = processResource(api);
        const methods = rawMethods.map((x) => ({
            namespace: getNamespace(x.id),
            name: getName(x.id),
            method: x
        })), grouped = _.groupBy(methods, method => method.namespace), filename = "gapi.client." + api.name + (actualVersion ? "" : "-" + api.version) + ".d.ts", stream = fs.createWriteStream(destinationDirectory + "/" + filename), writer = new TypescriptTextWriter(new IndentedTextWriter(new StreamWriter(stream))), rootNamespace = `gapi.client.${api.name}`;
        writer.comment(`Type definitions for ${api.ownerName} ${api.title} ${api.version}`);
        writer.comment(`Project: ${api.documentationLink}`);
        writer.comment(`Definitions by: Bolisov Alexey`);
        writer.writeLine();
        writer.reference("../gapi.client/gapi.client.d.ts");
        // write main namespace
        writer.module(rootNamespace, () => {
            _.forEach(api.schemas, (schema, key) => {
                writer.interface(schema.id, () => {
                    _.forEach(schema.properties, (data, key) => {
                        writer.comment(formatComment(data.description));
                        writer.property(key, getType(data), data.required || false);
                    });
                });
            });
            this.writeResources(writer, api.resources);
        });
        // expose root resources to gapi.client namespace
        writer.module(`gapi.client.${api.name}`, () => {
            _.forEach(api.resources, (resource, resourceName) => {
                writer.writeLine(`var ${resourceName}: ${rootNamespace}.${this.getResourceTypeName(resourceName)}; `);
                writer.writeLine();
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
            "ambient": true,
            "dependencies": {},
            "devDependencies": {},
            "ambientDependencies": {
                "gapi.client": "github:bolisov/typings-gapi/gapi.client"
            }
        }, null, 4));
        typingsStream.end();
        return api;
    }
    request(url) {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
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
    }
    writeReadme(api) {
        var destinationDirectory = this.getTypingsDirectory(api.name, api.version), stream = fs.createWriteStream(destinationDirectory + "/readme.md"), writer = new StreamWriter(stream);
        try {
            writer.write(this.readmeTpl(api));
        }
        finally {
            writer.end();
        }
    }
    processService(url, actualVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield this.request(url);
            const description = yield this.processApi(api, actualVersion);
            this.writeReadme(description);
        });
    }
    discover(service = null, allVersions = false) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Discovering Google services...");
            const list = yield this.request("https://www.googleapis.com/discovery/v1/apis");
            var apis = _.filter(list.items, api => service == null || api.name === service);
            var items = _.filter(apis, api => allVersions || api.preferred);
            if (items.length === 0) {
                console.error("Can't find services");
                throw Error("Can't find services");
            }
            for (const api of items) {
                const service = yield this.processService(api.discoveryRestUrl, api.preferred);
            }
            _.forEach(_.groupBy(items, service => service.name), (versions, service) => {
                var typingsStream = fs.createWriteStream(`${this.typingsDirectory}/${this.getTypingsName(service, null)}.json`), v = _.reduce(versions, (current, api) => {
                    current[App.parseVersion(api.version)] = this.getTypingsUrl(api.name, api.version);
                    return current;
                }, {});
                typingsStream.write(JSON.stringify({ "versions": v }, null, 4));
                typingsStream.end();
            });
        });
    }
}
exports.App = App;
var params = program
    .version("0.0.1")
    .option("-u, --url [url]", "process only specific REST service definition by url")
    .option("-s, --service [name]", "process only specific REST service definition by name")
    .option("-o, --out", "output directory")
    .parse(process.argv);
var app = new App(params.out);
if (params.url) {
    app
        .processService(params.url, true)
        .then(() => console.log("Done"), error => console.error(error));
}
else {
    app
        .discover(params.service, true)
        .then(() => console.log("Done"), error => console.error(error));
}
//# sourceMappingURL=google-api-typings-generator.js.map