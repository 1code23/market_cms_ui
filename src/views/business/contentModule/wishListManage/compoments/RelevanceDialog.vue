<template>
  <el-dialog
    title="关联应用"
    :visible.sync="dialogVisible"
    width="60%"
    center
    top="10vh"
  >
    <el-row :gutter="6">
      <el-col :span="4">
        <el-select
          v-model="queryModule.chooseType"
          size="small"
          placeholder="请选择类型"
        >
          <!-- <el-option label="APPID " :value="1"> </el-option> -->
          <el-option label="应用名称" :value="2"> </el-option>
          <el-option label="包名" :value="3"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input
          size="small"
          v-model="queryModule.keyword"
          placeholder="请输入搜索内容"
          @keydown.native.enter="search()"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="search()"
          >查询</el-button
        >
      </el-col>
    </el-row>
    <el-table
      height="500px"
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      border
      @current-change="handleCurrentChange"
    >
      <el-table-column prop="index" width="60" align="center">
        <template slot-scope="{ row }">
          <el-radio
            style="margin-left: 10px"
            v-model="activeId"
            :label="row.apkId"
            >{{ null }}</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column prop="apkId" label="APPID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="apkName" label="应用名称" align="center">
      </el-table-column>
      <el-table-column prop="iconUrl" label="图标" width="100" align="center">
        <template slot-scope="{ row }">
          <div class="icon">
            <img :src="row.iconUrl" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="packageName" label="包名" align="center">
      </el-table-column>
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
    <span slot="footer" class="dialog-footer">
      <el-button v-has="'save'" type="primary" @click="save()">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Pagination from "@/components/Pagination";
import { selectApplyList } from "@/api/common";
import { relationWishById } from "@/api/wishlist";
export default {
  components: { Pagination },
  props: { isShow: Boolean, row: Object },
  computed: {
    dialogVisible: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      },
    },
    appItem() {
      return this.list.find((item) => item.apkId === this.activeId);
    },
  },
  watch: {
    "queryModule.chooseType"() {
      this.search();
    },
    dialogVisible(val) {
      if (val) {
        this.fetchList();
      }
    },
  },
  data() {
    return {
      queryModule: {
        chooseType: 2,
        keyword: "",
        apkId: "",
        apkName: "",
        packageName: "",
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],
      activeId: null,
    };
  },
  methods: {
    search() {
      this.queryModule.page = 1;
      this.queryModule.total = 0;
      this.fetchList();
    },
    fetchList() {
      const { chooseType, keyword } = this.queryModule;
      if (chooseType === 1) {
        this.queryModule.apkName = "";
        this.queryModule.packageName = "";
        // 后端说这里只能给数字类型，传字符串会报错，所以当用户输入非数字的搜索时传-1，让用户查不到数据 ---swx
        let apkId = "";
        if (keyword !== "") {
          apkId = Number(keyword) >= 0 ? Number(keyword) : -1;
        }
        this.queryModule.apkId = apkId;
      }
      if (chooseType === 2) {
        this.queryModule.apkId = "";
        this.queryModule.packageName = "";
        this.queryModule.apkName = keyword;
      }
      if (chooseType === 3) {
        this.queryModule.apkId = "";
        this.queryModule.apkName = "";
        this.queryModule.packageName = keyword;
      }
      selectApplyList(this.queryModule).then((res) => {
        const { list = [], total } = res.data;
        this.list = list;
        this.queryModule.total = total;
        this.activeId = (
          list.find((item) => item.packageName === this.row.packageName) || {}
        ).apkId;
      });
    },
    save() {
      if (!this.activeId) {
        this.$message.warning("未选择关联APP");
        return;
      }
      let params = {
        id: this.row.id,
        packageName: this.appItem.packageName,
        apkName: this.appItem.apkName,
      };
      relationWishById(params).then((res) => {
        this.$message.success("关联成功");
        this.dialogVisible = false;
        this.$parent.getDataList();
      });
    },
    handleCurrentChange(val) {
      this.activeId = val.apkId;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
