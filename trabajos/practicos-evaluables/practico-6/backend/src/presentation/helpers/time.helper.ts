export class TimeHelper {
    public static getArgentinaIsoString(date: Date = new Date()): string {
        const formatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Argentina/Buenos_Aires',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const parts = formatter.formatToParts(date);
        const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '00';

        const y = getPart('year');
        const m = getPart('month');
        const d = getPart('day');
        const h = getPart('hour');
        const min = getPart('minute');
        const s = getPart('second');

        return `${y}-${m}-${d}T${h}:${min}:${s}-03:00`;
    }
}

export const getArgentinaIsoString = TimeHelper.getArgentinaIsoString;
