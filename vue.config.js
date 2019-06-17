module.exports = {
  devServer: {
    proxy: "http://localhost:3000"
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
