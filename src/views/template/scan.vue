<template>
  <!-- <div class="scan"> -->
  <!-- <button @click='startRecognize'>摄像头</button> -->
  <!-- <button @click='openphoto'>图片扫描</button>
		<button @click="cancelScan"
  style="position: fixed; right: 20px; top: 20px; z-index: 99999;">取消</button>-->
  <div class="scan">
    <div id="bcid" :style="{zIndex:zIndex}">
      <!-- <button :style="{zIndex:9999}" class="close">我再这里</button> -->
      <!-- </div> -->
    </div>
    <van-button
      type="info"
      size="large"
      class="close"
      @click="cancelScan();
       closeScan();$router.go(-1)"
    >关闭扫一扫</van-button>
  </div>
</template>
<script>
import { queryInstallInfo } from "@/api/index.js";
export default {
  data() {
    return {
      text: "",
      codeUrl: "",
      scan: "",
      zIndex: -1,
      viewType: "",
      message: {}
    };
  },
  mounted() {
    this.viewType = this.$route.query.viewType
      ? this.$route.query.viewType
      : "";
    this.startRecognize();
  },
  destroyed() {
    this.cancelScan();
    this.closeScan();
  },
  methods: {
    // 调用摄像头扫描
    startRecognize() {
      this.zIndex = 9990;
      let that = this;
      if (!window.plus) {
        this.zIndex = -1;
        return;
      }
      // 初始化扫描控件
      this.scan = new window.plus.barcode.Barcode("bcid");
      this.scan.onmarked = onmarked;
      // 调用开始扫描
      this.startScan();
      // 扫描后回调
      function onmarked(type, result) {
        switch (type) {
          case window.plus.barcode.QR:
            type = "QR";
            break;
          case window.plus.barcode.EAN13:
            type = "EAN13";
            break;
          case window.plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        that.codeUrl = result;
        // 返回值

        that.zIndex = -1;
        that.closeScan();
        switch (that.viewType) {
          case "安装":
            sessionStorage.setItem("installId", result);
            that.$router.push({
              path: "writeInstallRecord",
              query: {
                readOnly: 0,
                viewType: "安装"
              }
            });
            // queryInstallInfo(result).then(res => {
            //   // let message = sessionStorage.getItem("installRecordMessage");
            //   // let saveThis = sessionStorage.getItem("saveInstallRecord");
            // });
            break;
          case "调试":
            queryInstallInfo(result).then(function(res) {
              sessionStorage.setItem("debugName", res.name);
              sessionStorage.setItem("debugCode", res.code);
              that.$router.push({
                path: "writeDebugRecord",
                query: {
                  readOnly: 0,
                  viewType: "调试"
                }
              });

              //                this.message.name = sessionStorage.getItem("debugName");
              // this.message.code = sessionStorage.getItem("debugCode");
            });
            break;
          case "上级":
            queryInstallInfo(result).then(function(res) {
              that.message = JSON.parse(
                sessionStorage.getItem("installRecordMessage")
              );
              that.message.superior = res.pdid || "0000";
              sessionStorage.setItem(
                "installRecordMessage",
                JSON.stringify(this.message)
              );
              that.$router.go(-1);
              // this.$router.push({
              //   path: "writeInstallRecord",
              //   query: {
              //     readOnly: 0,
              //     viewType: "上级"
              //   }
              // });
              //                this.message.name = sessionStorage.getItem("debugName");
              // this.message.code = sessionStorage.getItem("debugCode");
            });
            break;
          case "站点":
            queryInstallInfo(result).then(function(res) {
              that.message = JSON.parse(
                sessionStorage.getItem("installRecordMessage")
              );
              that.message.site = res.site || "没数据";
              sessionStorage.setItem(
                "installRecordMessage",
                JSON.stringify(this.message)
              );
              this.$router.go(-1);
            });
            // that.$router.go(-1)
            break;
          case "填报":
            queryInstallInfo(result).then(function(res) {
              // this.message.name = sessionStorage.getItem("fillName");
              // this.message.code = sessionStorage.getItem("fillCode");
              // this.message.id = sessionStorage.getItem("filldid");
              // this.message.typeName = sessionStorage.getItem("fillTypeName");
              sessionStorage.setItem("fillName", res.name);
              sessionStorage.setItem("fillCode", res.code);
              sessionStorage.setItem("filldid", res.fillInId);
              sessionStorage.setItem("fillTypeName", res.deviceTypeName);
              that.$router.push("writeFillRecord");
            });
            break;
          default:
            that.$router.push({
              path: "/deviceDetails",
              query: {
                name: result
              }
            });
            // alert(result)
            break;
        }
      }
    },
    //开始扫描
    startScan() {
      if (!window.plus || !this.scan) return;
      this.scan.start();
    },
    //关闭扫描
    cancelScan() {
      this.zIndex = -1;
      if (!window.plus || !this.scan) return;
      this.scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      this.zIndex = -1;
      if (!window.plus || !this.scan) return;
      this.scan.close();
    }
  }
};
</script>

<style lang="scss">
.scan {
  width: 100%;
  height: 90%;
}
.close {
  position: absolute;
  top: 90%;
  width: 100%;
  height: 10%;
  left: 0;
  right: 0;
  border: 0;
}
#bcid {
  width: 100%;
  height: 90%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 3rem;
  text-align: center;
  color: #fff;
}
</style>