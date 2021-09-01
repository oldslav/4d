import { PaginationParams, Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class UsersService extends Service {
  public getUsers (params: PaginationParams): AxiosPromise<any> {
    return this.api.get("api/v1/profile/users", { params });
  }

  public registerEmployee (params: Record<string, any>): AxiosPromise<any> {
    return this.api.post("api/v1/profile/create", { ...params });
  }

  public blockUser (id: number): AxiosPromise<any> {
    return this.api.put(`api/v1/profile/${ id }/block_user`);
  }

  public unblockUser (id: number): AxiosPromise<any> {
    return this.api.put(`api/v1/profile/${ id }/unblock_user`);
  }

  public changeUserRoles (id: number, roles: Array<string>): AxiosPromise<any> {
    return this.api.put(`api/v1/profile/${ id }/change_role`, roles);
  }
}
