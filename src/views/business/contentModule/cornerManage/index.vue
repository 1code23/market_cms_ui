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
    </el-row>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="角标名称" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="queryModule.cornerName"
              placeholder="请输入角标名称"
              @keydown.native.enter="search()"
            ></el-input>
          </el-form-item>
          <el-form-item label="角标描述" class="demo-form-inline"
            ><el-input
              size="small"
              v-model="queryModule.description"
              placeholder="请输入角标描述"
              @keydown.native.enter="search()"
            ></el-input
          ></el-form-item>
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
      <template slot="hdImageUrl" slot-scope="{ row }">
        <img class="icon" :src="row.hdImageUrl" alt="" />
      </template>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'deploy'"
            @click="handleOperate('deploy', row)"
            >配置应用</el-button
          >
          <el-button
            type="text"
            v-has="'edit'"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            v-has="'language'"
            @click="handleOperate('internation', row)"
            >国际化</el-button
          >
          <el-button
            v-has="'delete'"
            type="text"
            @click="handleClickOnOff(row)"
            class="colorRed"
          >
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <!-- 角标弹框 新增/编辑 弹框-->
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
    <!-- 配置应用弹框 -->
    <DeployDialog :isShow.sync="deployDialogShow" :row="detailData" />
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import EditorDialog from "./components/EditorDialog.vue";
import InternationDialog from "./components/InternationDialog.vue";
import DeployDialog from "./components/DeployDialog.vue";
import { queryCornerList, deleteCornerByCornerId } from "@/api/corner.js";
export default {
  name: "cornerManage",
  components: { PageTable, EditorDialog, InternationDialog, DeployDialog },
  data() {
    return {
      columns: [
        { key: "cornerId", label: "ID", align: "center", width: 100 },
        { slot: "hdImageUrl", label: "角标图标", width: 120, align: "center" },
        { key: "cornerName", label: "名称" },
        { key: "description", label: "描述" },
        { key: "createTime", label: "创建时间", width: 160 },
        { key: "modifyTime", label: "修改时间", width: 160 },
      ],
      queryModule: {
        count: true,
        page: 1,
        size: 10,
        total: 0,
        cornerName: "",
        description: "",
      },
      list: [],
      operationType: "", // 记录当前操作模式新增-add-编辑edit
      detailData: {},
      editorDialogShow: false,
      internationDialogShow: false,
      deployDialogShow: false,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
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
    handleClickOnOff(row) {
      const desc = `确定删除吗？`;
      this.$confirm(desc, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(row);
        })
        .catch(() => {});
    },
    // 后端请求
    // 获取列表数据
    getDataList() {
      queryCornerList(this.queryModule).then((res) => {
        const { list = [], total } = res.data;
        this.list = list;
        this.queryModule.total = total;
      });
    },
    // 事件监听
    handleOperate(operationType, row) {
      this.operationType = operationType;
      if (operationType === "delete") {
        this.handleDelete(row);
      } else if (operationType === "add") {
        this.editorDialogShow = true;
        this.detailData = {};
      } else if (operationType === "edit") {
        this.editorDialogShow = true;
        this.detailData = { ...row };
      } else if (operationType === "internation") {
        this.internationDialogShow = true;
        this.detailData = { ...row };
      } else if (operationType === "deploy") {
        this.deployDialogShow = true;
        this.detailData = { ...row };
      }
    },
    handleDelete(row) {
      deleteCornerByCornerId({ cornerId: row.cornerId }).then((res) => {
        this.$message.success("删除成功");
        this.getDataList(); // 成功后刷新列表
      });
    },
  },
};
</script>
<style scoped>
.icon {
  width: 40px;
  height: 40px;
}
</style>
