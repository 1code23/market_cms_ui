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
    <el-row :gutter="16">
      <el-col :span="16">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="标题" class="demo-form-inline">
            <el-input
              v-model="queryModule.adTitle"
              placeholder="请输入标题查询"
            ></el-input>
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
      <!-- <el-col :span="1"
        ><el-button
          type="primary"
          @click="searchList"
          size="small"
          icon="el-icon-search"
          >查询</el-button
        ></el-col
      > -->
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
      <el-table-column label="操作" width="255px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            @click="addEditBtn('edit', row)"
            v-has="'edit'"
          >
            <span style="color: 'red'">编辑</span>
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
      :dialogName="dialogName"
      :versionLists="versionList"
      @submitBTN="submitBTN"
    ></addEditdialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { queryVersionList } from "@/api/common";
import addEditdialog from "./components/addEditddialog.vue";
import {
  onlineStartus, //状态
} from "@/common/constant/constant.js";
import { getWhiteList, addWhiteList, editWhiteList } from "./api";
// import { queryWishList, updateWishById } from "@/api/wishlist";
export default {
  name: "autoUpdate",
  components: { PageTable, addEditdialog },
  mounted() {
    this.init();
  },
  data() {
    return {
      onlineStartus,
      showdialog: false,
      dialogName: "",
      formData: {}, //编辑表格的数据
      versionList: [],
      modelTabelHead: [
        { key: "adTitle", label: "标题", align: "center" },
        // { key: "deviceName", label: "手机型号", align: "center" },
        { key: "channelId", label: "手机型号", align: "center" },
        { key: "cpuPercent", label: "CPU百分比小于", align: "center" },
        { key: "batteryPercent", label: "电量百分比大于", align: "center" },
        { key: "checkTimeArea", label: "屏蔽更新时间段", align: "center" },
        { key: "marketArea", label: "生效版本区间", align: "center" },
        { slot: "status", label: "状态", align: "center" },
        { key: "createTime", label: "创建时间", align: "center" },
        { key: "modifyTime", label: "修改时间", align: "center" },
      ], //机型列表表格头部
      queryModule: {
        page: 1,
        size: 10,
        total: 0,
      },
      modelTabelList: [], //机型列表表格数据
    };
  },
  methods: {
    submitBTN(val, data) {
      let obj = {
        ...data,
        type: 6,
      };
      if (val) {
        // 新增
        addWhiteList(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success("新增成功");
            this.getTableList();
          } else {
            // this.$message.error(res.msg);
          }
        });
      } else {
        // 编辑
        editWhiteList(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success("编辑成功");
            this.getTableList();
          } else {
            // this.$message.error(res.msg);
          }
        });
      }
    },
    addEditBtn(val, row) {
      if (val == "add") {
        this.dialogName = "新增";
        this.formData = {};
        this.showdialog = true;
      } else {
        this.dialogName = "编辑";
        this.formData = row;
        this.showdialog = true;
      }
      this.showdialog = true;
      this.$nextTick(() => {
        this.$refs.addoredit.init();
      });
    },
    searchList() {
      this.queryModule.page = 1;
      this.queryModule.size = 10;
      this.getTableList();
    },
    // 分页
    handleChangePage({ page, size }) {
      this.queryModule.page = page;
      this.queryModule.size = size;
      this.getTableList();
    },
    init() {
      this.getTableList();
    },
    getTableList() {
      let queryObj = {
        type: 6,
        ...this.queryModule,
      };
      getWhiteList(queryObj).then((res) => {
        if (res.code == 0) {
          const { list = [], total } = res.data;
          this.modelTabelList = list;
          this.queryModule.total = total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    open(row) {
      this.$confirm(`您确定${row.status == 1 ? "下线" : "上线"}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            ...row,
            // id: row.id,
            status: row.status === 0 ? 1 : 0,
          };
          editWhiteList(params).then((res) => {
            if (!row.status) {
              this.$message.success("上线成功");
            } else {
              this.$message.success("下线成功");
            }
            this.getTableList();
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: `已取消${row.status == 1 ? "下线" : "上线"}`,
          // });
        });
    },
    getSelectState(timeArea) {
      let selecterArray = timeArea.split(""); //选择的数据
      for (var i = 0; i < selecterArray.length; i++) {
        if (selecterArray[i] == 1) {
          selecterArray[i] = i;
        }
      }
      for (let i = selecterArray.length - 1; i >= 0; i--) {
        if (selecterArray[i] === "0") {
          selecterArray.splice(i, 1);
        }
      }
      if (selecterArray.length == 24) {
        return "全时段";
      } else {
        return selecterArray.toString();
      }
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
