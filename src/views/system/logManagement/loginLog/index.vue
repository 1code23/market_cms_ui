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
      <el-col :span="4"
        ><el-input
          size="small"
          v-model="searchData.action"
          placeholder="请输入用户账号/IP"
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
    </PageTable>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { getUserLoginLog } from "./indexServe";
export default {
  name: "loginLog",
  components: { PageTable },
  mounted() {
    this.init();
  },
  data() {
    return {
      searchData: {},
      tableData: {
        list: [],
      },
      columns: [
        { key: "id", label: "ID" },
        { key: "realname", label: "用户账号" },
        { key: "ip", label: "IP" },
        { key: "action", label: "内容" },
        { key: "createTime", label: "时间" },
      ],
    };
  },
  methods: {
    // 事件监听
    handleChangePage({ page, size }) {
      this.getTableList({ page, size });
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    // 后端请求
    async getTableList(params) {
      const res = await getUserLoginLog({
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
    // 其他
    init() {
      this.getTableList();
    },
  },
};
</script>
