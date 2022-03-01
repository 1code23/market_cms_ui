<template>
  <div class="assembly-list fc">
    <el-form :inline="true" label-suffix=":">
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="组件ID">
            <el-input
              size="small"
              type="number"
              v-model.number="searchData.assemblyId"
              placeholder="请输入组件ID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="组件名称" class="demo-form-inline headLabel">
            <el-input
              size="small"
              v-model="searchData.assemblyName"
              placeholder="请输入组件名称"
            ></el-input>
          </el-form-item>
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
    </el-form>
    <el-row class="scroll-card flex1" ref="assemblyListRef" v-loading="loading">
      <draggable
        class="drag-list"
        v-model="assemblyList"
        filter=".line_active"
        :options="{
          group: { name: 'assembly', pull: 'clone', put: false },
          animation: 150,
          scroll: true,
          scrollSensitivity: 50,
          sort: false,
          forceFallback: true,
        }"
      >
        <el-col
          :span="12"
          :key="index"
          :class="{ line_active: item.isDeployed }"
          v-for="(item, index) in assemblyList"
          class="assembly-item borderA"
          @dblclick.native="handleDbClick(item)"
        >
          <div class="item-text-h1">
            {{ item.assemblyName }}
          </div>
          <div>组件ID：{{ item.assemblyId }}</div>
          <div>组件类型：{{ item.typeName }}</div>
          <div>组件样式：{{ item.styleName }}</div>
          <div>组件描述：{{ item.description }}</div>
          <img
            class="fixed_corner_mark"
            v-if="item.isDeployed"
            src="@/assets/images/has-deployed.png"
            alt=""
          />
        </el-col>
      </draggable>
    </el-row>
  </div>
</template>
<script>
import PageMore from "@/common/utils/pageMore";
import { queryAssemblyList } from "../indexServe.js";
export default {
  props: {
    selectList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      page: 1,
      searchData: {},
      loading: false,
      assemblyList: [], // 可选的组件列表
    };
  },
  mounted() {
    this.getTableList();
    this.initScrollPage();
  },
  methods: {
    handleSearch(params) {
      this.page = 1;
      this.getTableList({ page: 1, ...params });
      this.$refs.assemblyListRef.$el.scrollTop = 0; // 查询后滚动到顶部
    },
    handleDbClick(item) {
      this.$router.push({
        // 多个部署页面打开时，切换会出现path参数丢失问题，所以用name传参
        name: "ComponentManageDeploy",
        params: {
          assemblyId: item.assemblyId,
          assemblyType: item.assemblyType,
          assemblyStyle: item.assemblyStyle,
        },
      });
    },
    async getTableList(params, isAdd) {
      this.loading = true;
      const res = await queryAssemblyList({
        size: 20,
        page: this.page,
        ...this.searchData,
        ...params,
      });
      this.loading = false;
      if (res && res.code == 0) {
        const list = res.data.list.map((item) => {
          // 判断是否为已部署
          item.isDeployed = this.checkIsDeployed(item);
          return item;
        });
        // 滚动时，添加到list后面
        if (isAdd) {
          this.assemblyList.push(...list);
        } else {
          this.assemblyList = list;
        }
      }
    },
    // 其他
    async handleScroll() {
      this.page++;
      this.getTableList({}, true);
    },
    initScrollPage() {
      new PageMore({
        dom: this.$refs.assemblyListRef.$el,
        callBack: this.handleScroll,
      });
    },
    checkIsDeployed(item) {
      return (
        this.selectList.findIndex((i) => i.assemblyId == item.assemblyId) != -1
      );
    },
  },
  watch: {
    selectList() {
      // 已选择的列表变化时，重新检测list的部署情况
      this.assemblyList.map((item) => {
        item.isDeployed = this.checkIsDeployed(item);
        return item;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.assembly-list {
  height: 65vh;
  padding: 10px;
  overflow: auto;
  .scroll-card {
    overflow: auto;
    padding-right: 20px;
    box-sizing: border-box;
    .drag-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .assembly-item {
    width: 100%;
    position: relative;
    padding: 10px;
    text-align: left;
    .item-text-h1 {
      margin-bottom: 6px;
      font-weight: 600;
    }
    .fixed-tag {
      position: absolute;
      right: 0;
      top: 0;
    }
    .fixed_corner_mark {
      position: absolute;
      height: 50px;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
