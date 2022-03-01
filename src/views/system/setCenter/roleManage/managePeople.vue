<template>
  <div class="box" style="height: 500px; overflow: scroll; overflow-x: hidden">
    <el-row :gutter="30">
      <el-col :span="6">
        <el-input
          size="small"
          placeholder="请输入用户名"
          v-model="name"
        ></el-input>
      </el-col>
      <el-col :span="5">
        <el-button size="small" type="primary" @click="getUserList"
          >查询</el-button
        >
      </el-col>
    </el-row>
    <el-table border stripe :data="showList" style="width: 100%">
      <el-table-column
        v-for="item in manageColumns"
        :key="item.key ? item.key : item.slot"
        :prop="item.key"
        :label="item.label"
        :fixed="item.fixed"
        :width="item.width"
        :align="item.align ? item.align : 'left'"
      >
        <template slot-scope="{ row }">
          <span v-if="item.key">{{ row[item.key] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="text" @click="handleClickOnOff(row)">
            <span class="colorRed">删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import PageTable from "@/components/PageTable.vue";
import { getUserListByRoleId, delegeRolePeople } from "./indexServe";
export default {
  components: { PageTable },
  props: {
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      name: "",
      manageColumns: [
        { key: "id", label: "用戶ID", align: "center" },
        { key: "account", label: "登录名", align: "center" },
        { key: "name", label: "用户名", align: "center" },
      ],
      tableData: [],
    };
  },
  mounted() {
    this.getUserList();
  },
  computed: {
    showList() {
      if (this.name) {
        return this.tableData.filter((item) => {
          return item.name.indexOf(this.name) !== -1;
        });
      }
      return this.tableData;
    },
  },
  methods: {
    handleChangePage() {},
    async getUserList() {
      let res = await getUserListByRoleId({
        roleId: this.detailData.id,
        name: this.name,
      });
      if (res) {
        this.tableData = res.data;
      }
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
    async handleDelete(info) {
      let res = await delegeRolePeople({
        userId: info.id,
        roleId: this.detailData.id,
      });
      if (res) {
        this.$message.success("删除成功");
        this.getUserList();
      }
    },
  },
};
</script>

<style></style>
