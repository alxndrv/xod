type Schema<T> = {
  //schemaType: T;
  parse(input: any): T;
};

// Primitive types
type PrimitiveSchema = Schema<number | string | boolean>;

function str(): Schema<string> {
  return {
    parse: (input) => String(input), // No real error handling
  };
}

function num(): Schema<number> {
  return {
    parse: (input) => Number(input), // No real error handling
  };
}

function bool(): Schema<boolean> {
  return {
    parse: (input) => Boolean(input), // No real error handling
  };
}

// Recursive types (yikes)

type ObjectSchemaInput<T extends {}> = {
  [K in keyof T]: Schema<T[K]>;
};

function obj<T extends {}>(source: ObjectSchemaInput<T>): Schema<T> {
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

type Infer<T> = T extends Schema<infer U> ? U : never;

// Examples
const stringSchema = str();
const numSchema = num();

const parseResult = stringSchema.parse("ignored_input");
console.log(`Parsed result: ${parseResult}`);

// vv StringType = string vv
type StringType = Infer<typeof stringSchema>;

const objSchema = obj({
  value: num(),
  text: str(),
  nested: obj({
    nestedText: str(),
  }),
});

// vv This correctly infers the complex object type from above vv
type ObjectType = Infer<typeof objSchema>;

const objResult = objSchema.parse({ value: 5, text: "asdasdasd", nested: {} });

console.log(`Object parse result: ${JSON.stringify(objResult)}`);
