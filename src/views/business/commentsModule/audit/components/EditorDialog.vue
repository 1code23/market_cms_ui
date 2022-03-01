<template>
  <el-dialog
    :title="'评论详情'"
    :visible.sync="dialogVisible"
    width="700px"
    center
  >
    <el-descriptions :column="2" border>
      <el-descriptions-item label="审核状态">
        <el-tag type="info" v-if="form.auditStatus === 2">已拒绝</el-tag>
        <el-tag type="success" v-if="form.auditStatus === 1">已通过</el-tag>
        <el-tag v-if="form.auditStatus === 0">待审核</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="评论内容">{{
        form.commentContent
      }}</el-descriptions-item>

      <el-descriptions-item label="评论时间">{{
        form.createTime
      }}</el-descriptions-item>
      <el-descriptions-item label="评论者">{{
        form.nickname
      }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      v-if="form.lastCommentVo"
      style="margin-top: 20px"
      title="上级评论"
      :column="2"
      border
    >
      <el-descriptions-item label="评论时间"
        >{{ form.lastCommentVo.createTime }}
      </el-descriptions-item>
      <el-descriptions-item label="评论者">{{
        form.lastCommentVo.coverNickname
      }}</el-descriptions-item>
      <el-descriptions-item label="评论内容">{{
        form.lastCommentVo.commentContent
      }}</el-descriptions-item>
    </el-descriptions>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
import { queryDetails } from "@/api/commentsModule";
export default {
  props: { isShow: Boolean, row: Object, type: String },
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
        // this.form = { ...this.row };
        this.fetchList();
      } else {
        this.form = this.$options.data().form;
      }
    },
  },
  data() {
    return {
      form: {
        auditStatus: "",
        commentContent: "",
        createTime: null,
        coverNickname: "",
        parentId: null,
        lastCommentVo: "",
      },
    };
  },
  methods: {
    fetchList() {
      queryDetails({
        commentId: this.row.commentId,
        parentId: this.row.parentId,
      }).then((res) => {
        this.form = res.data;
      });
    },
    save() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
