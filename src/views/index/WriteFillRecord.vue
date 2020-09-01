<template>
  <div class="component-content">
    <topBack :topTitle="topTitle" ></topBack>
    <van-form title="oooo" >
      <div class="categoryTitle">
        <!-- <span>调试信息</span> -->
        <!-- <van-cell title="设备信息" value :border="false" /> -->
      </div>
      <div @click="routerGoDetail(message.code)">
        <van-field
          v-model="message.name"
          label="设备名称:"
          input-align="right"
          is-link
          :disabled="message.disable"
        />
      </div>

      <van-field
        label="设备编号:"
        placeholder="请输入设备编号"
        input-align="right"
        v-model="message.code"
        :disabled="message.disable"
      />
      <div class="categoryTitle">
        <!-- <span>调试信息</span> -->
        <!-- <van-cell title="调试信息" value :border="false" /> -->
      </div>

      <van-field
        label="设备类型"
        input-align="right"
        placeholder
        v-model="message.typeName"
        :disabled="message.disable"
      />
      <div class="index">设备指标</div>
      <van-field
        v-model="indexMessage[index]"
        :label="item.name"
        input-align="right"
        :placeholder="item.companyCn+'/'+item.companyEn"
        v-for="(item,index) in index"
        :key="index"
      ></van-field>
      <div class="tools">
        <van-button
          @click="installCancel"
          class="btn-edit"
          size="normal"
          type="default"
        >取消</van-button>
        <van-button
         @click="onSubmit()"
          round
          block
          type="info"
          native-type="submit"
          class="btn-edit"
          size="normal"
        >提交</van-button>
      </div>
      <!-- <van-field
                label="芯片卡号:"
                input-align="right"
                placeholder="芯片卡号"
            />

            <van-field
                label="远程ID:"
                input-align="right"
                placeholder="芯片卡号"
            />

            <van-field
                label="管点:"
                readonly
                input-align="right"
                is-link
            />

            <van-field
                label="经纬度 X:"
                input-align="right"
                placeholder="请输入经纬度 X"
            />

            <van-field
                label="经纬度 Y:"
                input-align="right"
                placeholder="请输入经纬度 Y"
            />

            <van-field
                label="设备用途:"
                readonly
                input-align="right"
                is-link
            />

            <van-field
                label="站点:"
                readonly
                input-align="right"
                is-link
            />

            <van-field
                label="上级设备:"
                readonly
                input-align="right"
                is-link
            />

            <van-field
                v-model="message"
                rows="2"
                autosize
                label="备注："
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
            />

            <van-field label="安装图片：">
                <template #input>
                    <van-uploader v-model="uploader" />
                </template>
      </van-field>-->
    </van-form>
  </div>
</template>

<script>
import {
  queryInfoList,
  saveDebugInfo,
  afterRead,
  getDevQuotaInfoList,
  saveMonitorCollectList
} from "@/api/index.js";
// import {} from "@/api/index.js"
import { Notify } from "vant";
export default {
  name: "writeDebug",
  components: {
    //
  },
  data() {
    return {
      topTitle: "设备报修",
      value: "江南水都丽岛 DN50",
      allDisable: false,
      message: {
        disable: false,
        text: "",
        name: "",
        request: "",
        code: "",
        imageUrl: [],
        typeName: ""
      },
      commitCollection: [],
      index: [],
      indexMessage: ["", "", "", "", "", "", "", "", ""],
      uploader: [],
      readOnly: ""
    };
  },
  methods: {
    getDevQuotaInfoList(did) {
      getDevQuotaInfoList({ did }).then(res => {
        console.log(res);
        this.index = res.obj;
      });
    },
    onSubmit() {
      //将参数添加完毕
      this.index.forEach((item, index) => {
        this.commitCollection.push({
          did: this.message.id,
          key:this.index[index].code,
          val:this.indexMessage[index]
        });
      });
      //提交这些参数
      saveMonitorCollectList(
        this.commitCollection
      ).then(
        res=>{
          Notify({
            type:"success",
            message:"已经提交"
          })
          console.log(res)
        }
      ).catch(res=>{
           Notify({
            type:"warning",
            message:"请重试"
          })
      })



    },
    routerGoDetail(name) {
      this.$router.push({
        path: "/deviceDetails",
        query: {
          name
        }
      });
    },
    installCancel() {
      this.$router.go(-1)
      // this.$router.push({
      //   path: "/fillIn",
      //   query: {
      //     viewType: "调试"
      //   }
      // });
    },
    afterRead(file) {
      const data = new FormData();
      data.append("file", file.file);
      console.log(file);
      Notify({
        type: "warning",
        message: "正在上传中"
      });
      afterRead(data)
        .then(res => {
          console.log(res);
          this.message.imageUrl.push(res.obj);
          if (res.msg == "文件上传成功") {
            Notify({
              type: "success",
              message: "已经成功上传"
            });
            this.message.imageUrl.push(res.obj);
          } else if (res.msg == "文件上传异常") {
            Notify({
              type: "warning",
              message: "无法正常上传"
            });
          }

          console.log(this.message.imageUrl);
        })
        .catch(res => {
          console.log(res);
        });
    },
    // onSubmit(message) {
    //   console.log("submit");
    //   let submitData = {
    //     // itemId: sessionStorage.getItem("debugId"),
    //     deviceName: message.name,
    //     reason: message.request,
    //     imageUrl: message.imageUrl.join(",")
    //   };
    //   console.log(submitData);
    //   saveDebugInfo(submitData)
    //     .then(res => {
    //       Notify({
    //         type: "success",
    //         message: "成功上传数据"
    //       });
    //     })
    //     .catch(res => {
    //       alert("请求失败");
    //     });
    // }

    //
  },
  mounted() {
    this.message.name = sessionStorage.getItem("fillName");
    this.message.code = sessionStorage.getItem("fillCode");
    this.message.id = sessionStorage.getItem("filldid");
    this.message.typeName = sessionStorage.getItem("fillTypeName");
    this.getDevQuotaInfoList(this.message.id);
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
  padding-bottom: 2rem;
  //   background: $color-2;
}

.categoryTitle {
  background-color: #f2f3f5;
  font-size: 2rem;
  font-weight: 650;
}
.index {
  width: 100%;
  padding-left: 0.3rem;
  height: 35px;
  line-height: 35px;
  font-weight: 500;
  font-size: 14px;
}
.tools {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.3rem 0.64rem;
  user-select: none;
  background: #fff;
  box-shadow: 0 5px 15px #e8e8ed;
  .btn-edit {
    width: 0;
    flex-grow: 1;
    border-radius: 0.12rem;
    & + .btn-edit {
      margin-left: 0.2rem;
    }
  }
}
</style>