<template>
  <div id="addEditdialog">
    <el-dialog
      :title="dialogName"
      :visible.sync="dialogVisible"
      width="40%"
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
        <el-form-item label="手机型号：" prop="channelId" label-width="23%">
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
        <el-form-item label="标题：" prop="adTitle" label-width="23%">
          <el-input
            v-model.trim="ruleData.adTitle"
            placeholder="请输入标题"
            :maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="检测时间段：" label-width="23%" required>
          <el-radio-group v-model="resource" @change="changeRadio">
            <el-radio label="1">全选</el-radio>
            <el-radio label="0">全取消</el-radio>
          </el-radio-group>
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                :label="item"
                v-for="(item, index) in datatime"
                :key="index"
                width="220px"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item
          label="配置生效起始版本号："
          label-width="23%"
          required=""
        >
          <el-col :span="12">
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
          <el-col :span="12">
            <el-form-item prop="marketMax">
              <el-select
                v-model="ruleData.marketMax"
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
        model: "",
        maxregion: "",
        channelId: "",
        versionCode: "",
        marketMax: "",
      },

      rules: {
        channelId: [{ required: true, message: "请选择", trigger: "change" }],
        adTitle: [{ required: true, message: "请输入标题", trigger: "change" }],
        marketId: [
          {
            required: true,
            message: "请选择配置生效起始版本号",
            trigger: "change",
          },
        ],
        marketMax: [
          {
            required: true,
            message: "请选择配置生效起始版本号",
            trigger: "change",
          },
        ],
      },
      resource: "",
      options: [],
      datatime: [
        "0点",
        "1点",
        "2点",
        "3点",
        "4点",
        "5点",
        "6点",
        "7点",
        "8点",
        "9点",
        "10点",
        "11点",
        "12点",
        "13点",
        "14点",
        "15点",
        "16点",
        "17点",
        "18点",
        "19点",
        "20点",
        "21点",
        "22点",
        "23点",
      ],
      checkList: [],
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
      this.ruleData.versionCode = parseInt(this.ruleData.versionCode);
      if (this.dialogName == "新增") {
        this.checkList = [];
      } else {
        this.ruleData = JSON.parse(JSON.stringify(this.$props.formParams));
        // this.ruleData.channelId = parseInt(this.ruleData.channelId);
        this.getSelectState(this.ruleData.timeArea.split(""));
      }
    },
    dialogVisibleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if (this.checkList.length == 0) {
          //   this.$message.error("请选择开启时间区域");
          // } else {
          if (this.checkList.length == 0) {
            this.ruleData.timeArea = "000000000000000000000000";
          } else {
            let timeArea = this.getSelect().join("");
            this.ruleData.timeArea = timeArea;
          }
          // this.ruleData.channelId = parseInt(this.ruleData.channelId);
          if (
            Number(this.ruleData.marketMax) < Number(this.ruleData.marketId)
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
          // }
        } else {
          return false;
        }
      });
    },
    changeRadio(val) {
      if (val == "1") {
        this.resource = "1";
        this.checkList = this.datatime;
      } else {
        this.checkList = [];
      }
    },
    closeDialog() {
      this.ruleData = {
        model: "",
        maxregion: "",
        channelId: "",
        versionCode: "",
        marketMax: "",
        marketId: "",
      };
      this.$refs.ruleForm.resetFields();
    },
    getSelect() {
      let array = [];
      let allArray = this.datatime; //原数组
      let selecterArray = this.checkList; //选择的数据
      for (let i = 0; i < allArray.length; i++) {
        for (let j = 0; j < selecterArray.length; j++) {
          if (selecterArray[j] === allArray[i]) {
            array[i] = 1;
            break;
          } else {
            array[i] = 0;
          }
        }
      }
      return array;
    },
    getSelectState(val) {
      let selecterArray = val; //选择的数据
      for (var i = 0; i < selecterArray.length; i++) {
        if (selecterArray[i] == 1) {
          selecterArray[i] = i + "点";
        }
      }
      for (let i = selecterArray.length - 1; i >= 0; i--) {
        if (selecterArray[i] === "0") {
          selecterArray.splice(i, 1);
        }
      }
      this.checkList = selecterArray;
    },
  },
  watch: {
    checkList(newData, oldData) {
      if (newData.length == 0) {
        this.resource = "0";
      } else if (newData.length != 0 && newData.length != 24) {
        this.resource = "";
      } else if (newData.length == 24) {
        this.resource = "1";
      }
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
  /deep/ .el-checkbox {
    width: 16.6%;
  }
}
</style>
