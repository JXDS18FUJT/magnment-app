<template>
  <div class="component-content">
    <topBack topTitle="监控的筛选"></topBack>
    <van-form>
      <van-field label-width="5em" name="radio" label="设备状态:">
        <template #input>
          <van-radio-group v-model="radio">
            <van-radio name="0">总数</van-radio>
            <van-radio name="1">正常</van-radio>
            <van-radio name="2">异常</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- <div v-for="(item,index) in obj.dynamicMenuList " :key="index"> -->
      <van-field
        label-width="5em"
        name="checkboxGroup0"
        :label="item.name"
        v-for="(item,index) in obj.dynamicMenuList"
        :key="index"
      >
        <template #input class="half-width">
          <van-checkbox-group v-model="checkboxGroup0" direction="horizontal">
            <div v-for="(item1,index1) in item.typeMenuList"  :key="index1"> 
              <van-checkbox :name="item1.id" shape="square" 
            >{{item1.name}}</van-checkbox>
            </div>
     
           <!-- <van-checkbox name="2" shape="square">户表</van-checkbox> -->
             <!-- <van-checkbox name="3" shape="square">达标</van-checkbox>
            
            <van-checkbox name="4" shape="square">设备1</van-checkbox>
            <van-checkbox name="5" shape="square">设备2</van-checkbox>

            <van-checkbox name="6" shape="square">设备3</van-checkbox>
            <van-checkbox name="7" shape="square">设备4</van-checkbox> -->
          </van-checkbox-group>
        </template>
      </van-field>
      <!-- </div> -->

      <!-- <van-field label-width="5em" name="checkboxGroup1" label="监控设备:">
        <template #input>
          <van-checkbox-group v-model="checkboxGroup1">
            <van-checkbox name="1" shape="square">大表</van-checkbox>
            <van-checkbox name="2" shape="square">户表</van-checkbox>

            <van-checkbox name="3" shape="square">设备1</van-checkbox>
            <van-checkbox name="4" shape="square">设备2</van-checkbox>

            <van-checkbox name="5" shape="square">设备3</van-checkbox>
            <van-checkbox name="6" shape="square">设备4</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field> -->

    <van-field
        label-width="5em"
        name="checkboxGroup1"
        label="厂家"
      >
        <template #input class="half-width">
          <van-checkbox-group v-model="checkboxGroup1" direction="horizontal">
            <div v-for="(item1,index1) in obj.manufacturerList"  :key="index1"> 
              <van-checkbox :name="item1.id" shape="square" 
            >{{item1.name}}</van-checkbox>
            </div>
     
           <!-- <van-checkbox name="2" shape="square">户表</van-checkbox> -->
             <!-- <van-checkbox name="3" shape="square">达标</van-checkbox>
            
            <van-checkbox name="4" shape="square">设备1</van-checkbox>
            <van-checkbox name="5" shape="square">设备2</van-checkbox>

            <van-checkbox name="6" shape="square">设备3</van-checkbox>
            <van-checkbox name="7" shape="square">设备4</van-checkbox> -->
          </van-checkbox-group>
        </template>
      </van-field>
    </van-form>

    <div class="tools">
      <van-button size="normal" type="default" @click="reset()">重置</van-button>
      <van-button size="normal" type="info" @click="setSelectState()">确定</van-button>
    </div>
  </div>
</template>

<script>
import { dynamicMenuList } from "@/api/my.js";
export default {
  name: "Index",
  components: {
    //
  },
  data() {
    return {
      radio: "2",
      obj: {},
      checkboxGroup0: [],
      checkboxGroup1: [],
      checkboxGroup2: [],
      obj: {}
    };
  },
  methods: {
    reset() {
      this.checkboxGroup0 = []
      this.checkboxGroup1 = []
      this.radio = "0"
      sessionStorage.setItem("monitorfiltterRadio","0")
      sessionStorage.setItem("monotorfiltterCheckboxGroup0",'')
      sessionStorage.setItem("monitorfiltterCheckboxGroup1",'')

    },
    setSelectState(){
      sessionStorage.setItem("monitorfiltterRadio",this.radio)
      sessionStorage.setItem("monitorfiltterCheckboxGroup0",JSON.stringify(this.checkboxGroup0.join(",")))
      sessionStorage.setItem("monitorfiltterCheckboxGroup1",JSON.stringify(this.checkboxGroup1.join(",")))
      this.$router.push('/monitor')
      // switch (this.radio){
      //   case "0":
      //     this.$router.push({
      //       path:'/myDevice',
      //       query:{
      //         viewType:"总数",
      //       }
      //     }) 
      //    break;
      //   case "1":
      //     this.$router.push({
      //       path:'/myDevice',
      //       query:{
      //         viewType:"正常",
      //       }
      //     }) 
      //    break;
      //   case "2":
      //     this.$router.push({
      //       path:'/myDevice',
      //       query:{
      //         viewType:"异常",
      //       }
      //     }) 
      //    break;
      // }
    },
    getKindRadio() {
      dynamicMenuList({
        isOwner: 1
      }).then(res => {
        console.log(res);
        this.obj = res.obj;
      });
         switch (this.$route.query.viewType){
        case "正常":
          this.radio = "1"
         break;
        case "总数":
          this.radio = "0"
         
         break;
        case "异常":
          this.radio = "2"
         break;
      }

    }
    //
  },
  mounted() {
    this.getKindRadio();
    
  }
};
</script>

<style lang="scss" scoped>
.component-content {
  position: relative;
}
.van-cell {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.van-radio-group {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .van-radio {
    flex-basis: 33.33%;
    padding: 0.1rem 0;
  }
}
.van-checkbox-group {
  display: flex;
  flex-wrap: wrap;

  .van-checkbox {
    flex-basis: 33.33%;
    padding: 0.1rem 0;
  }
}
.tools {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.2rem;
  user-select: none;

  .van-button {
    width: 0;
    flex-grow: 1;

    & + .van-button {
      margin-left: 0.3rem;
    }
  }
}
.half-width{
  width: 100%;
}
</style>
