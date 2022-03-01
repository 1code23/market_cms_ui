<template>
  <div class="select-content fc">
    <draggable
      v-model="list"
      class="select-list flex1 borderA-bottom"
      :options="{
        group: 'assembly',
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: 'chosenClass',
        scroll: true,
        scrollSensitivity: 200,
      }"
    >
      <el-col v-for="(item, index) in list" :key="index" class="borderA">
        <div class="item-left" @click="handleClickSort(index)">
          <el-input
            ref="sortRef"
            :key="item.assembly_id"
            v-model="sortNumber"
            v-if="sortIndex === index"
            @blur="handleInputBlur"
            @keyup.enter.native="handleInputEnter(index)"
            :autofocus="true"
          />
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="item-right" @dblclick="handleDbClick(item)">
          <div class="item-text-h1">
            {{ item.assemblyName }}
          </div>
          <div>组件ID：{{ item.assemblyId }}</div>
          <div>组件类型：{{ item.typeName }}</div>
          <div>组件描述：{{ item.description }}</div>
        </div>
        <i class="del el-icon-delete cursor" @click="removeItem(index)"></i>
      </el-col>
    </draggable>
    <div class="tail">
      <el-button type="primary" size="small" @click="handleSave"
        >保存</el-button
      >
      <el-button type="danger" size="small" @click="list = []">清空</el-button>
    </div>
  </div>
</template>
<script>
import { updatePageAssembly } from "../indexServe.js";
export default {
  model: {
    prop: "data",
    event: "change",
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    pageId: {
      default: null,
    },
  },
  data() {
    return {
      list: this.data,
      visible: false,
      assemblyObj: {},
      sortIndex: "", // 正在编辑sort的index
      sortNumber: "", //新的排序号
    };
  },
  methods: {
    handleSave() {
      const pageId = this.pageId;
      const assemblyList = this.list.map((item, index) => ({
        ...item,
        displaySort: index + 1,
      }));
      const data = { pageId, assemblyList };
      if (pageId || pageId == 0) {
        this.updatePageAssembly(data);
      }
    },
    handleDbClick(item) {
      this.$router.push({
        // 多个部署页面打开时，切换会出现path参数丢失问题，所以用name传参
        name: "ComponentManageDeploy",
        params: {
          assemblyId: item.assemblyId,
          assemblyType: item.assemblyType,
          assemblyStyle: item.assemblyStyle,
        },
      });
    },
    handleClickSort(index) {
      this.sortIndex = index;
      this.sortNumber = index + 1;
      this.$nextTick(() => {
        this.$refs.sortRef[0].focus();
      });
    },
    handleInputEnter(index) {
      if (!parseInt(this.sortNumber)) {
        // nextSort必须是数字
        alert("请输入数字");
        return;
      }
      // 回车保存排序
      this.updateNumber(index, this.sortNumber);
      this.sortIndex = "";
    },
    handleInputBlur() {
      // 失去焦点取消编辑
      this.sortIndex = "";
    },
    removeItem(index) {
      this.list.splice(index, 1);
    },
    updateNumber(preIndex, nextSort) {
      const sortIndex = parseInt(nextSort) - 1;
      if (sortIndex < 0) {
        return false;
      }
      const preItem = this.list.splice(preIndex, 1)[0]; // 从数组中删除该数据
      this.list.splice(sortIndex, 0, preItem); // 将数据插入到对应的位置
    },
    async updatePageAssembly(data) {
      const res = await updatePageAssembly(data);
      if (res && res.code === 0) {
        this.$message.success("操作成功");
      }
    },
  },
  watch: {
    data() {
      if (this.list === this.data) {
        return;
      }
      this.list = this.data;
    },
    list() {
      this.$emit("change", this.list);
    },
  },
};
</script>
<style scoped lang="scss">
.select-content {
  background: url("~@/assets/images/market-asb.png");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  height: 65vh;
  padding: 10px;
  overflow: auto;
  /deep/.el-row {
    margin-bottom: 0px;
  }
  .select-list {
    overflow: auto;
    height: 100%;
    padding-bottom: 50px;
  }
  .el-col {
    padding: 15px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .item-left {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    background-color: #f2f2f2;
    color: #ff5722;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-style: italic;
    font-weight: 400;
    cursor: pointer;
  }

  .item-right {
    max-width: 70%;
    overflow: hidden;
    cursor: pointer;
  }

  .item-text-h1 {
    margin-bottom: 8px;
  }

  .del {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
  }
  .tail {
    margin: 10px;
    text-align: end;
  }
}
</style>
