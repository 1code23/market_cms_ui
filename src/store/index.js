import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import {
  getLanguageList,
  queryDeviceList,
  queryAssemblyStyleList,
} from "../api/common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: [], // 当前用户的所有菜单
    historyMenuItemList: [], //当前用户访问过的菜单集
    activeMenuPath: "/", // 正在访问的菜单路径
    userInfo: null, //当前用户信息
    btnPermissions: [], // 当前用户在当前路由拥有的操作的权限
    localLanguageIdList: [], // 应用信息中可本地化的语言id列表
    languageList: [], //语言列表
    deviceList: [], //机型列表
    assemblyStyleList: [], //组件样式列表
  },
  mutations: {
    // 修改state中属性key的值为value
    updateState(state, [key, value]) {
      state[key] = value;
    },
    // 添加历史菜单
    pushHistoryMenu(state, menuItem) {
      state.historyMenuItemList.push(menuItem);
    },
    // 删除历史菜单中第index项
    deleteHistoryMenu(state, index) {
      state.historyMenuItemList.splice(index, 1);
    },
    // 清空历史菜单
    clearHistoryMenu(state) {
      state.historyMenuItemList = [];
    },
    // 修改正在访问的菜单路径
    changeActiveMenuPath(state, path) {
      state.activeMenuPath = path;
    },
    // 修改当前登录的用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    initMenuList(state, data) {
      state.menuList = data;
    },
    changebtnPermissions(state, data) {
      state.btnPermissions = data;
    },
    UPDATE_LANGUAGE_LIST(state, data) {
      state.languageList = data;
    },
    UPDATE_DEVICE_LIST(state, data) {
      state.deviceList = data;
    },
    UPDATE_ASSEMBLY_STYLE_LIST(state, data) {
      state.assemblyStyleList = data;
    },
  },
  actions: {
    // 添加历史菜单
    pushHistoryMenu({ commit, state }, menuItem) {
      if (!(menuItem.meta && menuItem.meta.toolTip)) return; // 没有描述的路由不添加
      //判断需要添加的路由是否已经存在
      let isExist =
        state.historyMenuItemList.findIndex(
          (item) => item.path == menuItem.path
        ) !== -1;
      if (isExist) {
        // 对于已经存在的路由不需要添加
        return;
      } else {
        // 添加不存在的添加
        commit("pushHistoryMenu", menuItem);
      }
    },
    /**
     * 更新语言列表方法，修改语言时可以使用 this.$store.dispatch('UPDATE_LANGUAGE_LIST',list)修改
     * 当语言列表为空时，更新语言列表。有的时候不会更新
     * list 需要修改和更新全局数据的变量 ----swx
     */
    updateLanguageList({ commit, state }, list) {
      return new Promise((resolve, reject) => {
        if (list) {
          commit("UPDATE_LANGUAGE_LIST", list);
          resolve(list);
          return;
        }
        if (state.languageList.length) {
          resolve(state.languageList);
        } else {
          getLanguageList()
            .then((res) => {
              commit("UPDATE_LANGUAGE_LIST", res.data || []);
              resolve(res.data || []);
            })
            .catch((err) => {
              console.log(err);
              reject([]);
            });
        }
      });
    },

    /**
     *
     * 更新机型列表方法 --- swx
     * update 是否更新机型列表
     */
    updateDeviceList({ commit, state }, update = false) {
      return new Promise((resolve, reject) => {
        if (state.deviceList.length && !update) {
          resolve(state.deviceList);
        } else {
          //查1000条机型
          let params = {
            page: 1,
            size: 1000,
          };
          queryDeviceList(params)
            .then((res) => {
              commit("UPDATE_DEVICE_LIST", res.data.list || []);
              resolve(res.data.list || []);
            })
            .catch((err) => {
              console.log(err);
              reject([]);
            });
        }
      });
    },
    /**
     *
     * 更新组件样式列表方法 --- swx
     */
    updateAssemblyStyleList({ commit, state }, list) {
      return new Promise((resolve, reject) => {
        if (list) {
          commit("UPDATE_ASSEMBLY_STYLE_LIST", list);
          resolve(list);
          return;
        }
        if (state.assemblyStyleList.length) {
          resolve(state.assemblyStyleList);
        } else {
          queryAssemblyStyleList({})
            .then((res) => {
              commit("UPDATE_ASSEMBLY_STYLE_LIST", res.data || []);
              resolve(res.data || []);
            })
            .catch((err) => {
              console.log(err);
              reject([]);
            });
        }
      });
    },
  },
  modules: {},
  getters,
});
