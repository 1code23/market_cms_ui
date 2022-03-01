<template>
  <div>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="评论内容" class="demo-form-inline"
            ><el-input
              size="small"
              v-model="queryModule.commentContent"
              placeholder="请输入内容查询"
              @keydown.native.enter="search()"
            ></el-input>
          </el-form-item>
          <el-form-item label="应用名称" class="demo-form-inline"
            ><el-input
              size="small"
              v-model="queryModule.apkName"
              placeholder="请输入应用名称查询"
              @keydown.native.enter="search()"
            ></el-input
          ></el-form-item>
          <el-form-item label="应用包名" class="demo-form-inline"
            ><el-input
              size="small"
              v-model="queryModule.packageName"
              placeholder="请输入包名称查询"
              @keydown.native.enter="search()"
            ></el-input
          ></el-form-item>
          <el-form-item label="审核状态" class="demo-form-inline"
            ><el-select
              style="width: 100%"
              filterable
              clearable
              size="small"
              v-model="queryModule.auditStatus"
              placeholder="请选择审核状态"
            >
              <el-option label="待审核" :value="0"></el-option>
              <el-option label="已通过" :value="1"></el-option>
              <el-option label="已拒绝" :value="2"></el-option> </el-select
          ></el-form-item>
          <!-- <el-col :span="6">
            <el-date-picker
              style="width: 100%"
              v-model="queryModule.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker
          ></el-col> -->
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true">
          <el-form-item label="评论日期:" class="demo-form-inline headLabel">
            <el-date-picker
              style="width: 100%"
              v-model="queryModule.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker
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
      <template slot="stars" slot-scope="{ row }">
        <el-rate :value="row.stars" disabled score-template="{value}">
        </el-rate>
      </template>
      <template slot="parentId" slot-scope="{ row }">
        <span v-if="row.parentId === 0">一级评论</span>
        <span v-else>回复评论</span>
      </template>
      <template slot="lang" slot-scope="{ row }">
        <span>{{ row.lang | getLanguageName(languageList) }}</span>
      </template>
      <template slot="auditStatus" slot-scope="{ row }">
        <!-- <el-tag type="info" v-if="row.auditStatus === 0">已拒绝</el-tag>
        <el-tag type="success" v-if="row.auditStatus === 1">已通过</el-tag>
        <el-tag v-if="row.auditStatus === 2">待审核</el-tag> -->
        <span :style="{ color: '#909399' }" v-if="row.auditStatus === 2"
          >已拒绝</span
        >
        <span :style="{ color: '#67C23A' }" v-if="row.auditStatus === 1"
          >已通过</span
        >
        <span :style="{ color: '#409eff' }" v-if="row.auditStatus === 0"
          >待审核</span
        >
      </template>
      <el-table-column label="操作" width="180px" align="center" fixed="right">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'details'"
            style="margin-right: 10px"
            @click="handleOperate('edit', row)"
            >详情</el-button
          >
          <el-button
            v-has="'audit'"
            :disabled="row.auditStatus !== 0"
            type="text"
            style="margin-right: 10px"
            @click="handleOperate('audit', row)"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </PageTable>
    <!-- 编辑 弹框 -->
    <EditorDialog :isShow.sync="editorDialogShow" :row="detailData" />
    <el-dialog title="评论审核" :visible.sync="auditDialogShow" width="30%">
      <el-radio-group v-model="auditStatus">
        <el-radio :label="1">审核通过</el-radio>
        <el-radio :label="2">审核不通过</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAudit()">确 定</el-button>
        <el-button @click="auditDialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import EditorDialog from "./components/EditorDialog.vue";
import { mapGetters } from "vuex";
import { dateFormat } from "@/common/utils/utils";
import moment from "moment";
import {
  queryCommentList,
  updateAuditStatusByCommentId,
} from "@/api/commentsModule";
export default {
  name: "commentsModuleAudit",
  components: {
    PageTable,
    EditorDialog,
  },
  computed: {
    ...mapGetters(["languageList"]),
  },
  watch: {
    "queryModule.auditStatus"() {
      this.search();
    },
  },
  data() {
    let end = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    start = moment(start).format("YYYY-MM-DD HH:mm:ss");
    return {
      columns: [
        { key: "commentId", label: "ID", align: "center" },
        { key: "apkName", label: "应用名称", align: "center", width: 160 },
        { key: "packageName", label: "包名", align: "center", width: 160 },
        { key: "versionCode", label: "版本号", align: "center" },
        { key: "hstype", label: "机型", align: "center" },
        { slot: "stars", label: "星级", align: "center", width: 160 },
        {
          key: "commentContent",
          label: "评论内容",
          align: "center",
          width: 140,
        },
        { key: "nickname", label: "评论者", align: "center" },
        { key: "coverNickname", label: "被评论者", align: "center" },
        { slot: "parentId", label: "评论类型", align: "center" },
        { slot: "lang", label: "所属语言", align: "center" },
        { key: "createTime", label: "评论时间", align: "center", width: 140 },
        { slot: "auditStatus", label: "审核状态", align: "center" },
      ],
      queryModule: {
        count: true,
        commentContent: "",
        apkName: "",
        packageName: "",
        auditStatus: 0,
        page: 1,
        size: 10,
        total: 0,
        date: [start, end],
      },
      list: [],
      detailData: {},
      auditStatus: 1,
      editorDialogShow: false,
      auditDialogShow: false,
    };
  },
  created() {
    this.$store.dispatch("updateLanguageList");
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
      if (type === "audit") {
        this.auditDialogShow = true;
        this.detailData = { ...row };
      }
      if (type === "edit") {
        this.editorDialogShow = true;
        this.detailData = { ...row };
      }
    },

    // 获取列表数据
    getDataList() {
      let params = { ...this.queryModule };
      if (params.date) {
        params.startDate = moment(params.date[0]).format("YYYY-MM-DD HH:mm:ss");
        params.endDate = moment(params.date[1]).format("YYYY-MM-DD HH:mm:ss");
      }
      queryCommentList(params).then((res) => {
        if (res.data) {
          const { list = [], total } = res.data;
          this.list = list;
          this.queryModule.total = total;
        } else {
          this.list = [];
        }
      });
    },
    saveAudit() {
      let params = {
        commentId: this.detailData.commentId,
        auditStatus: this.auditStatus,
      };
      updateAuditStatusByCommentId(params).then((res) => {
        this.$message.success("操作成功");
        this.auditDialogShow = false;
        this.auditStatus = 1;
        this.search();
      });
    },
  },
};
</script>
