export interface ApiPropertyOptions {
    type?: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | any;
    description?: string;
    example?: any;
    required?: boolean;
    enum?: any[];
    format?: string;
    items?: any;
    nullable?: boolean;
    default?: any;
    $ref?: string;
}

export interface ApiOperationParameter {
    name: string;
    in: 'path' | 'query' | 'header' | 'cookie';
    required?: boolean;
    description?: string;
    schema?: any;
    example?: any;
}

export interface ApiOperationResponse {
    description: string;
    schema?: any;
    items?: any;
    content?: Record<string, { schema: any; example?: any }>;
}

export interface ApiOperationOptions {
    path: string | string[];
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    summary?: string;
    description?: string;
    tags?: string[];
    parameters?: ApiOperationParameter[];
    requestBody?: {
        required?: boolean;
        description?: string;
        schema?: any;
        content?: Record<string, { schema: any; example?: any }>;
    };
    responses?: Record<string, ApiOperationResponse>;
}

export function resolveSchemaRef(schema: any): any {
    if (!schema) return undefined;
    if (typeof schema === 'string') {
        if (schema.startsWith('#/')) {
            return { $ref: schema };
        }
        return { $ref: `#/components/schemas/${schema}` };
    }
    if (typeof schema === 'function') {
        const schemaName = (schema as any).__apiSchemaName || schema.name;
        return { $ref: `#/components/schemas/${schemaName}` };
    }
    if (typeof schema === 'object') {
        return schema;
    }
    return schema;
}

class SwaggerRegistry {
    private schemas = new Map<string, { target: Function; description?: string }>();
    private propertyMetadata = new Map<Function, Map<string, ApiPropertyOptions>>();
    private classTags = new Map<Function, string>();
    private operations: Array<{ target: any; propertyKey: string; options: ApiOperationOptions }> = [];
    private tagDescriptions = new Map<string, string>();

    public registerProperty(target: any, propertyKey: string, options: ApiPropertyOptions) {
        const constructor = typeof target === 'function' ? target : target.constructor;
        if (!this.propertyMetadata.has(constructor)) {
            this.propertyMetadata.set(constructor, new Map());
        }
        this.propertyMetadata.get(constructor)!.set(propertyKey, options);
    }

    public registerSchema(name: string, target: Function, description?: string) {
        this.schemas.set(name, { target, description });
    }

    public registerClassTag(target: Function, tagName: string, tagDescription?: string) {
        this.classTags.set(target, tagName);
        if (tagDescription && !this.tagDescriptions.has(tagName)) {
            this.tagDescriptions.set(tagName, tagDescription);
        }
    }

    public registerOperation(target: any, propertyKey: string, options: ApiOperationOptions) {
        this.operations.push({ target, propertyKey, options });
    }

    public buildDocument(baseDoc: any = {}): any {
        const doc = {
            openapi: baseDoc.openapi || '3.0.0',
            info: baseDoc.info || { title: 'API Documentation', version: '1.0.0' },
            servers: baseDoc.servers || [{ url: '/' }],
            tags: baseDoc.tags ? [...baseDoc.tags] : [],
            paths: { ...(baseDoc.paths || {}) },
            components: {
                ...(baseDoc.components || {}),
                schemas: { ...(baseDoc.components?.schemas || {}) },
            },
        };

        // Merge tags
        this.tagDescriptions.forEach((description, name) => {
            if (!doc.tags.some((t: any) => t.name === name)) {
                doc.tags.push({ name, description });
            }
        });

        // Build schemas
        this.schemas.forEach(({ target, description }, schemaName) => {
            const propsMap = this.propertyMetadata.get(target) || new Map<string, ApiPropertyOptions>();
            const properties: Record<string, any> = {};
            const required: string[] = [];

            propsMap.forEach((opts, propName) => {
                if (opts.required) {
                    required.push(propName);
                }

                const propDef: Record<string, any> = {};
                if (opts.$ref) {
                    propDef.$ref = opts.$ref;
                } else {
                    if (opts.type) propDef.type = opts.type;
                    if (opts.format) propDef.format = opts.format;
                    if (opts.example !== undefined) propDef.example = opts.example;
                    if (opts.description) propDef.description = opts.description;
                    if (opts.enum) propDef.enum = opts.enum;
                    if (opts.default !== undefined) propDef.default = opts.default;
                    if (opts.nullable !== undefined) propDef.nullable = opts.nullable;
                    if (opts.items) {
                        propDef.items = resolveSchemaRef(opts.items);
                    }
                }
                properties[propName] = propDef;
            });

            doc.components.schemas[schemaName] = {
                type: 'object',
                ...(description ? { description } : {}),
                ...(required.length > 0 ? { required } : {}),
                properties,
            };
        });

        // Build operations
        this.operations.forEach(({ target, options }) => {
            const constructor = typeof target === 'function' ? target : target.constructor;
            const defaultTag = this.classTags.get(constructor);
            const tags = options.tags || (defaultTag ? [defaultTag] : undefined);

            const paths = Array.isArray(options.path) ? options.path : [options.path];

            paths.forEach((p) => {
                doc.paths[p] = doc.paths[p] || {};

                const operation: Record<string, any> = {
                    ...(tags ? { tags } : {}),
                    ...(options.summary ? { summary: options.summary } : {}),
                    ...(options.description ? { description: options.description } : {}),
                };

                if (options.parameters && options.parameters.length > 0) {
                    operation.parameters = options.parameters;
                }

                if (options.requestBody) {
                    if (options.requestBody.content) {
                        operation.requestBody = options.requestBody;
                    } else if (options.requestBody.schema) {
                        operation.requestBody = {
                            required: options.requestBody.required ?? true,
                            ...(options.requestBody.description ? { description: options.requestBody.description } : {}),
                            content: {
                                'application/json': {
                                    schema: resolveSchemaRef(options.requestBody.schema),
                                },
                            },
                        };
                    }
                }

                if (options.responses) {
                    operation.responses = {};
                    Object.entries(options.responses).forEach(([code, resp]) => {
                        if (resp.content) {
                            operation.responses[code] = resp;
                        } else if (resp.schema || resp.items) {
                            const schema = resp.items
                                ? { type: 'array', items: resolveSchemaRef(resp.items) }
                                : resolveSchemaRef(resp.schema);
                            operation.responses[code] = {
                                description: resp.description,
                                content: {
                                    'application/json': {
                                        schema,
                                    },
                                },
                            };
                        } else {
                            operation.responses[code] = {
                                description: resp.description,
                            };
                        }
                    });
                }

                doc.paths[p][options.method.toLowerCase()] = operation;
            });
        });

        return doc;
    }
}

export const swaggerRegistry = new SwaggerRegistry();

export function ApiSchema(options: { name?: string; description?: string } | string = {}) {
    return function (target: Function) {
        const name = typeof options === 'string' ? options : (options.name || target.name);
        const description = typeof options === 'object' ? options.description : undefined;
        (target as any).__apiSchemaName = name;
        swaggerRegistry.registerSchema(name, target, description);
    };
}

export function ApiProperty(options: ApiPropertyOptions = {}) {
    return function (target: any, propertyKey: string) {
        swaggerRegistry.registerProperty(target, propertyKey, options);
    };
}

export function ApiTag(name: string, description?: string) {
    return function (target: Function) {
        swaggerRegistry.registerClassTag(target, name, description);
    };
}

export function ApiOperation(options: ApiOperationOptions): any {
    return function (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor) {
        swaggerRegistry.registerOperation(target, String(propertyKey), options);
    };
}

export const ApiEndpoint = ApiOperation;
