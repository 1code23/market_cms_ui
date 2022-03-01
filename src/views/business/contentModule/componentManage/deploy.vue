<template>
  <div class="deploy">
    <div
      style="border-bottom: 1px solid #eeeeee; margin-bottom: 20px"
      class="header"
    >
      <el-descriptions :column="4" size="medium">
        <el-descriptions-item label="组件ID">{{
          form.assemblyId
        }}</el-descriptions-item>
        <el-descriptions-item label="组件名称">{{
          form.assemblyName
        }}</el-descriptions-item>
        <el-descriptions-item label="组件样式">{{
          assemblyStyleItem.styleName
        }}</el-descriptions-item>
        <el-descriptions-item v-if="form.assemblyType != 25" label="部署数量"
          >{{ form.num }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div id="bu-shu" class="content">
      <div class="c-l">
        <h4>部署资源</h4>
        <div class="tab-nav" v-if="tabNavShow">
          <div
            class="nav"
            :class="{ active: activeName === 1 }"
            @click="activeName = 1"
          >
            应用
          </div>
          <div
            class="nav"
            :class="{ active: activeName === 2 }"
            @click="activeName = 2"
          >
            页面
          </div>
        </div>
        <DeployResource
          v-if="loading"
          v-show="activeName === 1"
          groupName="drag"
          :otherSearchShow="deployType == 23"
          @change="deployListChange"
          ref="deploy-resource"
        />
        <DeployPage
          v-if="loading && deployType == 23"
          v-show="activeName === 2"
          groupName="drag"
          ref="deploy-resource-page"
        />
      </div>
      <div class="c-r">
        <h4>部署内容</h4>
        <!-- 列表展示内容 -->
        <div v-if="deployType == 25">
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
            <div
              v-for="(item, index) in dragList"
              :key="index"
              class="tag"
              style="margin-bottom: 10px !important"
            >
              <div
                class="t-l"
                @click.stop="handleClickIndex(item, index, true)"
              >
                <!-- <img :src="item.iconUrl" alt="" /> -->
                {{ index + 1 }}
                <el-input
                  id="sortNumber"
                  v-if="item.showInput"
                  class="sort-number"
                  v-model="sortNumber"
                  @keydown.native.enter="handleEnterIndex(item, index)"
                  @blur="handleBlurIndex(item, index)"
                ></el-input>
              </div>
              <div class="t-r">
                <!-- <p>APPID:{{ item.id }}</p>
              <p>应用名称:{{ item.id }}</p>
              <p>包名:{{ item.id }}</p> -->
                <p>{{ item.apkName }}</p>
                <p>{{ item.packageName }}</p>
              </div>
              <span class="delete" @click="toDelete(item, index)">
                <i class="el-icon-delete"></i>
              </span>
            </div>
          </draggable>
          <el-row type="flex" justify="end" style="margin-top: 20px">
            <el-button type="primary" @click="save()">保存配置</el-button>
            <el-button @click="toDeleteAll()">一键清空</el-button>
          </el-row>
        </div>
        <div v-else class="editor-msg">
          <div class="content">
            <div class="msg">
              <p class="title">语言</p>
              <el-select
                v-model="selectLanguageType"
                size="small"
                placeholder="请选择类型"
              >
                <el-option
                  :label="item.languageName"
                  :value="item.language"
                  v-for="item in languageList"
                  :key="item.language"
                >
                </el-option>
              </el-select>
            </div>
            <div
              class="block"
              v-for="(item, blockIndex) in selectEphemeralData.list"
              :key="blockIndex"
            >
              <div class="msg">
                <p class="title">位置{{ blockIndex + 1 }}:</p>
              </div>
              <div class="msg">
                <p class="title">部署图片</p>
                <!-- :limSize="2"
                  :limWidth="450"
                  :limHeight="800"
                  :acceptType="['png', 'jpg', 'jpeg']"
                  @success="uploadImgSuccess($event, blockIndex)"
                   -->
                <UploadImg
                  :limSize="2"
                  v-model="item.hdImageUrl"
                  :limWidth="Number(assemblyStyleItem.width)"
                  :limHeight="Number(assemblyStyleItem.height)"
                  :imgSize="assemblyStyleItem.size"
                  :acceptType="['png', 'jpg', 'jpeg']"
                  @success="(file) => uploadImgSuccess(file, blockIndex)"
                >
                  <p slot="hint" class="hint">
                    大小：2MB以内；尺寸：{{
                      assemblyStyleItem.size
                    }}；格式：PNG,JPG,JPEG
                  </p>
                </UploadImg>
              </div>
              <div class="msg">
                <p class="title">部署内容</p>
                <el-radio-group
                  v-if="deployType != 28"
                  v-model="item.radio"
                  @change="radioChange($event, blockIndex)"
                >
                  <el-radio label="1">应用/页面</el-radio>
                  <el-radio label="2">外部链接</el-radio>
                </el-radio-group>
              </div>
              <div class="msg">
                <draggable
                  v-if="item.radio === '1'"
                  :list="item.dragList"
                  class="msg_drag"
                  :class="{ onlyYY: deployType == 28 }"
                  group="drag"
                  ghost-class="ghost"
                  chosen-class="chosen"
                  @change="msgDragChange($event, blockIndex)"
                >
                  <div
                    v-for="(item, index) in item.dragList"
                    :key="index"
                    class="tag"
                  >
                    <div class="item">
                      <!-- <p>id:{{ item.id }}</p> -->
                      <!-- <p>我是{{ item.type === "yy" ? "应用" : "页面" }}</p> -->
                      <!-- <p v-if="item.apkName">{{ item.apkName }}</p> -->
                      <div class="app" v-if="item.apkName">
                        <div class="img">
                          <img :src="item.iconUrl" alt="" />
                        </div>
                        <div>
                          <p>{{ item.apkId }}</p>
                          <p>{{ item.apkName }}</p>
                          <p>{{ item.packageName }}</p>
                        </div>
                      </div>
                      <p
                        v-if="item.pageName"
                        style="text-align: center; width: 100%"
                      >
                        {{ item.pageName }}
                      </p>
                    </div>
                    <span
                      class="delete"
                      @click="toDelete(item, index, blockIndex)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </div>
                </draggable>
                <el-input
                  v-else
                  placeholder="请输入外部链接"
                  v-model="item.linkUrl"
                >
                  <template slot="prepend">https://</template>
                </el-input>
              </div>
              <div class="msg" v-if="deployType == 28">
                <p class="title">视频链接</p>
                <el-input
                  placeholder="请输入外部链接或上传视频"
                  v-model="item.videoUrl"
                >
                  <UploadFile
                    :acceptType="['mov', 'mp4']"
                    @success="uploadSuccessVideo($event, blockIndex)"
                    :limSize="500"
                    slot="append"
                  >
                    <span slot="text">上传视频</span>
                  </UploadFile>
                </el-input>
              </div>
              <div class="msg">
                <div style="margin-bottom: 10px">
                  <el-input
                    v-model="item.pageName"
                    :placeholder="
                      form.assemblyStyle != 2 ? '请输入主标题' : '请输入名称'
                    "
                  />
                </div>
                <el-input
                  v-if="form.assemblyStyle != 2"
                  v-model="item.imageDesc"
                  placeholder="请输入副标题"
                />
              </div>
            </div>
          </div>
          <el-row type="flex" justify="end" class="saveBtn">
            <el-button v-has="'save'" type="primary" @click="save()"
              >保存配置</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Base64 } from "js-base64";
import draggable from "vuedraggable";
import UploadImg from "@/components/UploadImg";
import DeployResource from "@/components/DeployResource";
import DeployPage from "@/components/DeployResource/deployPage";
import languageEphemeralMixins from "./mixins/languageEphemeralMixins";
import changeSortNumberMixins from "./mixins/changeSortNumberMixins";
import {
  insertApkList,
  queryApkListByAssemblyId,
  queryAssemblyPageList,
  queryAssemblyDetail,
} from "@/api/componentManage.js";
import { mapGetters } from "vuex";
import { asseblyStyleArr } from "@/common/constant/constant.js";
import UploadFile from "@/components/UploadFile";
export default {
  name: "ComponentManageDeploy",
  components: {
    draggable,
    UploadImg,
    DeployResource,
    DeployPage,
    UploadFile,
  },
  mixins: [languageEphemeralMixins, changeSortNumberMixins],
  computed: {
    ...mapGetters(["assemblyStyleList"]),
  },
  watch: {
    "form.assemblyStyle"(val) {
      let item =
        asseblyStyleArr.find((a) => a.assemblyStyle === Number(val)) || {};
      if (item.size) {
        item.width = item.size.split("*")[0];
        item.height = item.size.split("*")[1];
      }
      this.assemblyStyleItem = item;
    },
  },
  data() {
    return {
      loading: false,
      tabNavShow: false,
      deployType: "", // 部署类型 图片 视频 列表
      activeName: 1,
      assemblyStyleItem: {}, // 获取组件样式的某一个数据
      form: {
        assemblyType: "",
        assemblyId: "",
        assemblyName: "",
        styleName: "",
        num: "",
      },
      dragList: [], // 用于列表
    };
  },
  async created() {
    await this.$store.dispatch("updateAssemblyStyleList");
    const { assemblyId, assemblyType, assemblyStyle } = this.$route.params;
    const assemblyDetail = (
      (await queryAssemblyDetail({
        assemblyId: assemblyId,
      })) || {}
    ).data;
    this.form = {
      assemblyId,
      assemblyType,
      assemblyStyle: assemblyStyle,
      num: assemblyDetail.num,
      assemblyName: assemblyDetail.assemblyName,
    };
    this.deployType = assemblyType;
    this.loading = true;
    // 23图片
    // 25列表
    // 28视频
    if (this.deployType == 23) {
      this.tabNavShow = true;
    }
    //初始化数据
    if (this.deployType == 23 || this.deployType == 28) {
      this.init();
    } else {
      queryApkListByAssemblyId({ assemblyId: assemblyId }).then((res) => {
        this.dragList = res.data;
      });
    }
  },
  beforeDestroy() {
    // this.tabNavShow = false;
    //列表时，离开页面重置禁止拖着样式
    if (this.deployType == 25) {
      this.loading = false;
      this.dragList = [];
      this.$refs["deploy-resource"].dragList.forEach((item) => {
        this.$set(item, "notDrag", false);
      });
    }
  },
  methods: {
    async init() {
      await this.getLanguageList();
      queryAssemblyPageList({ assemblyId: this.form.assemblyId }).then(
        (res) => {
          // const data = [
          //   {
          //     language: "ru",
          //     languageName: "俄文",
          //     assemblyId: "2596",
          //     linkType: 0,
          //     list: [
          //       {
          //         hdImageUrl:
          //           "https://obs-hihonor-appmarket-test.obs.cn-north1.ctyun.cn:443/honor/images/1ac401eddc4c4b4d9a67801ff154d879.jpg",
          //         imageName: "user.jpg",
          //         linkUrl: "",
          //         dragList: [
          //           {
          //             apkId: 49,
          //             apkName: "狙击行动：枪战游戏",
          //             iconUrl:
          //               "http://18.177.149.123:8001/pic/img/com.fungames.sniper3d/eBrOZq-6-3eb4nDVQewryfhfluDKB3UGMOIN6QQOycDrP4ogZkrgr6zPWunojbrifso",
          //             packageName: "com.fungames.sniper3d",
          //           },
          //         ],
          //         pageName: "111111111111",
          //         imageDesc: "111111",
          //       },
          //     ],
          //   },
          //   {
          //     language: "zh_cn",
          //     languageName: "中文",
          //     assemblyId: "2596",
          //     linkType: 0,
          //     list: [
          //       {
          //         hdImageUrl: "",
          //         imageName: "",
          //         linkUrl: "www.baidu.com",
          //         dragList: [],
          //         pageName: "",
          //         imageDesc: "",
          //       },
          //     ],
          //   },
          // ];
          const data = res.data.list || [];
          if (!data.length) {
            return;
          }
          // 根据后端查询的数据对比回显到对应的数据位置内
          this.ephemeralData.map((item) => {
            let list =
              (data.find((d) => d.language === item.language) || {}).list || [];
            //因为部署数量是根据前端生成，所以在改变部署数量时，前端只会根据前端数据结构去和后端数据匹配
            item.list.map((l, indexL) => {
              if (list[indexL]) {
                if (list[indexL].linkUrl) {
                  list[indexL].radio = "2";
                }
                if (!list[indexL].linkUrl) {
                  list[indexL].radio = "1";
                }
                //在未部署应用时，后端回显不会返回 dragList字段，因此需要前端默认添加，否则会报错
                if (!list[indexL].dragList) {
                  list[indexL].dragList = [];
                }
                this.$set(item.list, indexL, list[indexL]);
              }
            });
            return item;
          });
          // this.ephemeralData = [...data];
        }
      );
    },
    // 左侧列表发生改变更新数据 -- 列表
    deployListChange(arr) {
      if (this.deployType == 25) {
        setTimeout(() => {
          this.dragList.map((item) => {
            arr.forEach((l) => {
              if (l.apkId === item.apkId) {
                this.$set(l, "notDrag", true);
              }
            });
          });
        }, 0);
      }
    },
    // 右侧拖拽发生改变 --- 列表
    dragChange(row) {
      if (row.added) {
        const { element } = row.added;
        this.handleNotDragClass(element, true);
      }
    },
    // 右侧拖拽发生改变 --- 图片/视频
    msgDragChange(row, blockIndex) {
      if (row.added) {
        const { element } = row.added;
        // 拖拽列表只允许有一个
        this.selectEphemeralData.list[blockIndex].dragList = [element];
      }
    },
    // 删除右侧部署内容
    toDelete(row, index, blockIndex) {
      if (blockIndex !== undefined) {
        this.selectEphemeralData.list[blockIndex].dragList = [];
      } else {
        // 列表删除
        this.dragList.splice(index, 1);
        this.handleNotDragClass(row, false);
      }
    },
    toDeleteAll() {
      this.dragList.map((row) => {
        this.handleNotDragClass(row, false);
      });
      this.dragList = [];
    },
    //处理 .notDrag 类名的添加，实现左侧列表选项的是否禁用
    handleNotDragClass(row, type) {
      this.$refs["deploy-resource"].dragList.forEach((item) => {
        if (row.apkId === item.apkId) {
          this.$set(item, "notDrag", type);
        }
      });
    },
    // 保存
    save() {
      // console.log(this.ephemeralData);
      //列表保存,部署类型:0-页面，1-应用，6-视频
      // 1-应用 --- 后端把列表理解成了列表
      if (this.deployType == 25) {
        let arr = [];
        if (this.dragList.length) {
          arr = this.dragList.map((item, index) => {
            item.linkType = 7;
            item.sequence = index;
            item.assemblyId = this.form.assemblyId;
            return item;
          });
        } else {
          //在传空数组时，后端(徐鹏)要求塞一个空值，否则报错。和角标部署类似 ---- swx
          arr = [{ assemblyId: this.form.assemblyId, apkId: "", linkType: 7 }];
        }
        insertApkList(arr).then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.userToLeave();
          }
        });
      } else {
        const warningMsg = this.handleData();
        if (warningMsg) {
          this.$message.warning(warningMsg);
          return false;
        }
        insertApkList(this.ephemeralData).then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.userToLeave();
          }
        });
      }
      // this.$parent.getDataList();
    },
    // 用户离开页面时清除页面
    userToLeave() {
      const deleteIndex = this.$store.state.historyMenuItemList.findIndex(
        (i) => i.path === this.$route.path
      );
      this.$store.commit("deleteHistoryMenu", deleteIndex);
      this.$router.go(-1);
    },
  },
  beforeRouteLeave(to, form, next) {
    next();
    // this.$confirm("离开后编辑的内容将不做保存，是否继续?", "提示", {
    //   confirmButtonText: "确定",
    //   cancelButtonText: "取消",
    //   type: "warning",
    // })
    //   .then(() => {
    //     next();
    //   })
    //   .catch(() => {
    //     next(false);
    //   });
  },
};
</script>
<style lang="scss">
.deploy {
  .editor-msg {
    .list-group-item {
      opacity: 0;
    }
  }
  .t-l {
    position: relative;
    .sort-number {
      // width: 50px;
      position: absolute;
      z-index: 5;
      .el-input__inner {
        padding: 0;
        text-align: center;
        // background: #eeeeee;
        top: 0;
        font-weight: bold;
        border: none;
        border: 1px dashed #ccc;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.deploy {
  position: relative;
  h4 {
    font-size: 15px;
  }
}
.tab-nav {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #eeeeee;
  .nav {
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    &.active {
      background: #409eff;
      color: white;
    }
  }
}
.header {
  // padding-top: 10px;
  position: sticky;
  top: -10px;
  align-self: start;
  background: white;
  z-index: 9;
  margin-top: -10px;
  box-shadow: 0 -10px white;
}
.c-l {
  position: sticky;
  top: 45px;
  align-self: start;
  width: 100%;
}
.c-r {
  min-width: 40% !important;
  // height: 100% !important;
  .tag {
    margin-bottom: 0 !important;
    min-height: 80px;
    .item {
      width: 100%;
      .app {
        display: flex;
        .img {
          width: 55px;
          height: 55px;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        p {
          margin-bottom: 5px;
        }
      }
    }
    .delete {
      min-width: 10px;
    }
  }
  .hint {
    font-size: 13px;
    color: #ccc;
  }
}
.editor-msg {
  border-left: 1px solid #eeeeee;
  padding: 20px;
  padding-left: 30px;
  box-sizing: border-box;
  .saveBtn {
    position: fixed;
    bottom: 0px;
    width: 100%;
    left: -45px;
    background: white;
    padding: 10px 0;
  }
  .block {
    border: 1px dashed #eeeeee;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
    position: relative;
    &:hover {
      border: 1px dashed #409eff;
    }
  }
  .msg {
    margin-bottom: 20px;
    &.bt {
      // border: 2px dashed #ccc;
      padding: 10px;
      box-sizing: border-box;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .hint {
      font-size: 12px;
      color: #cccccc;
      margin: 10px 0;
    }
    .msg_drag {
      height: 105px;
      max-height: 150px;
      overflow-y: auto;
      overflow-x: hidden;
      border: 2px dashed #67c23a;
      padding: 10px;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      background: url("~@/assets/images/market-app-page.png");
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;
      &.onlyYY {
        background: url("~@/assets/images/market-app.png");
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
      }
    }
  }
}
</style>
