<template>
  <!-- 分页组件 Pagination -->
  <div v-show="hidden">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="Number(total)"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    hidden: {
      //是否展示
      type: Boolean,
      default: false,
    },
    total: {
      //总条数
      required: true,
      type: [String, Number],
    },
    page: {
      //当前页码
      type: Number,
      default: 1,
    },
    limit: {
      //每页条数
      type: Number,
      default: 10,
    },
    pageSizes: {
      // 每页显示条数区间
      type: Array,
      default() {
        return [10, 20, 30, 50, 100];
      },
    },
    layout: {
      //需要展示的内容
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      //是否展示背景色
      type: Boolean,
      default: true,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    //页码改变时调用方法
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },
    //上下页时调用方法
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
  },
};
</script>

<style lang="scss" scoped></style>
