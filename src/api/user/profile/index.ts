import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { ProfileFormPayload, NewPasswordPayload } from "src/api/common";

export class UserProfileService extends Service {

  public updateProfile (profileForm: ProfileFormPayload): AxiosPromise<any> {
    return this.api.put("api/v1/profile", profileForm);
  }

  public updateAvatar (avatar: FormData | null): AxiosPromise<any> {
    return this.api.put("api/v1/profile/avatar", avatar, { headers: { "content-type": "multipart/form-data" } });
  }

  public changeEmail (newEmail: string | null): AxiosPromise<any> {
    return this.api.put("api/v1/profile/email", newEmail);
  }

  public changePassword (passwordForm: NewPasswordPayload): AxiosPromise<any> {
    return this.api.put("api/v1/profile/password", passwordForm);
  }
}
