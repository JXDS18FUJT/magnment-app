<template>
  <div class="component-content">
    <van-form title="oooo">
      <div class="categoryTitle">
        <!-- <span>调试信息</span> -->
        <!-- <van-cell title="设备信息" value :border="false" /> -->
      </div>
      <van-field v-model="form.name" label="设备名称:" readonly input-align="right" is-link />

      <van-field label="设备编号:" placeholder="请输入设备编号" input-align="right" />
      <div class="categoryTitle">
        <!-- <span>调试信息</span> -->
        <!-- <van-cell title="调试信息" value :border="false" /> -->
      </div>

      <van-field
        label="故障现象"
        input-align="right"
        placeholder=""
        :disabled="false"
        is-link
        v-model="form.fault.value"
        @click="form.fault.show='true'"
      />
      <van-popup v-model="form.fault.show" position="bottom">
        <van-picker
          v-model="form.fault.value"
          show-toolbar
          :columns="form.fault.list"
          @cancel="form.fault.show = false"
          @confirm="confirmFault"
        />
      </van-popup>

      <van-field
        v-model="form.faultDescribe.value"
        rows="2"
        autosize
        label="故障描述"
        type="textarea"
        maxlength="150"
        placeholder="请输入故障描述"
        show-word-limit
      />
      <van-field label="安装图片：">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
            <van-field
        label="紧急程度(必填)"
        input-align="right"
        placeholder=""
        :disabled="false"
        is-link
        v-model="form.urgentDegree.value"
        @click="form.urgentDegree.show='true'"
      />
      <van-popup v-model="form.urgentDegree.show" position="bottom">
        <van-picker
          v-model="form.urgentDegree.value"
          show-toolbar
          :columns="form.urgentDegree.list"
          @cancel="form.urgentDegree.show = false"
          @confirm="confirmUrgentDegree"
        />
      </van-popup>
    <van-field
        label="限办日期"
        input-align="right"
        placeholder=""
        :disabled="false"
        is-link
        v-model="form.limitedDate.value"
        @click="form.limitedDate.show='true'"
      />
      <van-popup v-model="form.limitedDate.show" position="bottom">
            <van-calendar v-model="form.limitedDate.show" @confirm="confirmLimitedDate" />
      </van-popup>
            <van-field
        v-model="form.requirement.value"
        rows="2"
        autosize
        label="维修要求"
        type="textarea"
        maxlength="150"
        placeholder="请输入故障描述"
        show-word-limit
      />

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

    <div class="tools">
      <van-button @click="installCancel" class="btn-edit" size="normal" type="default">取消</van-button>
      <van-button @click="installSubmit" class="btn-edit" size="normal" type="info">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "writeInstall",
  components: {
    //
  },
  data() {
    return {
      value: "江南水都丽岛 DN50",
      message: "",
      form:{
          name:'真的师的',
          fault:{
              show:false,
              list:['离线','电压低','电量低','数据传输不稳定','其他'],
              value:''
          },
          faultDescribe:{
              value:''

          },
          requirement:{
              value:''

          },
          urgentDegree:{
              show:false,
              list:[
                  '一般','次要','重要','紧急'
              ],
              value:''
          },
        limitedDate:{
              show:false,
              list:[
                  '一般','次要','重要','紧急'
              ],
              value:''
          }

      },
      uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
    };
  },
  methods: {
          formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
      confirmLimitedDate(val){
          this.form.limitedDate.show = false
          this.form.limitedDate.value = this.formatDate(val)

      },
      confirmUrgentDegree(val){
              this.form.urgentDegree.value = val
          this.form.urgentDegree.show = false

      },
      confirmFault(val){
          this.form.fault.value = val
          this.form.fault.show = false
      },
    installSubmit() {
      this.$router.push({
        path: "/index",
        query: {
          viewType: "调试"
        }
      });
    },
    installCancel() {
      this.$router.push({
        path: "/index",
        query: {
          viewType: "调试"
        }
      });
    }
    //
  }
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