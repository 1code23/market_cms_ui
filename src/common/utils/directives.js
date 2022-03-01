export default {
  has: {
    inserted: function (el, binding, vnode) {
      // 获取按钮权限
      const btnPermissions = vnode.context.$store.state.btnPermissions;
      const hasPer = btnPermissions.includes(binding.value);
      if (!hasPer) {
        el.parentNode.removeChild(el); // 无权限时直接移除该元素
      }
    },
  },
};
