/// <reference path="../typings/main.d.ts" />

import * as program from 'commander';
import * as request from 'request';
import * as fs from 'fs';
import * as _ from "lodash";
import * as Promise from 'promise';

var typesMap = {
    "integer": "number",
    "object": "any"
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

    public reference(path: string) {
        this.writer.writeLine(`/// <reference path="${path}" />`);
    }

    public namespace(name: string, context: TypescriptWriterCallback) {
        this.writer.writeLine();
        this.braces(`namespace ${name}`, context);
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
            this.writer.startIndentedLine(`${name}${required ? "" : "?"}: `);
            type(this);
            this.writer.write(",");
            this.writer.writeLine();
        }
        else if (typeof type === 'string') {
            this.writer.writeLine(`${name}${required ? "" : "?"}: ${type},`);
        }

    }

    public comment(text: string = "") {
        var lines = text.split(/\r\n|\r|\n|\u000a\u000d|\u000a|\u000d|\u240a/g);
        _.forEach(lines, line => this.writer.writeLine(`// ${line}`));
    }

    public method(name: string, parameters: [{ parameter: string, type: string }], returnType: string) {
        this.writer.writeLine(`${name}(${parameters.map(p => p.parameter + ": " + p.type).join(", ")}): ${returnType};`);
    }

    public writeLine(chunk = "") {
        this.writer.writeLine(chunk);
    }

    public write(chunk = "") {
        this.writer.write(chunk);
    }

    public end() {
        this.writer.end();
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

function getMethodParameterInterfaceName(resource, method: gapi.discovery.description.Method) {
    return firstLetterUp(resource) + firstLetterUp(getName(method.id)) + "Request";
}

function getType(type: any): string | TypescriptWriterCallback {
    if (type.type === "array") {
        return (writer: TypescriptTextWriter) => {
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
        return (writer: TypescriptTextWriter) => {
            writer.anonymysType(() =>
                _.forEach(type.properties, (data: any, key) => {
                    writer.comment(formatComment(data.description));
                    writer.property(key, getType(data), data.required || false);
                }));
        }
    }
    else if (type.type) {
        return typesMap[type.type] || type.type;
    }
    else if (type.$ref) {
        return type.$ref;
    }
    else throw Error();
}

function formatComment(comment: string) {
    if (!comment) return "";

    return comment;
}

function getMethodReturn(method: gapi.discovery.description.Method) {

    if (method.response) {
        return "PromiseLike<ApiResult<" + method.response.$ref + ">>";
    }
    else {
        return "PromiseLike<void>";
    }
}

export class App {

    private typingsDirectory: string;

    constructor(private base = __dirname + "/../out/") {
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

    static parseVersion(version: string) {
        var major, minor, patch;
        var match = version.match(/v(\d+)(?:\.(\d+))?(.*)?/);

        if (match) {
            major = match[1];
            minor = match[2];
            patch = match[3];

            return `${major}${minor ? "." + minor : ""}${patch ? "-" + patch : ""}`;
        }

    }

    // writes specified resource definition
    private writeResources(out: TypescriptTextWriter, resources: gapi.discovery.description.Resources) {

        _.forEach(resources, (resource: gapi.discovery.description.Resource, resourceName: string) => {

            var resourceInterfaceName = resourceName[0].toUpperCase() + resourceName.substring(1) + "Resource";

            this.writeResources(out, resource.resources);

            _.forEach(resource.methods, (method: gapi.discovery.description.Method, name: string) => {
                out.interface(getMethodParameterInterfaceName(resourceName, method), () => {
                    _.forEach(method.parameters, (parameter: gapi.discovery.description.Parameter, key) => {
                        out.comment(formatComment(parameter.description));
                        out.property(key, typesMap[parameter.type] || parameter.type, parameter.required || false);
                    });
                });
            });

            out.interface(resourceInterfaceName, () => {

                _.forEach(resource.methods, (method: gapi.discovery.description.Method, name: string) => {
                    out.comment(formatComment(method.description));
                    out.method(getName(method.id), [{ parameter: "request", type: getMethodParameterInterfaceName(resourceName, method) }], getMethodReturn(method));
                });

                _.forEach(resource.resources, (childResource: gapi.discovery.description.Resource, childResourceName: string) => {
                    var childResourceInterfaceName = childResourceName[0].toUpperCase() + childResourceName.substring(1) + "Resource";
                    out.property(childResourceName, childResourceInterfaceName);
                });

            });

            out.writeLine();

            out.writeLine(`var ${resourceName}: ${resourceInterfaceName}; `);
            out.writeLine();
        });
    }

    /// writes api description for specified JSON object
    private processApi(api: gapi.discovery.description.Api, actualVersion: boolean) {

        console.log(`Generating ${api.id} definitions...`);

        var destinationDirectory = `${this.typingsDirectory}/${api.name}-${api.version}`;

        if (!fs.existsSync(destinationDirectory)) {
            fs.mkdirSync(destinationDirectory);
        }

        var methods = _(processResource(api)).flatten(true).map((x: any) => {
            return {
                namespace: getNamespace(x.id),
                name: getName(x.id),
                method: x
            }
        }).value(),
            grouped = _.groupBy(methods, method => method.namespace),
            filename = api.name + (actualVersion ? "" : "-" + api.version) + ".d.ts",
            stream = fs.createWriteStream(destinationDirectory + "/" + filename),
            writer = new TypescriptTextWriter(new IndentedTextWriter(new StreamWriter(stream)));

        writer.reference("gapi.d.ts");

        writer.declareNamespace("gapi", () => {
            writer.namespace("client", () => {

                _.forEach(api.schemas, (schema: gapi.discovery.description.Schema, key) => {
                    writer.interface(schema.id, () => {
                        _.forEach(schema.properties, (data: any, key) => {
                            writer.comment(formatComment(data.description));
                            writer.property(key, getType(data), data.required || false);
                        })
                    })
                });

                this.writeResources(writer, api.resources);
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

    private filterServices(apis: gapi.discovery.directory.Api[], service: string, allVersions: boolean) {
        apis = _.filter(apis, api => service == null || api.name === service);
        apis = _.filter(apis, (api: gapi.discovery.directory.Api) => allVersions || api.preferred);
        return apis;
    }

    public processService(url: string, actualVersion: boolean) {
        return this
            .request(url)
            .then((api: gapi.discovery.description.Api) => this.processApi(api, actualVersion))
    }

    public discover(service: string = null, allVersions: boolean = false) {
        console.log("Discovering Google services...");
        let services: gapi.discovery.directory.Api[] = null;

        return this
            .request("https://www.googleapis.com/discovery/v1/apis")
            .then((apis: gapi.discovery.directory.Apis) => this.filterServices(apis.items, service, allVersions))
            .then(items => {
                services = items;
                if (items.length === 0) {
                    console.error("Can't find services");
                    throw Error("Can't find services");
                } else {
                    return items.reduce((cur, api: any) => cur.then(() => this.processService(api.discoveryRestUrl, api.preferred)), Promise.resolve(null));
                }
            })
            .then(() => {

                _.forEach(
                    _.groupBy(services, service => service.name),
                    (versions, service) => {

                        var typingsStream = fs.createWriteStream(`${this.typingsDirectory}/${service}.json`),
                            v = _.reduce(versions, (current, api) => {
                                current[App.parseVersion(api.version)] = `https://github.com/bolisov/typings-gapi/${api.name}-${api.version}`;
                                return current;
                            }, {});

                        typingsStream.write(JSON.stringify({
                            "versions": v
                        }));

                        typingsStream.end();
                    });
            });
    }
}

var params: any = program
    .version("0.0.1")
    .allowUnknownOption(false)
    .option("-u, --url [url]", "process only specific REST service definition by url")
    .option("-s, --service [name]", "process only specific REST service definition by name")
    //.option("-a, --all", "include previously versions", true)
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