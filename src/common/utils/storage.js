import {
  USERINFO,
  LASTTIME,
  TIMEOUT,
  POWERTREE,
} from "@/common/constant/constant.js";

const storage = Object.create({
  // 将信息保存到localStorage
  setItem(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  // 获取localStorage里的信息
  getItem(key, defaultValue) {
    let value = localStorage.getItem(key);
    try {
      value = JSON.parse(value);
      // eslint-disable-next-line no-empty
    } catch {}
    return value || defaultValue;
  },
  // 移除localStorage里的信息
  removeItem(key) {
    localStorage.removeItem(key);
  },
  // 清除存储在localStorage里的信息
  clearSession() {
    localStorage.clear();
  },

  // 保存当前登录的用户信息
  setUserInfo(userInfo) {
    this.setItem(USERINFO, userInfo);
  },
  // 保存当前登录的用户信息
  setPowerTree(menu) {
    this.setItem(POWERTREE, menu);
  },
  getPowerTree() {
    return this.getItem(POWERTREE);
  },
  // 获取用户信息
  getUserInfo() {
    return this.getItem(USERINFO);
  },
  // 保存最后一次点击的时间
  setLastTime(lastTime) {
    this.setItem(LASTTIME, lastTime);
  },
  // 获取最后一次点击的时间
  getLastTime() {
    return this.getItem(LASTTIME);
  },
  // 判断是否登录过
  isLogin() {
    const userInfo = this.getUserInfo();
    if (!userInfo) return false; // 无用户登录信息
    const currentTime = new Date().getTime(); //当前时间
    const lastTime = this.getLastTime(); //最后一次点击的时间
    if (currentTime - lastTime > TIMEOUT) {
      // 登录超时
      this.clearSession();
      return false;
    }
    return true;
  },
});

export default storage;
