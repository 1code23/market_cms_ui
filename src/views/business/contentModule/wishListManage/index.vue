<template>
  <div>
    <el-row :gutter="6">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="心愿单名称:" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="queryModule.wishApkName"
              placeholder="请输入心愿单名称"
              @keydown.native.enter="search()"
            ></el-input>
          </el-form-item>
          <el-form-item label="语言" class="demo-form-inline">
            <el-select
              v-model="queryModule.language"
              size="small"
              placeholder="请选择语言"
              clearable
            >
              <el-option
                v-for="item in languageList"
                :key="item.languageType"
                :label="item.languageName"
                :value="item.languageType"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" class="demo-form-inline">
            <el-select
              v-model="queryModule.wishStatus"
              size="small"
              placeholder="请选择状态"
              clearable
            >
              <el-option
                v-for="item in wishStatus"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              >
              </el-option>
            </el-select> </el-form-item
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
      <template slot="language" slot-scope="{ row }">
        <span>{{ row.language | getLanguageName(languageList) }}</span>
      </template>
      <template slot="details" slot-scope="{ row }">
        <el-button type="text" @click="handleOperate('details', row)"
          >查看</el-button
        >
      </template>
      <template slot="wishStatus" slot-scope="{ row }">
        <!-- <el-tag type="success" v-if="row.wishStatus === 1">已上线</el-tag>
        <el-tag type="danger" v-if="row.wishStatus === 2">已下线</el-tag>
        <el-tag v-if="row.wishStatus === 0">待关联</el-tag> -->
        <span :style="{ color: '#67C23A' }" v-if="row.wishStatus === 1"
          >已上线</span
        >
        <span :style="{ color: 'red' }" v-if="row.wishStatus === 2"
          >已下线</span
        >
        <span :style="{ color: '#409eff' }" v-if="row.wishStatus === 0"
          >待关联</span
        >
      </template>
      <template slot="cornerIcon" slot-scope="{ row }">
        <img class="icon" :src="row" alt="" />
      </template>
      <el-table-column fixed="right" label="操作" width="180px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'relevance'"
            @click="handleOperate('relevance', row)"
            >关联</el-button
          >
          <el-button
            v-has="'onOff'"
            type="text"
            v-if="row.wishStatus !== 0"
            @click="handleClickOnOff(row)"
          >
            <span :class="row.status == 0 ? 'colorGreen' : 'colorRed'">{{
              row.status == 0 ? "上线" : "下线"
            }}</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <RelevanceDialog :isShow.sync="relevanceDialogShow" :row="detailData" />
    <DetailsDialog :isShow.sync="detailsDialogShow" :row="detailData" />
  </div>
</template>

<script>
import PageTable from "@/components/PageTable.vue";
import RelevanceDialog from "./compoments/RelevanceDialog.vue";
import DetailsDialog from "./compoments/DetailsDialog.vue";
import { queryWishList, updateWishById } from "@/api/wishlist";
import { mapGetters } from "vuex";
import { wishStatus } from "@/common/constant/constant";
export default {
  name: "wishListManage",
  components: { PageTable, RelevanceDialog, DetailsDialog },
  computed: {
    ...mapGetters(["languageList"]),
  },
  watch: {
    "queryModule.language"() {
      this.search();
    },
    "queryModule.wishStatus"() {
      this.search();
    },
  },
  data() {
    return {
      wishStatus: wishStatus,
      columns: [
        {
          key: "id",
          label: "ID",
          align: "center",
          width: 100,
        },
        { key: "wishApkName", label: "心愿单", width: 120, align: "center" },
        { slot: "language", label: "所属语言", align: "center" },
        { slot: "details", label: "心愿详情", width: 120, align: "center" },
        { key: "feedbackCount", label: "反馈人数", align: "center" },
        { key: "apkName", label: "关联应用", align: "center", width: 160 },
        { key: "createdAt", label: "创建时间", width: 160, align: "center" },
        { key: "updatedAt", label: "修改时间", width: 160, align: "center" },
        { slot: "wishStatus", label: "心愿状态", align: "center" },
      ],
      queryModule: {
        count: true,
        language: "",
        page: 1,
        size: 10,
        total: 0,
        wishApkName: "",
        wishStatus: null,
      },
      list: [],
      operationType: "",
      relevanceDialogShow: false,
      detailsDialogShow: false,
      viewImgShow: false,
      imgList: [],
      detailData: {
        name: "",
      },
    };
  },
  created() {
    this.$store.dispatch("updateLanguageList");
    this.getDataList();
  },
  methods: {
    search() {
      this.queryModule.page = 1;
      this.getDataList();
    },
    handleSearch() {},
    handleChangePage({ page, size }) {
      this.queryModule.page = page;
      this.queryModule.size = size;
      this.getDataList();
    },
    getDataList() {
      queryWishList(this.queryModule).then((res) => {
        const { list = [], total } = res.data;
        this.list = list;
        this.queryModule.total = total;
      });
    },
    handleOperate(operationType, row) {
      this.operationType = operationType;
      if (operationType === "relevance") {
        this.relevanceDialogShow = true;
        this.detailData = { ...row };
      }
      if (operationType === "details") {
        this.detailsDialogShow = true;
        this.detailData = { ...row };
      }
    },
    handleEnable(row) {
      let params = {
        id: row.id,
        status: row.status === 0 ? 1 : 0,
      };
      updateWishById(params).then((res) => {
        if (!row.status) {
          this.$message.success("上线成功");
        } else {
          this.$message.success("下线成功");
        }
        this.getDataList();
      });
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
  },
};
</script>

<style lang="scss">
.view-el-img {
  position: relative;
  top: 5px;
  img {
    width: 25px;
    height: 20px;
    opacity: 0;
  }
  &::before {
    cursor: pointer;
    pointer-events: none;
    content: "查看";
    font-size: 12px;
    color: #409eff;
    position: absolute;
    top: 0;
  }
}
</style>
