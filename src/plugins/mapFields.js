/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== "string") {
      map = namespace;
      namespace = "";
    } else if (namespace.charAt(namespace.length - 1) !== "/") {
      namespace += "/";
    }
    return fn(namespace, map);
  };
}

function normalizedBase (state, base) {
  return base.replace(".", "/").split("/").reduce((object, level) => {
    return object[level];
  }, state);
}

export const mapFields = normalizeNamespace((namespace, options) => {
  const object = {};
  
  for (let x = 0; x < options.fields.length; x++) {
    const field = options.fields[x];
    
    object[field] = {
      get () {
        return normalizedBase(this.$store.state, namespace + options.base)[field];
      },
      
      set (value) {
        this.$store.commit(namespace + options.mutation, { [field]: value });
      }
    };
  }
  
  return object;
});
