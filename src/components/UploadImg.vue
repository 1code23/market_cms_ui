<template>
  <div>
    <div class="uploader" :style="getImgSizePX">
      <el-upload
        action="#"
        ref="uploadRef"
        :show-file-list="false"
        :disabled="disabled || loading"
        :http-request="handleHttpRequest"
        v-loading="loading"
      >
        <img v-if="imgUrl && !isVideo" :src="imgUrl" class="img" />
        <video v-if="imgUrl && isVideo" :src="imgUrl" controls class="img">
          您的浏览器不支持视频播放
        </video>

        <i v-if="!imgUrl" class="el-icon-plus uploader-icon"></i>
      </el-upload>
      <i
        v-if="imgUrl && !disabled"
        @click="handleDelete"
        class="el-icon-delete delete-icon"
      ></i>
    </div>
    <!-- 提示描述插槽，一些注意提示---swx -->
    <slot name="hint"></slot>
  </div>
</template>

<script>
import request from "@/config/serve.js";
import { asseblyStyleArr } from "@/common/constant/constant.js";

export default {
  model: { prop: "url", event: "change" },
  props: {
    url: { default: "" },
    isVideo: { default: false }, // 上传的文件类型是否为视频
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
    // 限制宽度
    limWidth: {
      type: Number,
    },
    // 限制高度
    limHeight: {
      type: Number,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //图片尺寸 1200*800
    imgSize: {
      type: String,
    },
  },
  computed: {
    //获取图片尺寸以px形式显示
    getImgSizePX() {
      let px =
        asseblyStyleArr.find((item) => item.size === this.imgSize).px || "";
      let item = px.split("*");
      if (px) {
        return `width:${item[0]}px;height:${item[1]}px`;
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      imgUrl: this.url,
      loading: false,
    };
  },

  methods: {
    handleDelete() {
      this.$emit("delete", this.imgUrl);
      this.imgUrl = "";
    },
    async handleHttpRequest({ file }) {
      const isUpload = await this.beforeUpload(file);
      if (isUpload) {
        this.loading = true;
        const type = this.isVideo ? "video" : "image";
        try {
          // 文件上传至服务器
          const res = await this.uploadFile(file, type);
          if (res && res.code === 0) {
            this.imgUrl = res.data.accessPath || "";
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
      const limWidth = this.limWidth; // 限制宽度
      const limHeight = this.limHeight; // 限制高度
      let [isFileType, isFileSize, isWidth, isHeight] = [
        true,
        true,
        true,
        true,
      ];
      if (acceptType.length != 0) {
        // 父组件传入可接受类型
        const fileType = file.type.split("/")[1].toLowerCase();
        isFileType = acceptType.includes(fileType);
      }

      if (limSize) {
        // 父组件传入限制大小
        isFileSize = file.size / 1024 / 1024 <= limSize;
      }
      if (!isFileType) {
        this.$message.error(`上传文件只能是 ${acceptType.join("、")} 格式！`);
        return false;
      }
      if (!isFileSize) {
        this.$message.error(`上传文件大小不能超过 ${limSize}MB!`);
        return false;
      }
      const imgInfo = this.isVideo
        ? await this.getVideoMsg(file)
        : await this.getImageMsg(file);
      if (limWidth) {
        // 父组件传入限制宽度
        isWidth = imgInfo.width == limWidth;
      }
      if (limHeight) {
        // 父组件传入限制宽度
        isHeight = imgInfo.height == limHeight;
      }

      if (!isWidth) {
        this.$message.error(`上传图片宽度为 ${limWidth}px!`);
        return false;
      }
      if (!isHeight) {
        this.$message.error(`上传图片高度为 ${limHeight}px!`);
        return false;
      }
      return isFileType && isFileSize && isWidth && isHeight;
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
    // 在浏览器中预加载图片
    getImageMsg(file) {
      return new Promise((resolve) => {
        const URL = window.URL || window.webkitURL;
        const img = new Image();
        img.onload = function () {
          resolve(img);
        };
        img.src = URL.createObjectURL(file);
      });
    },
    getVideoMsg(file) {
      return new Promise((resolve) => {
        const URL = window.URL || window.webkitURL;
        let videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);
        videoElement.addEventListener("loadedmetadata", function () {
          resolve({
            duration: videoElement.duration,
            height: videoElement.videoHeight,
            width: videoElement.videoWidth,
          });
        });
      });
    },
  },
  watch: {
    url(url) {
      if (url === this.imgUrl) return;
      this.imgUrl = url;
    },
    imgUrl(url) {
      this.$emit("change", url);
    },
  },
};
</script>
<style scoped lang="scss">
.uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-block;
  &:hover {
    border-color: #409eff;
  }
  div {
    width: 100%;
    height: 100%;
  }
}
/deep/.el-upload {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
.delete-icon {
  font-size: 20px;
  color: #8c939d;
  position: absolute;
  top: 5px;
  right: 5px;
}
.img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
