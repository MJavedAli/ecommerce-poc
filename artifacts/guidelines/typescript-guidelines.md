## Typescript Standards

#### Method and Variable Names

- Use camelCase for type names.
- Do not use "I" as a prefix for interface names.
- Use pascalCase for enum values.
- Use camelCase for function names.
- Use camelCase for property names and local variables.
- Use whole words in names when possible.

#### Classes

- Use PascalCase for class names.
- Use camelCase of class members and methods
- Write one class per file.

#### Typings

- Each variable declared should be strongly typed.
- Do not use 'any', use a new type to be assigned to the value
- Do not set the type of initialized variables which type is inferred for its value
- Do not set the type of parameters with a default value which type is inferred for its value

#### Style

- Use arrow functions over anonymous function expressions.
- Only surround arrow function parameters when necessary.

For example, (x) => x + x is wrong but the following are correct:
x => x + x
(x,y) => x + y
<T>(x: T, y: T) => x === y

- Always surround loop and conditional bodies with curly braces. Statements on the same line are allowed to omit braces.
- Open curly braces always go on the same line as whatever necessitates them.
- Parenthesized constructs should have no surrounding white space.

- Use 4 spaces per indentation.
