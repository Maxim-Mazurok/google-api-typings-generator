import * as program from 'commander';
import * as request from 'request';
import * as fs from 'fs';
import * as _ from "lodash";
import * as doT from 'dot';
import * as path from "path";

var typesMap = {
    "integer": "number",
    "object": "any",
    "any": "any",
    "string": "string"
}

interface ITextWriter {
    write(chunk?);
    end();
}

class StringWriter implements ITextWriter {

    private buffer = "";

    public write(chunk: string) {
        this.buffer += chunk;
    }

    public end() {

    }

    public toString() {
        return this.buffer;
    }
}

class StreamWriter implements ITextWriter {

    constructor(private stream: fs.WriteStream) {

    }

    write(chunk: string) {
        this.stream.write(chunk);
    }

    end() {
        this.stream.end();
    }
}

class IndentedTextWriter {
    constructor(private writer: ITextWriter, public newLine = "\r\n", public tabString = "    ") {

    }

    public indent = 0;

    public write(chunk: string) {
        this.writer.write(chunk);
    }

    public startIndentedLine(chunk = "") {
        this.write(Array(this.indent + 1).join(this.tabString) + chunk);
    }

    public writeLine(chunk = "") {
        this.startIndentedLine(chunk + this.newLine);
    }

    public end() {
        this.writer.end();
    }
}

interface ITypescriptTextWriter {
    namespace(name: string, context: (writer: TypescriptTextWriter) => void);
}

type TypescriptWriterCallback = (writer) => void;

function formatPropertyName(name: string) {
    if (name.indexOf(".") >= 0 || name.indexOf("-") >= 0 || name.indexOf("@") >= 0) {
        return `"${name}"`;
    }
    return name;
}

function convertVersion(version: string) {
    var m = version.match(/v(\d+)?\.?(\d+)?/);

    if (m) {
        const [full, major, minor] = m;
        return `${major || 0}.${minor || 0}`;
    } else {
        return "0.0";
    }
}

class TypescriptTextWriter implements ITypescriptTextWriter {
    constructor(private writer: IndentedTextWriter) {
    }

    private braces(text: string, context: (writer: TypescriptTextWriter) => void) {
        this.writer.writeLine(text + " {");
        this.writer.indent++;
        context(this);
        this.writer.indent--;
        this.writer.writeLine("}");
    }

    public referencePath(path: string) {
        this.writer.writeLine(`/// <reference path="${path}" />`);
    }

    public referenceTypes(type: string) {
        this.writer.writeLine(`/// <reference types="${type}" />`);
    }

    public namespace(name: string, context: TypescriptWriterCallback) {
        this.writer.writeLine();
        this.braces(`namespace ${name}`, context);
    }

    public module(name: string, context: TypescriptWriterCallback) {
        this.writer.writeLine();
        this.braces(`declare module ${name}`, context);
    }

    public declareNamespace(name: string, context: TypescriptWriterCallback) {
        this.writer.writeLine();
        this.braces(`declare namespace ${name}`, context);
    }

    public interface(name: string, context: TypescriptWriterCallback) {
        this.writer.writeLine();
        this.braces(`interface ${name}`, context);
    }

    public anonymysType(context: TypescriptWriterCallback) {
        this.writer.write("{");
        this.writer.writeLine();
        this.writer.indent++;
        context(this);
        this.writer.indent--;
        this.writer.startIndentedLine("}");
    }

    public property(name: string, type: string | TypescriptWriterCallback, required = true) {
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

    public comment(text: string = "") {
        var lines = text.split(/\r\n|\r|\n|\u000a\u000d|\u000a|\u000d|\u240a/g);
        _.forEach(lines, line => this.writer.writeLine(`/** ${line} */`));
    }

    public method(name: string, parameters: [{ parameter: string, type: string | TypescriptWriterCallback }], returnType: string, singleLine = false) {
        this.writer.startIndentedLine(`${name}(`);

        _.forEach(parameters, (parameter, index) => {
            this.write(parameter.parameter + ": ");
            this.write(parameter.type);

            if (index + 1 < parameters.length) {
                this.write(",");

                if (singleLine) {
                    this.write(" ");
                } else {
                    this.writeLine();
                }
            }
        });

        this.writer.write(`): ${returnType};`);

        this.writer.writeLine();
        //this.writer.writeLine(`${name}(${parameters.map(p => p.parameter + ": " + p.type).join(", ")}): ${returnType};`);
    }

    public writeLine(chunk = "") {
        this.writer.writeLine(chunk);
    }

    public write(chunk: string | TypescriptWriterCallback = "") {
        if (typeof chunk === "string") {
            this.writer.write(chunk);
        }
        else if (typeof chunk === "function") {
            chunk(this);
        }
    }

    public end() {
        this.writer.end();
    }
}

function processResource(resource: gapi.client.discovery.RestDescription): any[] {
    var childs = _.flatten(_.map(resource.resources || {}, value => processResource(value)));
    const methodsArray = _.map(resource.methods || {}, value => value);

    return [...methodsArray, ...childs];
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

const simpleTypes = ["string", "number"];

function firstLetterUp(text: string) {
    return text[0].toUpperCase() + text.substring(1);
}

function getMethodParameterInterfaceName(resource, method: gapi.client.discovery.RestMethod) {
    return firstLetterUp(resource) + firstLetterUp(getName(method.id)) + "Request";
}

function getType(type: gapi.client.discovery.JsonSchema, schemas: Record<string, gapi.client.discovery.JsonSchema>): string | TypescriptWriterCallback {
    if (type.type === "array") {
        const child = getType(type.items, schemas);

        if (typeof child === "string") {
            return `${child}[]`;
        }
        else if (typeof child === "function") {
            return (writer: TypescriptTextWriter) => {
                writer.write("Array<");
                child(writer);
                writer.write(">");
            };
        } else {
            return "[]";
        }
    }
    else if (type.type === "object" && type.properties) {
        return (writer: TypescriptTextWriter) => {
            writer.anonymysType(() => {
                _.forEach(type.properties, (property, propertyName) => {
                    writer.comment(formatComment(property.description));
                    writer.property(propertyName, getType(property, schemas), property.required || false);
                });

                if (type.additionalProperties) {
                    writer.property("[key: string]", getType(type.additionalProperties, schemas));
                }
            });
        }
    } else if (type.type === "object" && type.additionalProperties) {
        return (writer: TypescriptTextWriter) => {
            const child = getType(type.additionalProperties, schemas);
            writer.write("Record<string, ");
            writer.write(child);
            writer.write(">");
        }
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
    else throw Error();
}

function formatComment(comment: string) {
    if (!comment) return "";

    return comment;
}

function getMethodReturn(method: gapi.client.discovery.RestMethod, schemas: any) {

    if (method.response) {
        const schema = schemas[method.response.$ref];

        if (schema && !_.isEmpty(schema.properties)) {
            return "gapi.client.Request<" + method.response.$ref + ">";
        } else {
            return "gapi.client.Request<{}>";
        }
    }
    else {
        return "gapi.client.Request<void>";
    }
}

function loadTemplate(name: string) {
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

function isEmptySchema(schema: gapi.client.discovery.JsonSchema) {
    return _.isEmpty(schema.properties) && !schema.additionalProperties;
}

export class App {

    private typingsDirectory: string;

    constructor(private base = __dirname + "/../out/") {
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



    static parseVersion(version: string) {
        var major, minor, patch;
        var match = version.match(/v(\d+)?(?:\.(\d+))?(.*)?/);

        if (match) {
            major = match[1] || 0;
            minor = match[2];
            patch = match[3];

            return `${major}${minor ? "." + minor : ""}${patch ? "-" + patch : ""}`;
        }
    }

    private getResourceTypeName(resourceName: string) {
        return resourceName[0].toUpperCase() + resourceName.substring(1) + "Resource";
    }

    // writes specified resource definition
    private writeResources(out: TypescriptTextWriter, resources: Record<string, gapi.client.discovery.RestResource>, parameters: Record<string, gapi.client.discovery.JsonSchema> = {}, schemas: Record<string, gapi.client.discovery.JsonSchema>) {

        _.forEach(resources, (resource, resourceName) => {

            var resourceInterfaceName = this.getResourceTypeName(resourceName);

            this.writeResources(out, resource.resources, parameters, schemas);

            out.interface(resourceInterfaceName, () => {

                _.forEach(resource.methods, (method, name) => {
                    out.comment(formatComment(method.description));
                    out.method(getName(method.id), [{
                        parameter: "request",
                        type: (writer: TypescriptTextWriter) => {
                            writer.anonymysType(() => {
                                const requestParameters = { ...parameters, ...method.parameters };

                                _.forEach(requestParameters, (data, key) => {
                                    writer.comment(formatComment(data.description));
                                    writer.property(key, getType(data, schemas), data.required || false);
                                });
                            });
                        }

                    }], getMethodReturn(method, schemas));

                    out.writeLine();
                });

                _.forEach(resource.resources, (childResource, childResourceName) => {
                    var childResourceInterfaceName = childResourceName[0].toUpperCase() + childResourceName.substring(1) + "Resource";
                    out.property(childResourceName, childResourceInterfaceName);
                });

            });

        });
    }

    private getTypingsUrl(api: string, version: string) {
        return `https://github.com/bolisov/typings-gapi/typings/${this.getTypingsName(api, version)}`;
    }

    private getTypingsName(api: string, version: string) {
        if (version == null)
            return `gapi.client.${api}`;
        else
            return `gapi.client.${api}/v${version}`;
    }

    private getTypingsDirectory(api: string, version: string) {
        return `${this.typingsDirectory}/${this.getTypingsName(api, version)}`;
    }

    /// writes api description for specified JSON object
    private processApi(api: gapi.client.discovery.RestDescription, actualVersion: boolean, url: string) {

        console.log(`Generating ${api.id} definitions...`);

        api.name = api.name.toLocaleLowerCase();
        api.version = api.version.toLocaleLowerCase();

        var destinationDirectory = this.getTypingsDirectory(api.name, api.version);

        if (!fs.existsSync(destinationDirectory)) {
            fs.mkdirSync(destinationDirectory);
        }

        const rawMethods = processResource(api);

        const methods = rawMethods.map((x: any) => ({
            namespace: getNamespace(x.id),
            name: getName(x.id),
            method: x
        })),
            grouped = _.groupBy(methods, method => method.namespace),
            filename = "index.d.ts",//"gapi.client." + api.name + (actualVersion ? "" : "-" + api.version) + ".d.ts",
            stream = fs.createWriteStream(path.join(destinationDirectory, filename)),
            writer = new TypescriptTextWriter(new IndentedTextWriter(new StreamWriter(stream))),
            rootNamespace = `gapi.client.${api.name}`;

        writer.comment(`Type definitions for ${api.ownerName} ${api.title} ${api.version} ${convertVersion(api.version)}`);
        writer.comment(`Project: ${api.documentationLink}`);
        writer.comment(`Definitions by: Bolisov Alexey <https://github.com/Bolisov>`);
        writer.comment(`Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped`);
        writer.comment(`TypeScript Version: 2.3`);
        writer.writeLine();
        writer.comment(`IMPORTANT. 
This file was generated by https://github.com/Bolisov/google-api-typings-generator. Please do not edit it manually.
In case of any problems please post issue to https://github.com/Bolisov/google-api-typings-generator`);
        writer.comment(`Generated from: ${url}`)
        writer.writeLine();
        writer.referenceTypes("gapi.client");

        // write main namespace
        writer.declareNamespace(rootNamespace, () => {
            _.forEach(api.schemas, (schema, key) => {

                if (!isEmptySchema(schema)) {
                    writer.interface(schema.id, () => {
                        _.forEach(schema.properties, (data, key) => {
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

            _.forEach(api.resources, (resource, resourceName) => {
                if (resourceName !== "debugger") {
                    writer.writeLine(`const ${resourceName}: ${rootNamespace}.${this.getResourceTypeName(resourceName)}; `);
                    writer.writeLine();
                }
            });
        });

        writer.end();

        return api;
    }

    private request(url: string) {
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

    public writeTemplate(name: string, template: (data: any) => string, api: gapi.client.discovery.RestDescription) {
        var destinationDirectory = this.getTypingsDirectory(api.name, api.version),
            filepath = path.join(destinationDirectory, name);

        //if (!fs.existsSync(filepath)) {
        var stream = fs.createWriteStream(filepath),
            writer = new StreamWriter(stream);

        try {
            writer.write(template({ ...api, formatPropertyName }));
        }
        finally {
            writer.end();
        }
        //}
    }

    public writeReadme(api: gapi.client.discovery.RestDescription) {
        var destinationDirectory = this.getTypingsDirectory(api.name, api.version),
            stream = fs.createWriteStream(destinationDirectory + "/readme.md"),
            writer = new StreamWriter(stream);

        try {
            writer.write(readmeTpl(api));
        }
        finally {
            writer.end();
        }
    }

    public async processService(url: string, actualVersion: boolean) {
        const api = await this.request(url);
        const description = await this.processApi(api, actualVersion, url);

        this.writeReadme(description);
        this.writeTemplate(`tsconfig.json`, tsconfigTpl, api);
        this.writeTemplate(`tslint.json`, tslintTpl, api);
        this.writeTemplate(`gapi.client.${description.name}-${description.version}-tests.ts`, testsTpl, api);
    }

    public async discover(service: string = null, allVersions: boolean = false) {
        console.log("Discovering Google services...");

        const list: gapi.client.discovery.DirectoryList = await this.request("https://www.googleapis.com/discovery/v1/apis");

        var apis = _.filter(list.items, api => service == null || api.name === service);
        var items = _.filter(apis, api => allVersions || api.preferred);

        if (items.length === 0) {
            console.error("Can't find services");
            throw Error("Can't find services");
        }

        items.forEach(async (api) => {
            try {
                const service = await this.processService(api.discoveryRestUrl, api.preferred);
            } catch (e) {
                console.error(e);
                return false;
            }
            return true;
        });
    }
}

var params = program
    .version("0.0.1")
    .option("-u, --url [url]", "process only specific REST service definition by url")
    .option("-s, --service [name]", "process only specific REST service definition by name")
    //.option("-a, --all", "include previously versions", true)
    .option("-o, --out", "output directory")
    .parse(process.argv);

params.out = "D:\\Projects\\GitHub\\DefinitelyTyped\\types";

console.log("Output directory: " + params.out);

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