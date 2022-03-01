import { queryLanguageList } from "@/api/componentManage.js";
// 切换语言时缓存临时数据的混入文件
export default {
  computed: {
    selectLanguageIndex() {
      if (!this.ephemeralData.length) {
        return null;
      }
      return this.ephemeralData.findIndex(
        (item) => item.language === this.selectLanguageType
      );
    },
    //当前选择语言的填写数据
    selectEphemeralData: {
      get() {
        if (!this.ephemeralData[this.selectLanguageIndex]) {
          return [];
        }
        return this.ephemeralData[this.selectLanguageIndex];
      },
      set(val) {
        this.ephemeralData[this.selectLanguageIndex] = { ...val };
      },
    },
    // selectEphemeralDragList:{

    // },
  },
  watch: {
    selectLanguageType(newVal, oldVal) {
      let arr = this.ephemeralData.find((item) => item.language === oldVal);
      if (arr) {
        arr.list.forEach((item, index) => {
          // 解决数据回显切换时，应用被置空的问题
          if (item.dragList.length) {
            this.selectEphemeralData.list[index].dragList = item.dragList;
          }
        });
      }
    },
  },
  data() {
    return {
      selectLanguageType: "",
      ephemeralData: [], // 根据语言生成的临时数据，方便用户切换语言时临时缓存对应数据
      languageList: [], // 语言选项
    };
  },
  methods: {
    /**
     * 后端数据结构
     * [{languageName:'中文',
     * list:[{ imgUrl: "",
        radio: "1",
        pageName: "",
        imageDesc: "",}]},
      {languageName:'英语',list:[]}
      ]
     */
    // 每次进入部署页面会先根据语言和部署量生成数据格式，然后再通过查询接口获取对应数据并赋值
    getLanguageList() {
      return new Promise((resolve, reject) => {
        queryLanguageList({ assemblyId: this.form.assemblyId })
          .then((res) => {
            this.languageList = res.data;
            this.selectLanguageType = this.languageList[0].language;
            this.ephemeralData = this.languageList.map((item) => {
              let obj = {};
              obj.language = item.language;
              obj.languageName = item.languageName;
              obj.assemblyId = this.form.assemblyId;
              obj.linkType = this.deployType == 23 ? 0 : 6; //部署类型:0-页面,6-视频
              // 根据部署数量生成
              obj.list = [];
              for (let i = 0; i < this.form.num; i++) {
                let item = {
                  hdImageUrl: "", // 图片访问路径
                  imageName: "", //图片名称
                  radio: "1", // 应用/页面   外部链接切换
                  videoUrl: "",
                  linkUrl: "", // 外链url地址
                  linkType: "",
                  dragList: [], // 可能为应用或者页面拖拽信息
                  // list: [], // 后端用的时list和dragList一样，暂时都给后端dragList
                  pageName: "", //主标题
                  imageDesc: "", // 副标题
                };
                obj.list.push(item);
              }
              return obj;
            });
            resolve(this.ephemeralData);
          })
          .catch((err) => {
            reject([]);
          });
      });
    },
    // 上传图片赋值
    uploadImgSuccess(res, index) {
      this.ephemeralData[this.selectLanguageIndex].list.map((item, i) => {
        if (i === index) {
          item.hdImageUrl = res.accessPath || "";
          item.imageName = res.fileName || "";
        }
      });
      // this.formImgUrl = res.accessPath || "";
    },
    // 切换部署内容类型时置空对应数据
    radioChange(radio, index) {
      // let item = this.ephemeralData[this.selectLanguageIndex].list[index];
      // if (radio === "1") {
      //   item.linkUrl = "";
      // } else {
      //   item.dragList = [];
      // }
    },
    uploadSuccessVideo(res, index) {
      if (res) {
        const { accessPath } = res;
        // console.log(this.ephemeralData[this.selectLanguageIndex]);
        this.ephemeralData[this.selectLanguageIndex].list[index].videoUrl =
          accessPath;
      }
    },
    //保存的时候处理数据
    handleData() {
      let warningMsg = ""; //用户保存时错误信息提示
      this.ephemeralData.map((ep) => {
        ep.list.map((l, indexL) => {
          //所有语言的应用数据共存
          l.dragList = this.selectEphemeralData.list[indexL].dragList;
          //选中 外部链接时 置空拖拽应用/页面数据
          if (l.radio === "1") {
            l.linkUrl = "";
          } else {
            l.dragList = [];
          }

          if (l.videoUrl) {
            l.linkType = 6;
          }
          if (l.linkUrl) {
            l.linkType = 2;
          }
          if (l.dragList[0]) {
            if (l.dragList[0].apkId) {
              l.linkType = 1;
            } else {
              l.linkType = 0;
            }
          }
          //错误提示
          if (!warningMsg) {
            let warnModule = `${ep.languageName}-位置${indexL + 1}`;
            if (!l.hdImageUrl) {
              warningMsg = `${warnModule}-部署图片不能为空`;
              return;
            }
            if (l.radio === "1" && !l.dragList.length) {
              warningMsg = `${warnModule}-部署内容不能为空`;
              return;
            }
            if (l.radio === "2" && !l.linkUrl) {
              warningMsg = `${warnModule}-外部链接不能为空`;
              return;
            }
            if (this.deployType == 28 && !l.videoUrl) {
              warningMsg = `${warnModule}-视频链接不能为空`;
              return;
            }
          }
          return l;
        });
      });
      return warningMsg;
    },
  },
};
