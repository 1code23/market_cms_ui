<template>
  <div class="app-list-radio">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-input
          size="small"
          placeholder="请输入搜索内容"
          v-model="serachKeyword"
          class="input-with-select"
        >
          <el-select
            size="small"
            slot="prepend"
            v-model="serachKeywordCode"
            placeholder="请选择类型"
          >
            <!-- <el-option label="APPID" value="apkId"></el-option> -->
            <el-option label="应用名称" value="apkName"></el-option>
            <el-option label="应用包名" value="packageName"></el-option>
          </el-select>
        </el-input>
      </el-col>
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
      height="250"
      :rowKey="rowKey"
      :columns="columns"
      :tableData="tableData"
      highlightCurrentRow
      @current-change="handleCurrentChange"
      @page-change="handleChangePage"
      v-loading="loading"
    >
      <el-table-column slot="prefix" width="60px" align="center">
        <template slot-scope="{ row }">
          <el-radio v-model="radioValue" :label="row[rowKey]">
            <span></span>
          </el-radio>
        </template>
      </el-table-column>
      <template slot-scope="{ row }" slot="iconUrl">
        <img class="icon" :src="row.iconUrl" alt="" />
      </template>
    </PageTable>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { selectApplyList } from "@/api/common.js";
export default {
  model: { prop: "value", event: "change" },
  components: { PageTable },
  props: { value: { default: "" }, rowKey: { default: "apkId" } },
  data() {
    return {
      loading: false,
      radioValue: this.value,
      serachKeywordCode: "apkName",
      serachKeyword: "",
      searchData: {},
      tableData: {
        list: [],
      },
      columns: [
        // { key: "apkId", label: "APPID" },
        { key: "apkName", label: "应用名称" },
        { slot: "iconUrl", label: "图标", width: "120px" },
        { key: "packageName", label: "包名" },
      ],
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    // 事件监听
    handleChangePage({ page, size }) {
      this.getTableList({ page, size });
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    handleCurrentChange(row) {
      this.radioValue = row[this.rowKey];
      this.$emit("current-change", row);
    },
    // 后端请求
    // 获取列表
    async getTableList(params) {
      const data = {
        page: 1,
        size: 10,
        ...this.searchData,
        ...params,
      };
      if (this.serachKeywordCode) {
        data[this.serachKeywordCode] = this.serachKeyword;
      }
      if (this.serachKeywordCode == "apkId") {
        data.apkId = parseInt(data.apkId);
        if (!data.apkId) {
          this.$message.error("APPID请输入数字");
        }
      }
      this.loading = true;
      const res = await selectApplyList(data);
      this.loading = false;
      if (res && res.code === 0) {
        // 下载时，不需要更新到table
        this.tableData = res.data;
      }
    },
  },
  watch: {
    value(value) {
      if (value === this.radioValue) return;
      this.radioValue = value;
    },
    radioValue(val) {
      this.$emit("change", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.app-list-radio {
  .input-with-select {
    /deep/.el-input-group__prepend {
      background: #fff;
      width: 80px;
    }
  }
  .icon {
    width: 40px;
    height: 40px;
  }
}
</style>
