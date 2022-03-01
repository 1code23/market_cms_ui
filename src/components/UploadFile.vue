<template>
  <el-upload
    action="#"
    ref="uploadRef"
    class="uploader"
    :show-file-list="false"
    :disabled="disabled || loading"
    :http-request="handleHttpRequest"
  >
    <slot>
      <el-button
        :disabled="disabled"
        type="primary"
        size="small "
        :loading="loading"
      >
        <slot name="text">上传文件</slot>
      </el-button>
    </slot>
  </el-upload>
</template>

<script>
import request from "@/config/serve.js";
export default {
  model: { prop: "url", event: "change" },
  props: {
    url: { default: "" },
    type: { default: "other" }, // 上传的文件类型，可用值:apk,image,other,video
    // 接受上传的文件类型
    acceptType: {
      type: Array,
      default() {
        return [];
      },
    },
    // 限制大小单位为MB
    limSize: {
      type: Number,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileUrl: this.url,
      loading: false,
    };
  },

  methods: {
    async handleHttpRequest({ file }) {
      const isUpload = await this.beforeUpload(file);
      if (isUpload) {
        this.loading = true;
        try {
          // 文件上传至服务器
          const res = await this.uploadFile(file, this.type);
          if (res && res.code === 0) {
            if (this.type == "apk") {
              const { fileProperty = {} } = res.data;
              this.fileUrl = fileProperty.accessPath || "";
            } else {
              this.fileUrl = res.data.accessPath || "";
            }
            this.$emit("success", res.data);
          }
          this.loading = false;
        } catch (err) {
          this.loading = false;
        }
      }
    },
    async beforeUpload(file) {
      const acceptType = this.acceptType; // 限制上传类型
      const limSize = this.limSize; // 限制大小单位为MB
      let [isFileType, isFileSize] = [true, true];

      if (acceptType.length != 0) {
        // 父组件传入可接受类型
        if (acceptType.includes("apk")) {
          const fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
          isFileType = acceptType.includes(fileType);
        } else {
          isFileType = acceptType.includes(file.type.split("/")[1]);
        }
      }

      if (limSize) {
        // 父组件传入限制大小
        isFileSize = file.size / 1024 / 1024 <= limSize;
      }
      if (!isFileType) {
        this.$message.error(`上传文件只能是 ${acceptType.join("、")} 格式！`);
        return isFileType;
      }
      if (!isFileSize) {
        this.$message.error(`上传文件大小不能超过 ${limSize}MB!`);
        return isFileSize;
      }
      return isFileType && isFileSize;
    },
    uploadFile(file, type = "other") {
      let url = "/file/otherUpload"; // 上传其他文档
      if (type === "apk") {
        // 上传apk文档
        url = "/file/apkUpload";
      } else if (type === "image") {
        // 上传图片
        url = "/file/imageUpload";
      } else if (type === "video") {
        // 上传视频
        url = "/file/videoUpload";
      }
      const formData = new FormData();
      formData.set("file", file);
      return request(
        "http",
        url,
        {
          method: "post",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
        false
      );
    },
  },
  watch: {
    url(url) {
      if (url === this.fileUrl) return;
      this.fileUrl = url;
    },
    fileUrl(url) {
      this.$emit("change", url);
    },
  },
};
</script>
<style scoped lang="scss">
.uploader {
  display: inline-block;
}
</style>
