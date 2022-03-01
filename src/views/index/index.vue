<template>
  <el-container>
    <el-header>
      <div class="navbar">
        <img class="logo" src="../../assets/images/logo.png" height="20px" />
        <div class="navbar-nav">
          <ul>
            <li
              v-for="(item, index) in menuList"
              :class="{ 'top-menu-active': index === activeIndex }"
              :key="index"
              @click="handleSelectMenu(index)"
            >
              <i v-if="item.icon" :class="item.icon"></i>
              {{ item.text }}
            </li>
          </ul>
        </div>
        <div class="navbar-nav navbar-right">
          <ul>
            <li @click="handledSensitiveTaboo">
              <span>敏感政治文化禁忌(必读)</span>
            </li>
            <span v-if="userInfo">{{ userInfo.role }}</span>
            <el-dropdown v-if="userInfo">
              <li>
                {{ userInfo.userName }}
                <i class="el-icon-arrow-down"></i>
              </li>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="loginOut"
                  >退出登录</el-dropdown-item
                >
                <el-dropdown-item @click.native="dialogVisible = true"
                  >修改密码</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </ul>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px"
        ><AsideMenu :menuList="asideMenuList"></AsideMenu
      ></el-aside>
      <el-main class="content-wrapper">
        <el-tabs
          closable
          v-if="historyMenuItemList.length !== 0"
          :value="activeMenuPath"
          type="border-card"
          :before-leave="handleBeforeLeave"
          @tab-click="handleClickTab"
          @tab-remove="handleRmoveTab"
          style="box-shadow: none"
        >
          <el-tab-pane
            v-for="item in historyMenuItemList"
            :key="item.path"
            :name="item.path"
            :label="item.meta.toolTip | tabPaneLabel"
            >{{ item.meta.toolTip }}</el-tab-pane
          >
        </el-tabs>
        <div class="router-view">
          <!-- 解决缓存问题，加到 keep-alive中 :include="cachedViews"
          需要路由页面加 name
           -->
          <keep-alive :include="cachedViews"
            ><router-view :key="$route.path"></router-view
          ></keep-alive>
        </div>
      </el-main>
    </el-container>
    <el-dialog
      center
      width="650px"
      title="修改密码"
      @closed="handleCancel"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="formData"
        :rules="rules"
        label-width="100px"
        ref="formRef"
        class="detail-form"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            show-password
            type="password"
            v-model="formData.oldPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            show-password
            type="password"
            v-model="formData.newPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmNewPassword">
          <el-input
            show-password
            type="password"
            v-model="formData.confirmNewPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleChangePassword('formData')"
            >提交</el-button
          >
          <el-button @click="handleCancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>
<script>
import request from "@/config/serve.js";
import storage from "@/common/utils/storage";
import AsideMenu from "./AsideMenu.vue";
export default {
  components: { AsideMenu },
  data() {
    return {
      activeIndex: 0, // 当前激活的一级菜单index
      activeMenu: this.$route.path, // 正在访问的菜单路径
      dialogVisible: false, // 修改密码弹框显示与隐藏
      formData: {},
      rules: {
        oldPassword: [{ required: true, message: "请输入原密码" }],
        newPassword: [{ required: true, message: "请输入新密码" }],
        confirmNewPassword: [{ required: true, message: "请确认新密码" }],
      },
    };
  },

  created() {
    this.init();
    this.initPower();
  },
  computed: {
    //根据组件name缓存指定的页面组件
    cachedViews() {
      const historyMenuItemList = this.$store.state.historyMenuItemList || [];
      let cachedViews = [];
      historyMenuItemList.map((h) => {
        if (h.name) {
          cachedViews.push(h.name);
        }
      });
      return cachedViews;
    },
    // 当前用户的所有菜单
    menuList() {
      return this.$store.state.menuList;
    },
    //当前用户访问过的菜单集
    historyMenuItemList() {
      return this.$store.state.historyMenuItemList;
    },
    // 正在访问的菜单路径
    activeMenuPath() {
      return this.$store.state.activeMenuPath;
    },
    // 当前用户信息
    userInfo() {
      return this.$store.state.userInfo;
    },
    // 左侧栏菜单
    asideMenuList() {
      return this.menuList[this.activeIndex].items || [];
    },
  },

  filters: {
    tabPaneLabel(toolTip) {
      return toolTip.split(">").pop();
    },
  },
  methods: {
    initPower() {
      let menuList = JSON.parse(JSON.stringify(this.$store.state.menuList));
      let path = this.$route.path;
      // 若该路由不属于菜单路由，则将取出它的菜单路由
      if (this.$route.meta && this.$route.meta.subPage) {
        path = this.$route.meta.propMenu;
      }
      let route;
      menuList.forEach((item) => {
        item.items.forEach((itm) => {
          itm.items.forEach((it) => {
            if (it.path == path) route = it;
          });
        });
      });
      let powerBtn =
        route && route.items ? route.items.map((item) => item.action) : [];
      this.$store.commit("changebtnPermissions", powerBtn);
    },
    handledSensitiveTaboo() {
      const routeUrl = this.$router.resolve({
        path: "/sensitiveTaboo",
      });
      window.open(routeUrl.href, "_blank");
    },
    // 事件监听
    // 选择一级菜单触发事件
    handleSelectMenu(index) {
      if (index === this.activeIndex) return; // 一级菜单未发生改变时不需要执行任何操作
      this.$store.commit("clearHistoryMenu"); // 清空历史菜单
      this.activeIndex = index;
      this.toFirstPath(); // 跳转至第一个路由
    },
    // 解决组件部署离开页面造成的误选中问题 --- swx
    handleBeforeLeave(path) {
      if (this.$route.path !== path) {
        return false;
      } else {
        return true;
      }
    },
    // 通过标签切换菜单
    handleClickTab(tab) {
      this.$router.push(tab.name);
    },
    // 删除标签
    handleRmoveTab(name) {
      const maxLength = this.historyMenuItemList.length;
      if (maxLength == 1) return; //仅剩一个 不让删
      const deleteIndex = this.historyMenuItemList.findIndex(
        (i) => i.path === name
      );
      //删除当前选中的tab
      if (name === this.activeMenuPath) {
        //若是子页面，则返回上级页面
        const deleteItem = this.historyMenuItemList[deleteIndex];
        if (deleteItem.meta && deleteItem.meta.subPage) {
          this.$router.go(-1);
        } else {
          //否则优先设置成下一个 如果下一个没有 设置为前一个
          let nextPathIndex = 0;
          if (deleteIndex < maxLength - 1) {
            nextPathIndex = deleteIndex + 1;
          } else {
            nextPathIndex = deleteIndex - 1;
          }
          this.$router.push(this.historyMenuItemList[nextPathIndex].path);
        }
      }
      this.$store.commit("deleteHistoryMenu", deleteIndex);
    },
    handleChangePassword() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const data = this.formData;
          if (data.newPassword !== data.confirmNewPassword) {
            this.$message.error("新密码和确认密码不一致");
          } else {
            this.changePassword({ ...data, id: this.userInfo.userId });
          }
        } else {
          this.$message.error("请检查输入的数据");
        }
      });
    },
    handleCancel() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
    },
    // 后端请求
    // 退出登录
    async loginOut() {
      const res = await request("get", "/safe/logout", {
        token: this.userInfo.token,
      });
      if (res && res.code == 0) {
        storage.clearSession(); // 清除存储在localStorage里的信息
        this.$store.commit("clearHistoryMenu"); // 清空历史菜单
        if (this.$route.name == "login") return; // 当前已经是登陆页时不做跳转
        this.$router.push("login"); // 跳转登录页
      }
    },
    async changePassword(data) {
      const res = await await request("post", "/safe/updatePassword", data);
      if (res && res.code === 0) {
        this.dialogVisible = false;
        this.$message.success("修改密码成功，请用新密码重新登录");
        this.loginOut();
      }
    },
    // 其他
    init() {
      //初始化菜单
      const menu = storage.getPowerTree();
      this.$store.commit("initMenuList", menu);
      this.initActiveIndex();
      // 保存历史菜单
      this.$store.dispatch("pushHistoryMenu", {
        name: this.$route.name,
        path: this.$route.path,
        meta: this.$route.meta || {},
      });
      // 保存当前激活的路径
      this.$store.commit("changeActiveMenuPath", this.$route.path);
      //获取登录后的用户信息，并保存到store里
      this.$store.commit("setUserInfo", storage.getUserInfo());
      // this.toFirstPath(); // 跳转至第一个路由
    },
    initActiveIndex() {
      let index = this.menuList.findIndex((item) => {
        return item.items.find((itm) => {
          return itm.items.find((it) => it.path == this.$route.path);
        });
      });
      if (index < 0) index = 0;
      this.activeIndex = index;
    },
    // 跳转至左侧菜单的第一个路由
    toFirstPath() {
      let path = "/"; // 跳转的路径
      if (this.asideMenuList.length !== 0) {
        const sub1MenuObj = this.asideMenuList[0];
        if (sub1MenuObj.items && sub1MenuObj.items.length !== 0) {
          path = sub1MenuObj.items[0].path;
        } else {
          path = sub1MenuObj.path || "/";
        }
      }
      this.$nextTick(function () {
        this.$router.push(path);
      });
    },
  },
  watch: {
    $route: function (to) {
      this.initPower();
      // 路由改变时激活菜单
      this.$store.commit("changeActiveMenuPath", to.path);
      this.$store.dispatch("pushHistoryMenu", {
        name: to.name,
        path: to.path,
        meta: to.meta || {},
      });
    },
  },
};
</script>
<style lang="scss" scope>
.el-container {
  height: 100%;
  overflow: hidden;
}
.el-header {
  background-color: #409eff;
  color: #fff;
  line-height: 50px;
  height: 50px !important;
}

.el-aside {
  height: calc(100vh-50px);
  background-color: #eee;
  overflow-x: hidden;
}

.el-main {
  background-color: #fff;
  padding: 0px;
}

.navbar {
  display: flex;
  position: relative;
  .logo {
    display: block;
    float: left;
    margin-top: 16px;
    margin-right: 30px;
    padding: 0 18px;
  }
  .navbar-right {
    right: 20px;
    position: absolute;
    top: 0;
  }
}
.navbar-nav {
  ul {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    li {
      color: #fff;
      height: 50px;
      padding: 0px 20px;
      line-height: 50px;
      font-size: 14px;
      cursor: pointer;
    }
    li:hover,
    li:active,
    .top-menu-active {
      background: #408eff;
    }
  }
}
.content-wrapper {
  display: flex;
  flex-direction: column;
}
.router-view {
  padding: 20px;
  overflow: auto;
  flex: 1;
}
</style>
