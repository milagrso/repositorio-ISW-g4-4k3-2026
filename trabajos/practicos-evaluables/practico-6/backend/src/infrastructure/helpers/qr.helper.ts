export class QrHelper {
    public async generate(data: any): Promise<string> {
        // Implementation for generating QR code string or image data
        return typeof data === 'string' ? data : JSON.stringify(data);
    }
}
