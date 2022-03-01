<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="210px"
    class="detail-form"
    label-suffix=":"
  >
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
    <!-- <el-form-item label="HOME键请求接口时长" prop="homeRequestUpdate">
      <el-input
        :min="0"
        size="small"
        type="number"
        v-model.number="formData.homeRequestUpdate"
        placeholder="请输入数字"
      >
        <template slot="append">分钟</template>
      </el-input>
    </el-form-item> -->
    <el-form-item label="请求应用更新接口时长" prop="homeZeroUpdate">
      <el-input
        :min="0"
        size="small"
        type="number"
        v-model.number="formData.homeZeroUpdate"
        placeholder="请输入数字"
      >
        <template slot="append">分钟</template>
      </el-input>
    </el-form-item>
    <!-- <el-form-item label="请求开屏页时长" prop="homeAdUpdate">
      <el-input
        :min="0"
        size="small"
        type="number"
        v-model.number="formData.homeAdUpdate"
        placeholder="请输入数字"
      >
        <template slot="append">分钟</template>
      </el-input>
    </el-form-item> -->
    <el-form-item label="拉取市场配置时间间隔" prop="homeGetConf">
      <el-input
        :min="0"
        size="small"
        type="number"
        v-model.number="formData.homeGetConf"
        placeholder="请输入数字"
      >
        <template slot="append">分钟</template>
      </el-input>
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
  },
  data() {
    const checkNum = (rule, value, callback) => {
      // 校验数据大于0
      // eslint-disable-next-line no-useless-escape
      if (value && value < 0) {
        return callback(new Error("请输入大于或等于0的数字"));
      } else {
        callback();
      }
    };
    return {
      formData: { ...this.detailData },
      rules: {
        channelId: [
          { required: true, message: "请选择手机型号", trigger: "blur" },
        ],
        homeRequestUpdate: [
          {
            required: true,
            message: "请输入HOME键请求接口时长",
            trigger: "blur",
          },
          { validator: checkNum },
        ],
        homeZeroUpdate: [
          {
            required: true,
            message: "请输入请求自动更新应用接口时长",
            trigger: "blur",
          },
          { validator: checkNum },
        ],
        homeAdUpdate: [
          {
            required: true,
            message: "请输入请求开屏页时长",
            trigger: "blur",
          },
          { validator: checkNum },
        ],
        homeGetConf: [
          {
            required: true,
            message: "请输入拉取市场配置时间间隔",
            trigger: "blur",
          },
          { validator: checkNum },
        ],
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
