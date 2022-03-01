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
          <el-form-item label="市场名称" class="demo-form-inline headLabel">
            <el-input
              size="small"
              v-model="searchData.marketName"
              placeholder="请输入市场名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机型号" class="demo-form-inline">
            <el-select
              clearable
              filterable
              size="small"
              placeholder="请选择型号"
              v-model="searchData.channelId"
            >
              <el-option
                v-for="item in deviceList"
                :key="item.id"
                :label="item.deviceName"
                :value="item.deviceName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch()"
            >查询</el-button
          >
        </el-form>
      </el-col>
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="tableData"
      @page-change="handleChangePage"
    >
      <template slot-scope="{ row }" slot="status">
        <!-- <el-tag size="small" :type="row.status | tagType(enabledStatusList)">
          {{ row.status | typeDesc(enabledStatusList) }}
        </el-tag> -->
        <span
          :style="row.status == 1 ? { color: '#67C23A' } : { color: 'red' }"
          >{{ row.status | typeDesc(enabledStatusList) }}</span
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
            <span :class="row.status == 2 ? 'colorGreen' : 'colorRed'">{{
              row.status == 2 ? "启用" : "禁用"
            }}</span></el-button
          >
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
        :marketList="marketList"
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
import {
  getMarketReleaseList,
  addMarketRelease,
  updateMarketRelease,
  getMarketList,
} from "./indexServe";
export default {
  name: "marketRelease",
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
        { key: "mgId", label: "ID" },
        { key: "channelId", label: "手机型号" },
        { key: "marketName", label: "市场名称" },
        { key: "versionCode", label: "市场版本" },
        { key: "marketId", label: "市场ID" },
        { key: "remarks", label: "备注" },
        { key: "createTime", label: "创建时间" },
        { key: "modifyTime", label: "修改时间" },
        { slot: "status", label: "状态", align: "center" },
      ],
      visible: false,
      operationType: "", // 记录当前操作模式新建-create、编辑-edit
      detailData: {},
      marketList: [],
    };
  },
  computed: {
    ...mapGetters(["deviceList"]),
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
        this.getMarketList(); // 重新获取市场数据，以防有新建的市场
        this.detailData = {};
      } else {
        this.detailData = { ...row };
      }
    },
    handleChangeStatus(row) {
      const status = row.status == 2 ? 1 : 2; // 将禁用状态改成启用，启用状态改成禁用
      updateMarketRelease({ ...row, status }).then((res) => {
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
        this.operationType === "edit" ? updateMarketRelease : addMarketRelease; // 编辑和新建分别调用不同接口
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
      if (this.searchData.channelId == "") {
        this.searchData.channelId = undefined;
      }
      const res = await getMarketReleaseList({
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
    async getMarketList() {
      const res = await getMarketList();
      if (res && res.code === 0) {
        this.marketList = res.data.list;
      }
    },

    // 其他
    init() {
      this.getTableList();
      this.getMarketList();
    },
  },
};
</script>
