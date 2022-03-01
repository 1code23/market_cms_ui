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
      <el-col :span="4"
        ><el-input
          size="small"
          v-model="queryModule.name"
          placeholder="请输入应用名称查询"
          @keydown.native.enter="search()"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-input
          size="small"
          v-model="queryModule.pname"
          placeholder="请输入包名查询"
          @keydown.native.enter="search()"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-select
          filterable
          clearable
          size="small"
          v-model="queryModule.deviceId"
          placeholder="请选择手机型号"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.deviceName"
            :label="item.deviceName"
            :value="item.id"
          >
          </el-option></el-select
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
          <el-form-item label="应用名称" class="demo-form-inline headLabel">
            <el-input
              size="small"
              v-model="queryModule.name"
              placeholder="请输入应用名称查询"
              @keydown.native.enter="search()"
            ></el-input
          ></el-form-item>
          <el-form-item label="应用包名" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="queryModule.pname"
              placeholder="请输入包名查询"
              @keydown.native.enter="search()"
            ></el-input
          ></el-form-item>
          <el-form-item label="手机型号" class="demo-form-inline headLabel"
            ><el-select
              filterable
              clearable
              size="small"
              v-model="queryModule.deviceName"
              placeholder="请选择手机型号"
            >
              <el-option
                v-for="item in deviceList"
                :key="item.deviceName"
                :label="item.deviceName"
                :value="item.deviceName"
              >
              </el-option></el-select
          ></el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search()"
            >查询</el-button
          >
        </el-form>
      </el-col>
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="{ ...queryModule, list }"
      @page-change="handleChangePage"
    >
      <template slot="status" slot-scope="{ row }">
        <!-- <el-tag type="danger" v-if="row.status === 0">已下线</el-tag>
        <el-tag type="success" v-if="row.status === 1">已上线</el-tag> -->
        <span :style="{ color: 'red' }" v-if="row.status === 0">已下线</span>
        <span :style="{ color: '#67C23A' }" v-if="row.status === 1"
          >已上线</span
        >
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
          <el-button v-has="'onOff'" type="text" @click="handleClickOnOff(row)">
            <span :class="row.status == 0 ? 'colorGreen' : 'colorRed'">{{
              row.status == 0 ? "上线" : "下线"
            }}</span>
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
import { queryApkBlackList, updateStatusById } from "@/api/blacklistModule";
import { queryVersionList } from "@/api/common";
export default {
  name: "blacklistApp",
  components: {
    PageTable,
    EditorDialog,
  },
  computed: {
    ...mapGetters(["deviceList"]),
  },
  watch: {
    "queryModule.deviceName"() {
      this.search();
    },
  },
  data() {
    return {
      columns: [
        { key: "deviceName", label: "手机型号", align: "center" },
        { key: "versionInterval", label: "生效版本区间", align: "center" },
        { key: "name", label: "应用名称", align: "center" },
        { key: "pname", label: "包名", align: "center" },
        { key: "description", label: "描述", align: "center" },
        { slot: "status", label: "状态", align: "center", width: 140 },
        { key: "createTime", label: "创建时间", align: "center", width: 140 },
        { key: "modifyTime", label: "修改时间", align: "center", width: 140 },
      ],
      queryModule: {
        count: true,
        deviceId: "",
        deviceName: "",
        description: "",
        pname: "",
        name: "",
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],
      detailData: {},
      operationType: "",
      editorDialogShow: false,
      apiVersionList: [], // 所有版本
    };
  },
  created() {
    this.$store.dispatch("updateDeviceList");
    this.getDataList();
    queryVersionList({
      //获取版本号
      page: 1,
      size: 1000,
      isDelete: 0,
    }).then((res) => {
      this.apiVersionList = res.data.list;
    });
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
        this.detailData = { ...row };
      }
    },
    handleClickOnOff(row) {
      const desc = `确定${row.status == 0 ? "上线" : "下线"}吗？`;
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

    // 获取列表数据
    getDataList() {
      queryApkBlackList(this.queryModule).then((res) => {
        if (res.data) {
          const { list = [], total } = res.data;
          this.list = list;
          this.queryModule.total = total;
        } else {
          this.list = [];
        }
      });
    },
    handleEnable(row) {
      let params = {
        id: row.id,
        status: row.status === 0 ? 1 : 0,
      };
      updateStatusById(params).then((res) => {
        if (!row.status) {
          this.$message.success("上线成功");
        } else {
          this.$message.success("下线成功");
        }
        this.getDataList();
      });
    },
  },
};
</script>
