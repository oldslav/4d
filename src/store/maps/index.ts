import { Module } from "vuex";
import { TRootState } from "src/store/types/root";
import buildings from "src/store/maps/buildings";

interface IMapsState {

}

const maps: Module<IMapsState, TRootState> = {
  namespaced: true,
  modules: {
    buildings
  }
};

export default maps;
