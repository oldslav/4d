import { PaginationParams, Service } from "src/api/common";
import { AxiosPromise } from "axios";

export class UsersService extends Service {
  public static getUsers (params: PaginationParams): AxiosPromise<any> {
    return this.api.get("api/v1/profile/users", { params });
  }

  public static blockUser (id: number): AxiosPromise<any> {
    return this.api.put(`api/v1/profile/${ id }/block_user`);
  }

  public static unblockUser (id: number): AxiosPromise<any> {
    return this.api.put(`api/v1/profile/${ id }/unblock_user`);
  }

  public static changeUserRoles (id: number): AxiosPromise<any> {
    return this.api.put(`api/v1/profile/${ id }/change_role`);
  }
}
