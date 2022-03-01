<template>
  <div class="login">
    <div class="login-container">
      <el-form ref="form" :model="loginData" class="login-form">
        <el-form-item
          prop="userName"
          :rules="{ required: true, message: '用户名不能为空' }"
        >
          <el-input
            placeholder="用户名"
            v-model="loginData.userName"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="{ required: true, message: '请输入密码' }"
        >
          <el-input
            type="password"
            show-password
            placeholder="密码"
            v-model="loginData.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <div class="verification">
          <el-form-item
            prop="code"
            :rules="{ required: true, message: '请输入验证码' }"
          >
            <el-input
              style="width: 150px"
              placeholder="验证码"
              v-model="loginData.code"
              @keyup.enter.native="onSubmit"
            ></el-input>
          </el-form-item>
          <div @click="handleClickImg" class="verify-img cursor">
            <el-image :src="verifyCodeUrl" v-loading="imgLoading">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <!-- <img :src="verifyCodeUrl" alt="" /> -->
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import storage from "@/common/utils/storage";
import { base64ImgtoUrl } from "@/common/utils/utils.js";
import { getVerifyCode, login } from "./indexServe.js";
export default {
  name: "login",
  created() {
    this.getVerifyCode();
  },
  data() {
    return {
      loginData: {
        userName: "",
        password: "",
        code: "",
      },
      verifyCodeUrl: "",
      imgLoading: false,
    };
  },
  methods: {
    handleClickImg() {
      // 请求接口获取验证码的图片
      this.getVerifyCode();
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login(this.loginData);
        }
      });
    },

    async getVerifyCode() {
      this.imgLoading = true;
      const res = await getVerifyCode();
      this.imgLoading = false;
      if (res && res.code === 0) {
        const base64Img = "data:image/png;base64," + res.data;
        const url = base64ImgtoUrl(base64Img);
        this.verifyCodeUrl = url;
      }
    },
    async login(data) {
      try {
        const res = await login(data);
        if (res && res.code === 0) {
          const menu = res.data.menuTree;
          if (menu.length === 0) {
            this.$message.warning("您的账号没有任何菜单权限，请联系管理员");
            return;
          }
          storage.setUserInfo(res.data.user);
          storage.setPowerTree(menu);
          const lastPath = menu[0].items.length
            ? menu[0].items[0].items[0].path
            : menu[0].path;
          this.$router.push(lastPath);
        }
      } catch (err) {
        const res = JSON.parse(err.message);
        if (res && res.code === 407) {
          this.getVerifyCode();
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  width: 100%;
  background: url("~@/assets/images/login_bg.jpg") no-repeat 100%;
  background-size: 100%;
  opacity: 0.9;
}
.login-container {
  padding-top: 30vh;
  display: flex;
  justify-content: center;
}
.login-form {
  width: 300px;
  padding: 50px 50px 30px;
  border-radius: 20px; /* 圆角 */
  background: #fff;
}
.verification {
  display: flex;
  justify-content: space-between;
  .verify-img {
    width: 100%;
    /deep/.el-image {
      width: 130px;
      height: 38px;
      margin-left: 10px;
    }
  }
  .image-slot {
    font-size: 30px;
  }
}
</style>
