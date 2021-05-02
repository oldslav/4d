import Axios, { AxiosPromise } from "axios";

interface DocumentsResponse {

}

export class UserDocumentsService {
  public static getDocuments (): AxiosPromise<DocumentsResponse> {
    return Axios.get("profile/documents");
  }
}
