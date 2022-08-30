
interface Todo {
    id: number;
    text: string;
    dueDate: Date;
}

type TodoKeys = keyof Todo;


function prop<T, K extends keyof T>(key: K, obj: T) {
    return obj[key];
}
// return type of K[T], lookup type

const todo = {
    id: 3,
    text: "lookup type",
    dueDate: new Date(2024, 11, 17)
}

const id = prop("id", todo); // number
const text = prop("text", todo); // string
const due = prop("date", todo); // Date