<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="200px"
    class="detail-form"
    label-suffix=":"
  >
    <el-form-item label="市场名称" prop="marketId">
      <el-select
        size="small"
        filterable
        v-model="formData.marketId"
        placeholder="请选择市场名称"
      >
        <el-option
          v-for="item in marketList"
          :key="item.marketId"
          :label="item.marketName"
          :value="item.marketId"
        >
          <span>
            {{ item.marketName }} -- {{ item.marketId }} --
            {{ item.versionCode }}
          </span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="手机型号" prop="channelId">
      <el-select
        size="small"
        filterable
        v-model="formData.channelId"
        placeholder="请选择手机型号"
      >
        <el-option
          v-for="item in deviceList"
          :key="item.id"
          :value="item.deviceName"
          :label="item.deviceName"
          :disabled="item.status !== 0"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input
        size="small"
        type="textarea"
        :rows="5"
        v-model="formData.remarks"
        placeholder="请输入备注"
      ></el-input>
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
export default {
  props: {
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
    operationType: { default: "" },
    deviceList: {
      type: Array,
      default() {
        return [];
      },
    },
    marketList: {
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
        channelId: [
          { required: true, message: "请选择手机型号", trigger: "blur" },
        ],
        marketId: [{ required: true, message: "请选择市场", trigger: "blur" }],
      },
    };
  },
  computed: {
    disabled() {
      return this.operationType === "edit";
    },
  },
  mounted() {
    this.getRandTimeList();
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
    getRandTimeList() {
      const randTimeList = new Array(24).fill(0);
      for (let i in randTimeList) {
        randTimeList[i] = parseInt(i);
      }
      this.randTimeList = randTimeList;
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
