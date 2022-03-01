<template>
  <div id="modeManage">
    <el-row :gutter="16">
      <el-col :span="8"
        ><el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          v-has="'add'"
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
export default {
  name: "facilityWhiteList",
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
      modelTabelHead: [
        { key: "imeiMeid", label: "设备号", align: "center" },
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
            this.$message.success("新增成功");
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
    searchList() {
      this.queryModule.page = 1;
      this.getTableList();
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
          let params = {
            id: row.id,
          };
          if (row.status == 1) {
            offlinetWhiteList(params).then((res) => {
              if (res.code == 0) {
                this.$message.success("下线成功");
              } else {
                this.$message.error(res.msg);
              }
              this.getTableList();
            });
          } else {
            onlinetWhiteList(params).then((res) => {
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
};
</script>
<style scoped lang="scss">
#modeManage {
}
</style>
