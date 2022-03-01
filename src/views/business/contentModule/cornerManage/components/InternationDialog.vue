<template>
  <div>
    <el-dialog
      title="角标国际化"
      :visible.sync="dialogVisible"
      width="60%"
      center
    >
      <el-row :gutter="6">
        <el-col :span="4">
          <el-button v-has="'languageAdd'" type="primary" @click="toAdd()"
            >添加语言</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="list" style="width: 100%; margin-bottom: 20px" border>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.$index + 1 + (queryModule.page - 1) * queryModule.size
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="language" label="语言" align="center">
          <template slot-scope="{ row }">
            {{ row.language | getLanguageName(languageList) }}
          </template>
        </el-table-column>
        <el-table-column prop="hdImageUrl" label="浅色角标" align="center">
          <template slot-scope="{ row }">
            <div class="icon">
              <img :src="row.hdImageUrl" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="darkHdImageUrl" label="深色角标" align="center">
          <template slot-scope="{ row }">
            <div class="icon">
              <img :src="row.darkHdImageUrl" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="modifyTime" label="修改时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              v-has="'languageEdit'"
              style="margin-right: 10px"
              @click="toEdit(row)"
              >编辑</el-button
            >
            <el-button
              v-has="'languageDelete'"
              type="text"
              @click="handleClickOnOff(row)"
            >
              <span class="colorRed">删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <Pagination
          v-show="queryModule.total > 0"
          :total="queryModule.total"
          :page.sync="queryModule.page"
          :limit.sync="queryModule.size"
          @pagination="fetchList"
        />
      </el-row>
    </el-dialog>
    <InternationDrawer
      :isShow.sync="internationDrawerShow"
      :type="type"
      :row="detailData"
      :language="list"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import InternationDrawer from "./InternationDrawer.vue";
import { queryInternationalCornerList, deleteCornerById } from "@/api/corner";
import { mapGetters } from "vuex";
export default {
  components: { Pagination, InternationDrawer },
  props: { isShow: Boolean, row: Object },
  computed: {
    ...mapGetters(["languageList"]),
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
    dialogVisible(val) {
      if (val) {
        this.queryModule.cornerId = this.row.cornerId;
        this.fetchList();
      }
    },
  },
  data() {
    return {
      type: "add",
      detailData: {},
      internationDrawerShow: false,
      queryModule: {
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],
    };
  },
  created() {
    this.$store.dispatch("updateLanguageList");
  },
  methods: {
    handleClickOnOff(row) {
      const desc = `确定删除吗？`;
      this.$confirm(desc, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.toDelete(row);
        })
        .catch(() => {});
    },
    fetchList() {
      queryInternationalCornerList(this.queryModule).then((res) => {
        const { list = [], total } = res.data;
        this.list = list;
        this.queryModule.total = total;
      });
    },
    save() {
      this.dialogVisible = false;
      this.$parent.getDataList();
    },
    toAdd() {
      this.type = "add";
      this.internationDrawerShow = true;
      this.detailData = { cornerId: this.row.cornerId };
    },
    toEdit(row) {
      this.type = "edit";
      this.internationDrawerShow = true;
      this.detailData = { cornerId: this.row.cornerId, ...row };
    },
    toDelete(row) {
      deleteCornerById({
        cornerId: this.row.cornerId,
        id: row.id,
        language: row.language,
      }).then((res) => {
        this.$message.success("删除成功");
        this.queryModule.page = 1;
        this.fetchList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
