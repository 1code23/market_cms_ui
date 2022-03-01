<template>
  <el-table
    :data="marketList"
    @selection-change="handleSelectionChange"
    max-height="400"
  >
    <el-table-column type="selection" width="55px"></el-table-column>
    <el-table-column prop="marketId" label="市场ID"></el-table-column>
    <el-table-column prop="marketName" label="市场名称"></el-table-column>
    <el-table-column prop="versionCode" label="市场版本"></el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    marketList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
    },
  },
};
</script>
