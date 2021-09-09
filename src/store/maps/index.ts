import { Module } from "vuex";
import { TRootState } from "src/store/types/root";
import buildings from "src/store/maps/buildings";
import security from "src/store/maps/security";

interface IMapsState {

}

const maps: Module<IMapsState, TRootState> = {
  namespaced: true,
  modules: {
    buildings,
    security
  }
};

export default maps;
