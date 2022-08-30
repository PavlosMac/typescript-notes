type Constructor<T = {}> = new (...args: any[]) => T;

// a type which can create objects of the generic type T

function TimeStamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();
    }
}

// TBase is compatible with Constructor, Base must be able to construct something
// new class derived from Base is returned


class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const TimeStampedUser = TimeStamped(User);

const tSu = new TimeStampedUser("John Doe");
console.log("\n........")
console.log(tSu.name)
console.log(tSu.timestamp)


function Tagged<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        tag: string | null;

        constructor(...args: any[]) {
            super(...args);
            this.tag = null;
        }
    }
}

// all params passed to constructor of Base via 'super(...args)'

const TaggedUser = Tagged(User);
const uTag = new TaggedUser("Jane Dow");
console.log("\n........")
console.log(uTag.name);
console.log(uTag.tag);



function ActiveTable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        isActivated = false;

        activate() {
            this.isActivated = true;
        }

        deactivate() {
            this.isActivated = false;
        }
    }
}

const ActivateAbleUser = ActiveTable(User);

const activUser = new ActivateAbleUser("Jimmy Page");
console.log("\n........")

console.log(activUser.isActivated)

activUser.activate();

console.log(activUser.isActivated)



const WeirdAsFuck = ActiveTable(Tagged(TimeStamped(User)));

const wAF = new WeirdAsFuck("Henry");
console.log("\n........");

console.log(wAF.name);
console.log(wAF.isActivated);
console.log(wAF.tag)
wAF.activate();

console.log(wAF.isActivated);





class Sprite {
    name = "";
    x = 0;
    y = 0;

    constructor(name: string) {
        this.name = name;
    }

    setPos(x: number, y: number) {
        return x + y;
    }
}

type Positionable = Constructor<{ setPos: (x: number, y: number) => void }>;

function Sprint<TBase extends Positionable>(Base: TBase) {
    return class Jumpable extends Base {
        jump() {
            this.setPos(20, 77);
        }
    }
}

const IsSprint = Sprint(Sprite);

const getSprint = new IsSprint("100 metres");
console.log("\n........");
console.log(getSprint.setPos(100, 0));