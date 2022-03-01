<template>
  <div>
    <el-row>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="handleOperate('create')"
        v-has="'add'"
        >新增</el-button
      >
    </el-row>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true">
          <el-form-item label="榜单名称:" class="demo-form-inline headLabel">
            <el-input
              size="small"
              v-model="searchData.rankName"
              placeholder="请输入榜单名称"
            ></el-input>
          </el-form-item>
          <el-button
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
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'edit'"
            style="margin-right: 5px"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button
            v-has="'delete'"
            type="text"
            @click="handleClickOnOff(row)"
          >
            <span class="colorRed">删除</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <el-dialog
      center
      size="50%"
      :wrapperClosable="false"
      destroy-on-close
      :title="operationType | operationTypeDesc"
      :visible.sync="visible"
    >
      <Detail
        :operationType="operationType"
        :detailData="detailData"
        :strategyList="strategyList"
        @submit="handleSubmit"
        @cancel="visible = false"
      />
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { enabledStatusList } from "@/common/constant/constant.js";
import Detail from "./Detail.vue";
import {
  getRankingInterveneList,
  addRankingIntervene,
  updateRankingIntervene,
  deleteRankingIntervene,
  getStrategyList,
} from "./indexServe";
export default {
  name: "rankingIntervene",
  components: { PageTable, Detail },
  mounted() {
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
        { key: "rankName", label: "榜单名称" },
        // { key: "apkId", label: "APPID" },
        { key: "apkName", label: "应用名称" },
        { key: "packageName", label: "包名" },
        { key: "sort", label: "干预位置" },
        { key: "createTime", label: "创建时间" },
        { key: "updateTime", label: "修改时间" },
      ],
      visible: false,
      operationType: "", // 记录当前操作模式新建-create、编辑-edit
      detailData: {},
      strategyList: [],
    };
  },
  filters: {
    operationTypeDesc(type, custom) {
      if (custom) return custom;
      switch (type) {
        case "create":
          return "榜单干预";
        case "view":
          return "榜单干预";
        case "edit":
          return "榜单干预";
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
        this.getStrategyList(); // 重新获取榜单数据，以防有新建的榜单
      } else {
        this.detailData = { ...row, rankId: parseInt(row.rankId) };
      }
    },
    handleDelete(row) {
      deleteRankingIntervene(row).then((res) => {
        if (res && res.code === 0) {
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 删除成功后刷新列表
          this.$message.success("操作成功");
        }
      });
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    handleSubmit(formData) {
      const fcn =
        this.operationType === "edit"
          ? updateRankingIntervene
          : addRankingIntervene; // 编辑和新建分别调用不同接口
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
      const desc = `确定删除吗？`;
      this.$confirm(desc, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(row);
        })
        .catch(() => {});
    },
    // 后端请求
    // 获取列表
    async getTableList(params) {
      const res = await getRankingInterveneList({
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
    async getStrategyList() {
      const res = await getStrategyList();
      if (res && res.code === 0) {
        this.strategyList = res.data.list;
      }
    },
    // 其他
    init() {
      this.getTableList();
      this.getStrategyList();
    },
  },
};
</script>
