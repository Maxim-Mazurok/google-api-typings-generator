import * as program from 'commander';
import * as request from 'request';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as doT from 'dot';
import * as path from 'path';

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

const excludedApi = ["replicapool", "replicapoolupdater"];

const irregylarSpaces = [
    /\u000B/g,// Line Tabulation (\v) - <VT>
    /\u000C/g,// Form Feed (\f) - <FF>
    /\u00A0/g,// No-Break Space - <NBSP>
    /\u0085/g,// Next Line
    /\u1680/g,// Ogham Space Mark
    /\u180E/g,// Mongolian Vowel Separator - <MVS>
    /\ufeff/g,// Zero Width No-Break Space - <BOM>
    /\u2000/g,// En Quad
    /\u2001/g,// Em Quad
    /\u2002/g,// En Space - <ENSP>
    /\u2003/g,// Em Space - <EMSP>
    /\u2004/g,// Tree-Per-Em
    /\u2005/g,// Four-Per-Em
    /\u2006/g,// Six-Per-Em
    /\u2007/g,// Figure Space
    /\u2008/g,// Punctuation Space - <PUNCSP>
    /\u2009/g,// Thin Space
    /\u200A/g,// Hair Space
    /\u200B/g,// Zero Width Space - <ZWSP>
    /\u2028/g,// Line Separator
    /\u2029/g,// Paragraph Separator
    /\u202F/g,// Narrow No-Break Space
    /\u205f/g,// Medium Mathematical Space
    /\u3000/g,// Ideographic Space
];

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

type TypescriptWriterCallback = (writer: TypescriptTextWriter) => void;

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

function ensureDirectoryExists(directory: string) {
    if (!fs.existsSync(directory)) {
        ensureDirectoryExists(path.dirname(directory));
        fs.mkdirSync(directory);
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
        // this.writer.writeLine();
        this.braces(`interface ${name}`, context);
    }

    public anonymysType(context: TypescriptWriterCallback) {
        this.endLine("{");
        this.writer.indent++;
        context(this);
        this.writer.indent--;
        this.writer.startIndentedLine("}");
    }

    public newLine(chunk: string) {
        this.writer.startIndentedLine(chunk);
    }

    public endLine(chunk = "") {
        this.writer.write(chunk);
        this.writer.write(this.writer.newLine);
    }

    public scope(context: TypescriptWriterCallback, startTag = "{", endTag = "}") {
        this.writer.write(startTag);
        this.writer.write(this.writer.newLine);
        this.writer.indent++;
        context(this);
        this.writer.indent--;
        this.writer.startIndentedLine(endTag);
    }

    public property(name: string, type: string | TypescriptWriterCallback, required = true) {
        if (typeof type === 'function') {
            this.writer.startIndentedLine(`${formatPropertyName(name)}${required ? "" : "?"}: `);
            type(this);
            this.endLine(";");
        }
        else if (typeof type === 'string') {
            this.writer.writeLine(`${formatPropertyName(name)}${required ? "" : "?"}: ${type};`);
        }

    }

    public comment(text: string = "") {
        if (!text || text === "") {
            return;
        }

        const maxLine = 150;

        let lines = [];

        for (var line of text.trim().split(/\r\n|\r|\n|\u000a\u000d|\u000a|\u000d|\u240a/g)) {
            if (line.length > maxLine) {
                const words = line.split(' ');
                let newLine = "";

                for (const word of words) {
                    if (newLine.length + word.length > maxLine) {
                        lines.push(newLine);
                        newLine = word;
                    } else if (newLine === "") {
                        newLine = word;
                    } else {
                        newLine += (" " + word);
                    }
                }

                lines.push(newLine);
            } else {
                lines.push(line);
            }
        }

        lines = lines.map(x => x.replace(/\*/g, "&#42;").trim());

        for (var irregularSpace of irregylarSpaces) {
            lines = lines.map(line => line.replace(irregularSpace, " "));
        }

        if (lines.length == 1) {
            this.writer.writeLine(`/** ${lines[0]} */`);
        } else if (lines.length > 1) {
            this.writer.writeLine(`/**`);
            _.forEach(lines, line => line ? this.writer.writeLine(` * ${line}`) : this.writer.writeLine(` *`));
            this.writer.writeLine(` */`);
        }
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

        this.endLine();
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
                forEachOrdered(type.properties, (property, propertyName) => {
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
        const tsType = typesMap[type.type] || type.type;
        return type.repeated ? `${tsType} | ${tsType}[]` : tsType;
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

function getMethodReturn(method: gapi.client.discovery.RestMethod, schemas: Record<string, gapi.client.discovery.JsonSchema>) {

    const name = schemas["Request"] ? "client.Request" : "Request";

    if (method.response) {
        const schema = schemas[method.response.$ref];

        if (schema && !_.isEmpty(schema.properties)) {
            return `${name}<${method.response.$ref}>`;
        } else {
            return `${name}<{}>`;
        }
    }
    else {
        return `${name}<void>`;
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

function forEachOrdered<T>(record: Record<string, T>, iterator: (value: T, key: string, index: number) => void) {
    const keys = _.keys(record).sort((a, b) => a > b ? 1 : -1);
    let index = 0;
    for (const key of keys) {
        iterator(record[key], key, index++);
    }
}

function sortKeys<T>(record: Record<string, T>): Record<string, T> {
    return _.map(record, (resource, resourceKey) => ({ resource, resourceKey }))
        .sort(({ resourceKey: a }, { resourceKey: b }) => a > b ? 1 : -1)
        .reduce((curr, { resource, resourceKey }) => ({ ...curr, [resourceKey]: resource }), {})
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

        forEachOrdered(resources, (resource, resourceName) => {

            var resourceInterfaceName = this.getResourceTypeName(resourceName);

            this.writeResources(out, resource.resources, parameters, schemas);

            out.interface(resourceInterfaceName, () => {

                forEachOrdered(resource.methods, (method, name) => {
                    out.comment(formatComment(method.description));
                    out.method(getName(method.id), [{
                        parameter: "request",
                        type: (writer: TypescriptTextWriter) => {
                            writer.anonymysType(() => {
                                const requestParameters = { ...parameters, ...method.parameters };

                                forEachOrdered(requestParameters, (data, key) => {
                                    writer.comment(formatComment(data.description));
                                    writer.property(key, getType(data, schemas), data.required || false);
                                });
                            });
                        }

                    }], getMethodReturn(method, schemas));
                });

                forEachOrdered(resource.resources, (childResource, childResourceName) => {
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
            return path.join(`gapi.client.${api}`, version);
    }

    private getTypingsDirectory(api: string, version: string) {
        return path.join(this.typingsDirectory, this.getTypingsName(api, version));
    }

    /// writes api description for specified JSON object
    private processApi(destinationDirectory: string, api: gapi.client.discovery.RestDescription, actualVersion: boolean, url: string) {

        console.log(`Generating ${api.id} definitions... ${api.labels && api.labels.join(", ") || ""}`);

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

            writer.endLine();



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

                forEachOrdered(api.resources, (resource, resourceName) => {
                    if (resourceName !== "debugger") {
                        writer.endLine();
                        writer.writeLine(`const ${resourceName}: ${this.getResourceTypeName(resourceName)};`);
                    }
                });
            });

        });

        writer.end();
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

    public writeTemplate(filepath: string, template: (data: any) => string, api: gapi.client.discovery.RestDescription) {
        var stream = fs.createWriteStream(filepath),
            writer = new StreamWriter(stream);

        try {
            writer.write(template({ ...api, formatPropertyName }));
        }
        finally {
            writer.end();
        }
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
        const api = await this.request(url) as gapi.client.discovery.RestDescription;

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

        await this.processApi(destinationDirectory, api, actualVersion, url);

        const templateData = { ...api, actualVersion };

        this.writeTemplate(path.join(destinationDirectory, 'readme.md'), readmeTpl, templateData);
        this.writeTemplate(path.join(destinationDirectory, `tsconfig.json`), tsconfigTpl, templateData);
        this.writeTemplate(path.join(destinationDirectory, `tslint.json`), tslintTpl, templateData);
        // this.writeTemplate(path.join(destinationDirectory, `gapi.client.${api.name}-tests.ts`), testsTpl, templateData);

        this.writeTests(destinationDirectory, api, actualVersion, url);
    }

    private writeTests(destinationDirectory: string, api: gapi.client.discovery.RestDescription, actualVersion: boolean, url: string) {
        const stream = fs.createWriteStream(path.join(destinationDirectory, `gapi.client.${api.name}-tests.ts`)),
            writer = new TypescriptTextWriter(new IndentedTextWriter(new StreamWriter(stream)));

        writer.write(`/* This is stub file for gapi.client.{{=it.name}} definition tests */
/* IMPORTANT.
* This file was automatically generated by https://github.com/Bolisov/google-api-typings-generator. Please do not edit it manually.
* In case of any problems please post issue to https://github.com/Bolisov/google-api-typings-generator
**/`);

        writer.writeLine();
        writer.newLine("gapi.load('client', () => ");
        writer.scope((writer3) => {
            writer3.comment("now we can use gapi.client");
            writer3.newLine(`gapi.client.load('${api.name}', '${api.version}', () => `);
            writer3.scope((writer2) => {
                writer3.comment(`now we can use gapi.client.${api.name}`);
                writer3.endLine();
                if (api.auth) {
                    writer3.comment(`don't forget to authenticate your client before sending any request to resources:`);
                    writer3.comment(`declare client_id registered in Google Developers Console`);

                    writer3.writeLine(`const client_id = '<<PUT YOUR CLIENT ID HERE>>';`);
                    writer3.newLine(`const scope = `);
                    writer3.scope((scope) => {
                        for (var a in api.auth.oauth2.scopes) {
                            writer3.comment(api.auth.oauth2.scopes[a].description);
                            writer3.writeLine(`'${a}',`);
                        }
                    }, "[", "]");

                    writer3.endLine(';');
                    writer3.writeLine(`const immediate = true;`)
                    writer3.newLine(`gapi.auth.authorize({ client_id, scope, immediate }, authResult => `);

                    writer3.scope((scope) => {
                        writer3.newLine(`if (authResult && !authResult.error) `);
                        scope.scope((a) => {
                            a.comment(`handle succesfull authorization`);
                            a.writeLine(`run();`);
                        });
                        scope.write(` else `);
                        scope.scope(() => {
                            scope.comment(`handle authorization error`);
                        });
                        writer3.endLine();
                    });

                    writer3.endLine(");");
                }

                writer3.writeLine(`run();`);
            });

            writer3.endLine(");");
            writer3.endLine();
            writer3.newLine(`async function run() `);
            writer.scope((scope) => {
                for (const resourceName in api.resources) {
                    for (const methodName in api.resources[resourceName].methods) {
                        scope.comment(api.resources[resourceName].methods[methodName].description);
                        scope.newLine(`await gapi.client.${api.name}.${resourceName}.${methodName}(`);
                        scope.scope(() => {
                            forEachOrdered(api.resources[resourceName].methods[methodName].parameters, (parameter, name, index) => {
                                scope.newLine(`${formatPropertyName(name)}: `);

                                switch (parameter.type) {
                                    case "number":
                                    case "integer": {
                                        scope.write((index + 1).toString(10));
                                        break;
                                    }
                                    case "boolean": {
                                        scope.write("true");
                                        break;
                                    }
                                    default: {
                                        scope.write(`"${name}"`);
                                    }
                                }
                                scope.endLine(`,`);
                            });
                        });
                        scope.endLine(`);`);
                    }
                }
            });

            writer3.endLine();
        });
        writer.endLine(");");
    }

    public async discover(service: string = null, allVersions: boolean = false) {
        console.log("Discovering Google services...");

        const list: gapi.client.discovery.DirectoryList = await this.request("https://www.googleapis.com/discovery/v1/apis");

        const apis = _.filter(list.items, api => service == null || api.name === service)
            .filter(api => excludedApi.indexOf(api.name) < 0);


        if (apis.length === 0) {
            console.error("Can't find services");
            throw Error("Can't find services");
        }

        const apisLookup = _.groupBy(apis, item => item.name);

        for (const apiKey in apisLookup) {

            const associatedApis = apisLookup[apiKey];

            const preferedApi = associatedApis.find(x => x.preferred)
                || associatedApis.sort((a, b) => a.version > b.version ? 1 : - 1)[0];

            if (preferedApi) {
                await this.processService(preferedApi.discoveryRestUrl, preferedApi.preferred);
            } else {
                console.warn(`Can't find prefered API for ${apiKey}`);
            }

            if (allVersions) {
                for (const api of associatedApis.filter(x => x != preferedApi)) {
                    try {
                        const service = await this.processService(api.discoveryRestUrl, api.preferred);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }
    }
}

function parseOutPath(dir: string) {
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
