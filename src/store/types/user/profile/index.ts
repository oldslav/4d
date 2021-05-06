export interface INewPasswordFormState {
  password: string | null,
  newPassword: string | null,
  confirmPassword: string | null  
}

export interface IProfileFormState {
  firstName: string | null,
  lastName: string | null,
  patronymic: string | null,
  email: string | null,
  phone: string | null,
  telegramAlias: string | null,
  newEmail: string | null
}
