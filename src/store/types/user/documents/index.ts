export interface IDocumentsState {
  documents: {
    passport: Array<any> | null;
    snils: Array<any> | null;
    inn: Array<any> | null;
    job: Array<any> | null;
  }
  deletedIds: number[];
}
