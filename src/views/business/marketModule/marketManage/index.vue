<template>
  <div>
    <el-row>
      <el-button
        size="small"
        type="primary"
        v-has="'add'"
        icon="el-icon-plus"
        @click="handleOperate('create')"
        >新增</el-button
      >
      <el-button
        size="small"
        type="primary"
        v-has="'copy'"
        icon="el-icon-document-copy"
        @click="handleCopyMarket()"
        >一键复制市场</el-button
      >
    </el-row>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="市场名称" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="searchData.marketName"
              placeholder="请输入市场名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="市场描述" class="demo-form-inline"
            ><el-input
              size="small"
              v-model="searchData.description"
              placeholder="请输入市场描述"
            ></el-input> </el-form-item
          ><el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch()"
            >查询</el-button
          ></el-form
        ></el-col
      >
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="tableData"
      @page-change="handleChangePage"
    >
      <el-table-column slot="prefix" width="60px" align="center">
        <template slot-scope="{ row }">
          <el-radio v-model="radioValue" :label="row.marketId">
            <span></span>
          </el-radio>
        </template>
      </el-table-column>
      <template slot-scope="{ row }" slot="status">
        <!-- <el-tag size="small" :type="row.isDelete | tagType(deleteStatusList)">
          {{ row.isDelete | typeDesc(deleteStatusList) }}
        </el-tag> -->
        <span
          :style="row.isDelete == 0 ? { color: '#67C23A' } : { color: 'red' }"
          >{{ row.isDelete | typeDesc(deleteStatusList) }}</span
        >
      </template>
      <template slot-scope="{ row }" slot="languageNum">
        {{ row.languageNum }}种
      </template>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'deploy'"
            @click="handleOperate('deployMarket', row)"
            >部署</el-button
          >
          <el-button
            type="text"
            v-has="'edit'"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button v-has="'onOff'" type="text" @click="handleClickOnOff(row)">
            <span :class="row.isDelete == 1 ? 'colorGreen' : 'colorRed'">{{
              row.isDelete == 1 ? "启用" : "禁用"
            }}</span></el-button
          >
        </template>
      </el-table-column>
    </PageTable>
    <el-dialog
      center
      width="700px"
      :wrapperClosable="false"
      :title="operationType | operationTypeDesc"
      :visible.sync="visible"
    >
      <Detail
        :operationType="operationType"
        :detailData="detailData"
        :languageList="languageList"
        @submit="handleSubmit"
        @cancel="visible = false"
      />
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PageTable from "@/components/PageTable.vue";
import { deleteStatusList } from "@/common/constant/constant.js";
import Detail from "./Detail.vue";
import {
  getMarketList,
  addMarket,
  updateMarket,
  copyMarket,
} from "./indexServe";
export default {
  name: "marketManage",
  components: {
    PageTable,
    Detail,
  },
  created() {
    this.$store.dispatch("updateLanguageList");
    this.init();
  },
  data() {
    return {
      deleteStatusList,
      radioValue: "",
      searchData: {},
      tableData: {
        list: [],
      },
      columns: [
        { key: "marketId", label: "市场ID" },
        { key: "marketName", label: "市场名称" },
        { key: "description", label: "市场描述" },
        { key: "versionCode", label: "市场版本" },
        { slot: "languageNum", label: "生效语言" },
        { key: "createTime", label: "创建时间" },
        { key: "modifyTime", label: "修改时间" },
        { slot: "status", label: "状态", align: "center" },
      ],
      visible: false, //控制drawer的显示和隐藏
      dialogVisible: false, // 控制dialog的显示和隐藏
      operationType: "", // 记录当前操作模式新建-create、编辑-edit
      detailData: {},
    };
  },
  computed: {
    ...mapGetters(["languageList"]),
  },
  filters: {
    operationTypeDesc(type, custom) {
      if (custom) return custom;
      switch (type) {
        case "create":
          return "新增市场";
        case "view":
          return "查看市场";
        case "edit":
          return "修改市场";
        case "copy":
          return "一键复制市场";
        default:
          return " ";
      }
    },
  },
  methods: {
    // 事件监听
    handleChangePage({ page, size }) {
      this.getTableList({ page, size });
    },
    handleOperate(operationType, row) {
      if (["create", "edit"].includes(operationType)) {
        this.visible = true;
      } else if (["deployMarket"].includes(operationType)) {
        this.$router.push({
          // 多个部署页面打开时，切换会出现path参数丢失问题，所以用params传参
          path: `/business/marketModule/marketManage/marketDeploy/${row.marketId}/${row.marketName}`,
        });
      }
      this.operationType = operationType;
      if (operationType === "create") {
        this.detailData = { effLanguage: [] };
      } else {
        const effLanguage = row.languages.split(",");
        this.detailData = { ...row, effLanguage };
      }
    },
    handleCopyMarket() {
      if (!this.radioValue) {
        this.$message.error("请勾选需要复制的市场");
        return;
      } else {
        this.copyMarket({ marketId: this.radioValue });
      }
    },
    handleClickOnOff(row) {
      const desc = `此操作将${
        row.isDelete == 1 ? "开始" : "停止"
      }使用市场，是否继续？`;
      this.$confirm(desc, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleChangeStatus(row);
        })
        .catch(() => {});
    },
    handleChangeStatus(row) {
      const isDelete = row.isDelete == 1 ? 0 : 1; // 将禁用状态改成启用，启用状态改成禁用
      updateMarket({ ...row, isDelete }).then((res) => {
        if (res && res.code === 0) {
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 成功后刷新列表
          this.$message.success("操作成功");
        }
      });
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    handleSubmit(formData) {
      formData.languages = formData.effLanguage.join(",");
      const fcn = ["edit", "copy"].includes(this.operationType)
        ? updateMarket
        : addMarket; // 编辑和新建分别调用不同接口
      fcn(formData).then((res) => {
        if (res && res.code === 0) {
          this.visible = false;
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 成功后刷新列表
          this.$message.success("操作成功");
        }
      });
    },
    // 后端请求
    async getTableList(params, isDownload) {
      const res = await getMarketList({
        page: 1,
        size: 10,
        ...this.searchData,
        ...params,
      });
      if (res && res.code == 0) {
        // 下载时，不需要更新到table
        if (!isDownload) {
          this.tableData = res.data;
        }
        return res.data;
      }
    },
    // 复制市场
    async copyMarket(params) {
      const res = await copyMarket(params);
      if (res && res.code === 0) {
        this.$message.success("复制成功");
        this.getTableList();
        // 复制成功后需要弹出修改页面
        this.visible = true;
        this.operationType = "copy";
        const data = res.data;
        const effLanguage = data.languages.split(",");
        this.detailData = { ...data, effLanguage };
      }
    },
    // 其他
    init() {
      this.getTableList();
    },
  },
};
</script>
