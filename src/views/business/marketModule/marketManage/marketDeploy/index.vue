<template>
  <div>
    <div class="deploy-header mb20">
      <span class="el-dialog__title">{{ dialogTitle }}</span>
    </div>
    <el-row>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        v-has="'deployAdd'"
        @click="handleOperate('create')"
        >添加根节点</el-button
      >
      <el-button size="small" @click="toggleRowExpansion(true)"
        >全部展开</el-button
      >
      <el-button size="small" @click="toggleRowExpansion(false)"
        >全部关闭</el-button
      >
    </el-row>
    <el-table
      border
      ref="dataTree"
      row-key="pageId"
      :data="tableList"
      :default-expand-all="false"
      :tree-props="treeProps"
    >
      <el-table-column prop="pageName" label="页面名称"> </el-table-column>
      <el-table-column prop="pageId" label="页面ID"> </el-table-column>
      <el-table-column prop="deep" label="页面等级">
        <template slot-scope="{ row }">
          {{ row.deep | typeDesc(pageDeepList) }}
        </template>
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型">
        <template slot-scope="{ row }">
          {{ row.pageType | typeDesc(pageTypeList) }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间 "> </el-table-column>
      <el-table-column label="操作" width="260px" align="center">
        <template slot-scope="{ row }">
          <el-button
            :disabled="[1, 2].includes(row.pageType) || row.isExternalRes == 1"
            type="text"
            v-has="'deployConfig'"
            @click="handleOperate('config', row)"
            >配置</el-button
          >
          <el-button
            type="text"
            v-has="'deploySync'"
            @click="handleOperate('sync', row)"
            >同步</el-button
          >
          <el-button
            type="text"
            v-has="'deployAdd'"
            :disabled="row.deep > 2 || row.pageType === 2"
            @click="handleOperate('create', row)"
            >添加</el-button
          >
          <el-button
            type="text"
            v-has="'deployEdit'"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            v-has="'deployGlobal'"
            @click="handleOperate('global', row)"
            >国际化</el-button
          >
          <el-button
            type="text"
            v-has="'deployDelete'"
            @click="handleOperate('delete', row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      center
      :wrapperClosable="false"
      :title="operationType | operationTypeDesc"
      :visible.sync="visible"
    >
      <Detail
        v-if="['create', 'edit'].includes(operationType)"
        :operationType="operationType"
        :detailData="detailData"
        :historyVersionList="historyVersionList"
        :strategyList="strategyList"
        @submit="handleSubmit"
        @cancel="visible = false"
      />
    </el-dialog>
    <el-dialog
      center
      width="60%"
      append-to-body
      :title="operationTypeDesc"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <Global
        v-if="operationType === 'global'"
        :pageId="detailData.pageId"
        :pageDeep="detailData.deep"
      />
    </el-dialog>
    <el-dialog
      center
      width="30%"
      :title="operationTypeDesc"
      :visible.sync="dialogVisible1"
      :close-on-click-modal="false"
    >
      <el-form label-suffix=":" :model="formData">
        <el-form-item>
          <div v-if="operationType === 'delete'">
            此操作将删除页面，是否继续？
          </div>
          <div v-if="operationType === 'sync'">请选择需要同步的历史版本</div>
        </el-form-item>
        <el-form-item
          prop="adHistory"
          label="是否同步历史版本"
          v-if="operationType === 'delete'"
          :rules="[{ required: true, message: '请选择是否同步历史版本' }]"
        >
          <el-radio-group v-model="formData.adHistory">
            <el-radio
              size="small"
              v-for="item in booleanList"
              :key="item.key"
              :label="item.key"
              >{{ item.value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label=""
          prop="historyList"
          v-if="formData.adHistory || operationType === 'sync'"
        >
          <SelectMarket
            :marketList="historyVersionList"
            @selection-change="handleSelectionChange"
          ></SelectMarket>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="dialogVisible1 = false">取消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitForm"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  pageTypeList,
  pageDeepList,
  booleanList,
} from "@/common/constant/constant.js";
import SelectMarket from "./SelectMarket.vue";
import Detail from "./Detail.vue";
import Global from "../global/index";
import {
  getMarketDeployList,
  deleteMarketPage,
  syncMarketPage,
  updateMarketPage,
  addMarketPage,
  getHistoryVersion,
  getStrategyList,
} from "../indexServe.js";
export default {
  name: "marketDeploy",
  components: { Detail, Global, SelectMarket },
  data() {
    return {
      pageTypeList,
      pageDeepList,
      booleanList,
      tableList: [],
      treeProps: { children: "pageList" },
      operationType: "",
      detailData: {},
      visible: false,
      dialogVisible: false, // 控制dialog的显示和隐藏
      dialogVisible1: false, // 控制dialog的显示和隐藏
      historyVersionList: [],
      strategyList: [],
      formData: {
        adHistory: 0,
        historyList: [],
      },
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    marketId() {
      return this.$route.params.marketId;
    },
    dialogTitle() {
      const { marketName = "" } = this.$route.params;
      return `部署市场--${marketName}`;
    },
    operationTypeDesc() {
      switch (this.operationType) {
        case "global":
          return `国际化--${this.detailData.pageName}`;
        case "config":
          return `配置--${this.detailData.pageName}`;
        case "delete":
          return `删除--${this.detailData.pageName}`;
        case "sync":
          return `同步--${this.detailData.pageName}`;
        default:
          return "";
      }
    },
  },
  methods: {
    //切换数据表格树形展开
    toggleRowExpansion(isExpansion) {
      const { children } = this.treeProps;
      this.toggleRowExpansion_forAll(this.tableList, children, isExpansion);
    },
    handleOperate(operationType, row = {}) {
      this.operationType = operationType;
      let detailDataTmp = {};
      if (["create", "edit"].includes(operationType)) {
        this.visible = true;
        if (operationType === "create") {
          detailDataTmp = {
            locationId: row.locationId,
            parentId: (row && row.pageId) || 0, // 新增时，当前行页面是父页面
            parentName: (row && row.pageName) || "根节点", // 新增时，当前行页面是父页面
            deep: ((row && row.deep) || 0) + 1, // 新增时，深度+1
            pageType: 0,
            displaySort: 1,
            isExternalRes: 0, //0:自定义榜单，1:策略榜单
          };
        } else {
          detailDataTmp = row;
        }
        this.getHistoryVersion({
          locationId: row.locationId,
          pageId: row.pageId,
        });
      } else if (["global"].includes(operationType)) {
        this.dialogVisible = true;
        detailDataTmp = row;
      } else if (["delete", "sync"].includes(operationType)) {
        this.dialogVisible1 = true;
        this.formData = {
          adHistory: 0, // 是否同步历史版本默认都为“否”
          historyList: [],
        };
        detailDataTmp = row;
        this.getHistoryVersion({
          locationId: row.locationId,
          pageId: row.pageId,
        });
      } else if (["config"].includes(operationType)) {
        this.$router.push({
          // 多个部署页面打开时，切换会出现path参数丢失问题，所以用params传参
          path: `/business/marketModule/marketManage/pageConfig/${row.pageId}`,
        });
      }
      this.detailData = {
        ...detailDataTmp,
        adHistory: 0, // 所有情况的是否同步历史版本默认都为“否”
        historyList: [],
        marketId: this.marketId,
      };
    },
    handleSelectionChange(val) {
      this.formData.historyList = val;
    },
    handleSubmitForm() {
      if (this.operationType === "delete") {
        this.deleteMarketPage();
      } else if (this.operationType === "sync") {
        this.syncMarketPage();
      }
    },
    handleSubmit(formData) {
      const fcn =
        this.operationType === "edit" ? updateMarketPage : addMarketPage; // 编辑和新建分别调用不同接口
      fcn(formData).then((res) => {
        if (res && res.code == 0) {
          this.visible = false;
          this.getTableList(); // 成功后刷新列表
          this.$message.success("操作成功");
        }
      });
    },
    // 获取市场页面列表
    async getTableList() {
      const res = await getMarketDeployList({ marketId: this.marketId });
      if (res && res.code == 0) {
        this.tableList = res.data;
      }
    },
    async getHistoryVersion(pramas) {
      let historyVersionList = [];
      if (typeof pramas.locationId !== "undefined") {
        const res = await getHistoryVersion(pramas);
        if (res && res.code == 0) {
          historyVersionList = res.data;
        }
      }
      this.historyVersionList = historyVersionList;
    },
    async getStrategyList(pramas) {
      const res = await getStrategyList(pramas);
      if (res && res.code == 0) {
        this.strategyList = res.data.list;
      }
    },
    async deleteMarketPage() {
      const data = { ...this.detailData, ...this.formData };
      const res = await deleteMarketPage(data);
      if (res && res.code == 0) {
        this.getTableList(); // 删除成功后刷新列表
        this.dialogVisible1 = false;
        this.$message.success("删除成功");
      }
    },
    async syncMarketPage() {
      const marketList = this.formData.historyList.map((i) => i.marketId);
      const data = { pageId: this.detailData.pageId, marketList };
      const res = await syncMarketPage(data);
      if (res && res.code == 0) {
        this.getTableList(); // 删除成功后刷新列表
        this.dialogVisible1 = false;
        this.$message.success("同步成功");
      }
    },

    // 其他
    toggleRowExpansion_forAll(data, childrenCode, isExpansion) {
      data.forEach((item) => {
        this.$refs.dataTree.toggleRowExpansion(item, isExpansion);
        if (item[childrenCode] != undefined && item[childrenCode] != null) {
          this.toggleRowExpansion_forAll(
            item[childrenCode],
            childrenCode,
            isExpansion
          );
        }
      });
    },
    init() {
      this.getTableList();
      this.getStrategyList();
    },
  },
};
</script>
<style scoped lang="scss">
.deploy-header {
  position: relative;
}
</style>
