<template>
  <div @click="handleDownload" style="display: inline-block">
    <slot
      ><el-button type="primary" size="small"
        ><i class="el-icon-download"></i> 导出</el-button
      ></slot
    >
  </div>
</template>
<script>
import XLSX from "xlsx";
import exportExcel from "@/common/utils/exportExcel.js";
export default {
  name: "ExportTable",
  data() {
    return {
      letterList: [],
    };
  },
  mounted() {
    this.getLetterList();
  },
  methods: {
    getLetterList() {
      const letterList = [];
      for (let i = 0; i < 26; i++) {
        const char = String.fromCharCode(65 + i);
        letterList.push(char);
      }
      this.letterList = letterList;
    },
    handleDownload() {
      // 通过回调函数去获取下载的相关参数
      this.$emit("download", ({ list, fileName, headerDisplay = {} }) => {
        const tableList = Array.isArray(list) ? list : [];
        const newData = [headerDisplay, ...tableList]; //添加标题行
        const header = Object.keys(headerDisplay);
        const sheet = XLSX.utils.json_to_sheet(newData, {
          header: header,
          skipHeader: true, //不需要标题行（该标题行是指变量名那一行）
        });
        const realMaxColLength = Object.keys(headerDisplay).length; // 不能直接使用header的长度去获取，因为header最后会补全数据
        const berforeMaxCol = sheet["!ref"]
          .split(":")[1]
          .replace(/[^A-Z]/gi, ""); // 找出原渲染范围最大的列
        let afterMaxCol = this.letterList[realMaxColLength - 1];
        if (realMaxColLength > 26) {
          const a = Math.floor(realMaxColLength / 26); // 商
          const b = realMaxColLength % 26; // 余数
          afterMaxCol = `${this.letterList[a - 1]}${this.letterList[b - 1]}`; // 超过26列时，由列由两个字母组成
        }
        sheet["!ref"] = sheet["!ref"].replace(berforeMaxCol, afterMaxCol); // 修改excel的渲染范围
        // 设置标题行样式
        for (let c = 0; c < realMaxColLength; c++) {
          const cell = `${this.letterList[c]}1`;
          if (!sheet[cell]) {
            sheet[cell] = {};
          }
          sheet[cell].s = {
            font: {
              bold: true,
            },
            alignment: {
              vertical: "center",
            },
          };
        }
        const nowDate = new Date().toLocaleDateString().split("/").join("-");
        exportExcel(`${fileName}_${nowDate}.xlsx`, sheet);
      });
    },
  },
};
</script>
