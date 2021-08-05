import { Service } from "src/api/common";

const API_AUTO = "https://api.auto.ria.com/categories/";

const replaceValues = (data: any) => {
  return data.map((item: any) => {
    const { name, value } = item;
    return {
      name,
      id: value.toString()
    };
  });
};

export class DictionariesService extends Service {
  // eslint-disable-next-line class-methods-use-this
  public async getVehicleTypes (): Promise<any> {
    return fetch(`${ API_AUTO }`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => replaceValues(data));
  }

  // eslint-disable-next-line class-methods-use-this
  public getVehicleBrands (typeId: string): Promise<any> {
    return fetch(`${ API_AUTO }/${ typeId }/marks`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => replaceValues(data));
  }

  // eslint-disable-next-line class-methods-use-this
  public getVehicleModels (typeId: string, brandId: string): Promise<any> {
    return fetch(`${ API_AUTO }/${ typeId }/marks/${ brandId }/models`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => replaceValues(data));
  }
}
