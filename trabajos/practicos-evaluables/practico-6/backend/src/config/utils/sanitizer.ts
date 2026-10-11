export class Sanitizer {

    static trimStrings(data: {[key: string]: any}): void {
        for (const key in data) {
            if (typeof data[key] === 'string') {
                data[key] = data[key].trim();
                data[key] = data[key].replace(/^[\n\r]+|[\n\r]+$/g, '');
            }
        }
    }

}