<template>
  <div id="app" @click="clicked">
    <router-view />
  </div>
</template>
<script>
import request from "@/config/serve.js";
import storage from "@/common/utils/storage";
import { TIMEOUT } from "@/common/constant/constant.js";
export default {
  data() {
    return {};
  },
  mounted() {
    //设置超时退出
    window.setInterval(this.tTime, 30000); // 设置定时器
  },
  methods: {
    clicked() {
      storage.setLastTime(new Date().getTime()); //当界面被点击更新点击时间
    },
    tTime() {
      const currentTime = new Date().getTime(); //当前时间
      const lastTime = storage.getLastTime(); //最后一次点击的时间
      if (currentTime - lastTime > TIMEOUT) {
        // 超时
        if (storage.isLogin()) {
          // 退出登录
          this.loginOut();
        }
      }
    },
    // 退出登录
    async loginOut() {
      let token = "";
      const userInfo = storage.getUserInfo();
      if (userInfo) {
        token = userInfo.token || "";
      }
      const res = await request("get", "/safe/logout", { token });
      if (res && res.code == 0) {
        storage.clearSession(); // 清除存储在localStorage里的信息
        this.$store.commit("clearHistoryMenu"); // 清空历史菜单
        if (this.$route.name == "login") return; // 当前已经是登陆页时不做跳转
        this.$router.push("login"); // 跳转登录页
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/common/css/common.scss"; // 全局公共css
body {
  display: block;
  margin: 0px;
}
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
