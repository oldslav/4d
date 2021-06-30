import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { CompanyProfile, CompanyBank, CompanyCard } from "src/store/types/user/company";
import { DocumentPayload } from "src/api/common";

export class UserCompanyService extends Service {
  public static getCompany (): AxiosPromise<any> {
    return this.api.get("/api/v1/profile/company");
  }

  public static updateCompanyProfile (payload: CompanyProfile): AxiosPromise<any> {
    return this.api.put("/api/v1/profile/company", payload);
  }

  public static updateCompanyCard (payload: Partial<CompanyCard>): AxiosPromise<any> {
    return this.api.put("/api/v1/profile/company/card", payload);
  }

  public static uploadCardFile (payload: DocumentPayload): AxiosPromise<any> {
    return this.api.post("/api/v1/profile/company/card/file", payload);
  }

  public static deleteCardFile (id: number): AxiosPromise<any> {
    return this.api.delete(`/api/v1/profile/company/card/file/${ id }`);
  }

  public static updateCompanyBank (payload: CompanyBank): AxiosPromise<any> {
    return this.api.put("/api/v1/profile/company/bank_details", payload);
  }

  public static updateCompanyLogo (payload: unknown): AxiosPromise<any> {
    return this.api.put("/api/v1/profile/company/logo", payload);
  }
}
