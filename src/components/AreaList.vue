<template>
  <div class="area-list borderA">
    <div class="list-top borderA-bottom">
      <el-checkbox
        :disabled="disabled"
        class="checkbox-item"
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
    </div>
    <div class="list-center borderA-bottom">
      <div class="center-left borderA-right">
        <div
          v-for="item in list"
          :key="item[keyCode]"
          class="checkbox-item cursor"
          :class="{ 'select-item': item[keyCode] == currentArea }"
          @click="handleClickItem(item)"
        >
          <el-checkbox
            :disabled="disabled"
            v-model="item.checked"
            :indeterminate="item.indeterminate"
            @click.prevent.native="handleClickItem(item, 'check')"
          ></el-checkbox>
          <span class="el-checkbox__label">{{ item[valueCode] }}</span>
        </div>
      </div>
      <div class="center-right">
        <el-checkbox
          :disabled="disabled"
          class="checkbox-item"
          v-for="item in list2"
          :key="item[keyCode]"
          v-model="item.checked"
          @change="handleChangeItem2(item)"
          >{{ item[valueCode] }}</el-checkbox
        >
      </div>
    </div>
    <!-- <div class="list-bottom">
      <el-checkbox class="checkbox-item" v-model="newArea"
        >新国家或地区</el-checkbox
      >
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    keyCode: {
      default: "countryId",
    },
    valueCode: {
      default: "countryName",
    },
    childrenCode: {
      default: "honorAppCountryList",
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    selectList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      newArea: false,
      currentArea: "",
    };
  },
  computed: {
    list2() {
      let list = [];
      const currentItem = this.list.find(
        (item) => item[this.keyCode] == this.currentArea
      );
      if (currentItem) {
        list = currentItem[this.childrenCode] || [];
      }
      return list;
    },
  },
  methods: {
    handleClickItem(item, type) {
      this.currentArea = item[this.keyCode];
      if (type === "check") {
        item.indeterminate = false;
        item.checked = !item.checked;
        if (item[this.childrenCode] && item[this.childrenCode].length !== 0) {
          item[this.childrenCode].forEach((item2) => {
            item2.checked = item.checked; // 设置子节点的状态
          });
        }
        // 设置全选的状态
        const checkStatus = this.getChildrenCheck("root");
        this.isIndeterminate = checkStatus == "half" ? true : false;
        this.checkAll = checkStatus == "all" ? true : false;
      }
    },
    handleChangeItem2(item) {
      const parentItem = this.getParentKey(item[this.keyCode]);
      const childrenCheck = this.getChildrenCheck(parentItem[this.keyCode]);
      // 设置父节点的状态
      parentItem.indeterminate = childrenCheck == "half" ? true : false;
      parentItem.checked = childrenCheck == "all" ? true : false;
      // 设置全选的状态
      const checkStatus = this.getChildrenCheck("root");
      this.isIndeterminate = checkStatus == "half" ? true : false;
      this.checkAll = checkStatus == "all" ? true : false;
    },
    handleCheckAllChange(checked) {
      let checkedList = [];
      if (checked) {
        const allChildrenKeys = this.getAllChildrenKeys();
        checkedList = allChildrenKeys;
      }
      this.setCheckedKeys(checkedList);
    },
    // 获取所有的叶子节点的key
    getAllChildrenKeys() {
      const checkedList = new Set();
      this.list.forEach((item) => {
        const childrenList = item[this.childrenCode];
        if (childrenList && childrenList.length !== 0) {
          childrenList.forEach((item2) => {
            checkedList.add(item2[this.keyCode]);
          });
        }
      });
      return [...checkedList];
    },
    // 根据传入的孩子节点的key获取父节点
    getParentKey(childrenKey) {
      let parentItem = "";
      for (let item of this.list) {
        const childrenList = item[this.childrenCode];
        if (childrenList && childrenList.length !== 0) {
          const obj = childrenList.find(
            (item1) => item1[this.keyCode] === childrenKey
          );
          if (obj) {
            parentItem = item;
            break;
          }
        }
      }
      return parentItem;
    },
    // 根据父节点的key，判断其下的子节点是全选、全不选、半选
    getChildrenCheck(parentKey) {
      let check = "null";
      let childrenList =
        (this.list.find((item) => item[this.keyCode] === parentKey) || {})[
          this.childrenCode
        ] || [];
      if (parentKey === "root") {
        // parentKey传入“root”时查询父节点的全选、全不选、半选
        childrenList = this.list;
      }
      const checkedList = [];
      const halfList = [];
      childrenList.forEach((item) => {
        if (item.checked) {
          checkedList.push(item[this.keyCode]);
        }
        if (item.indeterminate) {
          halfList.push(item[this.keyCode]);
        }
      });
      if (checkedList.length === 0 && halfList.length === 0) {
        check = "null"; // 全不选
      } else if (childrenList.length === checkedList.length) {
        check = "all"; // 全选
      } else {
        check = "half"; // 半选
      }
      return check;
    },
    //获取已选节点（type="checked"）或半选节点（type="indeterminate"）的key所组成的数组
    getAllCheckedKeys(list = [], type = "checked", checkList = []) {
      list.forEach((item) => {
        if (item[type]) {
          checkList.push(item[this.keyCode]);
        }
        const childrenList = item[this.childrenCode];
        if (childrenList && childrenList.length !== 0) {
          this.getAllCheckedKeys(childrenList, type, checkList);
        }
      });
      return checkList;
    },
    //设置已勾选节点的值,checked:true--将list里包含在keys中的值设置true，false--将list里包含在keys中的值设置false
    setAllCheckedKeys(list = [], keys = [], checked = true) {
      list.forEach((item) => {
        if (keys.includes(item[this.keyCode])) {
          // 符合条件的添加设置为checked
          item.checked = checked;
        } else {
          // 其他情况与之相反
          item.checked = !checked;
        }
        const childrenList = item[this.childrenCode];
        if (childrenList && childrenList.length !== 0) {
          this.setAllCheckedKeys(childrenList, keys, checked);
        } else {
          // 改变子节点的值时，也需父节点的状态
          this.handleChangeItem2(item);
        }
      });
    },

    // 暴露给父组件获取已勾选的数据的方法
    getCheckedKeys() {
      const list = this.getAllCheckedKeys(this.list);
      return list;
    },
    // 暴露给父组件获取半勾选的数据的方法
    getHalfCheckedKeys() {
      const list = this.getAllCheckedKeys(this.list, "indeterminate");
      return list;
    },
    // 暴露给父组件通过 keys 设置目前勾选的节点
    setCheckedKeys(keys, checked = true) {
      this.setAllCheckedKeys(this.list, keys, checked);
    },
    // 暴露给父组件获取“新国家或地区”的值
    getNewAreaCheck() {
      return this.newArea;
    },
    // 暴露给父组件设置“新国家或地区”的值
    setNewAreaCheck(value) {
      this.newArea = value;
    },
  },
  watch: {
    selectList(keys) {
      if (this.list.length !== 0 && keys.length !== 0) {
        this.setCheckedKeys(keys);
      }
    },
    list(list) {
      this.currentArea = (list[0] || {})[this.keyCode] || "";
      if (this.selectList.length !== 0 && list.length !== 0) {
        this.setCheckedKeys(this.selectList);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.area-list {
  width: 500px;
  position: relative;
  .list-top,
  list-bottom {
    height: 30px;
    line-height: 30px;
  }
  .list-center {
    display: flex;
    height: 300px;
    .center-left {
      width: 35%;
      height: 100%;
      overflow: auto;
    }
    .center-right {
      width: 60%;
      height: 100%;
      overflow: auto;
    }
  }
  .checkbox-item {
    padding: 0px 5px;
    display: block;
  }
  .select-item {
    background: #eee;
  }
}
</style>
