<template>
  <div>
    <el-button
      v-has="'add'"
      size="small"
      type="primary"
      icon="el-icon-plus"
      @click="handleOperate('add')"
      style="margin-bottom: 20px"
      >新增</el-button
    >
    <el-form :inline="true" class="demo-form-inline" label-suffix=":">
      <el-form-item label="关键字">
        <el-input
          v-model="queryModule.deviceName"
          placeholder="请输入词语查询"
          @keydown.native.enter="search()"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="search()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <PageTable
      :columns="columns"
      :tableData="{ ...queryModule, list }"
      @page-change="handleChangePage"
    >
      <template slot="status" slot-scope="{ row }">
        <!-- <el-tag type="success" v-if="row.status === 1">已上线</el-tag>
        <el-tag type="danger" v-else>已下线</el-tag> -->
        <span :style="{ color: '#67C23A' }" v-if="row.status === 1"
          >已上线</span
        >
        <span :style="{ color: 'red' }" v-else>已下线</span>
      </template>
      <template slot="keywordType" slot-scope="{ row }">
        <span v-if="row.keywordType === 1">搜索结果</span>
        <span v-if="row.keywordType === 2">搜索联想</span>
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
            style="margin-right: 10px"
            @click="handleOperate('internation', row)"
            >国际化</el-button
          >
          <el-button v-has="'onOff'" type="text" @click="handleClickOnOff(row)">
            <span :style="`color:${!row.status ? '#67C23A' : '#F56C6C'}`">
              {{ !row.status ? "上线" : "下线" }}</span
            >
          </el-button>
        </template>
      </el-table-column></PageTable
    >
    <!-- 干预信息 新增/编辑 弹框 -->
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
import {
  queryKeywordConfigList,
  updateKeywordConfigStatus,
} from "@/api/searchIntervene";
export default {
  name: "searchIntervene",
  components: {
    PageTable,
    EditorDialog,
    InternationDialog,
    DeployDialog,
  },

  mounted() {
    this.getDataList();
  },
  data() {
    return {
      columns: [
        { key: "id", label: "ID", align: "center" },
        { key: "channelId", label: "手机型号", align: "center" },
        { key: "keyword", label: "关键字", align: "center" },
        { slot: "keywordType", label: "版位", align: "center" },
        { slot: "status", label: "状态", align: "center" },
        { key: "createTime", label: "创建时间", align: "center" },
        { key: "updateTime", label: "修改时间", align: "center" },
      ],
      queryModule: {
        deviceName: "",
        count: true,
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],
      operationType: "",
      detailData: null,
      editorDialogShow: false,
      internationDialogShow: false,
      deployDialogShow: false,
    };
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
    getDataList() {
      queryKeywordConfigList(this.queryModule).then((res) => {
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
        this.deployDialogShow = true;
        this.detailData = { ...row };
      }
    },
    handleEnable(row) {
      let params = {
        id: row.id,
        status: row.status === 0 ? 1 : 0,
      };
      updateKeywordConfigStatus(params).then((res) => {
        if (!row.status) {
          this.$message.success("上线成功");
        } else {
          this.$message.success("下线成功");
        }
        this.getDataList();
      });
    },
    handleClickOnOff(row) {
      const desc = `确定${!row.status ? "上线" : "下线"}吗？`;
      this.$confirm(desc, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleEnable(row);
        })
        .catch(() => {});
    },
  },
};
</script>
