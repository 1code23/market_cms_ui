<template>
  <el-dialog
    title="心愿单详情"
    :visible.sync="dialogVisible"
    width="70%"
    center
  >
    <PageTable
      :columns="columns"
      :tableData="{ ...queryModule, list }"
      height="500"
      @page-change="handleChangePage"
    >
      <template slot="pics" slot-scope="{ row }">
        <div v-if="row.pics" class="view-img-box">
          <div class="view-img" v-for="img in row.pics.split(',')" :key="img">
            <el-image :src="img" :preview-src-list="row.pics.split(',')">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading" style="color: #409eff"></i>
              </div>
            </el-image>
          </div>
        </div>
      </template>
    </PageTable>
  </el-dialog>
</template>

<script>
import PageTable from "@/components/PageTable.vue";
import { queryUserWishList } from "@/api/wishlist";
export default {
  components: { PageTable },
  props: { isShow: Boolean, row: Object },
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
        this.queryModule.id = this.row.id;
        this.fetchList();
      }
    },
  },
  data() {
    return {
      columns: [
        { key: "nickname", label: "用户昵称", align: "center" },
        { key: "account", label: "用户账号", align: "center" },
        { key: "extra", label: "备注", align: "center" },
        { slot: "pics", label: "图片", width: 350, align: "center" },
      ],
      queryModule: {
        id: null,
        count: true,
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],
    };
  },
  methods: {
    handleChangePage({ page, size }) {
      this.queryModule.page = page;
      this.queryModule.size = size;
      this.fetchList();
    },
    fetchList() {
      queryUserWishList(this.queryModule).then((res) => {
        const { list, total } = res.data;
        this.list = list;
        this.queryModule.total = total;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.view-img-box {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  .view-img {
    align-self: center;
    // display: inline-block;
    width: 70px;
    max-height: 150px;
    min-height: 70px;
    margin: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #e0e0e0;
  }
}
</style>
