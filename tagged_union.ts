// tagged union types, or sum types or discriminated types
interface Cash {
    kind: "cash" // string literal type | discriminant property
}

interface PayPal {
    kind: "paypal"; // string literal type | discriminant property
    email: string;
}

interface CreditCard {
    kind: "credit"; // string literal type | discriminant property
    cardNumber: string;
    securityCode: string;
}

type PaymentMethod = Cash | PayPal | CreditCard;

function describePaymentMethod(method: PaymentMethod) {
    switch (method.kind) {
        case "cash":
            return "Cash";

        case "paypal":
            return `Paypal (${method.email})`;

        case "credit":
            return `Credit card (${method.cardNumber})`;
    }
}


interface AddTodo {
    type: "ADD_TODO"; // discriminant property | type
    text: string;
}


interface ToggleTodo {
    type: "TOGGLE_TODO"; // discriminant property | type
    index: number;
}


type ReduxAction = AddTodo | ToggleTodo; // tagged types
type Todo = {
    text: string;
    done: boolean
}

function todosReducer(
    state: ReadonlyArray<Todo> = [],
    action: ReduxAction
): ReadonlyArray<Todo> {
    switch (action.type) {
        case "ADD_TODO":
            // action has type AddTodo here
            return [...state, { text: action.text, done: false }];

        case "TOGGLE_TODO":
            // action has type ToggleTodo here
            return state.map((todo, index) => {
                if (index !== action.index) {
                    return todo;
                }

                return {
                    text: todo.text,
                    done: !todo.done
                };
            });

        default:
            return state;
    }
}