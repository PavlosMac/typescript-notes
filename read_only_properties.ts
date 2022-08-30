// read_only

// Properties marked with readonly can only be assigned during property initialisation


type Point = {
    readonly x: number;
    readonly y: number;
};

function as_<T>(p: T): T {
    return p;
}

const o: Point = as_<Point>({ x: 12, y: 15 });


// x is readonly to ts errors
function moveXBad(offset: number, point: Point): Point {
    point.x += offset;
}

function moveXGood(offset: number, point: Point): Point {
    return {
        x: point.x + offset,
        y: point.y
    }
}

// readonly index signatures

interface ReadonlyArray<T> {
    readonly length: number;
    readonly [n: number]: T; //index signature
}

const primeNumbersBelow10: ReadonlyArray<number> = [2, 3, 4, 5, 1, 3, 6, 7];
primeNumbersBelow10[3] = 11;
// error because index signature is readonly

