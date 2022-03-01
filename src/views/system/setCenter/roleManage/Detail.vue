<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="140px"
    class="detail-form"
  >
    <el-form-item label="角色名称" prop="name">
      <el-input
        size="small"
        :maxlength="30"
        show-word-limit
        v-model.trim="formData.name"
        placeholder="请输入角色名"
      ></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="remark">
      <el-input
        size="small"
        type="textarea"
        v-model="formData.remark"
        placeholder="请输入描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="权限配置" class="requireClass">
      <el-tree
        ref="tree"
        node-key="id"
        :data="allMenuList"
        :props="defaultProps"
        :default-checked-keys="defaultCheckedList"
        show-checkbox
      >
      </el-tree>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="handleSubmit()"
        >保存</el-button
      >
      <el-button size="small" @click="handleCancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
    allMenuList: {
      type: Array,
      default() {
        return [];
      },
    },
    allLeafList: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultCheckedList: {
      type: Array,
      default() {
        return [];
      },
    },
    operationType: { default: "" },
  },
  data() {
    return {
      defaultProps: {
        label: "text",
        children: "items",
      },
      formData: { ...this.detailData },
      rules: {
        // 用于显示必输的红色星号
        name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        remark: [{ required: true, message: "请输入描述", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.setTreeInitData(this.defaultCheckedList);
  },
  methods: {
    handleSubmit() {
      const permissions = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys()); // 将所有已选和半选的菜单返回
      if (permissions.length == 0) {
        this.$message.error("请勾选权限");
        return;
      }
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.formData.permissions = permissions;
          this.$emit("submit", this.formData);
        } else {
          this.$message.error("请检查输入的数据");
        }
      });
    },
    handleCancel() {
      this.$emit("cancel");
    },
    // 其他
    setTreeInitData(list) {
      // 设置页面权限的初始编辑数据
      if (!list) return;
      const defaultTreeList = list.filter((i) => this.allLeafList.includes(i));
      this.$refs.tree.setCheckedKeys(defaultTreeList); // 设置页面权限的初始编辑数据
    },
  },
  watch: {
    detailData(data) {
      this.formData = { ...data };
      if (this.operationType === "create") {
        this.$refs.formRef.resetFields();
      } else {
        this.setTreeInitData(data.permissions);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.requireClass {
  /deep/ .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
</style>
