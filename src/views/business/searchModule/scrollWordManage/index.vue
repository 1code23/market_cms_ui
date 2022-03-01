<template>
  <div class="scrollWordManage">
    <el-button
      size="small"
      type="primary"
      icon="el-icon-plus"
      v-has="'add'"
      @click="Addscroll('add')"
      style="margin-bottom: 20px"
      >新增</el-button
    >
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-suffix=":"
    >
      <el-form-item label="标题">
        <el-input
          v-model="formInline.deviceName"
          placeholder="请输入词语查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch()"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <PageTable
      :columns="modelTabelHead"
      :tableData="modelTabelList"
      @page-change="handleChangePage"
    >
      <el-table-column label="序号" align="center" slot="prefix">
        <template slot-scope="scope"
          ><span> {{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <template slot-scope="{ row }" slot="status">
        <span :class="row.status == 0 ? 'colorRed' : 'colorGreen'">{{
          row.status | typeDesc(onlineStartus)
        }}</span>
      </template>
      <el-table-column label="操作" width="255px" align="center">
        <template slot-scope="{ row }">
          <!-- handleAdd -->
          <el-button
            type="text"
            v-has="'deploy'"
            @click="handleAdd('configurationBtn', row)"
          >
            <span style="color: 'red'">配置词语</span>
          </el-button>
          <el-button type="text" v-has="'edit'" @click="handleAdd('edit', row)">
            <span style="color: 'red'">编辑</span>
          </el-button>
          <el-button
            type="text"
            v-has="'language'"
            @click="handleAdd('internationalizationBtn', row)"
          >
            <span style="color: 'red'">国际化</span>
          </el-button>
          <el-button type="text" @click="open(row)" v-has="'onOff'"
            ><span :class="[row.status == 1 ? 'colorRed' : 'colorGreen']">{{
              row.status == 1 ? "下线" : "上线"
            }}</span></el-button
          >
        </template>
      </el-table-column></PageTable
    >
    <!-- 新增 -->
    <el-dialog
      :title="dialogName"
      :visible.sync="showAddinterveneData"
      append-to-body
      width="30%"
      center
    >
      <addIntervene
        @closedialog="closedialog"
        @creadInit="creadInit"
        :operationType="operationType"
        :AddinterveneData="AddinterveneData"
        :moduleDataList="moduleDataList"
      ></addIntervene>
    </el-dialog>
    <!-- 配置词语  append-to-body -->
    <el-dialog
      title="配置词语"
      :visible.sync="showAllocationData"
      width="50%"
      center
      id="allocationData"
    >
      <el-row>
        <el-col :span="24"
          ><el-button
            type="primary"
            @click="addwords"
            v-has="'deployAddDelete'"
            icon="el-icon-plus"
            size="small"
            >添加词语</el-button
          ></el-col
        >
      </el-row>
      <el-form
        :model="wordsruleForm"
        :rules="wordsrules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="滚动词"
          required
          :inline="true"
          v-for="(item, index) in wordsruleFormList"
          :key="index"
        >
          <div style="display: flex">
            <div style="width: 50%; margin-right: 20px; height: 100%">
              <el-input
                v-model="item.word"
                placeholder="请输入滚动词"
                width="70%"
                prop="word"
              ></el-input>
            </div>
            <span
              @click="deleteWord(index)"
              class="colorRed"
              style="cursor: pointer"
              >删除</span
            >
          </div>
        </el-form-item>

        <div class="footerBtn">
          <el-button type="primary" @click="submitAllocationData('ruleForm')"
            >确定</el-button
          >
          <el-button @click="cancelAllocationData">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 滚动词国际化 -->
    <el-dialog
      title="滚动词国际化"
      :visible.sync="showinterData"
      width="50%"
      center
      id="interDi"
    >
      <!-- append-to-body -->
      <internationalList
        :ScrollWorldList="ScrollWorldList"
        :worldId="worldId"
        @getInterScrollList="getInterScrollLists"
        @deleteInternation="deleteInternation"
      ></internationalList>
    </el-dialog>
  </div>
</template>
<script>
import PageTable from "@/components/PageTable.vue";
import addIntervene from "./components/addIntervene.vue";
import internationalList from "./components/interData.vue";
import {
  getmodelData,
  getScrollWordData,
  amendModelData,
  allocationScrollWorld,
  getScrollWorld,
  getInternationalizationList,
  deleteInternationalizationList,
} from "./api.js";
import {
  enabledStatusList, //状态
  onlineStartus,
} from "@/common/constant/constant.js";
export default {
  name: "scrollWordManage",
  components: {
    PageTable,
    internationalList,
    addIntervene,
  },

  mounted() {
    this.init();
  },
  data() {
    return {
      ruleForm: {},
      showinterData: false, //热词国际化弹窗
      showAddLanguageData: false, //添加语言弹窗
      showAddinterveneData: false, //新增弹窗
      showAllocationData: false, //配置词语弹窗
      AddinterveneData: {}, //列表中的行数据（新增）
      operationType: "", //按钮类型
      wordsruleForm: {},
      wordsruleFormList: [], //添加词语list
      interwordsruleFormList: [], //添加国际化词语list
      enabledStatusList, //状态
      onlineStartus,
      moduleDataList: [], //机型列表
      worldId: "", //配置词语ID
      languageName: "", //选择的语言类型
      ScrollWorldList: {}, //滚动词国际化弹窗里面的列表
      showdialogVisibles: false,
      dialogVisibles: false,
      formInline: { deviceName: "" },
      dialogVisible: false,
      recover: false,
      dialogName: "新增",
      modelTabelHead: [
        { key: "channelId", label: "手机型号", align: "center" },
        // { key: "customerId", label: "手机型号", align: "center" },
        // { key: "deviceName", label: "手机型号", align: "center" },
        { key: "title", label: "标题", align: "center" },
        { slot: "status", label: "状态", align: "center" },
        { key: "createTime", label: "创建时间", align: "center" },
        { key: "updateTime", label: "修改时间", align: "center" },
      ],
      modelTabelList: {
        total: 0,
        page: 1,
        size: 10,
        list: [],
      }, //机型列表表格数据
      wordsrules: {
        wordsruleFormList: {
          word: [{ required: true, message: "请选择语言", trigger: "blur" }],
        },
      },
      rules: {
        region: [{ required: true, message: "请选择语言", trigger: "blur" }],
        title: [{ required: true, message: "请输入关键词", trigger: "blur" }],
      },
      region: [],
    };
  },
  watch: {
    ScrollWorldList: {
      handler(newData, oldData) {
        this.ScrollWorldList = newData;
      },
      deep: true,
    },
  },
  methods: {
    deleteInternation(val) {
      deleteInternationalizationList({ ids: val }).then((res) => {
        if (res.code == 0) {
          this.InternationalizationList();
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //搜索
    handleSearch() {
      this.getTableList({ page: 1 });
    },
    dialogVisibless() {
      this.showdialogVisibles = true;
    },
    dialogclose(val, val2) {
      this.showdialogVisibles = val;
    },
    init() {
      // const { page, size, total } = this.modelTabelList;
      // this.getTableList({ page, size, total }); //获取滚动词列表
      this.getTableList(); //获取滚动词列表
      this.getmodelList(); //获取机型数据列表
    },
    creadInit() {
      this.showAddinterveneData = false;
      this.init();
    },
    getscrollWordList(params) {
      getScrollWorld({ parentId: params }).then((res) => {
        if (res && res.code == 0) {
          this.interwordsruleFormList = res.data;
          this.wordsruleFormList = res.data;
        }
      });
    },
    getInterScrollLists(val) {
      this.ScrollWorldList.list = val.list;
      this.ScrollWorldList.total = val.total;
      this.ScrollWorldList.page = val.page;
    },
    Addscroll() {
      this.dialogName = "新增";
      this.operationType = "add";
      this.AddinterveneData = {};
      this.showAddinterveneData = true;
    },
    // 新增按钮
    handleAdd(operationType, row) {
      this.operationType = operationType;
      this.worldId = row.id; //新增词语时用到
      if (operationType === "add") {
        this.dialogName = "新增";
        this.AddinterveneData = {};
        this.showAddinterveneData = true;
      } else if (operationType === "edit") {
        this.AddinterveneData = { ...row };
        this.dialogName = "编辑";
        this.showAddinterveneData = true;
      } else if (operationType === "internationalizationBtn") {
        getScrollWorld({ parentId: row.id }).then((res) => {
          if (res && res.code == 0) {
            if (res.data.length == 0) {
              this.$message.error("请先配置词语");
            } else {
              this.worldId = row.id; //新增词语时用到
              this.InternationalizationList();
              this.showinterData = true;
            }
          }
        });
        //国际化
        // this.showinterData = true;
        // this.worldId = row.id; //新增词语时用到
        // this.InternationalizationList();
      } else if (operationType === "configurationBtn") {
        //配置词语
        this.showAllocationData = true;
        this.getscrollWordList(row.id); //获取滚动词列表
      }
    },
    getTableList(params) {
      const data = {
        page: this.modelTabelList.page,
        size: this.modelTabelList.size,
        type: 1,
        ...this.formInline,
        ...params,
      };
      getScrollWordData(data).then((res) => {
        if (res && res.code === 0) {
          this.modelTabelList.list = res.data.list;
          this.modelTabelList.total = res.data.total;
        }
      });
    },
    handleChangePage({ page, size }) {
      this.modelTabelList.page = page;
      this.modelTabelList.size = size;
      this.getTableList({ page, size });
    },
    //添加词语按钮
    addwords() {
      this.wordsruleFormList.push({
        createTime: "",
        parentId: this.worldId,
        hot: "0",
        id: "0",
      });
    },

    // 配置词语删除按钮
    deleteWord(val) {
      this.wordsruleFormList.splice(val, 1);
    },
    open(row) {
      this.$confirm(`您确定${row.status == 1 ? "下线" : "上线"}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          amendModelData({
            status: row.status == 0 ? 1 : 0, //发布状态(1:上架0:下架)
            id: row.id,
          }).then((res) => {
            if (res && res.code == 0) {
              this.$message.success(res.msg);
              this.getTableList({
                ...this.formInline,
                page: this.modelTabelList.page,
                size: this.modelTabelList.size,
              });
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: `已取消${row.status == 1 ? "下线" : "上线"}`,
          // });
        });
    },
    //获取机型
    getmodelList() {
      getmodelData({ deviceName: "", size: 1000 }).then((res) => {
        if (res && res.code == 0) {
          this.moduleDataList = [];
          res.data.list.forEach((item) => {
            this.moduleDataList.push(item);
          });
        }
      });
    },
    async changeStatus(params) {
      const res = await this.amendModelData(params);
      // const res = await this.getTableList(params);
      this.$message.success(res.msg);
      // const res = await changeStatus(params);
      // if (res && res.code === 0) {
      //   this.getTableList({
      //     page: this.tableData.page,
      //     size: this.tableData.size,
      //   }); // 成功后刷新列表
      //   this.$message.success(res.msg);
      // }
    },
    // 后端请求
    // 获取列表
    // async getTableList(params, isDownload) {
    //   const data = {
    //     page: 1,
    //     size: 10,
    //     ...this.searchData,
    //     ...params,
    //   };
    //   if (data.date && data.date.length !== 0) {
    //     data.startTime = data.date[0];
    //     data.endTime = data.date[1];
    //   }
    //   if (this.serachKeyword) {
    //     data.chooseType = this.serachKeywordCode;
    //     data.keyword = this.serachKeyword;
    //   }
    //   const res = await getApkList(data);
    //   if (res) {
    //     // 下载时，不需要更新到table
    //     if (!isDownload) {
    //       this.tableData = res.data;
    //     }
    //     return res.data;
    //   }
    // },
    closedialog(val1, val2) {
      if (val2) {
        this.showAddinterveneData = val1;
      }
      this.showAddinterveneData = val1;
    },
    //添加语言弹窗取消按钮
    cancelAllocationData() {
      this.showAllocationData = false;
      this.wordsruleFormList = [];
    },
    //添加语言弹窗提交按钮
    submitAllocationData(ruleForm) {
      let flg = false;
      this.wordsruleFormList.forEach((item) => {
        if (!item.word) {
          flg = true;
        }
      });
      if (flg) {
        this.$message.error("请将信息填写完整");
      } else {
        allocationScrollWorld({
          ozSearchWordConfDetails: this.wordsruleFormList,
          parentId: this.worldId,
        }).then((res) => {
          if (res && res.code == 0) {
            this.$message.success(res.msg);
            this.showAllocationData = false;
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    // 查询滚动词国际化
    InternationalizationList() {
      getInternationalizationList({ id: this.worldId, page: 1, size: 10 }).then(
        (res) => {
          if (res && res.code === 0) {
            // if (res.data != "") {
            this.$set(this.ScrollWorldList, "list", res.data.list);
            this.$set(this.ScrollWorldList, "total", res.data.total);
            // this.ScrollWorldList.list = res.data;
            // }
            // this.dialogVisible = false;
            // this.recover = false;
            // this.getTableList(this.formInline);
          }
        }
      );
    },
  },
  activated() {
    //每次进入页面请求数据
    this.getmodelList(); //获取机型数据列表
  },
};
</script>
<style lang="scss" scoped>
.footerBtn {
  // margin-top: 80px;
  display: flex;
  justify-content: flex-end;
}
/deep/ #interDi .el-dialog__body {
  height: 400px;
  overflow: auto;
}
/deep/ #allocationData .el-dialog__body {
  max-height: 400px;
  overflow: auto;
}
</style>
