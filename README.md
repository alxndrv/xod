### What is this?

This codebase is heavily inspired by https://github.com/colinhacks/zod, a TS library which allows users to define data structure schemas, parsers and TS types in a elegant and concise way. After seeing `zod`'s API, I was intrigued by its ability to infer types based on the schema definition and sought to replicate it. This is that replica. The parsing is extremely basic and error-prone, and many "common" schema definitions are missing. But this was made to prove a point: infering a TS type from a dynamically constructed schema.  
  
In other words: *don't use this, I just wanted to see how it's done*
