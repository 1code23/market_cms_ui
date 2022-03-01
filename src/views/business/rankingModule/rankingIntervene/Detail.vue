<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="120px"
    label-suffix=":"
  >
    <el-form-item
      class="required-class"
      prop="apkId"
      ref="appRef"
      label="选择应用"
      :show-message="false"
    >
      <div style="margin-bottom: 10px">{{ formData.apkName }}</div>
      <AppListRadio
        v-model="formData.apkId"
        @current-change="handleChangeApp"
      ></AppListRadio>
    </el-form-item>
    <el-form-item label="选择榜单" prop="rankId" class="form-item-width">
      <el-select
        size="small"
        filterable
        v-model="formData.rankId"
        placeholder="请选择榜单"
      >
        <el-option
          v-for="item in strategyList"
          :key="item.rankId"
          :label="item.rankName"
          :value="item.rankId"
          :disabled="item.isOnline === -1"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="干预位置" prop="sort" class="form-item-width">
      <el-input
        :min="1"
        :max="10000"
        size="small"
        type="number"
        v-model.number="formData.sort"
        placeholder="请输入数字"
      >
      </el-input>
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
import AppListRadio from "@/components/appListRadio.vue";
export default {
  components: { AppListRadio },
  props: {
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
    operationType: { default: "" },
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
      formData: { ...this.detailData },
      rules: {
        rankId: [{ required: true, message: "请选择榜单" }],
        sort: [
          { required: true, message: "请输入干预位置" },
          { validator: checkSort },
        ],
        // apkId: [{ required: true, message: "请选择应用", trigger: "change" }],
      },
    };
  },
  computed: {
    disabled() {
      return this.operationType === "edit";
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (!this.formData.apkId && this.formData.apkId != 0) {
            this.$message.error("请选择应用");
          } else {
            this.$emit("submit", this.formData);
          }
        } else {
          this.$message.error("请检查输入的数据");
        }
      });
    },
    handleCancel() {
      this.$emit("cancel");
    },
    handleChangeApp(row) {
      this.$refs.appRef.clearValidate();
      this.formData.packageName = row.packageName;
      this.formData.apkName = row.apkName;
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
<style lang="scss" scoped>
.form-item-width {
  /deep/.el-input {
    width: 350px;
  }
}
</style>
