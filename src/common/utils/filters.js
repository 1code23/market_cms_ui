export default {
  typeDesc(key, list = []) {
    return (list.find((item) => item.key === key) || {}).value || key;
  },
  tagType(key, list = []) {
    return (list.find((item) => item.key === key) || {}).tag || "";
  },
  classType(key, list = []) {
    return (list.find((item) => item.key === key) || {}).class || "";
  },
  languageDesc(key, list = []) {
    return (
      (
        list.find(
          (item) => item.languageId === key || item.languageType === key
        ) || {}
      ).languageName || key
    );
  },
  operationTypeDesc(type, custom) {
    if (custom) return custom;
    switch (type) {
      case "create":
        return "新增";
      case "view":
        return "查看";
      case "edit":
        return "修改";
      case "global":
        return "国际化";
      case "deploy":
        return "部署组件";
      case "config":
        return "配置";
      case "apk":
        return "配置APK";
      case "adv":
        return "配置广告";
      case "deployDetail":
        return "部署详情";
      case "app":
        return "应用管理";
      default:
        return " ";
    }
  },
  // 根据语言的type获取对应语言名称
  getLanguageName(type, languageList) {
    return (
      (languageList.find((item) => item.languageType === type) || {})
        .languageName || ""
    );
  },
};
