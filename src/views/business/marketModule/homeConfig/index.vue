<template>
  <div>
    <el-row>
      <el-button
        size="small"
        v-has="'add'"
        type="primary"
        icon="el-icon-plus"
        @click="handleOperate('create')"
        >新增</el-button
      >
    </el-row>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="备注" class="demo-form-inline headLabel">
            <el-input
              size="small"
              v-model="searchData.remarks"
              placeholder="请输入备注查询"
            ></el-input> </el-form-item
          ><el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch()"
            >查询</el-button
          >
        </el-form></el-col
      >
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="tableData"
      @page-change="handleChangePage"
    >
      <template slot-scope="{ row }" slot="homeRequestUpdate">
        <span v-if="row.homeRequestUpdate || row.homeRequestUpdate == 0"
          >{{ row.homeRequestUpdate }}分钟</span
        >
      </template>
      <template slot-scope="{ row }" slot="homeZeroUpdate">
        <span v-if="row.homeZeroUpdate || row.homeZeroUpdate == 0">
          {{ row.homeZeroUpdate }}分钟
        </span>
      </template>
      <template slot-scope="{ row }" slot="homeAdUpdate">
        <span v-if="row.homeAdUpdate || row.homeAdUpdate == 0">
          {{ row.homeAdUpdate }}分钟
        </span>
      </template>
      <template slot-scope="{ row }" slot="homeGetConf">
        <span v-if="row.homeGetConf || row.homeGetConf == 0">
          {{ row.homeGetConf }}分钟
        </span>
      </template>
      <template slot-scope="{ row }" slot="status">
        <span
          :style="row.status == 1 ? { color: '#67C23A' } : { color: 'red' }"
          >{{ row.status | typeDesc(enabledStatusList) }}</span
        >
      </template>
      <el-table-column fixed="right" label="操作" width="150px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'edit'"
            style="margin-right: 5px"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button v-has="'onOff'" type="text" @click="handleClickOnOff(row)">
            <span :class="row.status == 2 ? 'colorGreen' : 'colorRed'">{{
              row.status == 2 ? "启用" : "禁用"
            }}</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <el-dialog
      center
      width="700px"
      :wrapperClosable="false"
      :title="operationType | operationTypeDesc"
      :visible.sync="visible"
    >
      <Detail
        :operationType="operationType"
        :detailData="detailData"
        :deviceList="deviceList"
        @submit="handleSubmit"
        @cancel="visible = false"
      />
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PageTable from "@/components/PageTable.vue";
import { enabledStatusList } from "@/common/constant/constant.js";
import Detail from "./Detail.vue";
import { getHomeList, addHomeConfig, updateHomeConfig } from "./indexServe";
export default {
  name: "homeConfig",
  components: { PageTable, Detail },
  created() {
    this.$store.dispatch("updateDeviceList");
    this.init();
  },
  data() {
    return {
      enabledStatusList,
      searchData: {},
      tableData: {
        list: [],
      },
      columns: [
        { key: "channelId", label: "手机型号" },
        // { slot: "homeRequestUpdate", label: "HOME键请求接口时长" },
        { slot: "homeZeroUpdate", label: "请求应用更新接口时长" },
        // { slot: "homeAdUpdate", label: "请求开屏页时长" },
        { slot: "homeGetConf", label: "拉取市场配置时间间隔" },
        { key: "remarks", label: "备注" },
        { key: "createTime", label: "创建时间" },
        { key: "modifyTime", label: "修改时间" },
        { slot: "status", label: "状态", align: "center" },
      ],
      visible: false,
      operationType: "", // 记录当前操作模式新建-create、编辑-edit
      detailData: {},
    };
  },
  computed: {
    ...mapGetters(["deviceList"]),
  },
  filters: {
    operationTypeDesc(type, custom) {
      if (custom) return custom;
      switch (type) {
        case "create":
          return "新增";
        case "view":
          return "查看";
        case "edit":
          return "修改";
        default:
          return " ";
      }
    },
  },
  methods: {
    // 事件监听
    handleChangePage({ page, size }) {
      this.getTableList({ page, size });
    },
    handleOperate(operationType, row) {
      this.visible = true;
      this.operationType = operationType;
      if (operationType === "create") {
        this.detailData = {};
      } else {
        this.detailData = { ...row };
      }
    },
    handleChangeStatus(row) {
      const status = row.status == 2 ? 1 : 2; // 将禁用状态改成启用，启用状态改成禁用
      updateHomeConfig({ ...row, status }).then((res) => {
        if (res && res.code === 0) {
          this.$message.success("操作成功");
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 删除成功后刷新列表
        }
      });
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    handleSubmit(formData) {
      const fcn =
        this.operationType === "edit" ? updateHomeConfig : addHomeConfig; // 编辑和新建分别调用不同接口
      fcn(formData).then((res) => {
        if (res && res.code == 0) {
          this.visible = false;
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 成功后刷新列表
          this.$message.success("操作成功");
        }
      });
    },
    handleClickOnOff(row) {
      const desc = `确定${row.status == 2 ? "启用" : "禁用"}吗？`;
      this.$confirm(desc, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleChangeStatus(row);
        })
        .catch(() => {});
    },
    // 后端请求
    // 获取列表
    async getTableList(params) {
      const res = await getHomeList({
        page: 1,
        size: 10,
        ...this.searchData,
        ...params,
      });
      if (res && res.code === 0) {
        // 下载时，不需要更新到table
        this.tableData = res.data;
      }
    },
    // 其他
    init() {
      this.getTableList();
    },
  },
};
</script>
