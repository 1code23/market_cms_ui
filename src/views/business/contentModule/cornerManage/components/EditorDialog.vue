<template>
  <el-dialog
    :title="type === 'add' ? '新增角标' : '角标编辑'"
    :visible.sync="dialogVisible"
    width="500px"
    center
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角标名称" required>
        <el-input
          v-model.trim="form.cornerName"
          placeholder="请输入角标名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角标图片" required>
        <UploadImg
          v-model="form.hdImageUrl"
          :limSize="2"
          :limWidth="152"
          :limHeight="152"
          :acceptType="['png', 'jpg', 'jpeg']"
          @success="uploadImgSuccess"
        >
          <p slot="hint" style="font-size: 13px; color: #cccccc">
            提示：尺寸 152*152,jpg/jpeg/png格式，只能上传一张
          </p>
        </UploadImg>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          rows="4"
          maxlength="50"
          show-word-limit
          v-model="form.description"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { insertCorner, updateCornerByCornerId } from "@/api/corner.js";
import UploadImg from "@/components/UploadImg";
export default {
  components: { UploadImg },
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
        this.form = { ...this.row };
      }
    },
  },
  data() {
    return {
      form: {
        cornerName: "",
        description: "",
        hdImageUrl: "",
        imageName: "",
        imgId: "",
      },
    };
  },
  methods: {
    // 上传图片赋值
    uploadImgSuccess(res) {
      this.form.imageName = res.fileName || "";
    },
    save() {
      if (!this.form.cornerName) {
        this.$message.warning("请输入角标名称");
        return false;
      }
      if (!this.form.hdImageUrl) {
        this.$message.warning("请选择角标图片");
        return false;
      }
      if (this.type === "edit") {
        updateCornerByCornerId(this.form).then((res) => {
          this.dialogVisible = false;
          this.$message.success("编辑成功");
          this.$parent.getDataList();
        });
      } else {
        //后端要求必须有这个字段，可以为空--swx
        this.form.imgId = "";
        this.form.language = "";
        insertCorner(this.form).then((res) => {
          this.dialogVisible = false;
          this.$message.success("新增成功");
          this.$parent.getDataList();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
