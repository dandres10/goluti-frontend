export function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        private static instance: T;

        constructor(...args: any[]) {
            super(...args);
            if ((constructor as any).instance) {
                return (constructor as any).instance;
            }
            (constructor as any).instance = this;
        }
    };
}