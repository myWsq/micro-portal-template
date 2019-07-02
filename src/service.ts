import { AxiosDefault } from "../plugins/axios";
import $script from "scriptjs";
import _get from "lodash/get";
import _forEach from "lodash/forEach";
import _find from "lodash/find";

/**
 * 可配置的路由组件
 * ```json
 * {
 *   "id": "path.to.your.component.in.global",
 *   "url":"http://your/component/srcipt/url"
 * }
 * ```
 */
export interface Component {
  path: string;
  js: string;
  css?: string;
}

export interface RouteItem {
  id: string;
  path: string;
  component: Component;
}

export interface Config {
  routeItems: RouteItem[];
  layoutComponent: Component;
}

export const GlobalService = {
  async getConfig(): Promise<Config> {
    const res = await AxiosDefault.get(process.env.VUE_APP_CONFIG_URL);
    return res.data;
  },

  getComponent(Component: Component): Promise<any> {
    return new Promise((resolve, reject) => {
      $script(Component.js, () => {
        const component = _get(window, Component.path) as any;
        if (!component) {
          reject(
            `Component does not exist in global: ${JSON.stringify(Component)}`
          );
        }
        if (Component.css && !document.querySelector(`link[href="${Component.css}"]`)) {
          const link = document.createElement("link");
          link.setAttribute("rel", "stylesheet");
          link.setAttribute("type", "text/css");
          link.setAttribute("href", Component.css);
          document.getElementsByTagName("head")[0].appendChild(link);
        }
        resolve(component);
      });
    });
  },
};
