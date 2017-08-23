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
const path = require("path");
var typesMap = {
    "integer": "number",
    "object": "any",
    "any": "any",
    "string": "string"
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
function formatPropertyName(name) {
    if (name.indexOf(".") >= 0 || name.indexOf("-") >= 0 || name.indexOf("@") >= 0) {
        return `"${name}"`;
    }
    return name;
}
function convertVersion(version) {
    var m = version.match(/v(\d+)?\.?(\d+)?/);
    if (m) {
        const [full, major, minor] = m;
        return `${major || 0}.${minor || 0}`;
    }
    else {
        return "0.0";
    }
}
function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        ensureDirectoryExists(path.dirname(directory));
        fs.mkdirSync(directory);
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
    referencePath(path) {
        this.writer.writeLine(`/// <reference path="${path}" />`);
    }
    referenceTypes(type) {
        this.writer.writeLine(`/// <reference types="${type}" />`);
    }
    namespace(name, context) {
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
            this.writer.startIndentedLine(`${formatPropertyName(name)}${required ? "" : "?"}: `);
            type(this);
            this.writer.write(";");
            this.writer.writeLine();
        }
        else if (typeof type === 'string') {
            this.writer.writeLine(`${formatPropertyName(name)}${required ? "" : "?"}: ${type};`);
        }
    }
    comment(text = "") {
        if (!text || text === "") {
            return;
        }
        const lines = text.trim().split(/\r\n|\r|\n|\u000a\u000d|\u000a|\u000d|\u240a/g).map(x => x.replace(/\*/g, "&#42;"));
        if (lines.length == 1) {
            this.writer.writeLine(`/** ${lines[0]} */`);
        }
        else if (lines.length > 1) {
            this.writer.writeLine(`/**`);
            _.forEach(lines, line => this.writer.writeLine(` * ${line}`));
            this.writer.writeLine(` */`);
        }
    }
    method(name, parameters, returnType, singleLine = false) {
        this.writer.startIndentedLine(`${name}(`);
        _.forEach(parameters, (parameter, index) => {
            this.write(parameter.parameter + ": ");
            this.write(parameter.type);
            if (index + 1 < parameters.length) {
                this.write(",");
                if (singleLine) {
                    this.write(" ");
                }
                else {
                    this.writeLine();
                }
            }
        });
        this.writer.write(`): ${returnType};`);
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
const simpleTypes = ["string", "number"];
function firstLetterUp(text) {
    return text[0].toUpperCase() + text.substring(1);
}
function getMethodParameterInterfaceName(resource, method) {
    return firstLetterUp(resource) + firstLetterUp(getName(method.id)) + "Request";
}
function getType(type, schemas) {
    if (type.type === "array") {
        const child = getType(type.items, schemas);
        if (typeof child === "string") {
            return `${child}[]`;
        }
        else if (typeof child === "function") {
            return (writer) => {
                writer.write("Array<");
                child(writer);
                writer.write(">");
            };
        }
        else {
            return "[]";
        }
    }
    else if (type.type === "object" && type.properties) {
        return (writer) => {
            writer.anonymysType(() => {
                forEachOrdered(type.properties, (property, propertyName) => {
                    writer.comment(formatComment(property.description));
                    writer.property(propertyName, getType(property, schemas), property.required || false);
                });
                if (type.additionalProperties) {
                    writer.property("[key: string]", getType(type.additionalProperties, schemas));
                }
            });
        };
    }
    else if (type.type === "object" && type.additionalProperties) {
        return (writer) => {
            const child = getType(type.additionalProperties, schemas);
            writer.write("Record<string, ");
            writer.write(child);
            writer.write(">");
        };
    }
    else if (type.type) {
        return typesMap[type.type] || type.type;
    }
    else if (type.$ref) {
        const referencedType = schemas[type.$ref];
        if (isEmptySchema(referencedType)) {
            return "any";
        }
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
function getMethodReturn(method, schemas) {
    const name = schemas["Request"] ? "client.Request" : "Request";
    if (method.response) {
        const schema = schemas[method.response.$ref];
        if (schema && !_.isEmpty(schema.properties)) {
            return `${name}<${method.response.$ref}>`;
        }
        else {
            return `${name}<{}>`;
        }
    }
    else {
        return `${name}<void>`;
    }
}
function loadTemplate(name) {
    var filename = '';
    if (fs.existsSync(name)) {
        filename = name;
    }
    else if (fs.existsSync(path.join("..", name))) {
        filename = path.join("..", name);
    }
    else {
        throw Error(`Can\'t find ${name} file template`);
    }
    doT.templateSettings.strip = false;
    return doT.template(fs.readFileSync(filename, "utf-8"));
}
const readmeTpl = loadTemplate("readme.dot");
const tsconfigTpl = loadTemplate("tsconfig.dot");
const tslintTpl = loadTemplate("tslint.dot");
const testsTpl = loadTemplate("tests.dot");
function isEmptySchema(schema) {
    return _.isEmpty(schema.properties) && !schema.additionalProperties;
}
function forEachOrdered(record, iterator) {
    const keys = _.keys(record).sort((a, b) => a > b ? 1 : -1);
    for (const key of keys) {
        iterator(record[key], key);
    }
}
function sortKeys(record) {
    return _.map(record, (resource, resourceKey) => ({ resource, resourceKey }))
        .sort(({ resourceKey: a }, { resourceKey: b }) => a > b ? 1 : -1)
        .reduce((curr, { resource, resourceKey }) => (Object.assign({}, curr, { [resourceKey]: resource })), {});
}
class App {
    constructor(base = __dirname + "/../out/") {
        this.base = base;
        this.typingsDirectory = base;
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
    writeResources(out, resources, parameters = {}, schemas) {
        forEachOrdered(resources, (resource, resourceName) => {
            var resourceInterfaceName = this.getResourceTypeName(resourceName);
            this.writeResources(out, resource.resources, parameters, schemas);
            out.interface(resourceInterfaceName, () => {
                forEachOrdered(resource.methods, (method, name) => {
                    out.comment(formatComment(method.description));
                    out.method(getName(method.id), [{
                            parameter: "request",
                            type: (writer) => {
                                writer.anonymysType(() => {
                                    const requestParameters = Object.assign({}, parameters, method.parameters);
                                    forEachOrdered(requestParameters, (data, key) => {
                                        writer.comment(formatComment(data.description));
                                        writer.property(key, getType(data, schemas), data.required || false);
                                    });
                                });
                            }
                        }], getMethodReturn(method, schemas));
                    out.writeLine();
                });
                forEachOrdered(resource.resources, (childResource, childResourceName) => {
                    var childResourceInterfaceName = childResourceName[0].toUpperCase() + childResourceName.substring(1) + "Resource";
                    out.property(childResourceName, childResourceInterfaceName);
                });
            });
        });
    }
    getTypingsUrl(api, version) {
        return `https://github.com/bolisov/typings-gapi/typings/${this.getTypingsName(api, version)}`;
    }
    getTypingsName(api, version) {
        if (version == null)
            return `gapi.client.${api}`;
        else
            return path.join(`gapi.client.${api}`, version);
    }
    getTypingsDirectory(api, version) {
        return path.join(this.typingsDirectory, this.getTypingsName(api, version));
    }
    /// writes api description for specified JSON object
    processApi(destinationDirectory, api, actualVersion, url) {
        console.log(`Generating ${api.id} definitions...`);
        const rawMethods = processResource(api);
        const methods = rawMethods.map((x) => ({
            namespace: getNamespace(x.id),
            name: getName(x.id),
            method: x
        })), grouped = _.groupBy(methods, method => method.namespace), filename = "index.d.ts", //"gapi.client." + api.name + (actualVersion ? "" : "-" + api.version) + ".d.ts",
        stream = fs.createWriteStream(path.join(destinationDirectory, filename)), writer = new TypescriptTextWriter(new IndentedTextWriter(new StreamWriter(stream))), rootNamespace = `gapi.client.${api.name}`;
        writer.writeLine(`// Type definitions for ${api.ownerName} ${api.title} ${api.version} ${convertVersion(api.version)}`);
        writer.writeLine(`// Project: ${api.documentationLink}`);
        writer.writeLine(`// Definitions by: Bolisov Alexey <https://github.com/Bolisov>`);
        writer.writeLine(`// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped`);
        writer.writeLine(`// TypeScript Version: 2.3`);
        writer.writeLine();
        writer.writeLine(`// IMPORTANT`);
        writer.writeLine(`// This file was generated by https://github.com/Bolisov/google-api-typings-generator. Please do not edit it manually.`);
        writer.writeLine(`// In case of any problems please post issue to https://github.com/Bolisov/google-api-typings-generator`);
        writer.writeLine(`// Generated from: ${url}`);
        writer.writeLine();
        writer.referenceTypes("gapi.client");
        // write main namespace
        writer.declareNamespace(`gapi.client`, () => {
            writer.comment(formatComment(`Load ${api.title} ${api.version}`));
            writer.method(`function load`, [
                { parameter: `name`, type: `"${api.name}"` },
                { parameter: `version`, type: `"${api.version}"` }
            ], "PromiseLike<void>", true);
            writer.method(`function load`, [
                { parameter: `name`, type: `"${api.name}"` },
                { parameter: `version`, type: `"${api.version}"` },
                { parameter: `callback`, type: `() => any` }
            ], "void", true);
            // expose root resources to gapi.client namespace
            writer.writeLine();
            forEachOrdered(api.resources, (resource, resourceName) => {
                if (resourceName !== "debugger") {
                    writer.writeLine(`const ${resourceName}: ${api.name}.${this.getResourceTypeName(resourceName)}; `);
                    writer.writeLine();
                }
            });
            writer.namespace(api.name, () => {
                forEachOrdered(api.schemas, (schema, key) => {
                    if (!isEmptySchema(schema)) {
                        writer.interface(schema.id, () => {
                            forEachOrdered(schema.properties, (data, key) => {
                                writer.comment(formatComment(data.description));
                                writer.property(key, getType(data, api.schemas), data.required || false);
                            });
                            if (schema.additionalProperties) {
                                writer.property("[key: string]", getType(schema.additionalProperties, api.schemas));
                            }
                        });
                    }
                });
                this.writeResources(writer, api.resources, api.parameters, api.schemas);
            });
        });
        writer.end();
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
    writeTemplate(filepath, template, api) {
        var stream = fs.createWriteStream(filepath), writer = new StreamWriter(stream);
        try {
            writer.write(template(Object.assign({}, api, { formatPropertyName })));
        }
        finally {
            writer.end();
        }
    }
    writeReadme(api) {
        var destinationDirectory = this.getTypingsDirectory(api.name, api.version), stream = fs.createWriteStream(destinationDirectory + "/readme.md"), writer = new StreamWriter(stream);
        try {
            writer.write(readmeTpl(api));
        }
        finally {
            writer.end();
        }
    }
    processService(url, actualVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield this.request(url);
            api.name = api.name.toLocaleLowerCase();
            api.version = api.version.toLocaleLowerCase();
            api.resources = sortKeys(api.resources);
            if (api.auth && api.auth.oauth2 && api.auth.oauth2.scopes) {
                api.auth.oauth2.scopes = sortKeys(api.auth.oauth2.scopes);
            }
            _.forEach(api.resources, (resource) => {
                resource.methods = sortKeys(resource.methods);
            });
            var destinationDirectory = this.getTypingsDirectory(api.name, actualVersion ? null : api.version);
            ensureDirectoryExists(destinationDirectory);
            yield this.processApi(destinationDirectory, api, actualVersion, url);
            const templateData = Object.assign({}, api, { actualVersion });
            this.writeTemplate(path.join(destinationDirectory, 'readme.md'), readmeTpl, templateData);
            this.writeTemplate(path.join(destinationDirectory, `tsconfig.json`), tsconfigTpl, templateData);
            this.writeTemplate(path.join(destinationDirectory, `tslint.json`), tslintTpl, templateData);
            this.writeTemplate(path.join(destinationDirectory, `gapi.client.${api.name}-tests.ts`), testsTpl, templateData);
        });
    }
    discover(service = null, allVersions = false) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Discovering Google services...");
            const list = yield this.request("https://www.googleapis.com/discovery/v1/apis");
            const apis = _.filter(list.items, api => service == null || api.name === service);
            if (apis.length === 0) {
                console.error("Can't find services");
                throw Error("Can't find services");
            }
            const apisLookup = _.groupBy(apis, item => item.name);
            for (const apiKey in apisLookup) {
                const associatedApis = apisLookup[apiKey];
                const preferedApi = associatedApis.find(x => x.preferred)
                    || associatedApis.sort((a, b) => a.version > b.version ? 1 : -1)[0];
                if (preferedApi) {
                    yield this.processService(preferedApi.discoveryRestUrl, preferedApi.preferred);
                }
                else {
                    console.warn(`Can't find prefered API for ${apiKey}`);
                }
                if (allVersions) {
                    for (const api of associatedApis.filter(x => x != preferedApi)) {
                        try {
                            const service = yield this.processService(api.discoveryRestUrl, api.preferred);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                }
            }
        });
    }
}
exports.App = App;
function parseOutPath(dir) {
    if (!fs.existsSync(dir)) {
        throw new Error(`Directory not found: ${dir}`);
    }
    return dir;
}
const params = program
    .version("0.0.1")
    .option("-u, --url [url]", "process only specific REST service definition by url")
    .option("-s, --service [name]", "process only specific REST service definition by name")
    .option("-a, --all", "include previously versions", false)
    .option("-o, --out [path]", "output directory", parseOutPath)
    .parse(process.argv);
console.info(`Output directory: ${params.out}`);
const app = new App(params.out);
if (params.url) {
    app
        .processService(params.url, params.all || false)
        .then(() => console.log("Done"), error => console.error(error));
}
else {
    app
        .discover(params.service, params.all || false)
        .then(() => console.log("Done"), error => console.error(error));
}
//# sourceMappingURL=google-api-typings-generator.js.map