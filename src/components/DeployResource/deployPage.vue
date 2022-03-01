<template>
  <!-- 部署资源拖拽公共组件 -------页面 -->
  <div class="deploy-resource">
    <el-row :gutter="6">
      <el-col :span="8">
        <el-select
          filterable
          v-model="marketId"
          size="small"
          placeholder="请选择市场"
        >
          <el-option
            v-for="i in marketList"
            :key="i.marketId"
            :label="i.marketName"
            :value="i.marketId"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div>
      <div class="thead">
        <span class="pageName">页面名称</span>
        <span class="pageType">页面类型</span>
        <span class="createTime">创建时间</span>
        <span class="bm">修改时间</span>
      </div>
    </div>
    <!-- 
          name 可跨越拖拽的类
          pull：clone 拖拽后不消失
          put：false 不允许拖进这里
          sort：不允许拖动排序
          animation 动画效果
          filter 不能拖动的类名
          chosen-class 选择时的样式
          ghost-class 拖拽时的样式
         -->
    <draggable
      :list="dragList"
      class="drag-list-page"
      :group="{ name: groupName, pull: 'clone', put: false }"
      :forceFallback="true"
      :delay="20"
      :sort="false"
    >
      <div
        v-for="p1 in dragList"
        :key="p1.pageId"
        class="list-group-item"
        @click="p1.isChildrenShow = !p1.isChildrenShow"
      >
        <div class="mover">
          <span class="pageName">
            <i
              class="el-icon-arrow-right"
              :class="{ active: p1.isChildrenShow }"
              v-if="p1.pageList.length"
            ></i>
            {{ p1.pageName }}</span
          >
          <span class="pageType">{{ p1.pageType | pageTypes }}</span>
          <span class="createTime">{{ p1.createTime }}</span>
          <span class="modifyTime">{{ p1.modifyTime }}</span>
        </div>
        <draggable
          v-show="p1.isChildrenShow"
          :list="p1.pageList"
          :group="{ name: groupName, pull: 'clone', put: false }"
          :forceFallback="true"
          :sort="false"
          isfromEl="true"
        >
          <div
            v-for="p2 in p1.pageList"
            :key="p2.pageId"
            class="list-group-item"
            @click.stop="p2.isChildrenShow = !p2.isChildrenShow"
          >
            <div class="mover">
              <span class="pageName" style="padding-left: 20px">
                <i
                  class="el-icon-arrow-right"
                  v-if="p2.pageList.length"
                  :class="{ active: p2.isChildrenShow }"
                ></i>
                {{ p2.pageName }}</span
              >
              <span class="pageType">{{ p2.pageType | pageTypes }}</span>
              <span class="createTime">{{ p2.createTime }}</span>
              <span class="modifyTime">{{ p2.modifyTime }}</span>
            </div>
            <draggable
              v-show="p2.isChildrenShow"
              :list="p2.pageList"
              :group="{ name: groupName, pull: 'clone', put: false }"
              :forceFallback="true"
              :sort="false"
              isfromEl="true"
            >
              <div
                v-for="p3 in p2.pageList"
                :key="p3.pageId"
                class="list-group-item"
              >
                <div class="mover">
                  <span class="pageName" style="padding-left: 40px">{{
                    p3.pageName
                  }}</span>
                  <span class="pageType">{{ p3.pageType | pageTypes }}</span>
                  <span class="createTime">{{ p3.createTime }}</span>
                  <span class="modifyTime">{{ p3.modifyTime }}</span>
                </div>
              </div>
            </draggable>
          </div>
        </draggable>
      </div>
    </draggable>
    <p v-if="!dragList.length" class="hint">-暂无数据-</p>
  </div>
</template>

<script>
import { getMarketDeployList, getMarketList } from "@/api/componentManage";
export default {
  props: {
    // 可拖拽的模块名
    groupName: {
      type: String,
      default: "drag",
    },
  },
  filters: {
    pageTypes(val) {
      switch (val) {
        case 0:
          return "页面";
        case 1:
          return "分类";
        case 2:
          return "个人中心";
        case 3:
          return "热门小说";
        case 4:
          return "垃圾清理";
        default:
          return "页面";
      }
    },
  },
  watch: {
    marketId(val) {
      getMarketDeployList({ marketId: val }).then((res) => {
        function addIsChildrenShow(item) {
          if (item.pageList && item.pageList.length) {
            return item.pageList.forEach((p) => {
              p.isChildrenShow = false;
              return p;
            });
          }
        }
        res.data.forEach((item) => {
          item.isChildrenShow = false;
          return addIsChildrenShow(item);
        });
        this.dragList = res.data;

        // console.log(this.dragList);
      });
    },
  },
  data() {
    return {
      marketId: "",
      queryModule: {
        page: 1,
        size: 1000,
        total: 0,
      },
      dragList: [],
      marketList: [], //可选市场
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    search() {
      this.queryModule.page = 1;
      this.fetchList();
    },
    fetchList() {
      let obj = { ...this.queryModule, isDelete: 0 };
      getMarketList(obj).then((res) => {
        const { list = [] } = res.data;
        this.marketId = list[0].marketId;
        this.marketList = list;
      });
      // queryPageList(this.queryModule).then((res) => {
      //   const { list = [], total } = res.data;
      //   this.dragList = list;
      //   this.queryModule.total = total;
      //   this.$emit("change", this.dragList);
      // });
      // this.dragList = [
      //   { id: 1, type: "ym" },
      //   { id: 2, type: "ym" },
      //   { id: 3, type: "ym" },
      //   { id: 4, type: "ym" },
      // ];
      // this.$emit("change", this.dragList);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-icon-arrow-right {
  cursor: pointer;
  transition: 0.3s;
  &.active {
    transform: rotate(90deg);
  }
}
// .pageType {
//   width: 100px;
// }
// .createTime {
//   width: 140px;
// }
// .modifyTime {
//   width: 140px;
// }
.thead,
.mover {
  width: 100%;
  font-weight: bold;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  span {
    flex-grow: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 5px;
    user-select: none;
  }
}
.mover {
  // margin-bottom: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
  &:hover {
    background: #f7f7f7;
  }
}
.list-group-item {
  display: block;
  width: 100%;
  user-select: none;
  border: none;
  span {
    font-size: 14px;
  }
}
.hint {
  text-align: center;
  font-size: 13px;
  margin: 20px 0;
  color: #ccc;
}
</style>
