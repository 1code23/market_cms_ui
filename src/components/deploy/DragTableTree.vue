<template>
  <!-- 表格封装 -->
  <draggable
    v-model="data"
    :options="{
      group: { name: groupName, pull: 'clone' },
      forceFallback: true,
      delay: '10',
    }"
    :sort="false"
    isfromEl="true"
  >
    <table class="itxst" v-for="item in data" :key="item.page_id">
      <tbody>
        <tr
          class="itemTr cursor"
          @click.stop="item.showChild = !item.showChild"
          :class="{ showIcon: item.showChild }"
        >
          <td class="itemTd" :class="{ isChildren: isChildren }">
            <div>
              <i
                class="el-icon-caret-right childrenIcon"
                v-if="item.children"
              ></i>
              <i
                class="el-icon-minus"
                style="color: white"
                v-if="!item.children"
              ></i>
              <span>{{ item.page_name }}</span>
            </div>
          </td>
          <td class="itemTd">
            <div>{{ item.page_type | pageTypes }}</div>
          </td>
          <td class="itemTd">
            <div>{{ item.create_time }}</div>
          </td>
          <td class="itemTd">
            <div>{{ item.modify_time }}</div>
          </td>
        </tr>
        <tr class="cursor" v-if="item.children && item.showChild">
          <tableTree
            :data="item.children"
            :isChildren="true"
            :groupName="groupName"
          ></tableTree>
        </tr>
      </tbody>
    </table>
  </draggable>
</template>

<script>
export default {
  name: "tableTree",
  props: ["data", "isChildren", "groupName"],
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
};
</script>

<style lang="scss" scoped>
.itxst {
  width: 100%;
  box-sizing: border-box;
  .showIcon {
    .childrenIcon {
      transform: rotate(45deg);
    }
  }
  .itemTr {
    display: block;
    text-align: center;
  }

  .isChildren {
    padding-left: 20px;
  }
  .itemTd {
    width: 25%;
    display: inline-block;
    box-sizing: border-box;
    div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
td {
  border-bottom: 1px solid #ebeef5;
  padding: 12px 0;
}
// 拖拽时占位符的样式，在接收该拖拽元素的元素写ghostClass="ghostClass"
.ghostClass {
  background: #eee;
}
</style>
