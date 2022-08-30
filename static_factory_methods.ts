// the best way to enforce validation logic on a domain object is
// to keep the constructor private and  use a static factory method

module Result {

    interface ValueObjectProps {
        [index: string]: any;
    }

    /**
     * @desc ValueObjects are objects that we determine their
     * equality through their structrual property.
     */

    export abstract class ValueObject<T extends ValueObjectProps> {
        public readonly props: T;

        constructor(props: T) {
            this.props = Object.freeze(props);
        }

        public equals(vo?: ValueObject<T>): boolean {
            if (vo === null || vo === undefined) {
                return false;
            }
            if (vo.props === undefined) {
                return false;
            }
            return this.props === vo.props
        }
    }

    interface NameProps {
        value: string
    }

    class Name extends ValueObject<NameProps> {

        // Can't use the `new` keyword from outside the scope of the class.
        private constructor(props: NameProps) {
            super(props);
        }

        get value(): string {
            return this.props.value;
        }

        public static create(name: string): Name {
            if (name === undefined || name === null || name.length <= 2 || name.length > 100) {
                throw new Error('User must be greater than 2 chars and less than 100.')
            } else {
                return new Name({ value: name })
            }
        }
    }


}
