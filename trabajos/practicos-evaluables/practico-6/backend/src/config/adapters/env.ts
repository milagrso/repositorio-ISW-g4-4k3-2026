import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').required().asPortNumber(),

    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_PASS: get('POSTGRES_PASS').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),
}