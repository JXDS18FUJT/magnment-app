<template>
  <div class="component-content">
    <topBack :topTitle="topTitle"></topBack>
    <van-form title="oooo" @submit="onSubmit(message)">
      <div @click="routerGoDetail(message.code)">
        <van-field
          v-model="message.name"
          label="设备名称:"
          input-align="right"
          :disabled="allDisabled"
          is-link
          readonly
          :rules="[{ required: true, message: '请填写用户名' }]"

        />
      </div>
      <van-field
        label="设备编号:"
        v-model="message.code"
        placeholder="请输入设备编号"
        input-align="right"
        :disabled="allDisabled"
        readonly
        :rules="[{ required: true, message: '请填写设备编号' }]"
      />

      <van-field
        label="安装位置:"
        v-model="message.installPlace"
        input-align="right"
        placeholder="请输入安装位置"
        :disabled="allDisabled"
        :rules="[{ required: true, message: '请选择安装位置' }]"
        class="field__control"
           
      />

      <van-field
        label="安装环境:"
        v-model="message.installScene"
        readonly
        input-align="right"
        is-link
        :disabled="allDisabled"
        @click="allDisabled?place.show=false:place.show=true"
        :rules="[{ required: true, message: '请选择安装环境' }]"
      />
      <van-popup v-model="place.show" position="bottom">
        <van-picker
          :disabled="allDisabled"
          v-model="place.value"
          show-toolbar
          :columns="place.list"
          @cancel="place.show = false"
          @confirm="confirmPlace"
        />
      </van-popup>

      <van-field
        label="芯片卡号:"
        v-model="message.chipNumber"
        input-align="right"
        placeholder="芯片卡号"
        :disabled="allDisabled"
        :rules="[{ required: true, message: '请填写芯片卡号' }]"
      />

      <van-field
        label="远程ID:"
        v-model="message.LongRangeId"
        input-align="right"
        placeholder="远程id"
        :disabled="allDisabled"
        :rules="[{ required: true, message: '请填写远程id' }]"
      />

      <van-field label="管点:" readonly input-align="right" is-link :disabled="allDisabled" />

      <van-field
        label="经度 X:"
        v-model="message.longitude"
        input-align="right"
        placeholder="请输入经度 X"
        :disabled="allDisabled"
        :rules="[{ required: true, message: '输入经度' }]"
        required
      />

      <van-field
        label="经纬度 Y:"
        v-model="message.latitude"
        input-align="right"
        placeholder="请输入纬度 Y"
        :disabled="allDisabled"
        :rules="[{ required: true, message: '请输入纬度' }]"
        required
      />

      <van-field
        label="设备用途:"
        readonly
        v-model="purpose.value"
        input-align="right"
        is-link
        :disabled="allDisabled"
        @click="allDisabled?purpose.show=false:purpose.show=true"
        :rules="[{ required: true, message: '请填写设备用途' }]"
      />
      <van-popup v-model="purpose.show" position="bottom">
        <van-picker
          v-model="purpose.list"
          show-toolbar
          :disabled="allDisabled"
          :columns="purpose.list"
          @cancel="purpose.show = false"
          @confirm="confirmPurpose"
        />
      </van-popup>

      <van-field
        label="站点:"
        v-model="message.site"
        input-align="right"
        is-link
        :disabled="allDisabled"
        @click="routerGOSelectSite"

      />

      <van-field
        label="上级设备:"
        v-model="message.superior"
        input-align="right"
        is-link
        :disabled="allDisabled"
        readonly
        @click="routerGOsuperior"
      />

      <van-field
        v-model="message.remarks"
        rows="2"
        autosize
        label="备注："
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        :disabled="allDisabled"
      />

      <van-field label="安装图片：" :disabled="allDisabled">
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterRead" />
        </template>
      </van-field>

      <div class="tools">
        <van-button
          @click="installCancel"
          class="btn-edit"
          size="normal"
          v-if="!allDisabled"
          type="default"
          :disabled="allDisabled"
        >取消</van-button>
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="btn-edit"
          size="normal"
          v-if="!allDisabled"
          :disabled="allDisabled"
        >提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { afterRead, saveInstallInfo, queryInstallInfo } from "@/api/index.js";
import { Notify } from "vant";
export default {
  name: "writeInstall",
  components: {
    //
  },
  data() {
    return {
      value: "江南水都丽岛 DN50",
      topTitle: "",
      allDisabled: false,
      meta: {
        keepAlive: true
      },
      message: {
        disable: false,
        name: "",
        code: "",
        installPlace: "",
        installScene: "",
        chipNumber: "",
        LongRangeId: "",
        controlPoint: "",
        longitude: "",
        latitude: "",
        remarks: "",
        disable: false,
        site: "",
        superior: "",
        imageUrl: []
      },
      purpose: {
        list: ["对照", "结算", "其他"],
        show: false,
        value: ""
      },
      place: {
        list: ["低洼地带", "靠河", "其他"],
        show: false,
        value: ""
      },
      uploader: []
    };
  },
  methods: {
    routerGOSelectSite(){
      sessionStorage.setItem("installRecordMessage",JSON.stringify(this.message)) //保存当前的状态
      //开始跳转
      this.$router.push({
        path:'/selectSite',
        query:{
          viewType:'站点'
        }
      })

    },
    routerGOsuperior(){
      sessionStorage.setItem("installRecordMessage",JSON.stringify(this.message)) //保存当前的状态
      //开始跳转
      this.$router.push({
        path:'/selectDevice',
        query:{
          viewType:'上级'
        }
      })


    },
    routerGoDetail(name) {
    sessionStorage.setItem('saveInstallRecord','yes')
    sessionStorage.setItem("installRecordMessage",JSON.stringify(this.message)) //保存当前的状态
      this.$router.push({
        path: "/deviceDetails",
        query: {
          name
        }
      });

    },
    autoFillInName_Code() {
      let id;
      switch (this.viewType) {
        case "安装":
          id = sessionStorage.getItem("installId");
          queryInstallInfo({ id }).then(res => {
            this.message.name = res.obj.name
            this.message.code = res.obj.code
            // this.message = {
            //   name: res.obj.name, //名字
            //   code: res.obj.code // 编号
            //   // installPlace:res.obj.installPosition, //安装位置
            //   // //installScene:res.obj.ambient, //安装环境
            //   // chipCardNumber:res.obj.chipCardNumber, //芯片号
            //   // longitude:res.obj.longitude, //经度
            //   // latitude:res.obj.latitude, //纬度
            //   // superior:res.obj.pdid, // 上级设备id
            //   // remark:res.obj.remark //备注
            //   //图片的预览
            // };
            this.purpose.value = res.obj.use;
            this.place.value = res.obj.ambient;
          });
          break;
        case "调试":
          this.message = {
            name: sessionStorage.getItem("debugName"),
            code: sessionStorage.getItem("debugCode")
          };
          break;
      }
    },
    onlyLookData() {
      let id;
      switch (this.viewType) {
        case "安装":
          id = sessionStorage.getItem("installId");
          queryInstallInfo({ id }).then(res => {
            this.message = {
              name: res.obj.name, //名字
              code: res.obj.code, // 编号
              installPlace: res.obj.installPosition, //安装位置
              installScene:res.obj.ambient, //安装环境
              chipCardNumber: res.obj.chipCardNumber, //芯片号
              longitude: res.obj.longitude, //经度
              latitude: res.obj.latitude, //纬度
              superior: res.obj.pdid, // 上级设备id
              LongRangeId:res.obj.farAwayId,//远程id
              remark: res.obj.remark, //备注
              use:res.obj.use
              //图片的预览
            };
            this.purpose.value = res.obj.use;
            this.place.value = res.obj.ambient;
          });
          break;
        case "调试":
          id = sessionStorage.getItem("debugId");
          queryInstallInfo({ id }).then(res => {
            console.log(res);
          });
          break;
      }
    },
    isReadOnly() {
      console.log("是否可读", this.$route.query.readOnly);
      this.allDisabled = this.$route.query.readOnly == "1" ? true : false; //是否只能查看
      this.allDisabled
        ? (this.topTitle = "查看安装记录")
        : (this.topTitle = "填写安装记录");
    },
    onSubmit(values) {
      console.log("submit", values);
      console.log( this.message.imageUrl)
      this.message.imageUrl = this.message.imageUrl.join(',') 
      let submitData = {
        id: sessionStorage.getItem("installId"),
        longitude: this.message.longitude,
        latitude: this.message.latitude,
        remark: this.message.remark,
        chipCardNumber: this.message.chipNumber,
        installPosition: this.message.installPlace,
        use: this.purpose.list.indexOf(this.purpose.value) + 1,
        farAwayId: this.message.LongRangeId,
        type: 1,
        imgUrl: this.message.imageUrl,
        name: this.message.name,
        ambient: this.place.list.indexOf(this.place.value) + 1
      };
      saveInstallInfo(submitData).then(res => {
        Notify({
          type: "success",
          message: "成功上传数据"
        });
      });
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
    confirmPlace(val) {
      this.message.installScene = val;
      this.place.value = val;
      this.place.show = false;
    },
    confirmPurpose(val) {
      this.purpose.value = val;
      this.purpose.show = false;
    },
    installSubmit() {
      this.$router.push({
        path: "/remark",
        query: {
          viewType: "安装"
        }
      });
    },
    installCancel() {
      this.$router.push({
        path: "/selectDevice",
        query: {
          viewType: "安装"
        }
      });
    }

    //
  },
  created() {
    this.isReadOnly();
    this.viewType = this.$route.query.viewType;
    if (this.allDisabled) {
      this.onlyLookData();
    } else {
      this.autoFillInName_Code();
    }
  },
  mounted () {

    //加载在缓存中的状态;
    let message = sessionStorage.getItem("installRecordMessage")
    let saveThis = sessionStorage.getItem("saveInstallRecord")
      if(message&&message !='""'){
          //清除状态
        this.message = JSON.parse(message)
        sessionStorage.removeItem("installRecordMessage")
            // console.log("清除")
      }else if(saveThis){
        //清除状态
        this.message = JSON.parse(message)
        sessionStorage.removeItem("installRecordMessage")
        sessionStorage.removeItem("saveInstallRecord")
    
      }
  },
};
</script>
<style  scoped>
/* .field__control >>>  .field__control .van-field__value .van-field__body .van-field__control{
  color: #323233;
} */
</style>
<style lang="scss" scoped>
.field__control ::v-deep .van-field__control{
  color: #323233;
}
.component-content {
  position: relative;
  padding-bottom: 2rem;
  background: $color-2;
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