import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').required().asPortNumber(),

    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_PASS: get('POSTGRES_PASS').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),

    MAIL_HOST: get('MAIL_HOST').required().asString(),
    MAIL_PORT: get('MAIL_PORT').required().asPortNumber(),
    MAIL_USER: get('MAIL_USER').required().asString(),
    MAIL_PASS: get('MAIL_PASS').required().asString(),
    MAIL_FROM: get('MAIL_FROM').required().asString(),
};
