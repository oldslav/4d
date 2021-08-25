<script>
  export default {
    name: "AsideRouterView",
    render (createElement, context) {
      const { name } = context.props;
      const { $route } = context.parent;
      const matchedRoutes = $route.matched;
      const routeComponents = matchedRoutes.reduce((res, route) => Object.assign(res, route.components || {}), {});

      if (name in routeComponents) {
        return createElement("router-view", { props: { name } });
      }

      return context.scopedSlots.default();
    },
    functional: true
  };
</script>
