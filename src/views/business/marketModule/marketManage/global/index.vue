<template>
  <div>
    <el-row>
      <el-button
        size="small"
        type="primary"
        v-has="'globalAdd'"
        icon="el-icon-plus"
        @click="handleOperate('create')"
        >新增</el-button
      >
    </el-row>
    <el-table :data="tableList" :max-height="450">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="语言">
        <template slot-scope="{ row }">
          {{ row.language | languageDesc(languageList) }}
        </template>
      </el-table-column>
      <el-table-column label="页面名称" prop="pageNameLang"></el-table-column>
      <el-table-column label="浅色-主图标" v-if="pageDeep === 1">
        <template slot-scope="{ row }">
          <img :src="row.icon" class="icon" />
        </template>
      </el-table-column>
      <el-table-column label="浅色-副图标" v-if="pageDeep === 1">
        <template slot-scope="{ row }">
          <img :src="row.sicon" class="icon" />
        </template>
      </el-table-column>
      <el-table-column label="深色-主图标" v-if="pageDeep === 1">
        <template slot-scope="{ row }">
          <img :src="row.darkIcon" class="icon" />
        </template>
      </el-table-column>
      <el-table-column label="深色-副图标" v-if="pageDeep === 1">
        <template slot-scope="{ row }">
          <img :src="row.darkSicon" class="icon" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="修改时间" prop="modifyTime"></el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'globalEdit'"
            style="margin-right: 5px"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button
            v-has="'globalDelete'"
            type="text"
            @click="handleClickOnOff(row)"
          >
            <span class="colorRed">删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      size="50%"
      :append-to-body="true"
      :wrapperClosable="false"
      :title="operationType | operationTypeDesc"
      :visible.sync="visible"
    >
      <Detail
        :operationType="operationType"
        :detailData="detailData"
        :pageDeep="pageDeep"
        :languageList="languageList"
        :selectLanguageIdList="selectLanguageIdList"
        @submit="handleSubmit"
        @cancel="visible = false"
      />
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Detail from "./Detail.vue";
import {
  getGlobalMarketList,
  addGlobalMarketPage,
  updateGlobalMarketPage,
  deleteGlobalMarketPage,
} from "../indexServe";
export default {
  components: { Detail },
  props: {
    pageId: {
      default: "",
    },
    pageDeep: {
      default: "",
    },
  },
  created() {
    this.$store.dispatch("updateLanguageList");
    this.init();
  },
  data() {
    return {
      tableList: [],
      visible: false,
      operationType: "", // 记录当前操作模式新建-create、编辑-edit
      detailData: {},
    };
  },
  computed: {
    ...mapGetters(["languageList"]),
    selectLanguageIdList() {
      // 已经维护了多语言的语言id集合
      return this.tableList.map((i) => i.language);
    },
  },
  methods: {
    // 事件监听
    handleChangePage({ page, size }) {
      this.getTableList({ page, size });
    },
    handleOperate(operationType, row) {
      this.visible = true;
      this.operationType = operationType;
      if (operationType === "create") {
        this.detailData = { syncType: 0 }; // 无论编辑还是修改是否同步历史版本都为否
      } else {
        this.detailData = { ...row, syncType: 0 };
      }
    },
    handleDelete(row) {
      deleteGlobalMarketPage({ id: row.id }).then((res) => {
        if (res && res.code === 0) {
          this.getTableList(); // 删除成功后刷新列表
        }
      });
    },
    handleSubmit(formData) {
      const data = { ...formData, pageId: this.pageId };
      const fcn =
        this.operationType === "edit"
          ? updateGlobalMarketPage
          : addGlobalMarketPage; // 编辑和新建分别调用不同接口
      fcn(data).then((res) => {
        if (res && res.code === 0) {
          this.visible = false;
          this.getTableList(); // 成功后刷新列表
          this.$message.success("操作成功");
        }
      });
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
    // 获取列表
    async getTableList(params) {
      const pageId = this.pageId;
      if (!pageId) return;
      const data = {
        page: 1,
        size: 10,
        pageId,
        ...params,
      };
      const res = await getGlobalMarketList(data);
      if (res && res.code === 0) {
        // 下载时，不需要更新到table
        this.tableList = res.data;
      }
    },
    // 其他
    init() {
      this.getTableList();
    },
  },
  watch: {
    pageId() {
      this.init();
    },
  },
};
</script>
<style scoped lang="scss">
.icon {
  width: 80px;
  height: 80px;
}
</style>
