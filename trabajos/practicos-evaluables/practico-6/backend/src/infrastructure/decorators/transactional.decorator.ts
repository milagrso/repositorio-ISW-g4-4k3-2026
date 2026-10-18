import { AsyncLocalStorage } from 'async_hooks';
import { Sequelize, Transaction } from 'sequelize';
import { PostgreSQLDatabase } from '../postgresql/initializer/database';

const transactionStorage = new AsyncLocalStorage<Transaction>();

(Sequelize as any).useCLS({
    get: (key: string) => key === 'transaction' ? transactionStorage.getStore() : undefined,
    set: () => {},
    bind: (fn: any) => fn,
    run: (fn: (...args: any[]) => any) => fn()
});

export function Transactional(): MethodDecorator {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const sequelize = PostgreSQLDatabase.getActiveSequelize();
            if (!sequelize) {
                return originalMethod.apply(this, args);
            }

            if (transactionStorage.getStore()) {
                return originalMethod.apply(this, args);
            }

            return await sequelize.transaction(async (t) => {
                return transactionStorage.run(t, () => originalMethod.apply(this, args));
            });
        };

        return descriptor;
    };
}
