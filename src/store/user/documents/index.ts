import { Module } from "vuex";
import { IRootState } from "../../types/root";
import { IDocumentsState } from "../../types/user/documents";

const state: IDocumentsState = {
  passport: null,
  snils: null,
  inn: null,
  workCertificate: null
};

const documents: Module<IDocumentsState, IRootState> = {
  namespaced: true,
  state
};

export default documents;
