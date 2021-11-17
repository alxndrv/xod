export type Schema<T> = {
  //schemaType: T;
  parse(input: any): T;
};

// Primitive types
export type PrimitiveSchema = Schema<number | string | boolean>;

export function str(): Schema<string> {
  return {
    parse: (input) => String(input), // No real error handling
  };
}

export function num(): Schema<number> {
  return {
    parse: (input) => Number(input), // No real error handling
  };
}

export function bool(): Schema<boolean> {
  return {
    parse: (input) => Boolean(input), // No real error handling
  };
}

// Recursive types (yikes)
export type ObjectSchemaInput<T extends {}> = {
  [K in keyof T]: Schema<T[K]>;
};

export function obj<T extends {}>(source: ObjectSchemaInput<T>): Schema<T> {
  return {
    parse: (input) => {
      let result: any = {};

      for (const key in source) {
        result[key] = source[key].parse(input[key]);
      }

      return result;
    },
  };
}

export function arr<T>(elemSchema: Schema<T>): Schema<T[]> {
  return {
    parse: (input) => Array.from(input).map((el) => elemSchema.parse(el)),
  };
}

export type Infer<T> = T extends Schema<infer U> ? U : never;
