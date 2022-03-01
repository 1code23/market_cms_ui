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
        <el-form-item label="手机型号：" prop="channelId" label-width="29%">
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
        <el-form-item label="标题：" prop="updateTitle" label-width="29%">
          <el-input
            v-model.trim="ruleData.updateTitle"
            placeholder="请输入标题"
            :maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="客户端版本号："
          prop="clientVersion"
          label-width="29%"
        >
          <el-select
            v-model="ruleData.clientVersion"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in clientVersion"
              :key="item.marketId"
              :label="item.versionCode"
              :value="item.versionCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上传APK包："
          prop="apkUrl"
          label-width="29%"
          style="margin-left: 0"
        >
          <el-input v-model="ruleData.apkUrl" placeholder="APK地址">
            <UploadFile
              :acceptType="['apk']"
              @success="uploadSuccessApk"
              slot="append"
              type="apk"
            >
              <span slot="text">上传</span>
            </UploadFile>
          </el-input>
          <!-- <el-upload
            class="upload-demo inline-block"
            action="#"
            :http-request="handleHttpRequest"
            :show-file-list="false"
            v-loading="loading"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload> -->
        </el-form-item>
        <el-form-item label="配置生效起始版本号：" label-width="29%" required>
          <el-col :span="9">
            <el-form-item prop="fullversionUpgradestart">
              <el-select
                v-model="ruleData.fullversionUpgradestart"
                placeholder="最小版本"
                filterable
                clearable
              >
                <el-option
                  :label="item.versionCode"
                  :value="item.versionCode"
                  v-for="(item, index) in clientVersion"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="fullversionUpgradeend">
              <el-select
                v-model="ruleData.fullversionUpgradeend"
                placeholder="最大版本"
                filterable
                clearable
                style="margin-left: 20px"
              >
                <el-option
                  :label="item.versionCode"
                  :value="item.versionCode"
                  v-for="(item, index) in clientVersion"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="sdk起始版本号：" label-width="29%" required>
          <el-col :span="9">
            <el-form-item prop="sdkVersionStartBefore">
              <el-select
                v-model="ruleData.sdkVersionStartBefore"
                placeholder="最小版本"
                filterable
                clearable
              >
                <el-option
                  :label="item.sdkVersion"
                  :value="item.sdkVersion"
                  v-for="(item, index) in SDKList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="sdkVersionEndBefore">
              <el-select
                v-model="ruleData.sdkVersionEndBefore"
                placeholder="最大版本"
                filterable
                clearable
                style="margin-left: 20px"
              >
                <el-option
                  :label="item.sdkVersion"
                  :value="item.sdkVersion"
                  v-for="(item, index) in SDKList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="策略：" prop="updateStrategy" label-width="29%">
          <el-select
            v-model="ruleData.updateStrategy"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in updateStatus"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          label="新用户下发时间间隔（天）："
          prop="newuserTimeInterval"
          label-width="29%"
        >
          <el-input
            v-model="ruleData.newuserTimeInterval"
            placeholder="请输入新用户下发时间间隔"
          ></el-input>
          onkeyup="this.value = this.value.replace(/[^0-9]/g,'');"
        </el-form-item> -->
        <el-form-item label="更新范围：" prop="updateScope" label-width="29%">
          <el-select
            v-model="ruleData.updateScope"
            placeholder="请选择更新范围"
            clearable
          >
            <el-option
              v-for="item in updateScopeList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否区分网络："
          prop="isNetworkDifferent"
          label-width="28%"
          v-if="ruleData.updateStrategy == 4"
        >
          <el-radio-group v-model="ruleData.isNetworkDifferent">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
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
// import request from "@/config/serve.js";
import { mapGetters } from "vuex";
import { getSDKList } from "../api";
import {
  updateStatus, //更新范围
} from "@/common/constant/constant.js";
import UploadFile from "@/components/UploadFile";
export default {
  components: {
    UploadFile,
  },
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
    clientVersion: {
      type: Array,
      default() {
        return [];
      },
    },
    dialogName: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      updateStatus,
      dialogVisible: false,
      fileList: [],
      SDKList: [],
      loading: false,
      ruleData: {
        model: "",
        maxregion: "",
        isNetworkDifferent: "0",
        apkUrl: "",
      },
      updateScopeList: [
        { id: 1, value: "正式发布" },
        { id: 2, value: "测试发布" },
      ],
      rules: {
        channelId: [
          { required: true, message: "请选择手机型号", trigger: "change" },
        ],
        clientVersion: [
          { required: true, message: "请选择客户端版本号", trigger: "change" },
        ],
        updateTitle: [
          { required: true, message: "请输入标题", trigger: "change" },
        ],
        apkUrl: [{ required: true, message: "请上传APK包", trigger: "change" }],
        // blur
        isNetworkDifferent: [
          { required: true, message: "请选择是否区分网络", trigger: "change" },
        ],
        fullversionUpgradestart: [
          {
            required: true,
            message: "请选择配置生效最低版本号",
            trigger: "change",
          },
        ],
        fullversionUpgradeend: [
          {
            required: true,
            message: "请选择配置生效最高版本号",
            trigger: "change",
          },
        ],
        sdkVersionStartBefore: [
          { required: true, message: "请选择sdk最低版本号", trigger: "change" },
        ],
        sdkVersionEndBefore: [
          { required: true, message: "请选择sdk最高版本号", trigger: "change" },
        ],
        updateStrategy: [
          { required: true, message: "请选择策略", trigger: "change" },
        ],
        updateScope: [
          { required: true, message: "请选择更新范围", trigger: "change" },
        ],
        // newuserTimeInterval: [
        //   {
        //     required: true,
        //     message: "请输入新用户下发时间间隔",
        //     trigger: "blur",
        //   },
        //   {
        //     pattern: /^[0-9]{1,9}$/,
        //     message: "请输入大于等于0且不大于9位数的数字",
        //   },
        // ],
      },
      resource: "",
      options: [],

      checkList: [],
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
      this.getSDKdataList(); //获取SDK版本号
      if (this.dialogName != "新增") {
        this.ruleData = JSON.parse(JSON.stringify(this.$props.formParams));
        // this.ruleData.channelId = parseInt(this.ruleData.channelId);
        this.ruleData.isNetworkDifferent =
          this.ruleData.isNetworkDifferent.toString();
      }
    },
    dialogVisibleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.dialogName != "新增" &&
            this.ruleData.fullversionUpgrade != this.ruleData.clientVersion
          ) {
            this.$message.error("客服端版本号与APK包版本不一致");
          } else if (
            this.dialogName == "新增" &&
            this.ruleData.version != this.ruleData.clientVersion
          ) {
            this.$message.error("客服端版本号与APK包版本不一致");
          }
          // if (this.ruleData.version != this.ruleData.clientVersion) {
          //   this.$message.error("客服端版本号与APK包版本不一致");
          // } else
          else if (
            Number(this.ruleData.fullversionUpgradeend) <
            Number(this.ruleData.fullversionUpgradestart)
          ) {
            this.$message.error("最大版本号不能小于最小版本号");
          } else if (
            this.toNum(this.ruleData.sdkVersionEndBefore) <
            this.toNum(this.ruleData.sdkVersionStartBefore)
          ) {
            this.$message.error("SDK最大版本号不能小于SDK最小版本号");
          } else {
            // 只要不是后台更新，“是否区分网络”一律为“否”
            if (this.ruleData.updateStrategy !== 4) {
              this.ruleData.isNetworkDifferent = "0";
            }

            if (this.dialogName == "新增") {
              this.$emit("submitBTN", true, this.ruleData);
              this.dialogVisible = false;
            } else {
              this.$emit("submitBTN", false, this.ruleData);
              this.dialogVisible = false;
            }
          }
        } else {
          return false;
        }
      });
    },
    changeRadio(val) {
      if (val == "1") {
        this.resource = "1";
      } else {
        this.checkList = [];
      }
    },
    getSDKdataList() {
      getSDKList({ status: 1 }).then((res) => {
        this.SDKList = res.data;
      });
    },
    closeDialog() {
      // (this.ruleData = {
      //   model: "",
      //   maxregion: "",
      //   isNetworkDifferent: "",
      //   newuserTimeInterval: "",
      // }),
      //   (this.ruleData.newuserTimeInterval = "");
      this.ruleData = { isNetworkDifferent: "0" };
      this.$refs.ruleForm.resetFields();
    },
    // async handleHttpRequest({ file }) {
    //   const isUpload = await this.beforeUpload(file);
    //   if (isUpload) {
    //     this.loading = true;
    //     // 文件上传至服务器
    //     const res = await this.uploadFile(file);
    //     if (res && res.code === 0) {
    //       this.ruleData.apkUrl = res.data.fileProperty.accessPath || "";
    //       this.ruleData.apkSize = res.data.fileProperty.fileSize || "";
    //       this.ruleData.fullversionUpgrade = res.data.version || "";
    //       this.ruleData.clientVersionName = res.data.versionName || "";
    //       this.ruleData.fileSha256 = res.data.sign256 || "";
    //       this.ruleData.version = res.data.version || "";
    //     }
    //     this.loading = false;
    //   } else {
    //     this.$message.error("请上传apk类型文件");
    //   }
    // },
    // async beforeUpload(file) {
    //   const acceptType = ["apk"]; // 限制上传类型
    //   let [isFileType] = [true];
    //   const fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
    //   if (acceptType.length != 0) {
    //     isFileType = acceptType.includes(fileType);
    //   }
    //   return isFileType;
    // },
    // uploadFile(file) {
    //   let url = "/file/apkUpload"; // 上传apk文档
    //   const formData = new FormData();
    //   formData.set("file", file);
    //   return request(
    //     "http",
    //     url,
    //     {
    //       method: "post",
    //       data: formData,
    //       headers: { "Content-Type": "multipart/form-data" },
    //     },
    //     false
    //   );
    // },
    uploadSuccessApk(val) {
      this.ruleData.apkUrl = val.fileProperty.accessPath || "";
      this.ruleData.apkSize = val.fileProperty.fileSize || "";
      this.ruleData.fullversionUpgrade = val.version || "";
      this.ruleData.clientVersionName = val.versionName || "";
      this.ruleData.fileSha256 = val.sign256 || "";
      this.ruleData.version = val.version || "";
      console.log(this.ruleData.apkUrl);
    },
    toNum(s) {
      var a = s.toString();
      //也可以这样写 var c=a.split(/\./);
      var c = a.split(".");
      var num_place = ["", "0", "00", "000", "0000"],
        r = num_place.reverse();
      for (var i = 0; i < c.length; i++) {
        var len = c[i].length;
        c[i] = r[len] + c[i];
      }
      var res = c.join("");
      return res;
    },
    // cpr_version(a, b) {
    //   var _a = this.toNum(a),
    //     _b = this.toNum(b);
    //   if (_a > _b) this.$message.error("SDK最大版本号不能小于SDK最小版本号");
    // },
  },
  watch: {
    checkList(newData, oldData) {
      if (newData.length == "0") {
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
  /deep/ .el-input {
    width: 68%;
  }
  /deep/ .el-select {
    width: 68%;
    .el-input {
      width: 100%;
    }
  }

  // /deep/ .el-form-item__content {
  //   margin-left: 0;
  //   // display: flex;
  //   // justify-content: flex-start;
  //   // align-items: center;
  // }
  // /deep/ .el-upload {
  //   display: inline-block;
  // }
  .upload-demo {
    margin-left: 20px;
    display: inline-block;
  }
}
</style>
