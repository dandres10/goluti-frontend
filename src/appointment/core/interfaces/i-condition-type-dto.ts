import {  CONDITION_TYPE, CONDITION_VALUE } from "../enums/condition-type-enum";

export interface IConditionTypeDTO {
    value: CONDITION_TYPE;
    label: CONDITION_VALUE;
  }