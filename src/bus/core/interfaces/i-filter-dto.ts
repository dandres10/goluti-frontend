import { CONDITION_TYPE_ENUM } from "../enums/condition-type-enum";

export interface IFilterDTO {
    field: string;
    condition: CONDITION_TYPE_ENUM | string;
    value?: string | string[] | number | number[];
    initialValue?: string;
    finalValue?: string;
    group?: number;
}


