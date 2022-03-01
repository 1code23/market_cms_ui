<template>
  <div class="app-card">
    <div class="appLeft">
      <img :src="data.icon" />
    </div>
    <div class="appRight">
      <div class="appTitle">
        <span v-if="data.hot" class="hot">热</span
        ><span class="practive" v-if="data.company_type">私</span
        >{{ data.apk_name }}
      </div>
      <div class="appInfo">
        <span>大小:</span>
        <span class="infoTxt"
          >{{ (data.file_size / 1000000).toFixed(2) }}M</span
        >
      </div>
      <div class="appInfo">
        <span>下载:</span>
        <span class="infoTxt">{{ data.download_num }}次</span>
      </div>
      <div class="appInfo">
        <span>版本:</span>
        <span class="infoTxt">{{ data.version_name }}</span>
      </div>
      <div class="appInfo">
        <span>等级:</span>
        <span class="infoTxt">{{ data.stars }}</span>
      </div>
      <img
        class="fixed_corner_mark"
        v-if="isShowDeployed && data.isDeployed"
        src="@/assets/images/has-deployed.png"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    isShowDeployed: {
      default: true,
    },
  },
};
</script>
<style scoped lang="scss">
.app-card {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 10px;
  border: 1px solid #dfdfdf;
  background: #fff;
  .appLeft {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .appRight {
    position: relative;
    width: 85%;
  }
  .appInfo,
  .appTitle {
    text-align: left;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    .hot {
      background: red;
      color: #fff;
      border-radius: 2px;
      margin: 0 1px;
    }
    .practive {
      background: green;
      border-radius: 2px;
      color: #fff;
    }
  }
  .infoTxt {
    margin-left: 2px;
    color: #949191;
  }
  .fixed_corner_mark {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
