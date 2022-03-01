<template>
  <el-drawer
    title="角标国际化"
    :visible.sync="drawer"
    direction="rtl"
    size="40%"
  >
    <div style="padding: 20px">
      <el-form ref="form" label-width="auto">
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
        <el-form-item label="角标图片" required>
          <div class="upload-img-box">
            <div class="upload-img-line">
              <div class="item">
                <p class="title">浅色图标</p>
                <UploadImg
                  v-model="form.hdImageUrl"
                  :limSize="2"
                  :limWidth="152"
                  :limHeight="152"
                  :acceptType="['png', 'jpg', 'jpeg']"
                >
                </UploadImg>
              </div>
              <div class="item">
                <p class="title">深色图标</p>
                <UploadImg
                  v-model="form.darkHdImageUrl"
                  :limSize="2"
                  :limWidth="152"
                  :limHeight="152"
                  :acceptType="['png', 'jpg', 'jpeg']"
                >
                </UploadImg>
              </div>
            </div>
            <p style="font-size: 13px; color: #cccccc">
              提示：尺寸 152*152,jpg/jpeg/png格式
            </p>
          </div>
          <!-- <UploadImg
            :url="form.hdImageUrl"
            @success="
              (res) => {
                form.hdImageUrl = res.accessPath;
                form.imageName = res.fileName;
              }
            "
          >
            <p slot="hint" style="font-size: 13px; color: #cccccc">
              提示：尺寸 120*120,jpg/png格式，只能上传一张
            </p>
          </UploadImg> -->
        </el-form-item>
        <!-- <el-form-item label="一键同步所有语言">
          <el-radio v-model="form.radio" label="1">是</el-radio>
          <el-radio v-model="form.radio" label="2">否</el-radio>
        </el-form-item> -->
      </el-form>
    </div>
    <el-row type="flex" justify="end">
      <el-button type="primary" @click="save()">确定</el-button>
      <el-button @click="drawer = false">取 消</el-button>
    </el-row>
  </el-drawer>
</template>

<script>
import UploadImg from "@/components/UploadImg";
import {
  insertCornerLanguage,
  updateCornerDescById,
  deleteCornerById,
} from "@/api/corner";
import { mapGetters } from "vuex";
export default {
  components: { UploadImg },
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
        this.form.imageName = "浅色图标";
        this.form.darkImageName = "深色图标";
        this.$store.dispatch("updateLanguageList");
      }
    },
  },
  data() {
    return {
      form: {
        language: "",
        hdImageUrl: "",
        darkHdImageUrl: "",
        imageName: "浅色图标",
        darkImageName: "深色图标",
      },
    };
  },
  methods: {
    // 上传图片赋值
    uploadImgSuccess(res, key) {
      this.form[key] = res.accessPath || "";
      this.form.imageName = res.fileName || "";
    },
    save() {
      if (!this.form.language) {
        this.$message.warning("请选择语言");
        return false;
      }
      if (!this.form.hdImageUrl || !this.form.darkHdImageUrl) {
        this.$message.warning("请选择角标图片");
        return false;
      }
      if (this.type === "edit") {
        updateCornerDescById(this.form).then((res) => {
          this.$message.success("编辑成功");
          this.drawer = false;
          this.$parent.fetchList();
        });
      } else {
        insertCornerLanguage(this.form).then((res) => {
          if (res.code === 0) {
            this.$message.success("新增成功");
            this.drawer = false;
            this.$parent.fetchList();
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-img-box {
  border: 1px dashed #ccc;
  box-sizing: border-box;
  padding: 10px;
  .upload-img-line {
    display: flex;
    justify-content: space-around;
    .item {
      text-align: center;
      margin-right: 30px;
    }
  }
}
</style>
