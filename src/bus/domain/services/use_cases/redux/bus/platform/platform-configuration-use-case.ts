import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IPlatformConfigurationDTO } from "@/bus/domain/models/redux/bus/platform/i-platform-configuration-dto";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class PlatformConfigurationUseCase implements UseCase<any, IPlatformConfigurationDTO | undefined> {

    private static instance: PlatformConfigurationUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): PlatformConfigurationUseCase {
        if (!PlatformConfigurationUseCase.instance)
            PlatformConfigurationUseCase.instance = new PlatformConfigurationUseCase();
        return PlatformConfigurationUseCase.instance;
    }

    public execute(config: IConfigDTO): IPlatformConfigurationDTO | undefined {

        let setIPlatformConfigurationDTO: IPlatformConfigurationDTO = {
            rol_id: this.platformRepository.readRol(config)?.id,
            language_id: this.platformRepository.readLanguage(config)?.id,
            location_id: this.platformRepository.readLocation(config)?.id,
            currency_id: this.platformRepository.readCurrency(config)?.id,
            company_id: this.platformRepository.readCompany(config)?.id,
            languages: this.platformRepository.readLanguages(config),
            locations: this.platformRepository.readLocations(config),
            currencies: this.platformRepository.readCurrencies(config),
            companies: this.platformRepository.readCompanies(config)
        }

        return setIPlatformConfigurationDTO;
    }
}