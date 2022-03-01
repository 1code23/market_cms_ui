<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="140px"
    class="detail-form"
    label-suffix=":"
  >
    <el-form-item label="市场名称" prop="marketName">
      <el-input
        v-model.trim="formData.marketName"
        placeholder="请输入市场名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="市场版本" prop="versionCode">
      <el-input
        :disabled="disabled"
        v-model.trim="formData.versionCode"
        placeholder="请输入市场版本号"
      ></el-input>
    </el-form-item>
    <el-form-item label="生效语言" prop="effLanguage">
      <el-select
        multiple
        filterable
        size="small"
        v-model="formData.effLanguage"
        placeholder="请选择语言"
      >
        <el-option
          v-for="item in languageList"
          :key="item.languageType"
          :label="item.languageName"
          :value="item.languageType"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="市场描述" prop="description">
      <el-input
        :rows="5"
        type="textarea"
        size="small"
        v-model="formData.description"
        placeholder="请输入市场描述"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleSubmit()"
          >确定</el-button
        >
        <el-button size="small" @click="handleCancel()">取消</el-button>
      </el-form-item>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
    operationType: { default: "" },
    languageList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      formData: { ...this.detailData },
      rules: {
        marketName: [{ required: true, message: "请输入市场名称" }],
        versionCode: [{ required: true, message: "请输入市场版本号" }],
        effLanguage: [{ required: true, message: "请选择语言" }],
      },
    };
  },
  computed: {
    disabled() {
      return ["edit", "copy"].includes(this.operationType);
    },
    marketStyleList() {
      return (
        (
          this.marketTypeList.find((i) => i.key == this.formData.marketType) ||
          {}
        ).sub || []
      );
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formData);
        } else {
          this.$message.error("请检查输入的数据");
        }
      });
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
  watch: {
    detailData(data) {
      this.formData = { ...data };
      if (this.operationType === "create") {
        this.$refs.formRef.resetFields();
      }
    },
  },
};
</script>
