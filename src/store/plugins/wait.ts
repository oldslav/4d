import { Module, Mutation, MutationTree, Store } from "vuex";
import _Vue from "vue";

interface State {
  [index: string]: boolean;
}

interface AppStore {
  _actions: any;
}

interface Mutations {
  [index: string]: Mutation<State>;
}

function setState (actions: string[]): State {
  return actions.reduce((obj: State, value: string) => {
    obj[value] = false;
    return obj;
  }, {});
}

function setMutations (actions: string[]): MutationTree<State> {
  return actions.reduce((obj: Mutations, value: string) => {
    obj[value] = (state: State, payload): void => {
      _Vue.set(state, value, payload);
    };

    return obj;
  }, {});
}

function setModule (actions: string[], options: any): Module<State, any> {
  return {
    namespaced: options.namespaced,
    state: setState(actions),
    mutations: setMutations(actions)
  };
}

const Waiter = (store: Store<any>, options: any): void => {
  // eslint-disable-next-line
  const actions = Object.keys((store as Store<any> & AppStore)._actions);

  store.registerModule("wait", setModule(actions, options), { preserveState: true });

  store.subscribeAction({
    before ({ type }) {
      store.commit(`wait/${ type }`, true);
    },

    after ({ type }) {
      store.commit(`wait/${ type }`, false);
    },

    error ({ type }) {
      store.commit(`wait/${ type }`, false);
    }
  });
};

export default {
  install (Vue: typeof _Vue, { store, ...options }: unknown): void {
    const defaultOptions: any = {
      namespaced: true
    };

    Waiter(store, { ...defaultOptions, ...options });
  }
};
