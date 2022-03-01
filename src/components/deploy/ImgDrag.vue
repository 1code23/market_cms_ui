<template>
  <div class="img-drag">
    <el-row :gutter="6">
      <el-col :span="8"
        ><el-input
          size="small"
          v-model="searchData.image"
          placeholder="请输入图片名称"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch()"
          >查询</el-button
        ></el-col
      >
    </el-row>
    <el-row
      :gutter="6"
      class="scroll-card"
      ref="imgListRef"
      v-loading="loading"
    >
      <draggable
        v-model="imgList"
        :options="{
          group: { name: 'image', pull: 'clone', put: false },
          animation: 150,
          scroll: true,
          scrollSensitivity: 50,
          sort: false,
          forceFallback: true,
        }"
      >
        <el-col
          :span="8"
          class="img-card borderA"
          v-for="(item, index) in imgList"
          :key="index"
        >
          <img :src="item.hd_image_url" />
          <div>{{ item.image_name }}</div>
        </el-col>
      </draggable>
    </el-row>
  </div>
</template>
<script>
import PageMore from "@/common/utils/pageMore";
import request from "@/config/serve.js";
export default {
  data() {
    return {
      searchData: {},
      page: 1,
      imgList: [],
      loading: false,
    };
  },
  mounted() {
    this.getDetailList();
    this.initScrollPage();
  },
  methods: {
    handleSearch(params) {
      this.page = 1;
      this.getDetailList({ page: 1, ...params });
      this.$refs.imgListRef.$el.scrollTop = 0; // 查询后滚动到顶部
    },
    async getDetailList(params, isAdd) {
      const data = {
        type: "image",
        page: this.page,
        ...this.searchData,
        ...params,
      };
      this.loading = true;
      let res = await request(
        "post",
        "/admin/MarketPage/detailList",
        data,
        false
      );
      this.loading = false;
      if (isAdd) {
        this.imgList = this.imgList.concat(res.list);
      } else {
        this.imgList = res.list;
      }
    },
    async handleScroll() {
      this.page++;
      this.getDetailList({}, true);
    },
    initScrollPage() {
      new PageMore({
        dom: this.$refs.imgListRef.$el,
        callBack: this.handleScroll,
      });
    },
    // 暴露给父组件直接调用，重新查询数据
    init(params) {
      this.handleSearch(params);
    },
  },
};
</script>
<style scoped lang="scss">
.img-drag {
  padding: 10px;

  .scroll-card {
    height: 380px;
    overflow: auto;
    border-top: 1px solid #dfdfdf;
  }
  .img-card {
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }
}
// 拖拽时占位符的样式，在接收该拖拽元素的元素写ghostClass="ghostClass"
.ghostClass {
  img {
    height: 100% !important;
    width: 100% !important;
  }
}
</style>
