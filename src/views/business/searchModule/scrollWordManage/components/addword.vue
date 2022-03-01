<template>
  <div class="dialog">
    <el-button type="primary" @click="addLanguage" style="margin-bottom: 20px"
      >添加语言</el-button
    >
    <PageTable :columns="modelTabelHead" :tableData="modelTabelList">
      <el-table-column label="操作" width="160px" align="center">
        <template slot-scope="{ row }">
          <el-tag size="small" @click="edit(row)" style="margin-right: 15px"
            >编辑
          </el-tag>
          <el-tag size="small" @click="remove(row)" type="danger">删除 </el-tag>
        </template>
      </el-table-column></PageTable
    >
    <!-- 添加语言 -->
    <el-dialog title="添加" :visible.sync="showLanguage" append-to-body center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <div class="Languagelist">
          <el-form-item label="选择语言：" prop="region" style="margin: 50px 0">
            <el-select v-model="ruleForm.region" placeholder="请选择语言">
              <el-option label="英语" value="english"></el-option>
              <el-option label="中文" value="Chinese"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item
          :label="String(index + 1) + '：'"
          v-for="(item, index) in wordsruleFormList"
          :key="index"
        >
          <el-input
            v-model="item.keyword"
            placeholder="请输入滚动词"
          ></el-input>
        </el-form-item>
      </el-form>

      <div class="footerBtn">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="cancelForm('ruleForm')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";

export default {
  
  data() {
    return {
      dialogVisible: "", //禁用提示框
      recover: false, //恢复使用提示框
      ruleForm: {},
      confirm: "1",
      wordsruleFormList: [{ keyword: "滚动词1", c: "1：" }],
      showLanguage: false,
      modelTabelHead: [
        { key: "versionName", label: "ID", fixed: "left" },
        { key: "developerName", label: "语言" },
        { key: "userName", label: "滚动词" },
        { key: "release", label: "创建时间" },
        { key: "releaseTy", label: "修改时间" },
      ], //机型列表表格头部
      modelTabelList: {
        list: [{ versionName: "23", code: "3" }],
      }, //机型列表表格数据
      rules: {
        region: [{ required: true, message: "请选择语言", trigger: "blur" }],
        keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 添加语言
    addLanguage() {
      this.showLanguage = true;
    },
    // 编辑
    edit(row) {
      this.showLanguage = true;
    },
    // 删除
    remove(row) {
    },
    //禁用
    forbidden() {
      this.dialogVisible = true;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    dialogVisibleBtn() {
      this.$emit("dialogclose", false);
    },
    //禁用确定按钮
    forbiddenBtn() {
      //   this.dialogVisible = false;
      //   this.dialogVisibles = false;
      this.$emit("dialogclose", false, this.confirm);
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    //恢复
    recoverClose() {
      this.recover = true;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    //恢复确定按钮
    recoverBtn() {
      this.recover = false;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    closedialog(val, val2) {
      // alert(val);
      if (val2) {
        alert("提交成功");
        this.showLanguage = val;
        // getmodelData(this.formInline).then((res) => {
        //   if (res && res.code === 0) {
        //     // this.dialogAuditVisible = false;
        //   }
        // });
      }
      this.showLanguage = val;
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
// .wordList {
//   width: 60%;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// }
// .Languagelist {
//   display: flex;
//   justify-content: space-between;
// }
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

  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";

export default {
  components: { PageTable },
  data() {
    return {
      dialogVisible: "", //禁用提示框
      recover: false, //恢复使用提示框
      ruleForm: {},
      confirm: "1",
      wordsruleFormList: [{ keyword: "滚动词1", c: "1：" }],
      showLanguage: false,
      modelTabelHead: [
        { key: "versionName", label: "ID", fixed: "left" },
        { key: "developerName", label: "语言" },
        { key: "userName", label: "滚动词" },
        { key: "release", label: "创建时间" },
        { key: "releaseTy", label: "修改时间" },
      ], //机型列表表格头部
      modelTabelList: {
        list: [{ versionName: "23", code: "3" }],
      }, //机型列表表格数据
      rules: {
        region: [{ required: true, message: "请选择语言", trigger: "blur" }],
        keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 添加语言
    addLanguage() {
      this.showLanguage = true;
    },
    // 编辑
    edit(row) {
      this.showLanguage = true;
    },
    // 删除
    remove(row) {
      console.log(row);
    },
    //禁用
    forbidden() {
      this.dialogVisible = true;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    dialogVisibleBtn() {
      this.$emit("dialogclose", false);
    },
    //禁用确定按钮
    forbiddenBtn() {
      //   this.dialogVisible = false;
      //   this.dialogVisibles = false;
      this.$emit("dialogclose", false, this.confirm);
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    //恢复
    recoverClose() {
      this.recover = true;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    //恢复确定按钮
    recoverBtn() {
      this.recover = false;
      // getmodelData(this.formInline).then((res) => {
      //   if (res && res.code === 0) {
      //     // this.dialogAuditVisible = false;
      //   }
      // });
    },
    closedialog(val, val2) {
      // alert(val);
      if (val2) {
        alert("提交成功");
        this.showLanguage = val;
        // getmodelData(this.formInline).then((res) => {
        //   if (res && res.code === 0) {
        //     // this.dialogAuditVisible = false;
        //   }
        // });
      }
      this.showLanguage = val;
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
// .wordList {
//   width: 60%;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// }
// .Languagelist {
//   display: flex;
//   justify-content: space-between;
// }
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
