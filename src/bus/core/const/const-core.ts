import { IConfigDTO } from '../interfaces/index';


export interface IConstCoreDTO {
    CONFIG: IConfigDTO
}

export const CONST_CORE_DTO: IConstCoreDTO = {
    CONFIG: { loadService: true }
}