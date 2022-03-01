<template>
  <div>
    <el-button
      v-has="'add'"
      type="primary"
      icon="el-icon-plus"
      @click="handleOperate('add')"
      style="margin-bottom: 20px"
      >新增</el-button
    >
    <el-row :gutter="6">
      <el-col :span="24"
        ><el-form :inline="true" label-suffix=":">
          <el-form-item label="查询内容" class="demo-form-inline headLabel"
            ><el-input
              size="small"
              v-model="queryModule.word"
              placeholder="请输入词语查询"
              @keydown.native.enter="search()"
            ></el-input>
          </el-form-item>

          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search()"
            >查询</el-button
          ></el-form
        >
      </el-col>
    </el-row>
    <PageTable
      :columns="columns"
      :tableData="{ ...queryModule, list }"
      @page-change="handleChangePage"
    >
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-has="'edit'"
            type="text"
            @click="handleOperate('edit', row)"
            >编辑</el-button
          >
          <el-button
            v-has="'delete'"
            type="text"
            @click="handleClickOnOff(row)"
            class="colorRed"
          >
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </PageTable>
    <el-dialog
      :title="operationType === 'add' ? '新增' : '编辑'"
      :visible.sync="editorDialogShow"
      width="30%"
      center
    >
      <el-form label-width="auto">
        <el-form-item label="敏感词：" required>
          <el-input
            maxlength="250"
            show-word-limit
            v-model.trim="detailData.word"
            placeholder="请输入敏感词"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">提 交</el-button>
        <el-button @click="editorDialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import {
  querySensitiveWordsList,
  updateSensitiveWordsStatus,
  createSensitiveWords,
  updateSensitiveWords,
} from "@/api/commentsModule";
export default {
  name: "sensitive",
  components: {
    PageTable,
  },
  watch: {},
  data() {
    return {
      columns: [
        { key: "id", label: "ID", align: "center" },
        { key: "word", label: "敏感词", align: "center" },
        { key: "createTime", label: "创建时间", align: "center" },
        { key: "updateTime", label: "修改时间", align: "center" },
      ],
      queryModule: {
        count: true,
        word: "",
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],

      operationType: "",
      detailData: {},
      editorDialogShow: false,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    search() {
      this.queryModule.page = 1;
      this.queryModule.total = 0;
      this.getDataList();
    },
    // 获取列表数据
    getDataList() {
      querySensitiveWordsList(this.queryModule).then((res) => {
        if (res.data) {
          const { list = [], total } = res.data;
          this.list = list;
          this.queryModule.total = total;
        } else {
          this.list = [];
        }
      });
    },
    handleOperate(operationType, row) {
      this.operationType = operationType;
      if (operationType === "add") {
        this.editorDialogShow = true;
        this.detailData = {};
      } else if (operationType === "edit") {
        this.editorDialogShow = true;
        this.detailData = { ...row };
      }
    },
    handleChangePage({ page, size }) {
      this.queryModule.page = page;
      this.queryModule.size = size;
      this.getDataList();
    },
    handleDelete(row) {
      let params = { ...row };
      params.status = 0;
      updateSensitiveWordsStatus(params).then((res) => {
        this.$message.success("删除成功");
        this.getDataList();
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
    save() {
      if (!this.detailData.word) {
        this.$message.warning("请输入敏感词");
        return;
      }
      if (this.operationType == "add") {
        createSensitiveWords(this.detailData).then((res) => {
          this.$message.success("新增成功");
          this.editorDialogShow = false;
          this.search();
        });
      } else {
        updateSensitiveWords(this.detailData).then((res) => {
          this.$message.success("编辑成功");
          this.editorDialogShow = false;
          this.getDataList();
        });
      }
    },
  },
};
</script>
