import BusEvents from "@core/events/bus-events";
import { BrowserRouter } from "react-router-dom";
import { RoutesCore } from "@core/routes/routes-core";
import PlatformEvents from "@core/events/platform-events";
import OnboardingEvents from "@core/events/onboarding-events";
import CommercialEvents from "@core/events/commercial-events";
import AppointmentEvents from "@core/events/appointment-events";
import { FooterHomeUI, NavbarUI } from "@bus/shared/ui/molecules";
import { InjectionReduxFacade } from "@/bus/facade/redux";
import { IPlatformConfigurationDTO } from "@bus/domain/models/redux/bus/platform/i-platform-configuration-dto";
import { useSelector } from "react-redux";
import { InjectionPlatformEntitiesFacade } from "@platform/facade/apis/platform/injection/entities/injection-platform-entities-facade";
import type { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";
import { CONDITION_TYPE_ENUM } from "@bus/core/enums/condition-type-enum";
import { IPlatformUpdateDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { InjectionPlatformBusinessFacade } from "@platform/facade/apis/platform/injection/business/injection-platform-business-facade";

const _injectionPlatformEntitiesFacadeLocation = InjectionPlatformEntitiesFacade.LocationFacade();
const _injectionPlatformEntitiesFacadePlatform = InjectionPlatformEntitiesFacade.PlatformFacade();
const _injectionPlatformBusinessFacadeAuth = InjectionPlatformBusinessFacade.AuthFacade();


function App() {
  const _injectionReduxFacade = InjectionReduxFacade.PlatformReduxFacade();
  const platformConfiguration: IPlatformConfigurationDTO | undefined =
    _injectionReduxFacade.platformConfiguration({
      selector: useSelector,
    });

  const onChangeCompany = async (company: string): Promise<ILocationDTO[] | null> => {
    return await _injectionPlatformEntitiesFacadeLocation.list({
      skip: 0,
      limit: 0,
      all_data: true,
      filters: [
        {
          field: "company_id",
          condition: CONDITION_TYPE_ENUM.IN.toString(),
          value: [company]
        }
      ]
    }).then((locations: ILocationDTO[] | null) => locations ?? []);
  };

  const onUpdatePlatform = async (platform: IPlatformUpdateDTO): Promise<void> => {

    const platformUpdateDTO: IPlatformUpdateDTO = {
      id: platform.id,
      languageId: platform.languageId,
      locationId: platform.locationId,
      currencyId: platform.currencyId
    };

    await _injectionPlatformEntitiesFacadePlatform
      .update(platformUpdateDTO)
      .then(async () => {
        await refreshToken();
      });
  };

  const refreshToken = async (): Promise<void> => {
    await _injectionPlatformBusinessFacadeAuth
      .refreshToken()
      .then((data) => {
        console.log(data);
      });
  };


  return (
    <>
      <BusEvents />
      <AppointmentEvents />
      <OnboardingEvents />
      <CommercialEvents />
      <PlatformEvents />
      <BrowserRouter>
        <NavbarUI
          id="navbar-core"
          className="home-view__navbar"
          platformConfiguration={platformConfiguration}
          onChangeCompany={onChangeCompany}
          onUpdatePlatform={onUpdatePlatform}
        />
        <RoutesCore />
        <FooterHomeUI id="footer-home" />
      </BrowserRouter>
    </>
  );
}

export default App;
