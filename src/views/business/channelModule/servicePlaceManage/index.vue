<template>
  <div id="modeManage">
    <el-button
      size="small"
      type="primary"
      icon="el-icon-plus"
      @click="handleAdd()"
      style="margin-bottom: 20px"
      v-has="'add'"
      >新增</el-button
    >
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-suffix=":"
    >
      <el-form-item label="服务地编码">
        <el-input
          v-model="formInline.deviceName"
          placeholder="请输入服务地编码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch()"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <PageTable
      :columns="modelTabelHead"
      :tableData="modelTabelList"
      @page-change="handleChangePage"
    >
      <!-- 状态 -->
      <template slot-scope="{ row }" slot="status">
        <span
          :style="row.status == 1 ? { color: '#67C23A' } : { color: 'red' }"
          >{{ row.status | typeDesc(enabledStatusList) }}</span
        >
      </template>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            @click="editBtn(row)"
            style="margin-right: 10px"
            v-has="'edit'"
          >
            <span :style="{ color: '#1990ff' }">编辑</span>
          </el-button>

          <el-button
            type="text"
            v-has="'onOff'"
            @click="row.status == 0 ? recoverClose(row) : forbidden(row)"
          >
            <span :class="row.status | classType(operateStartus)">{{
              row.status == 1 ? "禁用" : "恢复"
            }}</span>
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
        :rules="rules"
        class="demo-form-block"
        label-width="100px"
      >
        <el-form-item
          label="国家名称:"
          prop="countryName"
          style="margin: 20px auto; width: 100%"
        >
          <el-input
            v-model.trim="modelData.countryName"
            placeholder="请输入国家名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="服务地编码:"
          prop="serviceCode"
          style="margin: 20px auto; width: 100%"
        >
          <el-input
            v-model="modelData.serviceCode"
            placeholder="请输入两位字母编码(大写)"
          ></el-input>
          <!-- onkeyup="this.value = this.value.replace(/[^A-Z]/g,'');" -->
          <!-- onkeyup="this.value = this.value.toUpperCase()" -->
        </el-form-item>
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
  name: "servicePlaceManage",
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
        { key: "serviceCode", label: "服务地编码", align: "center" },
        { key: "countryName", label: "国家名称", align: "center" },
        { key: "remarks", label: "备注", align: "center" },
        { key: "createTime", label: "创建时间", align: "center" },
        { key: "updateTime", label: "修改时间", align: "center" },
        { slot: "status", label: "状态", align: "center" },
      ], //机型列表表格头部
      modelTabelList: {
        total: 0,
        list: [],
      }, //机型列表表格数据
      modelData: { deviceName: "" }, //编辑服务地表格参数
      dialogVisible: false, //禁用提示框
      recover: false, //恢复使用提示框
      enabledStatusList, //状态
      operateStartus, //操作类型
      opacity: "",
      dialogName: "",
      rules: {
        serviceCode: [
          {
            required: true,
            message: "请输入两位字母编码(大写)",
            trigger: "blur",
          },
        ],
        countryName: [
          { required: true, message: "请输入国家名称", trigger: "blur" },
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
      this.dialogName = "新增服务地";
      this.dialogAuditVisible = true;
    },
    //保存编辑
    savedialog(val, phonemodelData) {
      this.$refs[phonemodelData].validate((valid) => {
        if (valid) {
          if (val == "edit") {
            this.updateData();
          } else if (val == "add") {
            this.addmodelDataBtn();
          } else if (val == "forbid") {
            this.forbidBtn();
          }
        } else {
          this.$message({
            message: "请将信息填写完整",
            type: "warning",
          });
        }
      });
    },
    // 编辑保存按钮
    updateData() {
      let re = /^[A-Z]+$/.test(this.modelData.serviceCode);
      if (re) {
        updateDevice(this.modelData).then((res) => {
          if (res && res.code === 0) {
            this.getTableList({
              page: this.modelTabelList.page,
              size: this.modelTabelList.size,
            });
            this.$message({
              message: "编辑成功",
              type: "success",
            });
            this.dialogAuditVisible = false;
          }
        });
      } else {
        this.$message.error("服务地编码必须为大写字母");
      }
    },
    // 新增保存
    addmodelDataBtn() {
      let re = /^[A-Z]+$/.test(this.modelData.serviceCode);
      if (re) {
        addmodelData(this.modelData).then((res) => {
          if (res && res.code === 0) {
            this.$message({
              message: "新增成功",
              type: "success",
            });
            this.dialogAuditVisible = false;
            this.getTableList();
          }
        });
      } else {
        this.$message.error("服务地编码必须为大写字母");
      }
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
        page: 1,
        size: 10,
        ...this.formInline,
        ...params,
      };
      getmodelData(data).then((res) => {
        if (res && res.code === 0) {
          this.modelTabelList.list = res.data.list;
          this.modelTabelList.total = res.data.total;
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
  /deep/.demo-form-block {
    // margin: 0 auto;
    // width: 50%;
  }
  /deep/.el-form-item__content {
    width: 50%;
  }
}
</style>
