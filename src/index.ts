import * as X from "./lib";

// Examples
const stringSchema = X.str();

const parseResult = stringSchema.parse("Please parse me");
console.log(`String parse result: ${JSON.stringify(parseResult)}`);

// vv StringType = string vv
type StringType = X.Infer<typeof stringSchema>;

const objSchema = X.obj({
  value: X.num(),
  text: X.str(),
  nested: X.obj({
    nestedText: X.str(),
  }),
});

// vv This correctly infers the complex object type from above vv
type ObjectType = X.Infer<typeof objSchema>;

const objResult = objSchema.parse({ value: 5, text: "some text", nested: {} });

console.log(`Object parse result: ${JSON.stringify(objResult)}`);

const arraySchema = X.arr(X.str());

const arrResult = arraySchema.parse(["text_1", 1, "text_2"]);
console.log(`Array parse result: ${JSON.stringify(arrResult)}`);

// vv ArrayType = string[] vv
type ArrayType = X.Infer<typeof arraySchema>;
