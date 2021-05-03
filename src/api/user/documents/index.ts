import Axios, { AxiosPromise } from "axios";
import { DocumentPayload } from "src/api/common";

interface DocumentsResponse {

}

export class UserDocumentsService {
  public static getDocuments (): AxiosPromise<DocumentsResponse> {
    return Axios.get("profile/documents");
  }

  public static createDocument (document: DocumentPayload): AxiosPromise<DocumentsResponse> {
    return Axios.post("profile/documents", document);
  }

  public static deleteDocument (id: number): AxiosPromise<DocumentsResponse> {
    return Axios.delete(`profile/documents/${ id }`);
  }
}
