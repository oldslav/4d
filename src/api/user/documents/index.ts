import { Service } from "src/api/common";
import { AxiosPromise } from "axios";
import { DocumentPayload } from "src/api/common";

export class UserDocumentsService extends Service {
  public getDocuments (): AxiosPromise<any> {
    return this.api.get("api/v1/profile/documents");
  }

  public createDocument (document: DocumentPayload): AxiosPromise<any> {
    return this.api.post("api/v1/profile/documents", document, { headers: { "content-type": "image/*" } });
  }

  public deleteDocument (id: number): AxiosPromise<any> {
    return this.api.delete(`api/v1/profile/documents/${ id }`);
  }
}
