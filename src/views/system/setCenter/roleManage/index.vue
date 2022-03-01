<template>
  <div class="boxpane roleManagement">
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
    <el-row :gutter="6" style="margin-bottom: 0">
      <el-col :span="5" :xl="5" :md="8" :sm="12" :xs="24" class="mb20">
        角色名称：
        <el-input
          style="width: 220px"
          size="small"
          v-model="searchData.name"
          placeholder="请输入角色名"
        ></el-input
      ></el-col>
      <el-col :xs="12" :span="4" :sm="12" :md="12" class="mb20"
        ><el-button
          class="mr10"
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch()"
          >查询</el-button
        >
      </el-col>
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="tableData"
      @page-change="handleChangePage"
    >
      <el-table-column slot="prefix" type="selection" width="55">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            v-has="'edit'"
            class="operationBtn"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            class="colorGreen operationBtn"
            v-has="'managePeople'"
            @click="handleOperate('managePeople', row)"
            >成员管理</el-button
          >
          <el-button v-has="'del'" type="text" @click="handleClickOnOff(row)">
            <span class="colorRed">删除</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <el-drawer
      size="50%"
      :wrapperClosable="false"
      :title="operationType | operationTypeDesc('成员管理')"
      :visible.sync="visible"
    >
      <managePeople
        :detailData="detailData"
        v-if="visible && operationType === 'managePeople'"
        @cancel="cancelDetail"
      >
      </managePeople>
      <Detail
        v-if="visible && operationType !== 'managePeople'"
        :operationType="operationType"
        :detailData="detailData"
        :allMenuList="allMenuList"
        :allLeafList="allLeafList"
        :defaultCheckedList="defaultCheckedList"
        @submit="handleSubmit"
        @cancel="cancelDetail"
      />
    </el-drawer>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import Detail from "./Detail";
import managePeople from "./managePeople";
import {
  getRoleList,
  deleteRole,
  addRole,
  updateRole,
  getAllMenuList,
} from "./indexServe";
export default {
  name: "roleManage",
  components: { PageTable, Detail, managePeople },
  mounted() {
    this.init();
  },
  data() {
    return {
      searchData: {
        name: "",
      },
      tableData: {
        list: [],
      },
      columns: [
        { key: "id", label: "角色ID", align: "center" },
        { key: "name", label: "角色名称", align: "center" },
        { key: "createdAt", label: "创建时间", align: "center" },
        { key: "updatedAt", label: "修改时间", align: "center" },
        { key: "remark", label: "备注", align: "center" },
      ],
      visible: false,
      operationType: "", // 记录当前操作模式新建-create、编辑-edit
      detailData: {},
      allMenuList: [], // 系统中所有菜单
      allLeafList: [], // 菜单所有叶子节点
      defaultCheckedList: [],
    };
  },
  methods: {
    // 事件监听
    handleChangePage({ page, size }) {
      this.getTableList({ page, size });
    },
    async handleOperate(operationType, row) {
      if (operationType === "create") {
        this.detailData = {};
      } else {
        this.detailData = { ...row };
      }
      if (operationType !== "managePeople") {
        await this.getAllMenuList({ roleId: row ? row.id : "" });
      }
      this.visible = true;
      this.operationType = operationType;
    },
    handleDelete(row) {
      deleteRole({ roleId: Number(row.id) }).then((res) => {
        if (res && res.code == 0) {
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 删除成功后刷新列表
          this.$message.success("删除成功");
        }
      });
    },
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    handleSubmit(formData) {
      const fcn = this.operationType === "edit" ? updateRole : addRole; // 编辑和新建分别调用不同接口
      formData.permissions.forEach((item, index) => {
        formData.permissions[index] = Number(item);
      });
      let params = {
        name: formData.name,
        permissions: formData.permissions,
        remark: formData.remark,
      };
      if (this.operationType === "edit") {
        params.id = formData.id;
      }
      fcn(params).then((res) => {
        if (res && res.code == 0) {
          this.visible = false;
          let msg = this.operationType === "edit" ? "修改成功" : "新建成功";
          this.getTableList({
            page: this.tableData.page,
            size: this.tableData.size,
          }); // 成功后刷新列表
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
    cancelDetail() {
      this.visible = false;
    },
    // 后端请求
    async getTableList(params, isDownload) {
      const res = await getRoleList({
        page: 1,
        size: 10,
        ...this.searchData,
        ...params,
      });
      if (res && res.code == 0) {
        // 下载时，不需要更新到table
        if (!isDownload) {
          this.tableData = res.data;
        }
        return res.data;
      }
    },
    // 获取系统中所有菜单
    async getAllMenuList(params) {
      const res = await getAllMenuList(params);
      if (res && res.code == 0) {
        this.allMenuList = res.data.treeList;
        const allLeafList = this.filterAllLeaf(res.data.treeList);
        this.allLeafList = allLeafList;
        this.defaultCheckedList = res.data.idList;
        return res.data;
      }
    },
    // 其他
    init() {
      this.getTableList();
    },
    filterAllLeaf(list, leafList = []) {
      list.forEach((item) => {
        if (item.items && item.items.length !== 0) {
          this.filterAllLeaf(item.items, leafList);
        } else {
          leafList.push(item.id);
        }
      });
      return leafList;
    },
  },
};
</script>
<style lang="scss">
.boxpane {
  .pagination-wapper {
    margin-top: 30px;
  }
}
</style>
<style scoped lang="scss">
.roleManagement {
  .operationBtn {
    padding: 0;
  }
}
</style>
