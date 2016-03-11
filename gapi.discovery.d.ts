declare namespace gapi {

    namespace discovery {

        namespace description {
            
            interface Parameter {
                type: string,
                description: string,
                required?: boolean,
                format?: string,
                location?: string                
            }
            
            interface Parameters {
                [parameter: string]: Parameter
            }
            
            interface Auth {
                
            }
            
            interface Schema {
                id: string,      
                type: string,
                properties: Properties,   
            }
            
            interface Property {
                type: string,
                description: string,
                format?: string,
                items?: Type | Reference
            }
            
            interface Properties {
                [property: string]: Property
            }
            
            interface Type {
                type: string,
                properties: Properties,     
            }
            
            interface Reference {
                $ref: string
            }
            
            interface Schemas extends Type {
                id: string,                
                description: string,                           
            }
            
            interface Method {
                id: string,
                path: string,
                httpMethod: string,
                description: string,
                parameters: Parameters,
                parameterOrder: string[],
                scopes: string[],
                response: Reference
            }
            
            interface Methods{
                [method: string]: Method
            }
            
            interface Resource {
                methods: Methods,
                resources: Resources
            }
            
            interface Resources {
                [resource: string]: Resource
            }
            
            interface Api {
                kind: string,
                etag: string,
                discoveryVersion: string,
                id: string,
                name: string,
                canonicalName: string,
                version: string,
                revision: string,
                title: string,
                description: string,
                ownerDomain: string,
                ownerName: string,
                icons: {
                    x16: string
                    x32: string
                },
                documentationLink: string,
                protocol: string,
                baseUrl: string,
                basePath: string,
                rootUrl: string,
                servicePath: string,
                batchPath: string,
                parameters: Parameters,
                auth: Auth,
                schemas: Schemas,
                resources: Resources,
            }
        }


        namespace directory {

            interface Api {
                kind: string,
                id: string,
                name: string,
                version: string,
                title: string,
                description: string,
                discoveryRestUrl: string,
                discoveryLink: string,
                icons: { x16: string, x32: string },
                documentationLink: string,
                preferred: boolean
            }

            interface Apis {
                kind: string,
                discoveryVersion: string,
                items: Api[]
            }

        }
    }
}