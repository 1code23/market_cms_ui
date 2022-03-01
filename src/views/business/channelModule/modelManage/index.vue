<template>
  <div id="modeManage">
    <el-button
      type="primary"
      size="small"
      icon="el-icon-plus"
      @click="handleAdd()"
      style="margin-bottom: 20px"
      v-has="'add'"
      >新增</el-button
    >
    <el-row :gutter="6">
      <el-col :span="16">
        <el-form :inline="true" :model="formInline" label-suffix=":">
          <el-form-item label="手机型号" class="demo-form-inline">
            <el-input
              v-model="formInline.deviceName"
              placeholder="请输入手机型号查询"
            ></el-input>
          </el-form-item>

          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch()"
            >搜索</el-button
          >
        </el-form>
      </el-col>
    </el-row>
    <PageTable
      :columns="modelTabelHead"
      :tableData="modelTabelList"
      @page-change="handleChangePage"
    >
      <!-- 状态 -->
      <template slot-scope="{ row }" slot="status">
        <span
          :style="row.status == 0 ? { color: '#67C23A' } : { color: 'red' }"
          >{{ row.status == 0 ? "使用中" : "已禁用" }}</span
        >
      </template>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            @click="editBtn(row)"
            style="margin-right: 10px"
            :disabled="row.deviceName == 'ALL'"
            v-has="'edit'"
          >
            <span>编辑</span>
          </el-button>

          <el-button
            type="text"
            v-has="'onOff'"
            @click="row.status == 1 ? recoverClose(row) : forbidden(row)"
            :disabled="row.deviceName == 'ALL'"
            :class="row.status == 1 ? 'colorGreen' : 'colorRed'"
          >
            <span>{{ row.status == 0 ? "禁用" : "恢复" }}</span>
          </el-button>
        </template>
      </el-table-column></PageTable
    >
    <!-- 禁用提示框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>禁用后功能将不可用</span><br /><br />
      <span style="margin: 10px 0">确认要禁用吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="forbiddenBtn">确 认</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 恢复提示框 -->
    <el-dialog title="提示" :visible.sync="recover" width="30%">
      <span>确认要恢复使用吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="forbiddenBtn">确 认</el-button>
        <el-button @click="recover = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="dialogName"
      :visible.sync="dialogAuditVisible"
      center
      @close="closeDialog"
      width="30%"
    >
      <el-form
        :inline="true"
        :model="modelData"
        ref="phonemodelData"
        label-width="100px"
        class="demo-form-block"
        :rules="rules"
      >
        <el-form-item
          label="手机型号:"
          prop="deviceName"
          style="margin: 20px auto; width: 100%"
        >
          <el-input
            v-model.trim="modelData.deviceName"
            placeholder="请输入机型"
            :disabled="dialogName == '编辑'"
          ></el-input> </el-form-item
        ><br />
        <el-form-item label="备注:" style="margin: 20px auto; width: 100%">
          <el-input v-model="modelData.remarks" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savedialog(opacity, 'phonemodelData')"
          >确 认</el-button
        >
        <el-button @click="dialogAuditVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getmodelData,
  amendModelData,
  addmodelData,
  updateDevice,
} from "./api.js";
import {
  enabledStatusList, //状态
  operateStartus, //操作类型
} from "@/common/constant/constant.js";
import PageTable from "@/components/PageTable.vue";
export default {
  name: "modelManage",
  components: { PageTable },
  mounted() {
    this.init();
  },
  data() {
    return {
      formInline: { deviceName: "" }, //机型表格参数
      dialogAuditVisible: false, //新增弹框
      modelTabelHead: [
        { key: "id", label: "ID", fixed: "left", align: "center" },
        { key: "deviceName", label: "型号", align: "center" },
        { key: "remarks", label: "备注", align: "center" },
        { key: "createTime", label: "创建时间", align: "center" },
        { key: "modifyTime", label: "修改时间", align: "center" },
        { slot: "status", label: "状态", align: "center" },
      ], //机型列表表格头部
      modelTabelList: {
        total: 0,
        list: [],
      }, //机型列表表格数据
      modelData: { deviceName: "" }, //编辑机型表格参数
      dialogVisible: false, //禁用提示框
      recover: false, //恢复使用提示框
      enabledStatusList, //状态
      operateStartus, //操作类型
      opacity: "",
      dialogName: "",
      forbiddenData: "",
      rules: {
        deviceName: [
          { required: true, message: "请输入机型", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    closeDialog() {
      this.$refs.phonemodelData.resetFields();
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    //新增按钮
    handleAdd() {
      this.modelData = {};
      this.opacity = "add";
      this.dialogName = "新增手机型号";
      this.dialogAuditVisible = true;
    },
    // 编辑保存按钮
    updateData() {
      updateDevice(this.modelData).then((res) => {
        if (res && res.code === 0) {
          this.dialogAuditVisible = false;
          this.getTableList({
            page: this.modelTabelList.page,
            size: this.modelTabelList.size,
          });
          this.$store.dispatch("updateDeviceList", true);
          this.$message({
            message: "编辑成功",
            type: "success",
          });
        }
      });
    },
    // 新增保存
    addmodelDataBtn() {
      addmodelData(this.modelData).then((res) => {
        if (res && res.code === 0) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          this.dialogAuditVisible = false;
          this.getTableList();
          this.$store.dispatch("updateDeviceList", true);
        }
      });
    },
    //保存按钮
    savedialog(val, phonemodelData) {
      this.$refs[phonemodelData].validate((valid) => {
        if (valid) {
          if (val == "edit") {
            this.updateData();
          } else if (val == "add") {
            this.addmodelDataBtn();
          }
        } else {
          this.$message({
            message: "请将信息填写完整",
            type: "warning",
          });
        }
      });
    },
    //编辑
    editBtn(row) {
      this.opacity = "edit";
      this.dialogName = "编辑";
      this.modelData = { ...row };
      this.dialogAuditVisible = true;
    },
    //禁用
    forbidden(row) {
      this.dialogVisible = true;
      this.forbiddenData = { status: row.status, id: row.id };
    },
    //禁用确定按钮
    forbiddenBtn() {
      let obj = { status: 0, id: this.forbiddenData.id };
      if (this.forbiddenData.status == 0) {
        obj.status = 1;
      } else {
        obj.status = 0;
      }
      amendModelData(obj).then((res) => {
        if (res && res.code === 0) {
          this.$message.success(res.msg);
          this.dialogVisible = false;
          this.recover = false;
          this.getTableList({
            page: this.modelTabelList.page,
            size: this.modelTabelList.size,
          });
          this.$store.dispatch("updateDeviceList", true);
        }
      });
    },
    //恢复
    recoverClose(row) {
      this.recover = true;
      this.forbiddenData = { status: row.status, id: row.id };
    },
    //恢复确定按钮
    recoverBtn() {
      this.recover = false;
      this.forbiddenBtn();
    },
    init() {
      this.getTableList();
    },
    getTableList(params) {
      const data = {
        ...this.formInline,
        ...params,
      };
      getmodelData(data).then((res) => {
        if (res && res.code == 0) {
          this.modelTabelList.list = res.data.list;
          this.modelTabelList.total = res.data.total;
          // this.$store.dispatch("updateDeviceList", true);
        }
      });
    },
    handleChangePage({ page, size }) {
      this.modelTabelList.page = page;
      this.modelTabelList.size = size;
      this.getTableList({ page, size });
    },
  },
};
</script>
<style scoped lang="scss">
#modeManage {
  .phoneModel {
    display: flex;
    align-items: center;
  }
  .searchInput {
    margin: 0 10px;
  }
  .demo-form-block {
    // margin: 0 auto;
    // width: 30%;
  }
  /deep/.el-form-item__content {
    width: 50%;
  }
  .demo-form-inline {
    width: 30%;
  }
}
</style>
