<template>
  <el-dialog
    :title="type === 'add' ? '新增黑名单' : '编辑'"
    :visible.sync="dialogVisible"
    width="700px"
    center
  >
    <div v-if="type === 'add'" style="margin-bottom: 20px">
      <p style="margin-bottom: 10px; font-weight: bold">
        <span style="color: red">*</span> 选择用户：
      </p>
      <el-row :gutter="6">
        <el-col :span="24">
          <el-form :inline="true">
            <el-form-item label="用户昵称:" class="demo-form-inline headLabel"
              ><el-input
                size="small"
                v-model="queryModule.nickname"
                placeholder="请输入用户昵称"
                @keydown.native.enter="search()"
              ></el-input>
            </el-form-item>
            <el-form-item label="账号:" class="demo-form-inline"
              ><el-input
                size="small"
                v-model="queryModule.account"
                placeholder="请输入用户账号"
                @keydown.native.enter="search()"
              ></el-input></el-form-item
            ><el-button
              size="small"
              type="primary"
              icon="el-icon-search"
              @click="search()"
              >查询</el-button
            ></el-form
          ></el-col
        >
      </el-row>
      <el-table
        height="250"
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        border
      >
        <el-table-column prop="nickname" label="用户昵称">
          <template slot-scope="{ row }">
            <el-radio v-model="form.openId" :label="row.openId">{{
              row.nickname
            }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="用户账号"> </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <Pagination
          layout=" prev, pager, next"
          v-show="queryModule.total > 0"
          :total="queryModule.total"
          :page.sync="queryModule.page"
          :limit.sync="queryModule.size"
          @pagination="fetchList"
        />
      </el-row>
    </div>
    <el-form ref="form" v-model="form" label-width="100px">
      <el-form-item label="选择类型:" required>
        <el-radio-group v-model="form.status">
          <el-radio :label="1">拉黑</el-radio>
          <el-radio :label="2">禁言</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述:">
        <el-input
          type="textarea"
          v-model="form.remarks"
          rows="2"
          maxlength="250"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  insertUserBlack,
  queryUserList,
  updateUserBlackById,
} from "@/api/blacklistModule";
export default {
  components: { Pagination },
  props: { isShow: Boolean, row: Object, type: String },
  computed: {
    dialogVisible: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      },
    },
  },
  watch: {
    "form.openId"(val) {
      if (val) {
        let item = this.list.find((l) => l.openId === val) || {};
        this.selectedUser = item;
      }
    },
    dialogVisible(val) {
      if (val) {
        if (this.row) {
          this.form = { ...this.row };
        }
        this.fetchList();
      } else {
        this.form = this.$options.data().form;
        this.queryModule = this.$options.data().queryModule;
      }
    },
  },
  data() {
    return {
      selectedUser: "",
      form: {
        status: null,
        remarks: "",
        openId: null,
      },
      queryModule: {
        page: 1,
        size: 10,
        total: 0,
        account: "",
        nickname: "",
      },
      list: [],
    };
  },
  methods: {
    search() {
      this.queryModule.page = 1;
      this.queryModule.total = 0;
      this.fetchList();
    },
    fetchList() {
      queryUserList(this.queryModule).then((res) => {
        const { list, total } = res.data;
        this.list = list;
        this.queryModule.total = total;
      });
    },
    save() {
      if (this.type === "edit") {
        let params = { ...this.form };
        params.user = [{ account: params.account, openId: params.openId }];
        updateUserBlackById(params).then((res) => {
          this.$message.success("编辑成功");
          this.dialogVisible = false;
          this.$parent.getDataList();
        });
      } else {
        if (!this.form.openId) {
          this.$message.warning("未选择用户");
          return;
        }
        if (!this.form.status) {
          this.$message.warning("未选择类型");
          return;
        }
        let params = { ...this.form };
        params.user = [
          {
            account: this.selectedUser.account,
            nickname: this.selectedUser.nickname,
            openId: this.selectedUser.openId,
          },
        ];
        insertUserBlack(params).then((res) => {
          if (res.code === 0) {
            this.$message.success("新增成功");
            this.dialogVisible = false;
            this.$parent.getDataList();
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
