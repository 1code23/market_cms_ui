<template>
  <el-menu
    router
    unique-opened
    background-color="#eee"
    :default-active="activeMenuPath"
  >
    <el-submenu
      v-for="submenu in menuList"
      :key="submenu.text"
      :index="submenu.text"
    >
      <template slot="title">
        <span>{{ submenu.text }}</span>
      </template>
      <template v-if="submenu.items">
        <el-menu-item
          v-for="item in submenu.items"
          :key="item.path"
          :index="item.path"
          :route="item.path"
        >
          {{ item.text }}
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    // 正在访问的菜单路径
    activeMenuPath() {
      return this.$store.state.activeMenuPath;
    },
  },
};
</script>
