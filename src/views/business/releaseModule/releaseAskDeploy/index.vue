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
    <PageTable
      :columns="modelTabelHead"
      :tableData="{ list: modelTabelList, ...queryModule }"
      @page-change="handleChangePage"
    >
      <!-- 状态 -->
      <template slot-scope="{ row }" slot="status">
        <span
          :style="row.status == 0 ? { color: 'red' } : { color: '#67C23A' }"
          >{{ row.status | typeDesc(onlineStartus) }}</span
        >
      </template>
      <template slot-scope="{ row }" slot="returnMarketUpdate">
        <span>{{ row.returnMarketUpdate }}分钟</span>
      </template>
      <template slot-scope="{ row }" slot="wifiConnectionUpdate">
        <span>{{ row.wifiConnectionUpdate }}分钟</span>
      </template>
      <template slot-scope="{ row }" slot="phoneBrightUpdate">
        <span>{{ row.phoneBrightUpdate }}分钟</span>
      </template>
      <el-table-column fixed="right" label="操作" width="255px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            @click="addEditBtn('edit', row)"
            v-has="'edit'"
          >
            <span style="color: 'red'">编辑</span>
          </el-button>
          <el-button type="text" v-has="'onOff'" @click="open(row)"
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
      :dialogName="dialogName"
      :versionLists="versionList"
      @submitBTN="submitBTN"
    ></addEditdialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import addEditdialog from "./components/addEditddialog.vue";
import {
  onlineStartus, //状态
} from "@/common/constant/constant.js";
import {
  getWhiteList,
  addWhiteList,
  editWhiteList,
  offlinetWhiteList,
  onlinetWhiteList,
} from "./api";
import { queryVersionList } from "@/api/common";
export default {
  name: "releaseAskDeploy",
  components: { PageTable, addEditdialog },
  mounted() {
    this.init();
  },
  data() {
    return {
      onlineStartus,
      showdialog: false,
      dialogName: "",
      versionList: [],
      formData: {}, //编辑表格的数据
      modelTabelHead: [
        // { key: "deviceName", label: "手机型号", align: "center" },
        { key: "channelId", label: "手机型号", align: "center" },
        { key: "updateTitle", label: "标题", align: "center" },
        {
          slot: "returnMarketUpdate",
          label: "返回市场主页面时长",
          align: "center",
        },
        {
          slot: "wifiConnectionUpdate",
          label: "网络变化时长（需进入市场）",
          align: "center",
          renderHeader: "renderHeader",
        },
        {
          slot: "phoneBrightUpdate",
          label: "手机亮屏瞬间时长",
          align: "center",
        },
        { key: "versionRange", label: "生效版本区间", align: "center" },
        { key: "remarks", label: "备注", align: "center" },
        { slot: "status", label: "状态", align: "center" },
        { key: "createTimeStr", label: "创建时间", align: "center" },
        { key: "modifyTimeStr", label: "修改时间", align: "center" },
      ], //机型列表表格头部
      queryModule: {
        page: 1,
        size: 10,
        total: 0,
      },
      modelTabelList: [], //列表表格数据
    };
  },
  methods: {
    addEditBtn(val, row) {
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
    submitBTN(val, data) {
      if (val) {
        addWhiteList(data).then((res) => {
          if (res.code == 0) {
            this.$message.success("添加成功");
            this.getTableList();
          }
        });
      } else {
        editWhiteList(data).then((res) => {
          if (res.code == 0) {
            this.$message.success("编辑成功");
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
  },
  activated() {
    //每次进入页面请求数据
    queryVersionList({
      //获取版本号
      page: 1,
      size: 1000,
      isDelete: 0,
    }).then((res) => {
      this.versionList = res.data.list;
    });
  },
};
</script>
<style scoped lang="scss">
#modeManage {
}
</style>
