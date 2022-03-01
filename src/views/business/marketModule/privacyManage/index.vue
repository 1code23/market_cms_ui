<template>
  <div>
    <el-form
      :model="formData"
      ref="formRef"
      class="detail-form"
      label-suffix=":"
    >
      <el-form-item label="应用识别码" prop="uuId" label-suffix=":">
        <el-input
          size="small"
          v-model="formData.uuId"
          placeholder="请输入应用识别码"
        ></el-input>
        <el-button
          size="small"
          type="primary"
          class="ml10"
          @click="handleOperate('export')"
          >导出隐私</el-button
        >
        <el-button
          size="small"
          type="danger"
          class="ml10"
          @click="handleOperate('stop')"
          >停止服务</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" width="30%" title="提示">
      <div class="mb20">应用识别码：{{ formData.uuId }}</div>
      <div>{{ contentDesc }}</div>
      <span slot="footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { downloadExcel } from "@/common/utils/utils.js";
import { stopServe, exportPrivacy } from "./indexServe";
export default {
  name: "privacyManage",
  data() {
    return {
      formData: {
        uuId: "",
      },
      dialogVisible: false,
      operationType: "", // 记录当前操作模式导出隐私-export、停止服务-stop
    };
  },
  computed: {
    contentDesc() {
      switch (this.operationType) {
        case "export":
          return "是否要导出隐私？";
        case "stop":
          return "是否要停止服务？";
        default:
          return "";
      }
    },
  },
  methods: {
    handleOperate(operationType) {
      this.dialogVisible = true;
      this.operationType = operationType;
    },
    handleSubmit() {
      const data = this.formData;
      if (this.operationType === "stop") {
        this.stopServe(data);
      } else if (this.operationType === "export") {
        this.exportPrivacy(data);
      }
    },
    async stopServe(data) {
      const res = await stopServe(data);
      if (res && res.code == 0) {
        this.dialogVisible = false;
        this.$message.success("操作成功");
      }
    },
    async exportPrivacy(data) {
      const res = await exportPrivacy(data);
      if (res && res.type == "application/vnd.ms-excel") {
        const { uuId } = this.formData;
        downloadExcel(res, uuId + "隐私");
        this.dialogVisible = false;
        this.$message.success("操作成功");
      } else {
        this.$message.error("识别码不存在");
      }
    },
  },
};
</script>
