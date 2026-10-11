export class TypeChecker {

    static areStrings(value: any[]): boolean {
        return value.every((item) => typeof item === 'string');
    }

    static areNumbers(value: any[]): boolean {
        return value.every((item) => typeof item === 'number');
    }

    static areBooleans(value: any[]): boolean {
        return value.every((item) => typeof item === 'boolean');
    }

    static areDefined(value: any[]): boolean {
        return value.every((item) => {
            if (item === undefined || item === null) {
                return false;
            }
            else if (typeof item === 'string' && item === '') {
                return false;
            }
            else if (typeof item === 'number' && (isNaN(item))) {
                return false;
            }
            else {
                return true;
            }
        });
    }

}