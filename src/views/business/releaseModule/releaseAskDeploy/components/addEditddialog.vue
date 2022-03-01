<template>
  <div id="addEditdialog">
    <el-dialog
      :title="dialogName"
      :visible.sync="dialogVisible"
      width="800px"
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
        <el-form-item label="标题：" prop="updateTitle" label-width="31%">
          <el-input
            v-model.trim="ruleData.updateTitle"
            placeholder="请输入标题"
            :maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机型号：" prop="channelId" label-width="31%">
          <el-select
            v-model="ruleData.channelId"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.deviceName"
              :value="item.deviceName"
              :disabled="item.status == 1"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="返回市场主页面时长："
          prop="returnMarketUpdate"
          label-width="31%"
        >
          <el-input
            v-model="ruleData.returnMarketUpdate"
            placeholder="请输入数字"
            ><template slot="append">分钟</template></el-input
          >
          <!-- onkeyup="this.value = this.value.replace(/[^0-9]/g,'');" -->
        </el-form-item>
        <el-form-item
          label="网络变化时长（需进入市场）："
          prop="wifiConnectionUpdate"
          label-width="31%"
        >
          <el-input
            v-model="ruleData.wifiConnectionUpdate"
            placeholder="请输入数字"
            ><template slot="append">分钟</template></el-input
          >
        </el-form-item>
        <el-form-item
          label="手机亮屏瞬间时长："
          prop="phoneBrightUpdate"
          label-width="31%"
        >
          <el-input
            v-model="ruleData.phoneBrightUpdate"
            placeholder="请输入数字"
            ><template slot="append">分钟</template></el-input
          >
        </el-form-item>
        <el-form-item label="配置生效起始版本号：" label-width="31%" required>
          <el-col :span="9">
            <el-form-item prop="marketId">
              <el-select
                v-model="ruleData.marketId"
                placeholder="最小版本"
                filterable
                clearable
              >
                <el-option
                  :label="item.versionCode"
                  :value="item.versionCode"
                  v-for="(item, index) in versionLists"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="maxMarketId">
              <el-select
                v-model="ruleData.maxMarketId"
                placeholder="最大版本"
                filterable
                clearable
              >
                <el-option
                  :label="item.versionCode"
                  :value="item.versionCode"
                  v-for="(item, index) in versionLists"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="备注：" prop="remarks" label-width="31%">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入备注"
            v-model="ruleData.remarks"
            :maxlength="250"
            :show-word-limit="true"
          >
          </el-input>
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["deviceList"]),
  },
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
    versionLists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      ruleData: {
        channelId: "",
        versionCode: "",
        remarks: "",
        marketId: "",
        returnMarketUpdate: "",
      },
      rules: {
        // model: [{ required: true, message: "请选择", trigger: "blur" }],
        returnMarketUpdate: [
          {
            required: true,
            message: "请输入返回市场主页面时长",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]{1,9}$/,
            message: "请输入不大于9位的数字",
          },
        ],
        wifiConnectionUpdate: [
          { required: true, message: "请输入网络变化时长", trigger: "blur" },
          {
            pattern: /^[0-9]{1,9}$/,
            message: "请输入不大于9位的数字",
          },
        ],
        updateTitle: [
          { required: true, message: "请输入标题", trigger: "blur" },
        ],
        phoneBrightUpdate: [
          {
            required: true,
            message: "请输入手机亮屏瞬间时长",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]{1,9}$/,
            message: "请输入不大于9位的数字",
          },
        ],
        // remarks: [
        //   {
        //     pattern: "/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{1,10})?$/",
        //     message: "标题最大录入 50 个字符",
        //   },
        // ],
        channelId: [{ required: true, message: "请选择", trigger: "change" }],
        marketId: [
          {
            required: true,
            message: "请选择配置生效最小版本号",
            trigger: "change",
          },
        ],
        maxMarketId: [
          {
            required: true,
            message: "请选择配置生效最大版本号",
            trigger: "change",
          },
        ],
      },
      resource: "",
      options: [],
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
      // this.ruleData.versionCode = parseInt(this.ruleData.versionCode);
      if (this.dialogName == "新增") {
        // this.ruleData.maxMarketId = "";
      } else {
        this.ruleData = JSON.parse(JSON.stringify(this.$props.formParams));
        // this.ruleData.channelId = parseInt(this.ruleData.channelId);
      }
    },
    dialogVisibleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.ruleData.channelId = parseInt(this.ruleData.channelId);
          if (
            Number(this.ruleData.maxMarketId) < Number(this.ruleData.marketId)
          ) {
            this.$message.error("最大版本号不能小于最小版本号");
          } else {
            if (this.dialogName == "新增") {
              this.$emit("submitBTN", true, this.ruleData);
            } else {
              this.$emit("submitBTN", false, this.ruleData);
            }
            this.dialogVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    closeDialog() {
      this.ruleData = {};
      this.$refs.ruleForm.resetFields();
    },
  },
  created() {
    this.$store.dispatch("updateDeviceList");
  },
};
</script>
<style scoped lang="scss">
#addEditdialog {
  .footBtn {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }
  /deep/ .el-textarea {
    width: 60%;
  }
  /deep/ .el-input {
    width: 60%;
  }
  /deep/ .el-select {
    width: 60%;
    .el-input {
      width: 100%;
    }
  }
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
}
</style>
