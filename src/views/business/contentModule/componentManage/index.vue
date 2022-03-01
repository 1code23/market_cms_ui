<template>
  <div>
    <el-row>
      <el-button
        size="small"
        type="primary"
        v-has="'add'"
        icon="el-icon-plus"
        @click="handleOperate('add')"
        >新增</el-button
      >
      <el-button
        size="small"
        type="primary"
        v-has="'copy'"
        icon="el-icon-document-copy"
        @click="handleCopyMarket()"
        >一键复制组件</el-button
      >
    </el-row>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="组件名称" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="queryModule.assemblyName"
              placeholder="请输入组件名称"
              @keydown.native.enter="search()"
            ></el-input>
          </el-form-item>
          <el-form-item label="组件描述" class="demo-form-inline"
            ><el-input
              size="small"
              v-model="queryModule.description"
              placeholder="请输入组件描述"
              @keydown.native.enter="search()"
            ></el-input
          ></el-form-item>
          <el-form-item label="组件类型" class="demo-form-inline">
            <el-select
              filterable
              clearable
              size="small"
              v-model="queryModule.assemblyType"
              placeholder="请选择组件类型"
            >
              <el-option
                v-for="i in assemblyTypeList"
                :key="i.assemblyType"
                :label="i.typeName"
                :value="i.assemblyType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组件样式" class="demo-form-inline">
            <el-select
              filterable
              clearable
              size="small"
              v-model="queryModule.assemblyStyle"
              placeholder="请选择组件样式"
              class="headtab"
            >
              <el-option
                v-for="i in assemblyStyleList"
                :key="i.assemblyStyle"
                :label="i.styleName"
                :value="i.assemblyStyle"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search()"
            >查询</el-button
          ></el-form
        >
      </el-col>
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="{ ...queryModule, list }"
      @page-change="handleChangePage"
    >
      <template slot="id" slot-scope="{ row }">
        <el-radio
          v-model="activeId"
          :label="row.assemblyId"
          style="margin-left: 5px"
          >{{ null }}</el-radio
        >
      </template>
      <template slot="status" slot-scope="{ row }">
        <el-tag type="success" v-if="row.status === 1">使用中</el-tag>
        <el-tag type="info" v-else>未使用</el-tag>
      </template>
      <el-table-column label="操作" width="180px" align="center" fixed="right">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'deploy'"
            @click="handleOperate('deploy', row)"
            >部署</el-button
          >
          <el-button
            type="text"
            v-has="'language'"
            @click="handleOperate('internation', row)"
            >国际化</el-button
          >
          <el-button
            type="text"
            v-has="'edit'"
            style="margin-right: 10px"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </PageTable>
    <!-- 组件信息 新增/编辑 弹框 -->
    <EditorDialog
      :isShow.sync="editorDialogShow"
      :type="operationType"
      :row="detailData"
    />
    <!-- 国际化弹框 -->
    <InternationDialog
      :isShow.sync="internationDialogShow"
      :type="operationType"
      :row="detailData"
    />
    <!--部署弹框 -->
    <!-- <DeployDialog
      v-if="deployDialogShow"
      :isShow.sync="deployDialogShow"
      :row="detailData"
    /> -->
  </div>
</template>
<script>
import { Base64 } from "js-base64";
import PageTable from "@/components/PageTable.vue";
import InternationDialog from "./components/InternationDialog.vue";
import EditorDialog from "./components/EditorDialog.vue";
import { queryAssemblyStyleList } from "@/api/componentManage";
// import DeployDialog from "./components/DeployDialog.vue";
import { mapGetters } from "vuex";
import {
  queryAssemblyList,
  queryAssemblyTypeList,
  insertAssembly,
  queryLanguageList,
} from "@/api/componentManage";
export default {
  name: "componentManage",
  components: {
    PageTable,
    InternationDialog,
    EditorDialog,
  },
  computed: {
    ...mapGetters(["languageList"]),
  },
  watch: {
    "queryModule.assemblyType": {
      handler: function (val) {
        this.queryModule.assemblyStyle = "";
        queryAssemblyStyleList({ assemblyType: val }).then((res) => {
          this.assemblyStyleList = res.data;
          this.search();
        });
      },
      immediate: true,
    },
    "queryModule.assemblyStyle"() {
      this.search();
    },
  },
  data() {
    return {
      columns: [
        { slot: "id", align: "center", width: 45 },
        { key: "assemblyId", label: "ID", align: "center" },
        { key: "assemblyName", label: "组件名称", align: "center" },
        { key: "typeName", label: "组件类型", align: "center" },
        { key: "styleName", label: "组件样式", align: "center" },
        { key: "description", label: "组件描述", align: "center" },
        { key: "createTime", label: "创建时间", align: "center", width: 140 },
        { key: "modifyTime", label: "修改时间", align: "center", width: 140 },
        // { slot: "status", label: "状态", align: "center" },
      ],
      queryModule: {
        count: true,
        assemblyName: "",
        description: "",
        assemblyType: "",
        assemblyStyle: "",
        styleName: "",
        page: 1,
        size: 10,
        total: 0,
      },
      activeId: "",
      list: [],
      operationType: "", // 记录当前操作模式新建-add -edit
      detailData: {},
      internationDialogShow: false,
      editorDialogShow: false,
      deployDialogShow: false,
      assemblyTypeList: [], // 组件类型选项列表
      assemblyStyleList: [],
    };
  },
  created() {
    this.$store.dispatch("updateLanguageList");
    this.init();
  },
  methods: {
    init() {
      this.getDataList();
      // 获取组件类型
      queryAssemblyTypeList({}).then((res) => {
        this.assemblyTypeList = res.data;
      });
    },
    search() {
      this.queryModule.page = 1;
      this.queryModule.total = 0;
      this.getDataList();
    },
    handleChangePage({ page, size }) {
      this.queryModule.page = page;
      this.queryModule.size = size;
      this.getDataList();
    },

    // 获取列表数据
    getDataList() {
      queryAssemblyList(this.queryModule).then((res) => {
        const { list = [], total } = res.data;
        this.list = list;
        this.queryModule.total = total;
      });
    },
    handleOperate(operationType, row) {
      this.operationType = operationType;
      if (operationType === "delete") {
        this.handleDelete(row);
      } else if (operationType === "add") {
        this.editorDialogShow = true;
        this.detailData = null;
      } else if (operationType === "edit") {
        this.editorDialogShow = true;
        this.detailData = { ...row };
      } else if (operationType === "internation") {
        this.internationDialogShow = true;
        this.detailData = { ...row };
      } else if (operationType === "deploy") {
        queryLanguageList({ assemblyId: row.assemblyId }).then((res) => {
          if (!res.data.length) {
            this.$message.warning("请先配置国际化语言");
            return false;
          }
          this.$router.push({
            // path: "/business/contentModule/componentManage/deploy",
            // query: {
            //   type: row.assemblyType,
            //   assemblyId: row.assemblyId,
            //   assemblyName: row.assemblyName,
            //   styleName: row.styleName,
            //   num: row.num,
            // },
            // 多个部署页面打开时，切换会出现path参数丢失问题，所以用name传参
            name: "ComponentManageDeploy",
            params: {
              assemblyId: row.assemblyId,
              assemblyType: row.assemblyType,
              assemblyStyle: row.assemblyStyle,
            },
          });
        });
      }
    },
    handleCopyMarket() {
      if (!this.activeId) {
        this.$message.warning("请勾选需要复制的组件");
        return;
      }
      let row = this.list.find((item) => item.assemblyId === this.activeId);
      let params = { ...row };
      params.assemblyName = `复制-${params.assemblyName}`;
      insertAssembly(params).then((res) => {
        this.$message.success("复制成功");
        this.search();
      });
    },
  },
};
</script>
<style scoped lang="scss">
.headtab {
  margin: 0 10px;
}
</style>
