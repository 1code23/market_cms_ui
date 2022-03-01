<template>
  <div>
    <el-dialog
      title="干预国际化"
      :visible.sync="dialogVisible"
      width="60%"
      center
      top="10vh"
    >
      <el-row :gutter="6">
        <el-col :span="4">
          <el-button v-has="'languageAdd'" type="primary" @click="toAdd()"
            >添加语言</el-button
          >
        </el-col>
      </el-row>
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        border
        height="500px"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column prop="language" label="语言" align="center">
          <template slot-scope="{ row }">
            {{ row.language | getLanguageName(languageList) }}
          </template>
        </el-table-column>
        <el-table-column prop="wordLang" label="关键字" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" align="center">
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
      <!-- <el-row type="flex" justify="end">
        <Pagination
          v-show="searchData.total > 0"
          :total="searchData.total"
          :page.sync="searchData.page"
          :limit.sync="searchData.size"
          @pagination="fetchList"
        />
      </el-row> -->
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span> -->
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
import { selectDescList, deleteDesc } from "@/api/searchIntervene";
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
        this.$store.dispatch("updateLanguageList");
        this.fetchList();
      }
    },
  },
  data() {
    return {
      type: "add",
      detailData: {},
      internationDrawerShow: false,
      searchData: {
        page: 1,
        size: 10,
        total: 1,
      },
      list: [],
    };
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
      let params = {
        id: this.row.id,
      };
      selectDescList(params).then((res) => {
        this.list = res.data;
      });
    },
    save() {
      this.dialogVisible = false;
      this.$parent.getDataList();
    },
    toAdd() {
      this.type = "add";
      this.internationDrawerShow = true;
      this.detailData = { keywordConfigId: this.row.id };
    },
    toEdit(row) {
      this.type = "edit";
      this.internationDrawerShow = true;
      this.detailData = {
        ...row,
        keywordLang: row.wordLang,
        keywordConfigId: this.row.id,
      };
    },
    toDelete(row) {
      deleteDesc({ id: row.id }).then((res) => {
        this.$message.success("删除成功");
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
