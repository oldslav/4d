import { Module } from "vuex";
import { TRootState } from "src/store/types/root";
import apartments from "src/store/user/bills/apartments";
import parking from "src/store/user/bills/parking";

const bills: Module<any, TRootState> = {
  namespaced: true,
  modules: {
    apartments,
    parking
  }
};

export default bills;
