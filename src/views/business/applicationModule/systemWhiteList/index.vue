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
      <el-col :span="24">
        <el-form :inline="true" label-suffix=":">
          <el-form-item label="应用名称" class="demo-form-inline">
            <el-input
              v-model="queryModule.apkName"
              placeholder="请输入应用名称查询"
            ></el-input>
          </el-form-item>
          <el-form-item label="应用包名" class="demo-form-inline">
            <el-input
              v-model="queryModule.packageName"
              placeholder="请输入应用包名查询"
            ></el-input>
          </el-form-item>

          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="searchList"
            >查询</el-button
          >
        </el-form>
      </el-col>
      <!-- <el-col :span="5">
        <el-form :inline="true">
          <el-form-item label="应用包名：" class="demo-form-inline">
            <el-input
              v-model="queryModule.packageName"
              placeholder="请输入应用包名查询"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="1"
        ><el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="searchList"
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
          :style="row.status == 1 ? { color: 'red' } : { color: '#67C23A' }"
          >{{ row.status | typeDesc(onlineStartus) }}</span
        >
      </template>
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'edit'"
            @click="addEditBtn('edit', row)"
          >
            <span style="color: 'red'">编辑</span>
          </el-button>
          <el-button type="text" @click="deleteList(row)" v-has="'delete'"
            >删除</el-button
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
import addEditdialog from "./addEditDialog.vue";
import {
  onlineStartus, //状态
} from "@/common/constant/constant.js";
import {
  getWhiteList,
  deleteWhiteList,
  addWhiteList,
  editWhiteList,
} from "./api";
import { queryWishList, updateWishById } from "@/api/wishlist";
export default {
  name: "systemWhiteList",
  components: { PageTable, addEditdialog },
  mounted() {
    this.init();
  },
  data() {
    return {
      onlineStartus,
      showdialog: false,
      dialogName: "",
      formData: { appName: "9", packageName: "0" }, //编辑表格的数据
      modelTabelHead: [
        { key: "appName", label: "应用名称", align: "center" },
        { key: "packageName", label: "包名", align: "center" },
        { key: "createTime", label: "创建时间", align: "center" },
        { key: "updateTime", label: "修改时间", align: "center" },
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
      if (val) {
        // 新增
        let obj = { packageName: data.packageName, appName: data.appName };
        addWhiteList(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success("新增成功");
            this.getTableList();
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        // 编辑
        let editobj = {
          id: data.id,
          packageName: data.packageName,
          appName: data.appName,
        };
        editWhiteList(editobj).then((res) => {
          if (res.code == 0) {
            this.$message.success("编辑成功");
            this.getTableList();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
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
    searchList() {
      this.queryModule.page = 1;
      this.getTableList();
    },
    init() {
      this.getTableList();
    },
    //获取
    getTableList() {
      // queryWishList(this.queryModule).then((res) => {
      //   const { list = [], total } = res.data;
      //   this.modelTabelList = list;
      //   this.queryModule.total = total;
      // });
      getWhiteList(this.queryModule).then((res) => {
        if (res.code == 0) {
          const { list = [], total } = res.data;
          this.modelTabelList = list;
          this.queryModule.total = total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 删除
    deleteList(row) {
      this.$confirm("您确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteWhiteList({ whiteAppId: row.id }).then((res) => {
            if (res.code == 0) {
              this.$message.success("删除成功");
              this.getTableList();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },
    //分页
    handleChangePage({ page, size }) {
      this.queryModule.page = page;
      this.queryModule.size = size;
      this.getTableList();
    },
  },
};
</script>
<style scoped lang="scss">
#modeManage {
}
</style>
