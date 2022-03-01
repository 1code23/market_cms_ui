<template>
  <el-dialog
    title="配置应用"
    :visible.sync="dialogVisible"
    width="1100px"
    center
    top="10vh"
  >
    <div id="bu-shu" class="content">
      <div class="c-l">
        <h4>部署资源</h4>
        <DeployResource
          v-if="dialogVisible"
          groupName="drag"
          @change="deployListChange"
          ref="deploy-resource"
        />
      </div>
      <div class="c-r">
        <h4>部署内容</h4>
        <draggable
          id="drag_list"
          :list="list"
          class="drag-list-list"
          group="drag"
          @change="dragChange"
          :animation="300"
          ghost-class="ghost"
          chosen-class="chosen"
        >
          <div v-for="(item, index) in list" :key="item.apkId" class="tag">
            <div class="t-l">
              {{ index + 1 }}
            </div>
            <div class="t-r">
              <!-- <p>{{ item.apkId }}</p> -->
              <p>{{ item.apkName }}</p>
              <p>{{ item.packageName }}</p>
            </div>
            <span class="delete" @click="toDelete(item, index)">
              <i class="el-icon-delete"></i>
            </span>
          </div>
        </draggable>
        <el-row type="flex" justify="end" style="margin-top: 20px">
          <el-button type="primary" @click="save()">保存</el-button>
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button @click="toDeleteAll()">一键清空</el-button>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import draggable from "vuedraggable";
import { selectKeywordApkList, addKeywordApkList } from "@/api/searchIntervene";
import DeployResource from "@/components/DeployResource";
export default {
  components: { draggable, DeployResource },
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
        this.fetchList();
      } else {
        this.list = [];
      }
    },
    list() {},
  },
  data() {
    return {
      searchData: {
        page: 1,
        size: 10,
        total: 1,
      },
      list: [],
    };
  },
  methods: {
    fetchList() {
      selectKeywordApkList({ id: this.row.id }).then((res) => {
        this.list = res.data;
      });
    },
    // 左侧列表发生改变更新数据
    deployListChange(arr) {
      setTimeout(() => {
        this.list.map((item) => {
          arr.forEach((l) => {
            if (l.packageName === item.packageName) {
              this.$set(l, "notDrag", true);
            }
          });
        });
      }, 0);
    },
    // 右侧拖拽发生改变
    dragChange(row) {
      if (row.added) {
        const { apkId } = row.added.element;
        this.handleNotDragClass(apkId, true);
      }
    },
    // 删除右侧部署内容
    toDelete(row, index) {
      const { apkId } = row;
      this.list.splice(index, 1);
      this.handleNotDragClass(apkId, false);
    },
    toDeleteAll() {
      this.list.map((item) => {
        this.handleNotDragClass(item.apkId, false);
      });
      this.list = [];
    },
    //处理 .notDrag 类名的添加，实现左侧列表选项的是否禁用
    handleNotDragClass(id, type) {
      this.$refs["deploy-resource"].dragList.forEach((item) => {
        if (id === item.apkId) {
          // item.notDrag = true;
          this.$set(item, "notDrag", type);
        }
      });
    },
    // 保存
    save() {
      // if (!this.list.length) {
      //   this.$message.warning("未部署内容");
      //   return;
      // }
      let params = {
        keywordId: this.row.id,
        ozKeywordApks: [],
      };
      params.ozKeywordApks = this.list.map((item, index) => {
        item.sort = index;
        return item;
      });
      addKeywordApkList(params).then((res) => {
        this.$message.success("操作成功");
        this.dialogVisible = false;
        this.$parent.getDataList();
      });
    },
  },
};
</script>
<style scoped>
.drag_list {
  height: 570px;
}
</style>
