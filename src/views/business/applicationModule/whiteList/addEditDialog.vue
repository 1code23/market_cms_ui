<template>
  <div id="addEditdialog">
    <el-dialog
      :title="dialogName"
      :visible.sync="dialogVisible"
      width="40%"
      center="center"
      @close="closeDialog"
    >
      <el-form
        :model="ruleData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="应用名称："
          prop="apkName"
          label-width="23%"
          class="inputClass"
        >
          <el-input
            v-model.trim="ruleData.apkName"
            placeholder="请输入应用名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="包名："
          prop="packageName"
          label-width="23%"
          class="inputClass"
        >
          <el-input
            v-model.trim="ruleData.packageName"
            placeholder="请输入包名"
          ></el-input>
        </el-form-item>
        <el-form-item class="footBtn">
          <el-button type="primary" @click="dialogVisibleSubmit('ruleForm')"
            >确 定</el-button
          >
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    formParams: {
      type: Object,
      default() {
        return {};
      },
    },
    dialogName: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      ruleData: {},
      rules: {
        packageName: [
          { required: true, message: "请输入包名", trigger: "blur" },
        ],
        apkName: [
          { required: true, message: "请输入应用名称", trigger: "blur" },
        ],
      },
      resource: "",
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
      this.ruleData = JSON.parse(JSON.stringify(this.$props.formParams));
    },
    dialogVisibleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogName == "编辑") {
            // 编辑
            this.$emit("submitBTN", false, this.ruleData);
            this.dialogVisible = false;
          } else {
            // 新增
            this.$emit("submitBTN", true, this.ruleData);
            this.dialogVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    closeDialog() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style scoped lang="scss">
#addEditdialog {
  .footBtn {
    display: flex;
    justify-content: flex-end;
    margin-top: 100px;
    margin-right: 50px;
  }
  .inputClass {
    margin-top: 10%;
  }
  /deep/ .el-input {
    width: 80%;
  }
}
</style>
