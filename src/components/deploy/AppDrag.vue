<template>
  <div class="app-drag">
    <el-row :gutter="6">
      <el-col :span="8"
        ><el-input
          size="small"
          v-model="searchData.appName"
          placeholder="请输入应用名称"
        ></el-input
      ></el-col>
      <el-col :span="8"
        ><el-input
          size="small"
          v-model="searchData.packageName"
          placeholder="请输入包名"
        ></el-input
      ></el-col>
      <el-col :span="8"
        ><el-input
          size="small"
          v-model="searchData.devName"
          placeholder="请输入开发者"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="6">
      <!-- <el-col :span="8">
        <el-select
          v-model="searchData.companyType"
          size="small"
          placeholder="请选择"
        >
          <el-option label="私有应用" :value="1"> </el-option>
          <el-option label="非私有" :value="2"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select
          size="small"
          v-model="searchData.labelId"
          placeholder="请选择一级标签"
          @change="secLabelfn"
        >
          <el-option
            v-for="item in labelList"
            :key="item.value"
            :label="item.label_name"
            :value="item.label_id"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="8">
        <el-select
          v-model="searchData.labelSecondId"
          size="small"
          placeholder="请选择二级标签"
        >
          <el-option
            v-for="item in labelSecondList"
            :key="item.value"
            :label="item.label_name"
            :value="item.label_id"
          >
          </el-option> </el-select
      ></el-col> -->
      <el-col :span="8"
        ><el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch()"
          >查询</el-button
        ></el-col
      >
    </el-row>
    <el-row class="scroll-card" ref="appListRef" v-loading="loading">
      <draggable
        v-model="appList"
        filter=".line_active"
        :options="{
          group: { name: 'app', pull: 'clone', put: false },
          animation: 150,
          scroll: true,
          scrollSensitivity: 50,
          sort: false,
          forceFallback: true,
        }"
      >
        <el-col
          :span="12"
          :class="{ line_active: item.isDeployed }"
          v-for="(item, index) in appList"
          :key="index"
          @dblclick="showDetail(item)"
        >
          <AppCard :data="item"></AppCard>
        </el-col>
      </draggable>
    </el-row>
  </div>
</template>
<script>
import PageMore from "@/common/utils/pageMore";
import request from "@/config/serve.js";
import AppCard from "./AppCard.vue";
export default {
  components: { AppCard },
  props: {
    // 已选择的app列表
    selectList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      searchData: {},
      page: 1,
      labelList: [],
      appList: [],
      loading: false,
    };
  },
  mounted() {
    this.getDetailList();
    this.initScrollPage();
  },
  methods: {
    handleSearch(params) {
      this.page = 1;
      this.getDetailList({ page: 1, ...params });
      this.$refs.appListRef.$el.scrollTop = 0; // 查询后滚动到顶部
    },
    async getDetailList(params, isAdd) {
      const data = {
        type: "app",
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
      const list = (res.list || []).map((item) => {
        // 判断是否为已部署
        item.isDeployed = this.checkIsDeployed(item);
        return item;
      });
      if (isAdd) {
        this.appList = this.appList.concat(list);
      } else {
        this.appList = list;
      }
    },
    async handleScroll() {
      this.page++;
      this.getDetailList({}, true);
    },
    initScrollPage() {
      new PageMore({
        dom: this.$refs.appListRef.$el,
        callBack: this.handleScroll,
      });
    },
    checkIsDeployed(item) {
      return this.selectList.findIndex((i) => i.apk_id == item.apk_id) != -1;
    },
    // 暴露给父组件直接调用，重新查询数据
    init(params) {
      this.handleSearch(params);
    },
  },
  watch: {
    selectList() {
      // 已选择的列表变化时，重新检测当前tab页list的部署情况
      this.appList.map((item) => {
        item.isDeployed = this.checkIsDeployed(item);
        return item;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.app-drag {
  padding: 10px;

  .scroll-card {
    height: 330px;
    overflow: auto;
    border-top: 1px solid #dfdfdf;
  }
}
// 拖拽时占位符的样式，在接收该拖拽元素的元素写ghostClass="ghostClass"
.ghostClass {
  width: 100% !important;
}
</style>
