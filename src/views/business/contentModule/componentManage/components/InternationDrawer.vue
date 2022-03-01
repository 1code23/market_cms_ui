<template>
  <el-drawer
    title="组件国际化"
    :visible.sync="drawer"
    direction="rtl"
    size="40%"
  >
    <div style="padding: 20px">
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item label="语言" required>
          <el-select
            v-model="form.language"
            size="small"
            placeholder="请选择类型"
            :disabled="type === 'edit'"
          >
            <el-option
              :disabled="item.disabled"
              :label="item.languageName"
              :value="item.languageType"
              v-for="item in filterLanguageList"
              :key="item.languageType"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="管理语言列表">
          <el-cascader
            v-model="form.language"
            :options="options"
            :props="{ multiple: true }"
          ></el-cascader>
        </el-form-item> -->
        <el-form-item label="组件名称" required>
          <el-input
            v-model.trim="form.assemblyNameLang"
            placeholder="请输入组件名称"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-row type="flex" justify="end">
      <el-button type="primary" @click="save()">确定</el-button>
      <el-button @click="drawer = false">取 消</el-button>
    </el-row>
  </el-drawer>
</template>

<script>
import { insertAssemblyDesc, updateAssemblyDesc } from "@/api/componentManage";
import { mapGetters } from "vuex";
export default {
  props: { isShow: Boolean, row: Object, type: String, language: Array },
  computed: {
    ...mapGetters(["languageList"]),
    drawer: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      },
    },
    filterLanguageList() {
      return this.languageList.map((l) => {
        let item = { ...l };
        this.language.map((a) => {
          if (a.language == l.languageType) {
            item.disabled = true;
          }
        });
        return item;
      });
    },
  },
  watch: {
    drawer(val) {
      if (val) {
        this.form = { ...this.row };
      }
    },
  },
  data() {
    return {
      form: {
        language: "",
        assemblyNameLang: "",
      },
    };
  },
  methods: {
    save() {
      if (!this.form.language) {
        this.$message.warning("请选择语言");
        return;
      }
      if (!this.form.assemblyNameLang) {
        this.$message.warning("请输入组件名称");
        return;
      }
      if (this.type === "edit") {
        updateAssemblyDesc(this.form).then((res) => {
          this.drawer = false;
          this.$message.success("编辑成功");
          this.$parent.fetchList();
        });
      } else {
        insertAssemblyDesc(this.form).then((res) => {
          this.drawer = false;
          this.$message.success("新增成功");
          this.$parent.fetchList();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
