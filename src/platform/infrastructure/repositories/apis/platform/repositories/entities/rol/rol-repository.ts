import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IRolRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-rol-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IRolDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { IRolDeleteEntity, IRolEntity, IRolReadEntity, IRolSaveEntity, IRolUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/rol";
import { InjectionPlatformEntitiesRolMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-mapper";

export class RolRepository extends IRolRepository {

    private static instance: RolRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly rolEntityMapper = InjectionPlatformEntitiesRolMapper.RolEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): RolRepository {
        if (!RolRepository.instance)
            RolRepository.instance = new RolRepository();
        return RolRepository.instance;
    }

    public async read(
        params: IRolReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.ROL}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRolEntity>(data);
                    if (entity)
                        return this.rolEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: IRolSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.ROL, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRolEntity>(data);
                    if (entity)
                        return this.rolEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: IRolUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.ROL, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRolEntity>(data);
                    if (entity)
                        return this.rolEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: IRolDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.ROL}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRolEntity>(data);
                    if (entity)
                        return this.rolEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.ROL_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<IRolEntity[]>(data);
                    if (entities)
                        return this.rolEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}