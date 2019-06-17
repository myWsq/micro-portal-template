import Vue from "vue";
import Router from "vue-router";
import { RouteItem, GlobalService } from "./service";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
});

export function setRoutes(routeItems: RouteItem[]) {
  router.addRoutes(
    routeItems.map(item => ({
      path: item.path,
      component: () => GlobalService.getComponent(item.component),
    }))
  );
}

export default router;
