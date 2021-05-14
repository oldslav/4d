export interface INewPasswordFormState {
  oldPassword: string | null,
  password: string | null,
  confirmPassword: string | null  
}

export interface IProfileFormState {
  name: {
    first: string | null,
    full: string | null,
    last: string | null,
    patronymic: string | null
  },
  contacts: {
    email: string | null,
    phone: string | null,
    telegramAlias: string | null
  },
  avatarUrl: string | null,
  avatarFile: File | null,
  newEmail: string | null
}
