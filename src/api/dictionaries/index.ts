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
  public static async getVehicleTypes (): Promise<any> {
    return fetch(`${ API_AUTO }`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => replaceValues(data));
  }

  public static getVehicleBrands (typeId: string): Promise<any> {
    return fetch(`${ API_AUTO }/${ typeId }/marks`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => replaceValues(data));
  }

  public static getVehicleModels (typeId: string, brandId: string): Promise<any> {
    return fetch(`${ API_AUTO }/${ typeId }/marks/${ brandId }/models`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => replaceValues(data));
  }
}
