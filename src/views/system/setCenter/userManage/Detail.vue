<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="140px"
    class="detail-form"
    autocomplete="off"
  >
    <el-form-item label="登录名" prop="account">
      <el-input
        size="small"
        v-model.trim="formData.account"
        placeholder="请输入登录名"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input
        size="small"
        v-model="formData.name"
        placeholder="请输入用户名"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        show-password
        size="small"
        autocomplete="off"
        v-model="formData.password"
        :disabled="operationType === 'edit'"
        :placeholder="
          operationType == 'create' ? '请输入密码' : '不输入则为不修改密码'
        "
      ></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input
        size="small"
        autocomplete="off"
        v-model="formData.email"
        placeholder="请输入邮箱地址"
      ></el-input>
    </el-form-item>
    <el-form-item label="角色配置" prop="roleId">
      <el-select
        size="small"
        v-model="formData.roleId"
        placeholder="请选择角色"
      >
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        size="small"
        type="textarea"
        v-model="formData.remark"
        placeholder="请输入备注"
      ></el-input>
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
    roleList: {
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
        account: [{ required: true, message: "请输入登录名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roleId: [
          { required: true, message: "请选择角色配置", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formData);
        } else {
          this.$message.error("请检查输入的数据");
        }
      });
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
  watch: {
    detailData(data) {
      this.formData = { ...data };
      if (this.operationType === "create") {
        this.$refs.formRef.resetFields();
      }
    },
  },
};
</script>
