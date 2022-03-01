<template>
  <el-dialog
    :title="type === 'add' ? '新增干预' : '编辑干预'"
    :visible.sync="dialogVisible"
    width="30%"
    center
  >
    <el-form label-width="auto">
      <el-form-item label="手机型号：" required>
        <div class="Languagelist">
          <el-select
            :disabled="type === 'edit'"
            v-model="form.channelId"
            placeholder="请选择型号"
            @change="changedeviceName"
          >
            <el-option
              :label="i.deviceName"
              :value="i.deviceName"
              v-for="i in deviceList"
              :key="i.id"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="关键词：" required>
        <el-input
          v-model.trim="form.keyword"
          placeholder="请输入关键词"
        ></el-input>
      </el-form-item>
      <el-form-item label="版位：" required>
        <el-radio v-model="form.keywordType" :label="2">搜索联想</el-radio>
        <el-radio v-model="form.keywordType" :label="1">搜索结果</el-radio>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addKeywordConfig, updateKeywordConfig } from "@/api/searchIntervene";
import { mapGetters } from "vuex";
export default {
  props: { isShow: Boolean, row: Object, type: String },
  computed: {
    ...mapGetters(["deviceList"]),
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
      if (val && this.row) {
        this.form = { ...this.row };
      } else {
        this.form = this.$options.data().form;
      }
    },
  },
  data() {
    return {
      keywordType: 1,
      form: {
        channelId: "",
        keyword: "",
        keywordType: 1,
      },
    };
  },
  created() {
    this.$store.dispatch("updateDeviceList");
  },
  methods: {
    fetchList() {},
    changedeviceName(val) {
      // let deviceName = this.deviceList.find((item) => {
      //   return item.id == val;
      // });
      // this.form.deviceName = deviceName.deviceName;
    },
    save() {
      if (!this.form.channelId) {
        this.$message.warning("请选择型号");
        return;
      }
      if (!this.form.keyword) {
        this.$message.warning("请输入关键词");
        return;
      }
      // this.form.deviceName = this.deviceList.find(
      //   (d) => d.id === this.form.channelId
      // ).deviceName;
      if (this.type === "edit") {
        updateKeywordConfig(this.form).then((res) => {
          this.$message.success("编辑成功");
          this.dialogVisible = false;
          this.$parent.getDataList();
        });
      } else {
        addKeywordConfig(this.form).then((res) => {
          this.$message.success("新增成功");
          this.dialogVisible = false;
          this.$parent.getDataList();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
