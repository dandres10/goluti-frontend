import { IConfigRepositoryDTO } from '../interfaces/index';


export interface IConstCoreDTO {
    CONFIG: IConfigRepositoryDTO
}

export const CONST_CORE_DTO: IConstCoreDTO = {
    CONFIG: { loadService: true }
}