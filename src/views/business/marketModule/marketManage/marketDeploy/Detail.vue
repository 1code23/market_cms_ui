<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="200px"
    class="detail-form"
    label-suffix=":"
  >
    <el-form-item label="市场ID" prop="marketId">
      {{ formData.marketId }}
    </el-form-item>
    <el-form-item label="父页面名称" prop="parentName" v-if="formData.parentId">
      {{ formData.parentName }}
    </el-form-item>
    <el-form-item label="页面等级" prop="deep">
      {{ formData.deep | typeDesc(pageDeepList) }}
    </el-form-item>
    <el-form-item label="页面名称" prop="pageName">
      <el-input
        size="small"
        v-model.trim="formData.pageName"
        placeholder="请输入页面名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="页面类型" prop="pageType">
      <el-radio-group v-model="formData.pageType" size="small">
        <el-radio
          v-for="item in pageTypeList"
          :key="item.key"
          :label="item.key"
          v-show="!(formData.deep > 1 && [2, 5, 6, 7].includes(item.key))"
          >{{ item.value }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="" prop="isExternalRes" v-if="formData.pageType === 8">
      <el-radio-group v-model="formData.isExternalRes" size="small">
        <el-radio :label="0">自定义</el-radio>
        <el-radio :label="1">策略榜单</el-radio>
      </el-radio-group>
      <el-select
        size="small"
        class="mhor10"
        placeholder="请选择策略"
        v-if="formData.isExternalRes"
        v-model="formData.externalResId"
      >
        <el-option
          v-for="item in strategyList"
          :key="item.rankId"
          :label="item.rankName"
          :value="item.rankId"
          :disabled="item.isOnline == -1"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="" prop="pageUrl" v-if="formData.pageType === 9">
      <el-input
        size="small"
        v-model="formData.pageUrl"
        placeholder="请输入页面地址"
      ></el-input>
    </el-form-item>
    <el-form-item label="显示顺序" prop="displaySort">
      <el-input
        type="number"
        size="small"
        :min="1"
        :max="10000"
        v-model.number="formData.displaySort"
        placeholder="请输入显示顺序"
      ></el-input>
    </el-form-item>
    <el-form-item prop="adHistory" label="是否同步历史版本">
      <el-radio-group v-model="formData.adHistory">
        <el-radio
          size="small"
          v-for="item in booleanList"
          :key="item.key"
          :label="item.key"
          >{{ item.value }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="" prop="historyList" v-if="formData.adHistory">
      <SelectMarket
        :marketList="historyVersionList"
        @selection-change="handleSelectionChange"
      ></SelectMarket>
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
import {
  booleanList,
  pageTypeList,
  pageDeepList,
} from "@/common/constant/constant.js";
import SelectMarket from "./SelectMarket.vue";
export default {
  components: { SelectMarket },
  props: {
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
    operationType: { default: "" },
    historyVersionList: {
      type: Array,
      default() {
        return [];
      },
    },
    strategyList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    const checkSort = (rule, value, callback) => {
      // 校验数据大于0小于10000
      // eslint-disable-next-line no-useless-escape
      if (value && 0 < value && value < 10000) {
        callback();
      } else {
        return callback(new Error("请输入大于0，且小于10000的数字"));
      }
    };
    return {
      booleanList,
      pageTypeList,
      pageDeepList,
      formData: { ...this.detailData },
      rules: {
        parentName: [{ required: true, message: "请输入父页面名称" }],
        pageName: [{ required: true, message: "请输入页面名称" }],
        deep: [{ required: true, message: "请选择页面等级" }],
        pageType: [{ required: true, message: "请选择类型" }],
        displaySort: [
          { required: true, message: "请输入显示顺序" },
          { validator: checkSort },
        ],
        isExternalRes: [{ required: true, message: "请选择是否加载外部资源" }],
      },
    };
  },
  computed: {
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
    handleSelectionChange(val) {
      this.formData.historyList = val;
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
