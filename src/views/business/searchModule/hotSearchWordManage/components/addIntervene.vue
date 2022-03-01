<template>
  <div class="dialog">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="Languagelist">
        <el-form-item
          label="手机型号："
          prop="channelId"
          style="margin: 50px 0"
        >
          <el-select
            v-model="ruleForm.channelId"
            placeholder="请选择手机型号"
            filterable
            clearable
          >
            <!-- @change="changedeviceName" -->
            <el-option
              :label="item.deviceName"
              :value="item.deviceName"
              v-for="(item, index) in moduleDataList"
              :key="index"
              :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="标题：" prop="title">
        <el-input
          v-model.trim="ruleForm.title"
          placeholder="请输入标题"
          :maxlength="50"
        ></el-input>
      </el-form-item>
      <div class="footerBtn">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="cancelForm('ruleForm')">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import {
  getScrollWordData,
  addScrollWordData,
  updateDevice,
} from "../../scrollWordManage/api.js";
export default {
  components: { PageTable },
  props: {
    AddinterveneData: {
      type: Object,
      default() {
        return {};
      },
    },
    moduleDataList: {
      type: Array,
      default() {
        return [];
      },
    },
    operationType: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      dialogVisible: "", //禁用提示框
      recover: false, //恢复使用提示框
      ruleForm: { title: "" }, //表单数据
      checkList: ["中文", "英文"], //语言复选框
      disabledDate: true,
      confirm: "1",
      value1: "",
      opacity: "",
      showLanguage: false,
      showcheckboxLaguage: false, //语言复选框选项隐藏
      modelTabelHead: [
        { key: "versionName", label: "ID", fixed: "left" },
        { key: "developerName", label: "语言" },
        { key: "userName", label: "滚动词" },
        { key: "release", label: "创建时间" },
        { key: "releaseTy", label: "修改时间" },
      ], //机型列表表格头部
      modelTabelList: {
        list: [{ versionName: "23", code: "3" }],
      }, //机型列表表格数据
      rules: {
        channelId: [
          { required: true, message: "请选择手机型号", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        // maxregion: [
        //   { required: true, message: "请选择最大版本", trigger: "blur" },
        // ],
        // minregion: [
        //   { required: true, message: "请选择最小版本", trigger: "blur" },
        // ],
      },
    };
  },
  watch: {
    AddinterveneData: {
      handler(newData, oldData) {
        this.ruleForm = newData;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 添加语言
    addLanguage() {
      this.showLanguage = true;
    },
    //禁用
    forbidden() {
      this.dialogVisible = true;
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
    },
    //恢复确定按钮
    recoverBtn() {
      this.recover = false;
    },
    // 提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.ruleForm.channelId = this.ruleForm.customerId;
          this.ruleForm.scene = 2;
          if (this.operationType == "add") {
            addScrollWordData(this.ruleForm).then((res) => {
              if (res && res.code === 0) {
                this.$emit("creadInit", false);
                this.$message.success(res.msg);
              }
            });
          } else if (this.operationType == "edit") {
            updateDevice(this.ruleForm).then((res) => {
              if (res && res.code === 0) {
                this.$emit("creadInit", false);
                this.$message.success(res.msg);
              }
            });
          }
        } else {
          // return false;
        }
      });
    },
    // 滚动词查询列表
    getScrollWordData(formInline) {
      getScrollWordData(formInline).then((res) => {
        let modelTabelList = {};
        if (res && res.code === 0) {
          modelTabelList.list = res.data.list;
          modelTabelList.total = res.data.total;
          // this.dialogAuditVisible = false;
          this.$emit("closedialog", false, modelTabelList);
          this.ruleForm = {};
        }
      });
    },
    //取消按钮
    cancelForm(formName) {
      this.$emit("closedialog", false);
      this.$refs[formName].resetFields();
    },
    selectTakeEffect() {
      if (this.ruleForm.takeEffect == 1) {
        this.disabledDate = true;
      } else {
        this.disabledDate = false;
      }
    },
    changedeviceName(val) {
      let deviceName = this.moduleDataList.find((item) => {
        return item.id == val;
      });
      this.ruleForm.deviceName = deviceName.deviceName;
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
  .footerBtn {
    margin-top: 80px;
    display: flex;
    justify-content: flex-end;
  }
  /deep/.el-select {
    width: 100%;
  }
  /deep/.el-input__inner {
    width: 100%;
  }
}
</style>
