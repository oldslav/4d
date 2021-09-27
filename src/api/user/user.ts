interface IUserContacts {
  phone: string | null;
  email: string | null;
  telegram: string | null;
  pcm: IUserContactsPcm | null;
}

interface IUserContactsPcm {
  name: boolean | null;
  phone: boolean | null;
  email: boolean | null;
  telegram: boolean | null;
}

interface IUserRolesList {
  [index: number]: IUserRolesItem
}

interface IUserRolesItem {
  description: string | null;
  id: number | null;
  name: string | null;
}

interface IUser {
  avatar: string | null;
  created: Date | null;
  updated: Date | null;
  jobPosition: string | null;
  name: string | null;
  id: number | null;
  login: string | null;
  contacts: IUserContacts | null;
  roles: IUserRolesList | null
}

export default class User implements IUser {
  public avatar: string | null = null;
  public created: Date | null = null;
  public updated: Date | null = null;
  public jobPosition: string | null = null;
  public name: string | null = null;
  public phone: string | null = null;
  public roles: IUserRolesList | null = null;
  public id: number | null = null;
  public login: string | null = null;
  public contacts: IUserContacts | null = {
    phone: null,
    email: null,
    telegram: null,
    pcm: null
  };
  
  public constructor (response?: User) {
    if (response) {
      this.avatar = response.avatar;
      this.created = response.created;
      this.updated = response.updated;
      this.jobPosition = response.jobPosition;
      this.name = response.name;
      this.phone = response.phone;
      this.roles = response.roles;
      this.id = response.id;
      this.login = response.login;
      this.contacts = response.contacts;
    }
  }
}
