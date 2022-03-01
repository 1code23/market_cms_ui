<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="200px"
    class="detail-form"
    label-suffix=":"
  >
    <el-form-item label="语言" prop="language">
      <el-select
        size="small"
        filterable
        :disabled="disabled"
        v-model="formData.language"
        placeholder="请选择语言"
      >
        <el-option
          :disabled="selectLanguageIdList.includes(item.languageType)"
          v-for="item in languageList"
          :key="item.languageType"
          :label="item.languageName"
          :value="item.languageType"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="页面名称" prop="pageNameLang">
      <el-input
        size="small"
        v-model.trim="formData.pageNameLang"
        placeholder="请输入页面名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="浅色图标" prop="icon" v-if="pageDeep === 1">
      <div class="icon-area">
        <div class="fc ac">
          <div>主图标</div>
          <UploadImg
            :acceptType="['png']"
            :limWidth="96"
            :limHeight="96"
            v-model="formData.icon"
          >
          </UploadImg>
        </div>
        <div class="mhor10 fc ac">
          <div>副图标</div>
          <UploadImg
            :acceptType="['png']"
            :limWidth="96"
            :limHeight="96"
            v-model="formData.sicon"
          ></UploadImg>
        </div>
      </div>
      <p class="hint">提示：尺寸 96*96，png格式</p>
    </el-form-item>
    <el-form-item label="深色图标" prop="darkIcon" v-if="pageDeep === 1">
      <div class="icon-area">
        <div class="fc ac">
          <div>主图标</div>
          <UploadImg
            :limWidth="96"
            :limHeight="96"
            :acceptType="['png']"
            v-model="formData.darkIcon"
          ></UploadImg>
        </div>
        <div class="mhor10 fc ac">
          <div>副图标</div>
          <UploadImg
            :acceptType="['png']"
            :limWidth="96"
            :limHeight="96"
            v-model="formData.darkSicon"
          ></UploadImg>
        </div>
      </div>
      <p class="hint">提示：尺寸 96*96，png格式</p>
    </el-form-item>
    <el-form-item label="一键同步所有语言" prop="syncType">
      <el-radio-group v-model="formData.syncType">
        <el-radio
          size="small"
          v-for="item in booleanList"
          :key="item.key"
          :label="item.key"
          >{{ item.value }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="handleSubmit()"
        >确定</el-button
      >
      <el-button size="small" @click="handleCancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { booleanList } from "@/common/constant/constant.js";
import UploadImg from "@/components/UploadImg.vue";
export default {
  components: { UploadImg },
  props: {
    detailData: {
      type: Object,
      default() {
        return {};
      },
    },
    languageList: {
      type: Array,
      default() {
        return [];
      },
    },
    selectLanguageIdList: {
      type: Array,
      default() {
        return [];
      },
    },
    pageDeep: {
      default: "",
    },
    operationType: { default: "" },
  },
  data() {
    return {
      booleanList,
      formData: { ...this.detailData },
      rules: {
        language: [{ required: true, message: "请选择语言" }],
        icon: [{ required: true, message: "请上传浅色图标" }],
        darkIcon: [{ required: true, message: "请上传深色图标" }],
        pageNameLang: [{ required: true, message: "请输入页面名称" }],
      },
    };
  },
  computed: {
    disabled() {
      return this.operationType === "edit";
    },
  },
  mounted() {
    this.getRandTimeList();
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
    getRandTimeList() {
      const randTimeList = new Array(24).fill(0);
      for (let i in randTimeList) {
        randTimeList[i] = parseInt(i);
      }
      this.randTimeList = randTimeList;
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
<style lang="scss" scoped>
.icon-area {
  display: flex;
}
.hint {
  font-size: 13px;
  color: #ccc;
}
</style>
