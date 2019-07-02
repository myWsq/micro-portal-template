module.exports = {
  devServer: {
    proxy: "http://localhost"
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      axios: "axios",
      "vue-router": "VueRouter",
      "elmenet-ui": "ELEMENT"
    }
  }
};
