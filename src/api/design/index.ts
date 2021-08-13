import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export default class DesignService extends Service {
  public getDesignCodeSections (): AxiosPromise<any> {
    return this.api.get("/api/v1/design_code");
  }

  public getDesignCodeSectionById (id: number): AxiosPromise<any> {
    return this.api.get(`/api/v1/design_code/${ id }`);
  }
}
