import { Module } from "vuex";
import { IRootState } from "src/store/types/root";
import { IDocumentsState } from "src/store/types/documents";

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
