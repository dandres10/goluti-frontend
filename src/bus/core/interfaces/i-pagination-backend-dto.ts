import { IFilterDTO } from "./i-filter-dto";

export interface IPaginationBackendDTO {
    skip?: number;
    limit?: number;
    all_data?: boolean;
    filters?: IFilterDTO[];
}