<template>
  <div class="page-drag">
    <el-row :gutter="6">
      <el-col :span="8">
        <el-select
          filterable
          size="small"
          v-model="searchData.marketId"
          placeholder="选择市场"
          @change="handleSearch()"
        >
          <el-option
            v-for="item in allMarketLsit"
            :key="item.market_id"
            :label="item.market_name"
            :value="item.market_id"
          >
          </el-option> </el-select
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
    <el-row class="scroll-card" v-loading="loading">
      <table class="headerTable">
        <thead>
          <tr>
            <th>
              <div>页面名称</div>
            </th>
            <th>
              <div>页面类型</div>
            </th>
            <th>
              <div>创建时间</div>
            </th>
            <th>
              <div>修改时间</div>
            </th>
          </tr>
        </thead>
      </table>
      <DragTableTree :groupName="'app'" :data="pageList"></DragTableTree>
    </el-row>
  </div>
</template>
<script>
import request from "@/config/serve.js";
import DragTableTree from "./DragTableTree";
export default {
  components: { DragTableTree },
  props: {
    allMarketLsit: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "page_name",
        isLeaf: "isLeaf",
      },
      searchData: {
        marketId: this.allMarketLsit[0] ? this.allMarketLsit[0].market_id : "",
      },
      page: 1,
      pageList: [],
      loading: false,
    };
  },
  mounted() {
    this.getDetailList();
  },
  methods: {
    handleSearch() {
      this.page = 1;
      this.getDetailList({ page: 1 });
    },
    async getDetailList(params) {
      const data = {
        market_id: this.searchData.marketId,
        type: "page",
        page: this.page,
        ...this.searchData,
        ...params,
      };
      this.loading = true;
      let res = await request(
        "post",
        "/admin/MarketPage/detailList",
        data,
        false
      );
      this.loading = false;
      if (res.list) {
        this.pageList = this.addShowChild(res.list);
      }
    },
    addShowChild(arr) {
      return arr.map((item) => {
        item.showChild = false;
        if (item.children) {
          this.addShowChild(item.children);
        }
        return item;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.page-drag {
  padding: 10px;
  .scroll-card {
    height: 380px;
    overflow: auto;
    border-top: 1px solid #dfdfdf;
  }
  .headerTable {
    width: 100%;
    overflow: hidden;
  }
}
th {
  border-bottom: 1px solid #ebeef5;
  padding: 12px 0;
}
</style>
