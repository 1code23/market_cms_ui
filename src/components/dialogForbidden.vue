<template>
  <div class="dialog">
    <div style="font-size: 20px">
      <p>禁用后功能将不可用</p>
      <p style="margin: 20px 0">确认要禁用吗？</p>
    </div>
    <div class="dialogBtn">
      <el-button @click="dialogVisibleBtn">取 消</el-button>
      <el-button type="primary" @click="forbiddenBtn">确 定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: "", //禁用提示框
      recover: false, //恢复使用提示框
      confirm: "1",
    };
  },
  methods: {
    //禁用
    forbidden() {
      this.dialogVisible = true;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    dialogVisibleBtn() {
      this.$emit("dialogclose", false);
    },
    //禁用确定按钮
    forbiddenBtn() {
      //   this.dialogVisible = false;
      //   this.dialogVisibles = false;
      this.$emit("dialogclose", false, this.confirm);
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    //恢复
    recoverClose() {
      this.recover = true;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    //恢复确定按钮
    recoverBtn() {
      this.recover = false;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
  },
};
</script>
<style scoped lang="scss">
.dialog {
  position: relative;
  padding-bottom: 50px;
  width: 100%;
  .dialogBtn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
