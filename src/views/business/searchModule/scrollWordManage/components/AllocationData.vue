<template>
  <div class="dialog">
    <el-row>
      <el-col :span="24"
        ><el-button
          type="primary"
          icon="el-icon-plus"
          @click="addwords"
          size="small"
          >添加词语</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
export default {
  components: { PageTable },
  props: {
    AddinterveneData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: "", //禁用提示框
      recover: false, //恢复使用提示框
      ruleForm: { title: "" }, //表单数据
      checkList: ["中文", "英文"], //语言复选框
      region: [],
      maxregions: [],
      minregions: [],
      disabledDate: true,
      confirm: "1",
      value1: "",
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
        region: [{ required: true, message: "请选择语言", trigger: "blur" }],
        keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
        maxregion: [
          { required: true, message: "请选择最大版本", trigger: "blur" },
        ],
        minregion: [
          { required: true, message: "请选择最小版本", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.ruleForm.keyword = this.$props.AddinterveneData.title;
      this.ruleForm = this.$props.AddinterveneData;
    });
  },
  watch: {
    ruleForm: {
      handler(newName, oldName) {
        console.log(newName);
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
    // 编辑
    edit() {},
    // 删除
    remove() {},
    addwords() {},
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
    // 提交按钮
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     // alert("submit!");
      //     this.$emit("closedialog", false, this.ruleForm);
      //     this.ruleForm = {};
      //   } else {
      //     // return false;
      //   }
      // });
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
  .demo-ruleForm {
    width: 70%;
    margin: 0 auto;
  }
  .footerBtn {
    display: flex;
    justify-content: center;
  }
  .Languagelist {
    display: flex;
    justify-content: space-between;
  }
}
</style>
