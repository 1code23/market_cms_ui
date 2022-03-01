<template>
  <div>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="详细说明" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="searchData.content"
              placeholder="请输入详细说明"
            ></el-input>
          </el-form-item>
          <el-form-item label="反馈时间" class="demo-form-inline">
            <el-date-picker
              value-format="yyyy-MM-dd"
              style="width: 100%"
              v-model="searchData.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
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
      <template slot-scope="{ row }" slot="feedBackImgs">
        <el-button
          type="text"
          v-if="row.feedBackImgs"
          @click="handleViewImgs(row)"
          >查看图集</el-button
        >
      </template>
    </PageTable>
    <el-dialog :visible.sync="visible" width="30%" title="查看图集">
      <el-row :gutter="5" class="imgArea">
        <el-col :span="8" v-for="(url, index) in imgList" :key="index">
          <el-image class="borderA" :src="url" :preview-src-list="imgList">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { getFeedBackList } from "./indexServe";
export default {
  name: "problemReport",
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
        { key: "apkName", label: "应用名称" },
        { key: "packageName", label: "应用包名" },
        { key: "versionCode", label: "应用版本号" },
        { key: "hstype", label: "手机型号" },
        { key: "categoryType", label: "问题类型" },
        { key: "category", label: "具体问题" },
        { key: "content", label: "详细说明" },
        { slot: "feedBackImgs", label: "举报图集" },
        { key: "createTime", label: "反馈时间" },
      ],
      visible: false,
      imgList: [],
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
    handleViewImgs(row = {}) {
      this.visible = true;
      const imgList = (row.feedBackImgs || "").split(",");
      this.imgList = imgList;
    },
    // 后端请求
    async getTableList(params) {
      const data = {
        page: 1,
        size: 10,
        ...this.searchData,
        ...params,
      };
      if (data.date && data.date.length !== 0) {
        data.startDate = data.date[0];
        data.endDate = data.date[1];
      }
      const res = await getFeedBackList(data);
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
<style scoped lang="scss">
.headLabel {
  margin-right: 20px;
}
.imgArea {
  height: 400px;
  overflow: auto;
}
</style>
