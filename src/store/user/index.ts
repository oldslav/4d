import { Module } from "vuex";
import { IRootState } from "src/store/types/root";
import userTickets from "src/store/user/tickets";
import neighbors from "src/store/user/neighbors";
import documents from "src/store/user/documents";
import vehicles from "src/store/user/vehicles";
import { profileForm, newPasswordForm } from "src/store/user/profile";
import { IUserState } from "src/store/types/user";

const state: IUserState = {
  name: {
    first: null,
    last: null,
    patronymic: null,
    full: null
  },
  email: null,
  phones: null,
  telegram: null,
  uid: null,
  login: null,
  createdAt: null,
  updatedAt: null
};

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state,
  modules: {
    userTickets,
    documents,
    vehicles,
    neighbors,
    profileForm,
    newPasswordForm
  }
};

export default user;
