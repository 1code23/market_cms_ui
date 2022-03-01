<template>
  <el-dialog
    title="配置应用"
    :visible.sync="dialogVisible"
    width="90%"
    center
    top="10vh"
  >
    <div id="bu-shu" class="content">
      <div class="c-l">
        <h4>部署资源</h4>
        <DeployResource
          type="JB"
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
          :list="dragList"
          class="drag-list-list"
          group="drag"
          @change="dragChange"
          :animation="300"
          ghost-class="ghost"
          chosen-class="chosen"
        >
          <div v-for="(item, index) in dragList" :key="item.id" class="tag">
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
    <!-- <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
import draggable from "vuedraggable";
import DeployResource from "@/components/DeployResource";
import { insertCornerApk, queryCornerApkList } from "@/api/corner";
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
        this.dragList = [];
      }
    },
  },
  data() {
    return {
      searchData: {
        page: 1,
        size: 10,
        total: 1,
      },
      dragList: [],
    };
  },
  methods: {
    fetchList() {
      let params = {
        cornerId: this.row.cornerId,
        page: 1,
        size: 1000,
      };
      queryCornerApkList(params).then((res) => {
        const { list = [] } = res.data;
        this.dragList = list;
      });
    },
    // 左侧列表发生改变更新数据
    deployListChange(arr) {
      setTimeout(() => {
        this.dragList.map((item) => {
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
      this.dragList.splice(index, 1);
      this.handleNotDragClass(apkId, false);
    },
    toDeleteAll() {
      this.dragList.map((item) => {
        this.handleNotDragClass(item.apkId, false);
      });
      this.dragList = [];
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
      let arr = [];
      if (this.dragList.length) {
        arr = this.dragList.map((item, index) => {
          item.sequence = index;
          item.cornerId = this.row.cornerId;
          return item;
        });
      } else {
        arr = [{ cornerId: this.row.cornerId, apkId: "" }];
      }
      insertCornerApk(arr).then((res) => {
        this.dialogVisible = false;
        this.$parent.getDataList();
        this.$message.success("部署成功");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.c-r {
  width: 70%;
}
.c-l {
  width: 100%;
}
.drag_list {
  height: 570px;
}
</style>
