<template>
  <div>
    <el-row :gutter="6">
      <el-col :span="4"
        ><el-date-picker
          size="small"
          type="date"
          value-format="yyyy-MM-dd"
          v-model="searchData.startDate"
          placeholder="请输入开始时间"
        ></el-date-picker
      ></el-col>
      <el-col :span="4"
        ><el-date-picker
          size="small"
          type="date"
          value-format="yyyy-MM-dd"
          v-model="searchData.endDate"
          placeholder="请输入结束时间"
        ></el-date-picker
      ></el-col>
      <el-col :span="4">
        <el-select
          size="small"
          clearable
          v-model="searchData.type"
          placeholder="请选择动作"
        >
          <el-option
            v-for="item in typeList"
            :key="item.key"
            :value="item.key"
            :label="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4"
        ><el-input
          size="small"
          v-model="searchData.action"
          placeholder="请输入模块/用户/IP"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch()"
          >查询</el-button
        ></el-col
      >
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="tableData"
      @page-change="handleChangePage"
    >
      <template slot="type" slot-scope="{ row }">
        {{ row.type | typeDesc(typeList) }}
      </template>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            @click="handleOperate('view', row)"
            v-if="row.type !== 1"
            >查看数据</el-button
          >
        </template>
      </el-table-column>
    </PageTable>
    <el-dialog width="30%" :visible.sync="visible" title="查看数据">
      <div style="line-height: 2; max-height: 500px">{{ detailData.info }}</div>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { getLogList, queryDateById } from "./indexServe";
const typeList = [
  { key: 1, value: "访问" },
  { key: 2, value: "操作" },
  { key: 0, value: "非法访问" },
];
export default {
  name: "logList",
  components: { PageTable },
  mounted() {
    this.init();
  },
  data() {
    return {
      typeList,
      searchData: {},
      tableData: {
        list: [],
      },
      columns: [
        { key: "act", label: "模块" },
        { key: "userName", label: "用户" },
        { key: "ip", label: "IP" },
        { slot: "type", label: "类型" },
        { key: "url", label: "URL" },
        { key: "addtime", label: "时间" },
      ],
      visible: false,
      operationType: "", // 记录当前操作模式
      detailData: {},
      roleList: [], //所有角色列表
    };
  },
  methods: {
    // 事件监听
    handleChangePage({ page, size }) {
      this.getTableList({ page, size });
    },
    handleOperate(operationType, row) {
      this.visible = true;
      this.operationType = operationType;
      this.detailData = row;
      this.queryDateById({ id: row.id });
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    // 后端请求
    async getTableList(params) {
      const res = await getLogList({
        page: 1,
        size: 10,
        ...this.searchData,
        ...params,
      });
      if (res && res.code == 0) {
        this.tableData = res.data;
        return res.data;
      }
    },
    async queryDateById(params) {
      const res = await queryDateById(params);
      if (res && res.code == 0) {
        this.$set(this.detailData, "info", res.data);
      }
    },
    // 其他
    init() {
      this.getTableList();
    },
  },
};
</script>
