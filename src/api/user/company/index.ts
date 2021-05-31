import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { CompanyProfile, CompanyBank, CompanyCard } from "src/store/types/user/company";

export class UserCompanyService extends Service {
  public static getCompany (): AxiosPromise<any> {
    return this.api.get("/api/v1/account/company");
  }

  public static updateCompanyProfile (payload: CompanyProfile): AxiosPromise<any> {
    return this.api.put("/api/v1/account/company/profile", payload);
  }

  public static updateCompanyCard (payload: CompanyCard): AxiosPromise<any> {
    return this.api.put("/api/v1/account/company/card", payload);
  }

  public static updateCompanyBank (payload: CompanyBank): AxiosPromise<any> {
    return this.api.put("/api/v1/account/company/bank_details", payload);
  }

  public static updateCompanyLogo (payload: unknown): AxiosPromise<any> {
    return this.api.put("/api/v1/account/company/profile/logo", payload);
  }
}
