let value: unknown;


value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
value = 'why';

// let value1: unknown = value; // Error
// let value2: boolean = value; // Error
// let value4: number = value; // Error
// let value5: string = value; // Error
// let val6: Record<string, string> = value; // Error
// let val7: object = value; // Error
// let val8: Function = value; // Error

console.log(value)


// with unknown type, we can narrow with type check statements
function useUnknownType(value: unknown) {
    if (typeof value === "function") {
        const functionName = value.name || "(anonymous)";
        return `[function ${functionName}]`;
    }
    if (value instanceof Date) {
        return value.toISOString;
    }
    return String(value);
}

// also using type guard functions
// 

function isValueArray(value: unknown): value is number[] {
    return (Array.isArray(value) && value.every(element => typeof element === 'number'));
}

const unknownValue: unknown = [15, 23, 8, 4, 42, 16];

if (isValueArray(unknownValue)) {
    const max = Math.max(...unknownValue);
    console.log(max);
}

// [ Type assertions ]

const valueTypeAssertion: unknown = "Hello world";
const someString: string = valueTypeAssertion as string; // type assertion
const biggerString: string = someString.toUpperCase();

console.log(biggerString)



// [ Union types ]

type UnionType1 = unknown | null; // unknown
type UnionType2 = unknown | undefined; // unknown
type UnionType3 = unknown | string; // unknown
type Uni4 = unknown | number[]; // unknown

console.log()
function testConstituent(typE: UnionType3) {
    if (typeof typE === "string") {
        console.log('not unknown type');
    }
}

testConstituent("string" as unknown) // still caught by type guard


// [ Intersection types ]
// in intersection types, every type absorbs unknown

type IntersectionType1 = unknown & null; // null
type IntersectionType2 = unknown & undefined; // undefined
type IntersectionType3 = unknown & string; // string
type IntersectionType4 = unknown & number[]; // number[]
type IntersectionType5 = unknown & any; // any


// READING JSON FROM LOCALSTORAGE
// using tagged union type
type Result =
    | { success: true, value: unknown }
    | { success: false, error: Error };

function tryDeserializeLocalStorageValue(key: string): Result {
    const item = localStorage.getItem(key);

    if (item === null) {
        return { success: false, error: new Error(`Item with key ${key} does not exist`) };
    }

    let value: unknown;

    try {
        value = JSON.parse(item);
    }
    catch (error) {
        return { success: false, error };
    }
    return { success: true, value }
}