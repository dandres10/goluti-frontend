import { RolDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/rol/rol-delete-use-case";
import { RolListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/rol/rol-list-use-case";
import { RolReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/rol/rol-read-use-case";
import { RolSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/rol/rol-save-use-case";
import { RolUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/rol/rol-update-use-case";

export class InjectionPlatformEntitiesRolUseCase {
  public static RolReadUseCase(): RolReadUseCase {
    return RolReadUseCase.getInstance();
  }

  public static RolSaveUseCase(): RolSaveUseCase {
    return RolSaveUseCase.getInstance();
  }

  public static RolUpdateUseCase(): RolUpdateUseCase {
    return RolUpdateUseCase.getInstance();
  }

  public static RolDeleteUseCase(): RolDeleteUseCase {
    return RolDeleteUseCase.getInstance();
  }

  public static RolListUseCase(): RolListUseCase {
    return RolListUseCase.getInstance();
  }
}