<template>
  <div id="addEditdialog">
    <el-dialog
      :title="dialogName"
      :visible.sync="dialogVisible"
      width="30%"
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
        <el-form-item label="系统版本号：" prop="sdkVersion" label-width="23%">
          <el-input
            v-model.trim="ruleData.sdkVersion"
            placeholder="请输入系统版本号"
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
      ruleData: { sdkVersion: "" },
      rules: {
        sdkVersion: [
          { required: true, message: "请输入系统版本号", trigger: "blur" },
        ],
      },
      resource: "",
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
      if (this.dialogName == "新增") {
        this.ruleData.sdkVersion = "";
      } else {
        this.ruleData = JSON.parse(JSON.stringify(this.$props.formParams));
      }
    },
    dialogVisibleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogName == "新增") {
            this.$emit("submitBTN", true, this.ruleData);
            this.dialogVisible = false;
          } else {
            this.$emit("submitBTN", false, this.ruleData);
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
    margin-top: 70px;
  }
  /deep/ .el-checkbox {
    width: 16.6%;
  }
  .demo-ruleForm {
    margin-top: 50px;
  }
}
</style>
