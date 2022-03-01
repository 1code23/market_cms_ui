<template>
  <div class="dialog">
    <el-button
      type="primary"
      @click="addLanguage"
      style="margin-bottom: 20px"
      v-has="'languageAdd'"
      icon="el-icon-plus"
      size="small"
      >添加语言</el-button
    >
    <PageTable :columns="modelTabelHead" :tableData="ScrollWorldList">
      <el-table-column label="序号" align="center" slot="prefix">
        <template slot-scope="scope"
          ><span> {{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160px" align="center">
        <template slot-scope="{ row }">
          <el-tag
            size="small"
            @click="edit(row)"
            style="margin-right: 15px; cursor: pointer"
            v-has="'languageEdit'"
            >编辑
          </el-tag>
          <el-tag
            size="small"
            @click="remove(row)"
            type="danger"
            v-has="'languageDelete'"
            style="cursor: pointer"
            >删除
          </el-tag>
        </template>
      </el-table-column></PageTable
    >
    <!-- 添加语言弹窗 -->
    <el-dialog title="添加" :visible.sync="showLanguage" append-to-body center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        @close="closedialog"
      >
        <div class="Languagelist">
          <el-form-item label="选择语言：" prop="region" style="margin: 50px 0">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择语言"
              @change="changeLanguage"
              filterable
              clearable
            >
              <el-option
                :label="item.languageName"
                :value="item.languageId"
                v-for="(item, index) in filterLanguageList"
                :key="index"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item
          :label="String(index + 1) + '：'"
          v-for="(item, index) in wordsruleFormList"
          :key="index"
        >
          <el-input v-model="item.word" placeholder="请输入词语"></el-input>
        </el-form-item>
      </el-form>

      <div class="footerBtn">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="cancelForm('ruleForm')">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑语言弹窗 -->
    <el-dialog
      title="编辑"
      :visible.sync="editshowLanguage"
      append-to-body
      center
    >
      <el-form
        :model="editruleForm"
        :rules="editrules"
        ref="editruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <div class="Languagelist">
          <el-form-item label="选择语言：" prop="region" style="margin: 50px 0">
            <el-select
              v-model="editruleForm.region"
              placeholder="请选择语言"
              disabled
              filterable
              clearable
            >
              <el-option
                :label="item.languageName"
                :value="item.languageId"
                v-for="(item, index) in languageDataList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item
          :label="String(index + 1) + '：'"
          v-for="(item, index) in editwordsruleFormList"
          :key="index"
        >
          <el-input
            v-model="item.wordLang"
            placeholder="请输入滚动词"
          ></el-input>
        </el-form-item>
      </el-form>

      <div class="footerBtn">
        <el-button type="primary" @click="editsubmitForm('editruleForm')"
          >提交</el-button
        >
        <el-button @click="cancelForm('editruleForm')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import { getLanguageList } from "@/api/common.js";
import {
  editInternationalizationList,
  getInternationalizationList,
  addInternationalizationList,
  editDetailInternationalizationList,
  getScrollWorld,
} from "../../scrollWordManage/api.js";
export default {
  components: { PageTable },
  props: {
    ScrollWorldList: {
      type: Object,
      default() {
        return {};
      },
    },
    worldId: {
      type: Number,
      default() {
        return;
      },
    },
  },
  computed: {
    filterLanguageList() {
      return this.languageDataList.map((l) => {
        let item = { ...l };
        this.ScrollWorldList.list.map((a) => {
          // if (a.language == l.languageName) {
          if (a.language == l.languageType) {
            item.disabled = true;
          }
        });
        return item;
      });
    },
  },
  data() {
    return {
      dialogVisible: "", //禁用提示框
      recover: false, //恢复使用提示框
      languageDataList: [],
      ruleForm: { region: "" },
      editruleForm: { region: "" },
      confirm: "1",
      wordsruleFormList: [],
      editwordsruleFormList: [],
      showLanguage: false,
      editshowLanguage: false,
      modelTabelHead: [
        // { key: "language", label: "语言", align: "center" },
        { key: "languageName", label: "语言", align: "center" },
        { key: "concatWordLang", label: "热搜词", align: "center" },
        { key: "createTime", label: "创建时间", align: "center" },
        { key: "updateTime", label: "修改时间", align: "center" },
      ], //机型列表表格头部
      modelTabelList: {
        list: [{ versionName: "23", code: "3" }],
      }, //机型列表表格数据
      rules: {
        region: [{ required: true, message: "请选择语言", trigger: "blur" }],
        keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
      },
      editrules: {
        region: [{ required: true, message: "请选择语言", trigger: "blur" }],
        keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
      },
    };
  },
  methods: {
    closedialog() {
      this.$refs.ruleForm.resetFields();
    },
    changeLanguage(val) {
      let languagelist = this.languageDataList.find((item) => {
        return item.languageId == val;
      });
      this.ruleForm.region = val;
      this.languageName = languagelist.languageType;
      // this.languageName = languagelist.languageName;
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editwordsruleFormList.forEach((item) => {
            item.language = this.languageName;
          });
          let s = true;
          this.editwordsruleFormList.every((item) => {
            if (item.wordLang == "" || item.wordLang == null) {
              s = false;
            } else {
              s = true;
            }
          });
          if (s) {
            editInternationalizationList({
              ozSearchWordConfDetailDescs: this.editwordsruleFormList,
            }).then((res) => {
              if (res && res.code == 0) {
                this.InternationalizationList();
                this.$message.success(res.msg);
                this.editshowLanguage = false;
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$message.error("词语不能为空");
          }
        } else {
          this.$message.error("请将信息填写完整");
          return false;
        }
      });
    },
    // 添加国际化词语提交
    submitForm(formName) {
      let temp = JSON.parse(JSON.stringify(this.wordsruleFormList));

      this.$refs[formName].validate((valid) => {
        if (valid) {
          const resultList = this.wordsruleFormList.map((w) => {
            let row = {
              wordId: w.id,
              wordLang: w.word,
              language: this.languageName,
            };
            return row;
          });
          // this.wordsruleFormList.forEach((item) => {
          //   item.wordId = item.id;
          //   item.wordLang = item.word;
          //   item.language = this.languageName;
          //   item.updateTime = "";
          // });
          let s = true;
          resultList.every((item) => {
            if (item.wordLang == "" || item.wordLang == null) {
              s = false;
            } else {
              s = true;
            }
          });
          if (s) {
            // for (var i = 0; i < this.wordsruleFormList.length; i++) {
            //   delete this.wordsruleFormList[i].hot;
            //   delete this.wordsruleFormList[i].parentId;
            //   delete this.wordsruleFormList[i].id;
            // }
            addInternationalizationList({
              // ozSearchWordConfDetailDescs: this.wordsruleFormList,
              ozSearchWordConfDetailDescs: resultList,
            }).then((res) => {
              if (res && res.code == 0) {
                this.InternationalizationList();
                this.$message.success(res.msg);
                this.showLanguage = false;
              } else {
                this.wordsruleFormList = temp;
                // this.$message.error(res.msg);
              }
            });
          } else {
            this.$message.error("词语不能为空");
          }
        } else {
          this.$message.error("请将信息填写完整");
          return false;
        }
      });
    },
    cancelForm() {
      this.showLanguage = false;
      this.editshowLanguage = false;
    },
    // 查询滚动词国际化
    InternationalizationList() {
      getInternationalizationList({ id: this.worldId }).then((res) => {
        if (res && res.code === 0) {
          if (res.data != "") {
            this.$emit("getInterScrollList", res.data);
          }
        }
      });
    },
    // 添加语言
    addLanguage() {
      this.showLanguage = true;
      getLanguageList({}).then((res) => {
        if (res && res.code == 0) {
          this.languageDataList = res.data;
          this.ruleForm.region = "";
        }
      });
      getScrollWorld({ parentId: this.worldId }).then((res) => {
        if (res && res.code == 0) {
          this.wordsruleFormList = res.data;
        }
      });
    },

    // 编辑
    edit(row) {
      this.languageName = row.language;
      getLanguageList({}).then((res) => {
        if (res && res.code == 0) {
          this.languageDataList = res.data;
          editDetailInternationalizationList({
            ids: row.ids,
            parentId: this.worldId,
          }).then((res) => {
            let languagelist = this.languageDataList.find((item) => {
              // return item.languageName == res.data[0].language;
              return item.languageType == res.data[0].language;
            });
            this.editruleForm.region = languagelist.languageId;
            this.editshowLanguage = true;
            this.editwordsruleFormList = res.data;
          });
          this.editshowLanguage = true;
        }
      });

      // let languagelist = this.languageDataList.find((item) => {
      //   return item.languageName == row.language;
      // });
      // this.ruleForm.region = languagelist.languageId;

      // this.showLanguage = true;
    },
    // 删除
    remove(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("deleteInternation", row.ids);
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },
  },
};
</script>
<style scoped lang="scss">
.dialog {
  position: relative;
  padding-bottom: 50px;
  width: 100%;
  .dialogBtn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .demo-ruleForm {
    width: 100%;
    margin: 0 auto;
  }
}
.footerBtn {
  margin-top: 80px;
  display: flex;
  justify-content: flex-end;
}
/deep/.el-select {
  width: 100%;
}
/deep/.el-input__inner {
  width: 100%;
}
/deep/.el-form {
  width: 50%;
  margin: 0 auto;
}
</style>
