<template>
  <div>
    <el-row :gutter="6">
      <el-col :span="24"
        ><el-form :inline="true" label-suffix=":">
          <el-form-item label="查询内容" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="queryModule.extra"
              placeholder="请输入词语查询"
              @keydown.native.enter="search()"
            ></el-input>
          </el-form-item>
          <el-form-item label="举报日期" class="demo-form-inline">
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
    </PageTable>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { queryReportList } from "@/api/commentsModule";
import { dateFormat } from "@/common/utils/utils";
import { mapGetters } from "vuex";
export default {
  name: "report",
  computed: {
    ...mapGetters(["deviceList"]),
  },
  components: {
    PageTable,
  },
  watch: {},
  data() {
    return {
      columns: [
        { key: "id", label: "ID", align: "center" },
        { key: "nickname", label: "举报人", align: "center" },
        { key: "reportType", label: "举报原因", align: "center" },
        { key: "extra", label: "举报说明", align: "center" },
        { key: "coverNickname", label: "被举报人", align: "center" },
        {
          key: "commentContent",
          label: "被举报内容",
          align: "center",
          width: 140,
        },
        { key: "createdAt", label: "举报时间", align: "center", width: 140 },
      ],
      queryModule: {
        count: true,
        extra: "",
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],
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
    // 获取列表数据
    getDataList() {
      let params = { ...this.queryModule };
      if (params.date) {
        params.startDate = dateFormat("YYYY-mm-dd HH:MM:SS", params.date[0]);
        params.endDate = dateFormat("YYYY-mm-dd HH:MM:SS", params.date[1]);
      }
      queryReportList(params).then((res) => {
        if (res.data) {
          const { list = [], total } = res.data;
          this.list = list;
          this.queryModule.total = total;
        } else {
          this.list = [];
        }
      });
    },
  },
};
</script>
