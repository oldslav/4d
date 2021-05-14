import { Service } from "src/api/common";
import { AxiosPromise } from "axios";

export interface RefreshToken {
  refreshToken: string;
}

interface Registration {
  confirm_password: string,
  firstname: string,
  password: string,
  username: string
}

export default class AuthService extends Service {
  public static registration (payload: Registration): AxiosPromise<any> {
    return this.api.post("/signup", payload);
  }
  
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static login (payload: unknown, config: object = {}): AxiosPromise<any> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.api.post("/oauth/token", payload, {
      ...config,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }
  
  public static getAccount (): AxiosPromise<any> {
    return this.api.get("/api/v1/profile");
  }
}
