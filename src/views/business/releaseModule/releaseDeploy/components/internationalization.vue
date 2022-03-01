<template>
  <div>
    <el-dialog
      title="国际化"
      :visible.sync="interDialog"
      width="60%"
      center="center"
      id="interD"
    >
      <el-button
        type="primary"
        v-has="'languageAdd'"
        @click="addLanguage"
        style="margin-bottom: 20px"
        >添加语言</el-button
      >
      <PageTable
        :columns="modelTabelHead"
        :tableData="{ list: modelTabelList, ...queryModules }"
        @page-change="handleChangePage"
      >
        <!-- <el-table-column label="序号" align="center" slot="prefix">
          <template slot-scope="scope"
            ><span> {{ scope.$index + 1 }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="160px" align="center">
          <template slot-scope="{ row }">
            <el-tag
              size="small"
              v-has="'languageEdit'"
              @click="edit(row)"
              style="margin-right: 15px; cursor: pointer"
              >编辑
            </el-tag>
            <el-tag
              size="small"
              @click="remove(row)"
              v-has="'languageDelete'"
              type="danger"
              style="cursor: pointer"
              >删除
            </el-tag>
          </template>
        </el-table-column></PageTable
      >
    </el-dialog>
    <!-- 添加语言弹窗 -->
    <el-dialog
      :title="dialogName"
      :visible.sync="showLanguage"
      append-to-body
      center
      @close="closedialog"
      width="50%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="addform"
        label-width="120px"
        class="demo-ruleForm"
      >
        <div class="Languagelist">
          <el-form-item
            label="选择语言："
            prop="language"
            style="margin: 50px 0"
          >
            <el-select
              v-model="ruleForm.language"
              placeholder="请选择语言"
              @change="changeLanguage"
              :disabled="disabled"
            >
              <el-option
                :label="item.languageName"
                :value="item.languageType"
                v-for="(item, index) in filterLanguageList"
                :key="index"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="更新描述：" prop="updateContentLang">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入更新描述"
            v-model="ruleForm.updateContentLang"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div class="footerBtn">
        <el-button type="primary" @click="submitForm('addform')"
          >确定</el-button
        >
        <el-button @click="showLanguage = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { getdescList, addDescList, deleteDescList, editdescList } from "../api";
import { mapGetters } from "vuex";
export default {
  components: { PageTable },
  computed: {
    ...mapGetters(["languageList"]),
    filterLanguageList() {
      return this.languageList.map((l) => {
        let item = { ...l };
        this.modelTabelList.map((a) => {
          // if (a.language == l.languageName) {
          if (a.language == l.languageType) {
            item.disabled = true;
          }
        });
        return item;
      });
    },
  },
  props: {
    formParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      interDialog: false,
      dialogName: "",
      disabled: false,
      modelTabelHead: [
        { key: "id", label: "ID", align: "center" },
        // { key: "language", label: "语言", align: "center" },
        { key: "languageName", label: "语言", align: "center" },
        { key: "updateContentLang", label: "更新描述", align: "center" },
      ], //表格头部
      modelTabelList: [],
      queryModules: {
        page: 1,
        size: 10,
        total: 0,
      },
      selfId: "",
      showLanguage: false,
      ruleForm: { language: "" },
      rules: {
        language: [{ required: true, message: "请选择语言", trigger: "blur" }],
        updateContentLang: [
          { required: true, message: "请输入更新描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 添加语言
    addLanguage() {
      this.showLanguage = true;
      this.dialogName = "新增";
      this.ruleForm = {};
      this.disabled = false;
    },
    edit(row) {
      this.dialogName = "编辑";
      this.showLanguage = true;
      this.ruleForm = { ...row };
      this.disabled = true;
    },
    remove(row) {
      deleteDescList({ id: row.id }).then((res) => {
        if (res.code == 0) {
          this.getMarketUpdateList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 添加国际化提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogName == "新增") {
            let obj = {
              selfId: this.selfId,
              ...this.ruleForm,
            };
            addDescList(obj).then((res) => {
              if (res.code == 0) {
                this.getMarketUpdateList();
                this.showLanguage = false;
              } else {
                // this.$message.error(res.msg);
              }
            });
          } else {
            editdescList(this.ruleForm).then((res) => {
              if (res.code == 0) {
                this.getMarketUpdateList();
                this.showLanguage = false;
              } else {
                // this.$message.error(res.msg);
              }
            });
          }
        } else {
          this.$message.error("请将信息填写完整");
          return false;
        }
      });
    },
    init() {
      this.interDialog = true;
      this.queryModules.selfId = this.$props.formParams.id;
      this.selfId = this.$props.formParams.id;
      this.getMarketUpdateList();
    },
    getMarketUpdateList() {
      getdescList(this.queryModules).then((res) => {
        if (res.code == 0) {
          this.modelTabelList = res.data.list;
          this.queryModules.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    closedialog() {
      this.$refs.addform.resetFields();
    },
    handleChangePage({ page, size }) {
      this.queryModules.page = page;
      this.queryModules.size = size;
      this.getMarketUpdateList();
    },
    changeLanguage(val) {
      this.ruleForm.language = val;
      // this.ruleForm.languageType = languagelist.languageType;
    },
  },
  created() {
    this.$store.dispatch("updateLanguageList");
  },
};
</script>
<style scoped lang="scss">
#addEditdialog {
}

/deep/ .el-textarea__inner {
  width: 50%;
}
.footerBtn {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}
/deep/ #interD .el-dialog__body {
  height: 400px;
  overflow: auto;
}
</style>
