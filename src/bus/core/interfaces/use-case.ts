import { IConfigRepositoryDTO } from "./i-config-repository-dto";

export interface UseCase<S, T> {
    execute(
        params?: S,
        config?: IConfigRepositoryDTO,
    ): Promise<T> | void | any | null;
}