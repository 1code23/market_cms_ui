export default {
  data() {
    return {
      sortNumber: null,
    };
  },
  methods: {
    handleClickIndex(item, index) {
      item.showInput = true;
      this.$set(this.dragList, index, item);
      this.dragList.forEach((i, d) => {
        if (d === index) {
          i.showInput = true;
        } else {
          i.showInput = false;
        }
      });
      this.$nextTick(() => {
        document.getElementById("sortNumber").focus();
      });
    },
    handleEnterIndex(item, index) {
      if (!Number(this.sortNumber) || Number(this.sortNumber) < 0) {
        this.$message.warning("请输入正整数的数字");
        return;
      }
      this.dragList.splice(index, 1);
      this.dragList.splice(this.sortNumber - 1, 0, item);
      item.showInput = false;
      this.sortNumber = null;
    },
    handleBlurIndex(item, index) {
      item.showInput = false;
      //因为单修改属性视图不会更新，所以通过改变数组实现视图更新
      this.dragList.splice(index, 0);
      this.sortNumber = null;
      // this.$set(this.dragList, index, item);
    },
  },
};
