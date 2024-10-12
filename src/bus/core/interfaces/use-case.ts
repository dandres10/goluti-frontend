import { IConfigDTO } from "./i-config-repository-dto";

export interface UseCase<S, T> {
    execute(
        params?: S,
        config?: IConfigDTO,
    ): Promise<T> | void | any | null;
}