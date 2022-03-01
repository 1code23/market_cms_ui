import Vue from "vue";
import Draggable from "vuedraggable";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/css/index.scss";
import storage from "@/common/utils/storage";
import filters from "@/common/utils/filters.js";
import directives from "@/common/utils/directives.js";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// require("./mock");

Vue.config.productionTip = false;
//全局尺寸使用small
Vue.use(ElementUI, { size: "small" });
Vue.component("Draggable", Draggable);

// 注册filers
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]); //插入过滤器名和对应方法
});
// 注册自定义指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});

router.beforeEach((to, from, next) => {
  const isLogin = storage.isLogin();
  if (isLogin) {
    // 已登录时，进入登录页直接跳转至首页
    if (to.path === "/login") {
      next({
        path: "/",
      });
    }
    next();
  } else {
    //未登录
    if (to.path === "/login") return next(); // 如果是进入登录页必须放行，不然会陷入死循环
    next({
      path: "/login",
    });
  }
});
// loading chunk 出错处理
router.onError((error) => {
  console.log("error", error);
  console.log("error", error.message);
  const pattern = /Loading/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  console.log("isChunkLoadFailed", isChunkLoadFailed);
  if (isChunkLoadFailed) {
    router.go(0);
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
