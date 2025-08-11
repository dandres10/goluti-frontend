import { RolDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/rol/rol-delete-mapper";
import { RolEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/rol/rol-entity-mapper";
import { RolReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/rol/rol-read-mapper";
import { RolSaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/rol/rol-save-mapper";
import { RolUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/rol/rol-update-mapper";

export class InjectionPlatformEntitiesRolMapper {
  public static RolEntityMapper(): RolEntityMapper {
    return RolEntityMapper.getInstance();
  }

  public static RolSaveMapper(): RolSaveMapper {
    return RolSaveMapper.getInstance();
  }

  public static RolReadMapper(): RolReadMapper {
    return RolReadMapper.getInstance();
  }

  public static RolUpdateMapper(): RolUpdateMapper {
    return RolUpdateMapper.getInstance();
  }

  public static RolDeleteMapper(): RolDeleteMapper {
    return RolDeleteMapper.getInstance();
  }
}