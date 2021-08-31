import { boot } from "quasar/wrappers";
import { AxiosInstance } from "axios";

import { Service } from "src/api/common";
import AuthService from "src/api/auth";
import { DictionariesService } from "src/api/dictionaries";
import ReferencesService from "src/api/references";
import { ApartmentsService } from "src/api/services/apartments";
import { ParkingService } from "src/api/services/parking";
import { VacancyService } from "src/api/services/vacancy";
import { TreesService } from "src/api/services/trees";
import { BillsService } from "src/api/user/bills";
import { UserCompanyService } from "src/api/user/company";
import { UserDocumentsService } from "src/api/user/documents";
import { UserNeighborsService } from "src/api/user/neighbors";
import { UserProfileService } from "src/api/user/profile";
import { TicketsService } from "src/api/user/tickets/tickets";
import { UserVehiclesService } from "src/api/user/vehicles";
import { UsersService } from "src/api/users";
import { IdeasService } from "src/api/services/ideas";
import { CommerceService } from "src/api/services/commerce";
import { VerificationRequestService } from "src/api/user/verification-request";
import { EstateService } from "src/api/services/estate";
import DesignService from "src/api/design";
import { TourismService } from "src/api/services/tourism";

declare module "vuex/types/index" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    service: {
      common: Service,
      auth: AuthService,
      dictionaries: DictionariesService,
      references: ReferencesService,
      design: DesignService,
      services: {
        apartments: ApartmentsService,
        parking: ParkingService,
        vacancy: VacancyService,
        ideas: IdeasService,
        trees: TreesService
        commerce: CommerceService,
        estate: EstateService,
        tourism: TourismService,
      },
      user: {
        bills: BillsService,
        company: UserCompanyService,
        documents: UserDocumentsService,
        neighbors: UserNeighborsService,
        profile: UserProfileService,
        tickets: TicketsService,
        vehicles: UserVehiclesService,
        verificationRequests: VerificationRequestService
      },
      users: UsersService
    }
    $axios: AxiosInstance
  }
}

export default boot(({ app }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const store = app.store!;
  const axios = store.$axios;

  store.service = {
    auth: new AuthService(axios),
    common: new Service(axios),
    dictionaries: new DictionariesService(axios),
    references: new ReferencesService(axios),
    design: new DesignService(axios),
    services: {
      apartments: new ApartmentsService(axios),
      parking: new ParkingService(axios),
      vacancy: new VacancyService(axios),
      ideas: new IdeasService(axios),
      trees: new TreesService(axios),
      commerce: new CommerceService(axios),
      estate: new EstateService(axios),
      tourism: new TourismService(axios)
    },
    user: {
      bills: new BillsService(axios),
      company: new UserCompanyService(axios),
      documents: new UserDocumentsService(axios),
      neighbors: new UserNeighborsService(axios),
      profile: new UserProfileService(axios),
      tickets: new TicketsService(axios),
      vehicles: new UserVehiclesService(axios),
      verificationRequests: new VerificationRequestService(axios)
    },
    users: new UsersService(axios)
  };
});
