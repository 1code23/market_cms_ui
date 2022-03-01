import Vue from "vue";
import VueRouter from "vue-router";

//防止重复点击链接报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    name: "sensitiveTaboo",
    path: "/sensitiveTaboo",
    component: () => import("@/views/sensitiveTaboo/index.vue"),
  },
  {
    name: "business",
    path: "/business",
    component: () => import("@/views/index/index.vue"),
    children: [
      {
        path: "/notFound",
        name: "notFound",
        component: () => import("@/views/notFound/index.vue"),
        meta: { toolTip: "404" },
      },
      {
        name: "modelManage",
        path: "channelModule/modelManage",
        component: () =>
          import("@/views/business/channelModule/modelManage/index.vue"),
        meta: { toolTip: "业务管理 > 渠道模块 > 手机型号管理" },
      },
      {
        name: "servicePlaceManage",
        path: "channelModule/servicePlaceManage",
        component: () =>
          import("@/views/business/channelModule/servicePlaceManage/index.vue"),
        meta: { toolTip: "业务管理 > 渠道模块 > 服务地管理" },
      },
      {
        name: "marketManage",
        path: "marketModule/marketManage",
        component: () =>
          import("@/views/business/marketModule/marketManage/index.vue"),
        meta: { toolTip: "业务管理 > 市场管理 > 市场管理" },
      },
      {
        name: "marketDeploy",
        path: "marketModule/marketManage/marketDeploy/:marketId/:marketName",
        component: () =>
          import(
            "@/views/business/marketModule/marketManage/marketDeploy/index.vue"
          ),
        meta: {
          toolTip: "业务管理 > 市场管理 > 市场管理-部署",
          subPage: true,
          propMenu: "/business/marketModule/marketManage", // 所属的菜单路由
        },
      },
      {
        name: "componentDeploy",
        path: "marketModule/marketManage/pageConfig/:pageId",
        component: () =>
          import(
            "@/views/business/marketModule/marketManage/componentDeploy/index.vue"
          ),
        meta: {
          toolTip: "业务管理 > 市场管理 > 市场管理-部署-配置",
          subPage: true,
          propMenu: "/business/marketModule/marketManage", // 所属的菜单路由
        },
      },
      {
        name: "marketRelease",
        path: "marketModule/marketRelease",
        component: () =>
          import("@/views/business/marketModule/marketRelease/index.vue"),
        meta: { toolTip: "业务管理 > 市场管理 > 市场发布" },
      },
      {
        name: "homeConfig",
        path: "marketModule/homeConfig",
        component: () =>
          import("@/views/business/marketModule/homeConfig/index.vue"),
        meta: { toolTip: "业务管理 > 市场管理 > 市场切后台请求" },
      },
      {
        name: "privacyManage",
        path: "marketModule/privacyManage",
        component: () =>
          import("@/views/business/marketModule/privacyManage/index.vue"),
        meta: { toolTip: "业务管理 > 市场管理 > 隐私管理" },
      },
      {
        name: "componentManage",
        path: "contentModule/componentManage",
        component: () =>
          import("@/views/business/contentModule/componentManage/index.vue"),
        meta: { toolTip: "业务管理 > 内容模块 > 组件管理" },
      },
      {
        name: "ComponentManageDeploy",
        path: "contentModule/componentManage/deploy/:assemblyId/:assemblyStyle/:assemblyType",
        component: () =>
          import("@/views/business/contentModule/componentManage/deploy.vue"),
        meta: {
          toolTip: "业务管理 > 内容模块 > 组件管理-部署",
          subPage: true, // 是否为其他菜单下的子页面
          propMenu: "/business/contentModule/componentManage", // 所属的菜单路由
        },
      },
      {
        name: "wishListManage",
        path: "contentModule/wishListManage",
        component: () =>
          import("@/views/business/contentModule/wishListManage/index.vue"),
        meta: { toolTip: "业务管理 > 内容模块 > 心愿单管理" },
      },
      {
        name: "cornerManage",
        path: "contentModule/cornerManage",
        component: () =>
          import("@/views/business/contentModule/cornerManage/index.vue"),
        meta: { toolTip: "业务管理 > 内容模块 > 角标管理" },
      },
      {
        name: "searchIntervene",
        path: "searchModule/searchIntervene",
        component: () =>
          import("@/views/business/searchModule/searchIntervene/index.vue"),
        meta: { toolTip: "业务管理 > 搜索模块 > 搜索干预" },
      },
      {
        name: "scrollWordManage",
        path: "searchModule/scrollWordManage",
        component: () =>
          import("@/views/business/searchModule/scrollWordManage/index.vue"),
        meta: { toolTip: "业务管理 > 搜索模块 > 滚动词管理" },
      },
      {
        name: "hotSearchWordManage",
        path: "searchModule/hotSearchWordManage",
        component: () =>
          import("@/views/business/searchModule/hotSearchWordManage/index.vue"),
        meta: { toolTip: "业务管理 > 搜索模块 > 热搜词管理" },
      },
      {
        name: "testConfiguration",
        path: "applicationModule/testConfiguration",
        component: () =>
          import(
            "@/views/business/applicationModule/testConfiguration/index.vue"
          ),
        meta: { toolTip: "业务管理 > 应用更新 > 应用更新检测配置" },
      },
      {
        name: "systemWhiteList",
        path: "applicationModule/systemWhiteList",
        component: () =>
          import(
            "@/views/business/applicationModule/systemWhiteList/index.vue"
          ),
        meta: { toolTip: "业务管理 > 应用更新 > 系统应用白名单" },
      },
      {
        name: "autoUpdate",
        path: "applicationModule/autoUpdate",
        component: () =>
          import("@/views/business/applicationModule/autoUpdate/index.vue"),
        meta: { toolTip: "业务管理 > 应用更新 > 自动更新应用配置" },
      },
      {
        name: "whiteList",
        path: "applicationModule/whiteList",
        component: () =>
          import("@/views/business/applicationModule/whiteList/index.vue"),
        meta: { toolTip: "业务管理 > 应用更新 > 自动更新白名单" },
      },
      {
        name: "releaseAskDeploy",
        path: "releaseModule/releaseAskDeploy",
        component: () =>
          import("@/views/business/releaseModule/releaseAskDeploy/index.vue"),
        meta: { toolTip: "业务管理 > 版本升级 > 版本升级请求配置" },
      },
      {
        name: "releaseAskDeploy",
        path: "releaseModule/releaseDeploy",
        component: () =>
          import("@/views/business/releaseModule/releaseDeploy/index.vue"),
        meta: { toolTip: "业务管理 > 版本升级 > 版本升级配置" },
      },
      {
        name: "facilityWhiteList",
        path: "releaseModule/facilityWhiteList",
        component: () =>
          import("@/views/business/releaseModule/facilityWhiteList/index.vue"),
        meta: { toolTip: "业务管理 > 版本升级 > 设备白名单" },
      },
      {
        name: "versionNumber",
        path: "releaseModule/versionNumber",
        component: () =>
          import("@/views/business/releaseModule/versionNumber/index.vue"),
        meta: { toolTip: "业务管理 > 版本升级 > 系统版本号" },
      },
      {
        name: "rankingIntervene",
        path: "rankingModule/rankingIntervene",
        component: () =>
          import("@/views/business/rankingModule/rankingIntervene/index.vue"),
        meta: { toolTip: "业务管理 > 榜单管理 > 榜单干预" },
      },
      {
        name: "strategyManage",
        path: "rankingModule/strategyManage",
        component: () =>
          import("@/views/business/rankingModule/strategyManage/index.vue"),
        meta: { toolTip: "业务管理 > 榜单管理 > 策略管理" },
      },
      {
        name: "problemReport",
        path: "complaintModule/problemReport",
        component: () =>
          import("@/views/business/complaintModule/problemReport/index.vue"),
        meta: { toolTip: "业务管理 >投诉建议 > 问题反馈" },
      },
      {
        name: "commentsModuleAudit",
        path: "commentsModule/audit",
        component: () =>
          import("@/views/business/commentsModule/audit/index.vue"),
        meta: { toolTip: "业务管理 >评论管理 > 评论审核" },
      },
      {
        name: "report",
        path: "commentsModule/report",
        component: () =>
          import("@/views/business/commentsModule/report/index.vue"),
        meta: { toolTip: "业务管理 >评论管理 > 举报列表" },
      },
      {
        name: "sensitive",
        path: "commentsModule/sensitive",
        component: () =>
          import("@/views/business/commentsModule/sensitive/index.vue"),
        meta: { toolTip: "业务管理 >评论管理 > 敏感词管理" },
      },
      {
        name: "blacklistApp",
        path: "blacklistModule/apps",
        component: () =>
          import("@/views/business/blacklistModule/apps/index.vue"),
        meta: { toolTip: "业务管理 >黑名单管理 > 应用黑名单" },
      },
      {
        name: "blacklistUsers",
        path: "blacklistModule/users",
        component: () =>
          import("@/views/business/blacklistModule/users/index.vue"),
        meta: { toolTip: "业务管理 >黑名单管理 > 用户黑名单" },
      },
    ],
  },
  {
    path: "/system",
    name: "system",
    component: () => import("@/views/index/index.vue"),
    children: [
      {
        name: "roleManage",
        path: "setCenter/roleManage",
        component: () =>
          import("@/views/system/setCenter/roleManage/index.vue"),
        meta: { toolTip: "系统管理 > 设置中心 > 角色管理" },
      },
      {
        name: "userManage",
        path: "setCenter/userManage",
        component: () =>
          import("@/views/system/setCenter/userManage/index.vue"),
        meta: { toolTip: "系统管理 > 设置中心 > 用户管理" },
      },
      {
        name: "logList",
        path: "logManagement/logList",
        component: () =>
          import("@/views/system/logManagement/logList/index.vue"),
        meta: { toolTip: "系统管理 > 日志管理 > 日志列表" },
      },
      {
        name: "loginLog",
        path: "logManagement/loginLog",
        component: () =>
          import("@/views/system/logManagement/loginLog/index.vue"),
        meta: { toolTip: "系统管理 > 日志管理 > 登录日志" },
      },
    ],
  },
  {
    path: "/",
    redirect: "/business",
  },
  {
    path: "*",
    redirect: "/notFound",
  },
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
