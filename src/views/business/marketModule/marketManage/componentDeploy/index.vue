<template>
  <div class="config-page">
    <el-row class="disfr jc fw6">配置页面</el-row>
    <el-row>
      <el-col :span="12" class="disfr jc fw6">组件</el-col>
      <el-col :span="12" class="disfr jc fw6">页面</el-col>
    </el-row>
    <el-row class="deploy-content">
      <el-col :span="12" class="deploy-card borderA">
        <AssemblyList :selectList="selectList"></AssemblyList>
      </el-col>
      <el-col :span="12" class="deploy-card borderA">
        <SelectPaneL v-model="selectList" :pageId="pageId"></SelectPaneL>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AssemblyList from "./AssemblyList.vue";
import SelectPaneL from "./SelectList.vue";
import { getPageAssemblyList } from "../indexServe.js";
export default {
  name: "componentDeploy",
  components: { AssemblyList, SelectPaneL },
  data() {
    return {
      selectList: [], // 已部署的组件列表
    };
  },
  computed: {
    pageId() {
      return this.$route.params.pageId;
    },
  },
  mounted() {
    this.getPageAssemblyList();
  },
  methods: {
    async getPageAssemblyList() {
      const pageId = this.pageId;
      let selectList = [];
      if (pageId || pageId == 0) {
        const res = await getPageAssemblyList({ pageId });
        if (res && res.code == 0) {
          selectList = res.data;
        }
      }
      this.selectList = selectList;
    },
  },
};
</script>
