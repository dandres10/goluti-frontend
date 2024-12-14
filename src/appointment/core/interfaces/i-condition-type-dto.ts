import { CONDITION_TYPE_ENUM } from "@/bus/core/enums/condition-type-enum";
import {  CONDITION_TYPE, CONDITION_VALUE } from "../enums/condition-type-enum";

export interface IConditionTypeDTO {
    value: CONDITION_TYPE_ENUM;
    label: CONDITION_VALUE;
  }