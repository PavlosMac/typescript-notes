// Assertions functions throw an error if something bad happens
// RESUABLE assertNonNullable function
// As of typescript 3.7

// const root = document.getElementById("root");
// // Type: HTMLElement | null
// root;

// if (root === null) {
//     throw Error("Unable to find DOM element #root");
// }

// // Type: HTMLElement
// root;

// root?.addEventListener("click", e => {
//     console.log(e)
// });

// valid control analysis ^^

// Using an assertion function


function assertNotNullish(value: unknown, message: string) {
    if (value === null || value === undefined) {
        throw Error(message);
    }
}

const root = document.getElementById("root");
assertNotNullish(root, "Unable to find DOM #root"); // TS does not understand that an error will be thrown

// 'Object is possible null'
root.addEventListener("click", e => {
    //
})

// solution?
// tell typscript about the error using 'assertion function'

function assertNotNullishWithAssertion<TValue>(value: TValue, message: string): asserts value is NonNullable<TValue> {
    if (value === null || value === undefined) {
        throw Error(message);
    }
}

// now null or undefined are removed from root as possible types
assertNotNullishWithAssertion(root, "With good assertion signature");

// Type: HTMLElement
root;

root.addEventListener("click", e => {
    // no ts error anymore
});

// type NonNullable<T> = T extends null | undefined ? never : T;

// When applied to T, NonNullable<T> removes null and undefined from T