<template>
  <div class="userManagement">
    <el-row>
      <el-button
        size="small"
        type="primary"
        v-has="'add'"
        icon="el-icon-plus"
        @click="handleOperate('create')"
        >新增</el-button
      >
    </el-row>
    <el-row :gutter="6">
      <el-col :span="5">
        <el-input
          size="small"
          class="input-with-select"
          v-model="searchData.keyword"
          placeholder="请输入用户名"
        >
          <el-select
            size="small"
            slot="prepend"
            v-model="searchData.chooseType"
            placeholder="请选择"
          >
            <el-option label="登录名" value="account"></el-option>
            <el-option label="用户名" value="name"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch()"
        >查询</el-button
      >
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="tableData"
      @page-change="handleChangePage"
    >
      <el-table-column slot="prefix" type="selection" width="55">
      </el-table-column>
      <template slot-scope="{ row }" slot="statusTxt"
        ><span
          :class="{
            colorRed: row.deletedAt === 1,
            colorGreen: row.deletedAt === 0,
          }"
          >{{ row.statusTxt }}</span
        ></template
      >

      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="{ row }">
          <el-button
            :disabled="row.deletedAt === 1"
            v-has="'reName'"
            @click="resetPasswordDialog(row)"
            class="colorGray"
            type="text"
            >重置密码</el-button
          >
          <el-button
            :disabled="row.deletedAt === 1"
            class="operationBtn mhor10"
            type="text"
            v-has="'edit'"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            v-has="'del'"
            :disabled="row.deletedAt === 1"
            @click="handleClickOnOff(row)"
            class="colorRed"
          >
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <el-drawer
      size="50%"
      :wrapperClosable="false"
      :title="operationType | operationTypeDesc"
      :visible.sync="visible"
    >
      <Detail
        v-if="visible"
        :operationType="operationType"
        :detailData="detailData"
        :roleList="roleList"
        @submit="handleSubmit"
        @cancel="visible = false"
      />
    </el-drawer>
    <el-dialog
      :visible.sync="resetPassVisible"
      width="30%"
      title="重置密码"
      center
    >
      <el-row>
        <el-col>
          重置密码为：<el-input
            style="width: 200px"
            size="small"
            type="password"
            v-model="nowInfo.nowPassword"
          ></el-input>
        </el-col>
      </el-row>
      <div slot="footer" style="margin-top: 50px">
        <el-button size="small" @click="handleUpdatePassword" type="primary"
          >保存</el-button
        >
        <el-button
          size="small"
          @click="
            resetPassVisible = false;
            nowPassword = '';
          "
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import Detail from "./Detail";
import {
  getUserList,
  deleteUser,
  addUser,
  updateUser,
  updatePassword,
  getRoleList,
} from "./indexServe";
export default {
  name: "userManage",
  components: { PageTable, Detail },
  mounted() {
    this.init();
  },
  data() {
    return {
      searchData: {
        keyword: "",
        chooseType: "account", //搜索类型
      },
      tableData: {
        list: [],
      },
      columns: [
        { key: "id", label: "用户Id", align: "center" },
        { key: "account", label: "登录名", align: "center" },
        { key: "name", label: "用户名", align: "center" },
        { key: "roleName", label: "角色", align: "center" },
        { key: "createdAt", label: "创建时间", align: "center" },
        { key: "updatedAt", label: "修改时间", align: "center" },
        { key: "remark", label: "备注", align: "center" },
        { slot: "statusTxt", label: "状态", align: "center" },
      ],
      nowInfo: {},
      resetPassVisible: false,
      visible: false,
      operationType: "", // 记录当前操作模式新建-create、编辑-edit
      detailData: {},
      roleList: [], //所有角色列表
    };
  },
  methods: {
    resetPasswordDialog(data) {
      if (data.deletedAt === 1) return;
      this.nowInfo = data;
      this.resetPassVisible = true;
    },
    // 事件监听
    handleChangePage({ page, size }) {
      this.getTableList({ page, size });
    },
    async handleOperate(operationType, row) {
      await this.getRoleList();
      if (operationType === "create") {
        this.detailData = {};
      } else {
        this.detailData = { ...row };
      }
      if (row && row.deletedAt === 1) return;
      this.visible = true;
      this.operationType = operationType;
    },
    handleDelete(row) {
      deleteUser({ id: row.id }).then((res) => {
        if (res && res.code == 0) {
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 删除成功后刷新列表
          this.$message.success("删除成功");
        }
      });
    },
    handleUpdatePassword() {
      let params = {
        id: this.nowInfo.id,
        password: this.nowInfo.nowPassword,
      };
      updatePassword(params).then((res) => {
        if (res && res.code == 0) {
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 重置成功后刷新列表
          this.resetPassVisible = false;
          this.nowInfo = {};
          this.$message.success("修改成功");
        }
      });
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    handleSubmit(formData) {
      const fcn = this.operationType === "edit" ? updateUser : addUser; // 编辑和新建分别调用不同接口
      if (this.operationType === "edit") {
        delete formData.password;
      }
      fcn(formData).then((res) => {
        if (res && res.code == 0) {
          this.visible = false;
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 成功后刷新列表
          let msg = this.operationType === "edit" ? "修改成功" : "新建成功";
          this.$message.success(msg);
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
    async getTableList(params) {
      let resparams = {
        page: 1,
        size: 10,
        ...this.searchData,
        ...params,
      };
      delete resparams.chooseType;
      delete resparams.keyword;
      if (this.searchData.chooseType)
        resparams[this.searchData.chooseType] = this.searchData.keyword;
      const res = await getUserList(resparams);
      if (res && res.code == 0) {
        res.data.list.forEach((item) => {
          item.statusTxt = item.deletedAt > 0 ? "已删除" : "正常";
        });
        this.tableData = res.data;
        return res.data;
      }
    },
    async getRoleList() {
      const res = await getRoleList({ page: 1, size: 3000 });
      if (res && res.code == 0) {
        this.roleList = res.data.list;
      }
    },
    // 其他
    init() {
      this.getTableList();
      // this.getRoleList();
    },
  },
};
</script>
<style scoped lang="scss">
.userManagement {
  .operationBtn {
    padding: 0;
  }
  .input-with-select {
    /deep/.el-input-group__prepend {
      background: #fff;
      width: 75px;
    }
  }
}
</style>
