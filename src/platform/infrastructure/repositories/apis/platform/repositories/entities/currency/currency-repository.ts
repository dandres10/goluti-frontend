import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { ICurrencyRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-currency-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ICurrencyDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { ICurrencyDeleteEntity, ICurrencyEntity, ICurrencyReadEntity, ICurrencySaveEntity, ICurrencyUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-currency-mapper";

export class CurrencyRepository extends ICurrencyRepository {

    private static instance: CurrencyRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly currencyEntityMapper = InjectionPlatformEntitiesCurrencyMapper.CurrencyEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): CurrencyRepository {
        if (!CurrencyRepository.instance)
            CurrencyRepository.instance = new CurrencyRepository();
        return CurrencyRepository.instance;
    }

    public async read(
        params: ICurrencyReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICurrencyDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.CURRENCY}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICurrencyEntity>(data);
                    if (entity)
                        return this.currencyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: ICurrencySaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICurrencyDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.CURRENCY, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICurrencyEntity>(data);
                    if (entity)
                        return this.currencyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: ICurrencyUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICurrencyDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.CURRENCY, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICurrencyEntity>(data);
                    if (entity)
                        return this.currencyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: ICurrencyDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICurrencyDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.CURRENCY}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICurrencyEntity>(data);
                    if (entity)
                        return this.currencyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICurrencyDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.CURRENCY_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<ICurrencyEntity[]>(data);
                    if (entities)
                        return this.currencyEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}