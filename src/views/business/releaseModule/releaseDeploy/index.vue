<template>
  <div id="modeManage">
    <el-row :gutter="16">
      <el-col :span="8"
        ><el-button
          type="primary"
          v-has="'add'"
          size="small"
          icon="el-icon-plus"
          @click="addEditBtn('add')"
          >新增</el-button
        ></el-col
      >
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="手机型号" class="demo-form-inline">
            <el-select
              v-model="queryModule.channelId"
              placeholder="请选择手机型号"
              filterable
              clearable
            >
              <el-option
                v-for="item in deviceList"
                :key="item.id"
                :label="item.deviceName"
                :value="item.deviceName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市场版本号" class="demo-form-inline">
            <el-select
              v-model="queryModule.clientVersion"
              placeholder="请选择市场版本号"
              filterable
              clearable
            >
              <el-option
                v-for="item in versionModule"
                :key="item.marketId"
                :label="item.versionCode"
                :value="item.versionCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button
            type="primary"
            @click="searchList"
            size="small"
            icon="el-icon-search"
            >查询</el-button
          >
        </el-form>
      </el-col>
    </el-row>
    <PageTable
      :columns="modelTabelHead"
      :tableData="{ list: modelTabelList, ...queryModule }"
      @page-change="handleChangePage"
    >
      <!-- 更新范围 -->
      <template slot-scope="{ row }" slot="updateScope">
        <span>{{ row.updateScope == 1 ? "正式发布" : "测试发布" }}</span>
      </template>
      <!-- 更新策略 -->
      <template slot-scope="{ row }" slot="updateStrategy">
        <span>{{ row.updateStrategy | typeDesc(updateStatus) }}</span>
      </template>
      <!-- 更新包下载地址 -->
      <template slot-scope="{ row }" slot="apkUrl">
        <span
          class="tag-read colorGreen"
          @click="copy(row.apkUrl)"
          :data-clipboard-text="copyApkurl"
          >复制更新包地址</span
        >
      </template>
      <!-- 状态 -->
      <template slot-scope="{ row }" slot="status">
        <span
          :style="row.status == 0 ? { color: 'red' } : { color: '#67C23A' }"
          >{{ row.status | typeDesc(onlineStartus) }}</span
        >
      </template>
      <el-table-column fixed="right" label="操作" width="180px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'edit'"
            @click="addEditBtn('edit', row)"
          >
            <span style="color: 'red'">编辑</span>
          </el-button>
          <el-button
            type="text"
            v-has="'language'"
            @click="internationalizationBtn(row)"
          >
            <span style="color: 'red'">国际化</span>
          </el-button>
          <el-button type="text" @click="open(row)" v-has="'onOff'"
            ><span :class="[row.status == 1 ? 'colorRed' : 'colorGreen']">{{
              row.status == 1 ? "下线" : "上线"
            }}</span></el-button
          >
        </template>
      </el-table-column>
    </PageTable>
    <!-- 新增弹窗 -->
    <addEditdialog
      v-show="showdialog"
      ref="addoredit"
      :formParams="formData"
      :clientVersion="versionModule"
      :dialogName="dialogName"
      @submitBTN="submitBTN"
    ></addEditdialog>
    <!-- 国际化弹窗 -->
    <internationalization
      v-show="showInterDialog"
      ref="internationalizationDialog"
      :formParams="formData"
    ></internationalization>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import PageTable from "@/components/PageTable.vue";
import addEditdialog from "./components/addEditddialog.vue";
import internationalization from "./components/internationalization.vue";
import { mapGetters } from "vuex";
import {
  onlineStartus, //状态
  updateStatus, //更新范围
} from "@/common/constant/constant.js";
import {
  getMarketList,
  getWhiteList,
  addWhiteList,
  editWhiteList,
  offlinetWhiteList,
  onlinetWhiteList,
} from "./api";
export default {
  components: { PageTable, addEditdialog, internationalization },
  computed: {
    ...mapGetters(["deviceList"]),
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      copyApkurl: "",
      onlineStartus,
      updateStatus,
      showdialog: false,
      showInterDialog: false,
      dialogName: "",
      invalue: "",
      pohonevalue: "",
      formData: {}, //编辑表格的数据
      interData: {}, //国际化表格的数据
      modelTabelHead: [
        { key: "channelId", label: "手机型号", align: "center" },
        // { key: "deviceName", label: "手机型号", align: "center" },
        { key: "updateTitle", label: "标题", align: "center" },
        { key: "clientVersion", label: "市场版本", align: "center" },
        { slot: "updateStrategy", label: "更新策略", align: "center" },
        { slot: "apkUrl", label: "更新包下载地址", align: "center" },
        { key: "apkSize", label: "更新包大小", align: "center" },
        { key: "fileSha256", label: "更新包sha256", align: "center" },
        // { key: "sdkVersionRange", label: "生效版本区间", align: "center" },
        { key: "versionRange", label: "生效版本区间", align: "center" },
        { slot: "updateScope", label: "更新范围", align: "center" },
        { slot: "status", label: "状态", align: "center" },
        {
          key: "createTimeStr",
          label: "创建时间",
          align: "center",
          width: "120px",
        },
        {
          key: "modifyTimeStr",
          label: "修改时间",
          align: "center",
          width: "120px",
        },
      ], //机型列表表格头部
      queryModule: {
        page: 1,
        size: 10,
        total: 0,
      },
      versionModule: [], //市场版本
      modelTabelList: [], //机型列表表格数据
    };
  },
  methods: {
    addEditBtn(val, row) {
      // this.getMarketList();
      if (val == "add") {
        this.dialogName = "新增";
        this.formData = {};
      } else {
        this.dialogName = "编辑";
        this.formData = row;
      }
      this.showdialog = true;
      this.$nextTick(() => {
        this.$refs.addoredit.init();
      });
    },
    internationalizationBtn(row) {
      this.formData = row;
      this.showInterDialog = true;
      this.$nextTick(() => {
        this.$refs.internationalizationDialog.init();
      });
    },
    searchList() {
      this.queryModule.page = 1;
      this.getTableList();
    },
    submitBTN(val, data) {
      if (val) {
        addWhiteList(data).then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.getTableList();
          }
        });
      } else {
        editWhiteList(data).then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.getTableList();
          }
        });
      }
    },
    handleChangePage({ page, size }) {
      this.queryModule.page = page;
      this.queryModule.size = size;
      this.getTableList();
    },
    init() {
      this.getTableList();
      this.getMarketList();
    },
    getTableList() {
      getWhiteList(this.queryModule).then((res) => {
        const { list = [], total } = res.data;
        this.modelTabelList = list;
        this.queryModule.total = total;
      });
    },
    open(row) {
      this.$confirm(`您确定${row.status == 1 ? "下线" : "上线"}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (row.status == 1) {
            offlinetWhiteList({ id: row.id }).then((res) => {
              if (res.code == 0) {
                this.$message.success("下线成功");
              } else {
                this.$message.error(res.msg);
              }
              this.getTableList();
            });
          } else {
            onlinetWhiteList({ id: row.id }).then((res) => {
              if (res.code == 0) {
                this.$message.success("上线成功");
              } else {
                this.$message.error(res.msg);
              }
              this.getTableList();
            });
          }
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: `已取消${row.status == 1 ? "下线" : "上线"}`,
          // });
        });
    },
    copy(val) {
      this.copyApkurl = val;
      this.$message.success("复制成功");
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", (e) => {
        // this.$message.success("复制成功");
        //  释放内存
        // clipboard.destory();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        this.$message.error("该浏览器不支持复制");
        // 释放内存
        // clipboard.destory();
      });
    },
    getMarketList() {
      getMarketList({ page: 1, size: 1000, isDelete: 0 }).then((res) => {
        if (res.code == 0) {
          this.versionModule = res.data.list;
        }
      });
    },
  },
  async created() {
    await this.$store.dispatch("updateDeviceList");
  },
  activated() {
    //每次进入页面请求数据
    // this.getMarketList();
  },
};
</script>
<style scoped lang="scss">
#modeManage {
}
</style>
