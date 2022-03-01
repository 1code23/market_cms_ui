<template>
  <el-dialog
    :title="type === 'add' ? '新增组件' : '编辑组件'"
    :visible.sync="dialogVisible"
    width="30%"
    center
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="组件类型：" prop="assemblyType">
        <el-select
          :disabled="type === 'edit'"
          v-model="form.assemblyType"
          placeholder="请选择组件类型"
          @change="handleAssemblyType"
        >
          <el-option
            v-for="i in $parent.assemblyTypeList"
            :key="i.assemblyType"
            :label="i.typeName"
            :value="i.assemblyType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组件样式：" prop="assemblyStyle">
        <el-select
          v-model="form.assemblyStyle"
          placeholder="请选择组件样式"
          :disabled="type === 'edit'"
          @change="handleAssemblyStyle"
        >
          <el-option
            v-for="i in assemblyStyleList"
            :key="i.assemblyStyle"
            :label="i.styleName"
            :value="i.assemblyStyle"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组件名称：" prop="assemblyName">
        <el-input
          v-model.trim="form.assemblyName"
          placeholder="请输入组件名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="部署数量："
        prop="num"
        v-if="form.assemblyType !== 25"
      >
        <el-input-number
          :disabled="form.numDisabled"
          :controls="false"
          v-model="form.num"
          :min="null"
          :precision="0"
          :step="1"
          label="请输入部署数量"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="组件描述：" prop="description">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.description"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer"
      ><el-button type="primary" @click="save('ruleForm')">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  insertAssembly,
  updateAssembly,
  queryAssemblyStyleList,
} from "@/api/componentManage";
export default {
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
    dialogVisible(val) {
      if (val) {
        if (this.row) {
          this.form = { ...this.row };
          if (this.form.assemblyType) {
            queryAssemblyStyleList({
              assemblyType: this.form.assemblyType,
            }).then((res) => {
              this.assemblyStyleList = res.data;
            });
          }
        }
      } else {
        this.$refs["ruleForm"].clearValidate();
        this.form = this.$options.data().form;
        this.assemblyStyleList = [];
      }
    },
    "form.assemblyStyle"(val) {
      if (val == 64 || val == 71) {
        this.form.num = 1;
        this.form.numDisabled = true;
      }
    },
  },
  data() {
    return {
      rules: {
        assemblyType: [
          { required: true, message: "请选择组件类型", trigger: "blur" },
        ],
        assemblyStyle: [
          { required: true, message: "请选择组件样式", trigger: "blur" },
        ],
        assemblyName: [
          { required: true, message: "请输入组件名称", trigger: "blur" },
        ],
        num: [{ required: true, message: "请输入部署数量", trigger: "blur" }],
      },
      assemblyStyleList: [],
      form: {
        numDisabled: false,
        assemblyName: "",
        assemblyType: "",
        num: null,
        desc: "",
      },
    };
  },
  methods: {
    handleAssemblyStyle(val) {
      if (val == 64 || val == 71) {
        this.form.num = 1;
        this.form.numDisabled = true;
      } else {
        this.form.num = null;
        this.form.numDisabled = false;
      }
    },
    handleAssemblyType(val) {
      this.$set(this.form, "assemblyStyle", "");
      queryAssemblyStyleList({ assemblyType: val }).then((res) => {
        this.assemblyStyleList = res.data;
      });
    },
    fetchList() {},
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.num <= 0 && this.form.assemblyType !== 25) {
            this.$message.warning("部署数量不能小于0");
            return false;
          }
          if (this.type === "edit") {
            updateAssembly(this.form).then((res) => {
              if (res) {
                this.dialogVisible = false;
                this.$parent.getDataList();
                this.$message.success("操作成功");
              }
            });
          } else {
            insertAssembly(this.form).then((res) => {
              if (res) {
                this.dialogVisible = false;
                this.$parent.getDataList();
                this.$message.success("操作成功");
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
