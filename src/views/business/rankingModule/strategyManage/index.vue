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
            ></el-input> </el-form-item
          ><el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch()"
            >查询</el-button
          ></el-form
        ></el-col
      >
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="tableData"
      @page-change="handleChangePage"
    >
      <template slot-scope="{ row }" slot="strategyType">
        {{ row.strategyType | typeDesc(rankingTypeList) }}
      </template>
      <template slot-scope="{ row }" slot="resType">
        {{ row.resType | typeDesc(appTypeList) }}
      </template>
      <template slot-scope="{ row }" slot="isOnline">
        <!-- <el-tag size="small" :type="row.isOnline | tagType(enabledStatusList)">
          {{ row.isOnline | typeDesc(enabledStatusList) }}
        </el-tag> -->
        <span
          :style="row.isOnline == 1 ? { color: '#67C23A' } : { color: 'red' }"
          >{{ row.isOnline | typeDesc(enabledStatusList) }}</span
        >
      </template>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'edit'"
            style="margin-right: 5px"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button v-has="'onOff'" type="text" @click="handleClickOnOff(row)">
            <span :class="row.isOnline == -1 ? 'colorGreen' : 'colorRed'">{{
              row.isOnline == -1 ? "启用" : "禁用"
            }}</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <el-dialog
      center
      width="550px"
      :wrapperClosable="false"
      :title="operationType | operationTypeDesc"
      :visible.sync="visible"
    >
      <Detail
        :operationType="operationType"
        :detailData="detailData"
        @submit="handleSubmit"
        @cancel="visible = false"
      />
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import {
  enabledStatusList,
  appTypeList,
  rankingTypeList,
} from "@/common/constant/constant.js";
import Detail from "./Detail.vue";
import {
  changeStatus,
  getStrategyList,
  addStrategyList,
  updateStrategyList,
} from "./indexServe";
export default {
  name: "strategyManage",
  components: { PageTable, Detail },
  mounted() {
    this.init();
  },
  data() {
    return {
      enabledStatusList,
      appTypeList,
      rankingTypeList,
      searchData: {},
      tableData: {
        list: [],
      },
      columns: [
        { key: "rankName", label: "榜单名称" },
        { slot: "strategyType", label: "榜单类型" },
        { slot: "resType", label: "资源类型" },
        { slot: "isOnline", label: "状态" },
        { key: "createTime", label: "创建时间" },
        { key: "modifyTime", label: "修改时间" },
      ],
      visible: false,
      operationType: "", // 记录当前操作模式新建-create、编辑-edit
      detailData: {},
    };
  },
  filters: {
    operationTypeDesc(type, custom) {
      if (custom) return custom;
      switch (type) {
        case "create":
          return "新增策略";
        case "view":
          return "查看策略";
        case "edit":
          return "修改策略";
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
      const isOnline = row.isOnline == -1 ? 1 : -1; // 将禁用状态改成启用，启用状态改成禁用
      changeStatus({ ...row, isOnline }).then((res) => {
        if (res && res.code === 0) {
          this.$message.success(res.msg);
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
        this.operationType === "edit" ? updateStrategyList : addStrategyList; // 编辑和新建分别调用不同接口
      fcn(formData).then((res) => {
        if (res) {
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
      const desc = `确定${row.isOnline == -1 ? "启用" : "禁用"}吗？`;
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
      const res = await getStrategyList({
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
