<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="120px"
    class="detail-form"
    label-suffix=":"
  >
    <el-form-item label="榜单名称" prop="rankName">
      <el-input
        size="small"
        v-model.trim="formData.rankName"
        placeholder="请输入榜单名称"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="榜单类型" prop="strategyType">
      <el-select
        size="small"
        filterable
        v-model="formData.strategyType"
        placeholder="请选择榜单类型"
      >
        <el-option
          v-for="item in rankingTypeList"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="资源类型" prop="resType">
      <el-select
        size="small"
        filterable
        v-model="formData.resType"
        placeholder="请选择资源类型"
      >
        <el-option
          v-for="item in appTypeList"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="handleSubmit()"
        >确定</el-button
      >
      <el-button size="small" @click="handleCancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { appTypeList, rankingTypeList } from "@/common/constant/constant.js";
export default {
  props: {
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
    operationType: { default: "" },
  },
  data() {
    return {
      appTypeList,
      rankingTypeList,
      formData: { ...this.detailData },
      rules: {
        rankName: [{ required: true, message: "请输入榜单名称" }],
        strategyType: [{ required: true, message: "请选择榜单类型" }],
        resType: [{ required: true, message: "请选择资源类型" }],
      },
    };
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
