// string and number literal types are types of specific strings or numbers


const TRUE: true = true;
const FALSE: false = false;


type Season = "summer" | "autumn" | "winter" | "spring"; // string literal types

function getNextSeason(type: Season): Season {
    switch (type) {
        case "summer":
            return "autumn";
        case "autumn":
            return "winter";
        case "winter":
            return "spring";
        case "spring":
            return "summer";
    }
}

type Results<T> =
    | { success: true, value: T }
    | { success: false, error: string };

console.log(getNextSeason("autumn"))




function parseEmailAddress(
    input: string
): Results<string> {
    // If the input is null, undefined, or the empty string
    // (all of which are falsy values), we return early.
    if (!input) {
        return {
            success: false,
            error: "The email address cannot be empty."
        };
    }

    // We're only checking that the input matches the pattern
    //   <something> @ <something> DOT <something>
    // to keep it simple. Properly validating email addresses
    // via regex is hard, so let's not even try here.
    if (!/^\S+@\S+\.\S+$/.test(input)) {
        return {
            success: false,
            error: "The email address has an invalid format."
        };
    }

    // At this point, control flow based type analysis
    // has determined that the input has type string.
    // Thus, we can assign input to the value property.
    return {
        success: true,
        value: input
    };
}

const parsed = parseEmailAddress("example@example.com");

if (parsed.success) {
    parsed.value; // OK
    parsed.error; // Error
} else {
    parsed.value; // Error
    parsed.error; // OK
}

let zeroOrOne: 0 | 1;

zeroOrOne = 1;
zeroOrOne = 0;
zeroOrOne = 2;

const enum HttpPort {
    Http = 80,
    Https = 443
}

