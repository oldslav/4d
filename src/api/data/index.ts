import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export default class DataService extends Service {
  public getMainPageInfo (): AxiosPromise<any> {
    return this.api.get("/api/v1/data");
  }
  
  public getObjects (): AxiosPromise<any> {
    return this.api.get("/api/v1/data/buildings");
  }

  public getTransport (): AxiosPromise<any> {
    return this.api.get("/api/v1/data/transport");
  }

  public getImprovement (): AxiosPromise<any> {
    return this.api.get("/api/v1/data/landscaping");
  }

  public getLighting (): AxiosPromise<any> {
    return this.api.get("/api/v1/data/light");
  }

  public getTourism (): AxiosPromise<any> {
    return this.api.get("/api/v1/data/tourism");
  }

  public getTerritory (): AxiosPromise<any> {
    return this.api.get("/api/v1/data/territorial");
  }
}
