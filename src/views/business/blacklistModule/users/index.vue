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
    <!-- <el-row :gutter="6">
      <el-col :span="6"
        ><el-input
          size="small"
          v-model="queryModule.nickname"
          placeholder="请输入用户昵称查询"
          @keydown.native.enter="search()"
        ></el-input
      ></el-col>
      <el-col :span="6"
        ><el-input
          size="small"
          v-model="queryModule.account"
          placeholder="请输入账号查询"
          @keydown.native.enter="search()"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="search()"
          >查询</el-button
        ></el-col
      >
    </el-row> -->
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="用户昵称" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="queryModule.nickname"
              placeholder="请输入用户昵称查询"
              @keydown.native.enter="search()"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号" class="demo-form-inline"
            ><el-input
              size="small"
              v-model="queryModule.account"
              placeholder="请输入账号查询"
              @keydown.native.enter="search()"
            ></el-input></el-form-item
          ><el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search()"
            >查询</el-button
          >
        </el-form></el-col
      >
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="{ ...queryModule, list }"
      @page-change="handleChangePage"
    >
      <template slot="status" slot-scope="{ row }">
        <!-- <el-tag type="info" v-if="row.status === 1">拉黑</el-tag>
        <el-tag type="danger" v-else>禁言</el-tag> -->
        <span :style="{ color: '#909399' }" v-if="row.status === 1">拉黑</span>
        <span :style="{ color: 'red' }" v-else>禁言</span>
      </template>
      <el-table-column label="操作" width="180px" align="center" fixed="right">
        <template slot-scope="{ row }">
          <el-button
            v-has="'edit'"
            type="text"
            style="margin-right: 10px"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button
            v-has="'delete'"
            type="text"
            @click="handleClickOnOff(row)"
          >
            <span class="colorRed">删除</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <!--  新增/编辑 弹框 -->
    <EditorDialog
      :isShow.sync="editorDialogShow"
      :type="operationType"
      :row="detailData"
    />
  </div>
</template>
<script>
import EditorDialog from "./components/EditorDialog.vue";
import PageTable from "@/components/PageTable.vue";
import { mapGetters } from "vuex";
import { deleteUserBlackById, queryUserBlackList } from "@/api/blacklistModule";
export default {
  name: "blacklistUsers",
  components: {
    PageTable,
    EditorDialog,
  },
  computed: {
    ...mapGetters(["deviceList"]),
  },
  watch: {
    "queryModule.assemblyType"() {
      this.search();
    },
    "queryModule.assemblyStyle"() {
      this.search();
    },
  },
  data() {
    return {
      columns: [
        { key: "nickname", label: "用户昵称", align: "center" },
        { key: "account", label: "用户账号", align: "center" },
        { key: "remarks", label: "描述", align: "center" },
        { slot: "status", label: "用户状态", align: "center" },
        { key: "createTime", label: "创建时间", align: "center", width: 140 },
        { key: "updateTime", label: "修改时间", align: "center", width: 140 },
      ],
      queryModule: {
        count: true,
        nickname: "",
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],
      detailData: null,
      operationType: "",
      editorDialogShow: false,
    };
  },
  created() {
    this.$store.dispatch("updateDeviceList");
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
    handleOperate(type, row) {
      this.operationType = type;
      if (type === "edit") {
        this.editorDialogShow = true;
        this.detailData = { ...row };
      }
      if (type === "add") {
        this.editorDialogShow = true;
        this.detailData = null;
      }
    },
    handleClickOnOff(row) {
      const desc = `确定删除吗？`;
      this.$confirm(desc, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.toDelete(row);
        })
        .catch(() => {});
    },
    // 获取列表数据
    getDataList() {
      queryUserBlackList(this.queryModule).then((res) => {
        const { list, total } = res.data;
        this.list = list;
        this.queryModule.total = total;
      });
    },
    toDelete(row) {
      deleteUserBlackById({
        openId: row.openId,
        account: row.account,
        id: row.id,
      }).then((res) => {
        this.$message.success("删除成功");
        this.queryModule.page = 1;
        this.getDataList();
      });
    },
  },
};
</script>
