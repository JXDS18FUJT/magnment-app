<template>
  <div class="component-content">
    <div class="panel-item">
      <div class="panel-title-wrap">
        <span class="panel-title">年度</span>

        <div class="edit-item">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" @change="timeChange" />
            <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
          </van-dropdown-menu>
          <i class="icon">&#xe628;</i>
        </div>
      </div>

      <div class="echart-wrap" ref="echartWrap">
        <canvas id="echart-wrap" width="375px" height="200px"></canvas>
      </div>
    </div>
    <orderList title="维修工单" :orderDatas="weixiu"></orderList>
    <orderList title="养护工单" :orderDatas="yanghu"></orderList>
    <orderList title="安装工单" :orderDatas="anzhuang"></orderList>
    <orderList title="调试工单" :orderDatas="tiaoshi"></orderList>

    <!-- <van-cell-group title="维修工单" class="horizontal">
      <van-cell title="已完成" :value="weixiu.myTodoCnt" />
      <van-cell title="未完成" :value="weixiu.myEndCnt" />
      <van-cell title="延期完成" :value="weixiu.myTodoTimeout" />
      <van-cell title="延期中" :value="weixiu.myEndTimeout" />
    </van-cell-group>-->

    <!-- <van-cell-group title="养护工单" class="horizontal">
      <van-cell title="已完成" :value="yanghu.myTodoCnt" />
      <van-cell title="未完成" :value="yanghu.myEndCnt" />
      <van-cell title="延期完成" :value="yanghu.myTodoTimeout" />
      <van-cell title="延期中" :value="yanghu.myEndTimeout" />
    </van-cell-group>-->

    <!-- <van-cell-group title="安装工单" class="horizontal">
      <van-cell title="已完成" :value="anzhuang.myTodoCnt" />
      <van-cell title="未完成" :value="anzhuang.myEndCnt" />
      <van-cell title="延期完成" :value="anzhuang.myTodoTimeout" />
      <van-cell title="延期中" :value="anzhuang.myEndTimeout" />
    </van-cell-group>-->
    <!-- 
    <van-cell-group title="调试工单" class="horizontal">
      <van-cell title="已完成" :value="tiaoshi.myTodoCnt" />
      <van-cell title="未完成" :value="tiaoshi.myEndCnt" />
      <van-cell title="延期完成" :value="tiaoshi.myTodoTimeout" />
      <van-cell title="延期中" :value="tiaoshi.myEndTimeout" />
    </van-cell-group>-->

    <van-cell-group :title="item.departmentName" v-for="(item,index) in departments.list" :key="index" >
      <div class="over-view">
        <div class="view-item">
          <p class="num">{{item.myEndCnt}}</p>
          <p class="name">已完成</p>
        </div>

        <div class="view-item">
          <p class="num">{{item.myTodoCnt}}</p>
          <p class="name">未完成</p>
        </div>

        <div class="view-item">
          <p class="num">{{item.myEndTimeout}}</p>
          <p class="name">延期完成</p>
        </div>

        <div class="view-item">
          <p class="num">{{item.myTodoTimeout}}</p>
          <p class="name">延期中</p>
        </div>
      </div>

      <table class="table-theme-1">
        <thead>
          <tr>
            <th>姓名</th>
            <th>已完成</th>
            <th>未完成</th>
            <th>延期完成</th>
            <th>延期中</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item1,index1) in item.userInfoList" :key="index1">
            <td>{{item1.userName}}</td>
            <td>{{item1.myEndCnt}}</td>
            <td>{{item1.myTodoCnt}}</td>
            <td>{{item.myEndTimeout}}</td>
            <td>{{item1.myTodoTimeout}}</td>
          </tr>
        </tbody>
      </table>
    </van-cell-group>
    <footerTabbar :footerTabbarActive="Number(2)" />
  </div>
</template>
<script>
import { getOrder,getDepartOrder } from "@/api/monitor.js";
//echarts 有关的代码
//处理echarts在rem情况下的字体模糊问题
function fGetChartFontSize() {
  const dpr = window.devicePixelRatio;
  let fontSize = 14;
  if (dpr == 2) {
    fontSize = 19;
  } else if (dpr == 3) {
    fontSize = 30;
  } else if (dpr > 3) {
    fontSize = 30;
  }
  return fontSize;
}

let eFontSize = fGetChartFontSize();

//让echart的字体动态变化
function fontSizeMultiple(a) {
  let multiple = 1.2;
  return a * multiple;
}

// function lengend_fontSize() {}

var pieoption = {
  title: {
    text: "",
    textStyle: {
      color: "#FFFFFF",
      fontSize: 25
    }
  },
  tooltip: {
    show: true,
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
    showContent: true
  },
  graphic: [
    {
      //环形图中间添加文字
      type: "text", //通过不同top值可以设置上下显示
      left: "center",
      top: "38%",
      left: "20.5%",
      style: {
        text: "工单数量" + "\n" + "\n" + "666",
        textAlign: "center",
        fill: "#969799", //文字的颜色
        width: 30,
        height: 30,
        fontSize: fontSizeMultiple(10),
        fontFamily: "Microsoft YaHei"
      }
    },
    {
      //添加文字到安装图例后面
      type: "text", //通过不同top值可以设置上下显示
      left: "center",
      id: "anzhuang",
      top: legendRemarksTop + "%",
      left: legendRemarksLeft + "%",
      style: {
        text: "99",
        textAlign: "center",
        fill: legendRemarksColor, //文字的颜色
        width: 30,
        height: 30,
        fontSize: fontSizeMultiple(10),
        fontFamily: "Microsoft YaHei"
      }
    },
    {
      //添加文字到养护图例后面
      type: "text", //通过不同top值可以设置上下显示
      left: "center",
      id: "yanghu",
      top: legendRemarksTop + legendRemarksInterval * 1 + "%",
      left: legendRemarksLeft + "%",
      style: {
        text: "98",
        textAlign: "center",
        fill: legendRemarksColor, //文字的颜色
        width: 30,
        height: 30,
        fontSize: fontSizeMultiple(10),
        fontFamily: "Microsoft YaHei"
      }
    },
    {
      //添加文字到养护图例后面
      type: "text", //通过不同top值可以设置上下显示
      left: "center",
      id: "weixiu",
      top: legendRemarksTop + legendRemarksInterval * 2 + "%",
      left: legendRemarksLeft + "%",
      style: {
        text: "98",
        textAlign: "center",
        fill: legendRemarksColor, //文字的颜色
        width: 30,
        height: 30,
        fontSize: fontSizeMultiple(10),
        fontFamily: "Microsoft YaHei"
      }
    },
    {
      //添加文字到养护图例后面
      type: "text", //通过不同top值可以设置上下显示
      left: "center",
      id: "tiaoshi",
      top: legendRemarksTop + legendRemarksInterval * 3 + "%",
      left: legendRemarksLeft + "%",
      style: {
        text: "98",
        textAlign: "center",
        fill: legendRemarksColor, //文字的颜色
        width: 30,
        height: 30,
        fontSize: fontSizeMultiple(10),
        fontFamily: "Microsoft YaHei"
      }
    }
  ],
  legend: {
    // type: 'scroll',
    orient: "vertical",
    icon: "rect",
    itemWidth: 14, // 设置宽度
    itemHeight: 14, // 设置高度
    right: 110,
    top: 7,
    width: 10,
    itemGap: 30,
    // label:{
    //   show:true,
    //   formatter:'{a}: {d}',
    //   position:'inside'

    // },
    // padding: [0, 100],
    data: [
      {
        name: "安装"
        // 强制设置图形为圆。
        // icon: "circle",
        // 设置文本为红色
        // textStyle: {
        //   color: "#969799",
        //   formatter:'"工单数量" + "\n" + "\n" + "666"'
        // }
      },
      {
        name: "养护"
        // 强制设置图形为圆。
        // icon: "circle",
        // 设置文本为红色
        // textStyle: {
        //   color: "#969799",
        //   formatter:'"工单数量" + "\n" + "\n" + "666"'
        // }
      },
      {
        name: "维修"
        // 强制设置图形为圆。
        // icon: "circle",
        // 设置文本为红色
        // textStyle: {
        //   color: "#969799",
        //   formatter:'"工单数量" + "\n" + "\n" + "666"'
        // }
      },
      {
        name: "调试"
        // 强制设置图形为圆。
        // icon: "circle",
        // 设置文本为红色
        // textStyle: {
        //   color: "#969799",
        //   formatter:'"工单数量" + "\n" + "\n" + "666"'
        // }
      }
    ],
    textStyle: {
      fontSize: 15,
      color: "#969799"
    }
  },
  color: ["#3AA1FF", "#FBD437", "#4ECB73", "#31B7B7"],
  calculable: true,
  series: [
    {
      name: "访问来源",
      center: ["27%", "45%"], //饼图的位置
      type: "pie", //类型
      radius: ["45%", "65%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "outside"
      },
      emphasis: {},
      labelLine: {
        show: false
      },
      //饼图的数据
      data: [
        { value: 53, name: "安装" },
        { value: 10, name: "养护" },
        { value: 10, name: "维修" },
        { value: 27, name: "调试" }
      ]
    }
  ]
};

//引用ECharts
// var echarts = require("echarts");

// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// // 引入柱状图
// require("echarts/lib/chart/bar");
// // 引入pie
require("echarts/lib/chart/pie");
// // 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/graphic");
// require("echarts/lib/component/legend")

// 绘制图表

//echarts 有关的代码

let legendRemarksTop = 6.7;
let legendRemarksLeft = 85.5;
let legendRemarksInterval = 22.6;
let legendRemarksColor = "#000";

import footerTabbar from "@/components/footerTabbar.vue";
import orderList from "@/components/orderList.vue";
export default {
  name: "Order",
  components: {
    //
  },
  data() {
    return {
      value1: 2020,
      all: {},
      departments:{
        list:[]
      },
      option1: [
        { text: "2020", value: 2020 },
        { text: "2019", value: 2019 },
        { text: "2018", value: 2018 }
      ],
      date: {
        myChart: "", //放置echarts实例
        show: false, // 日历组件的展示
        select: "2020-05-17" //日历的选择时间
      },
      weixiu: {}, //维修的数组0是已完成1是未完成2是延期完成3是延期中
      yanghu: {},
      anzhuang: {},
      tiaoshi: {},
      pieoption: {
        title: {
          text: "",
          textStyle: {
            color: "#FFFFFF",
            fontSize: 25
          }
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
          showContent: true
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "38%",
            left: "20.5%",
            style: {
              id: "gongdan",
              text: "工单数量" + "\n" + "\n" + "4",
              textAlign: "center",
              fill: "#969799", //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          },
          {
            //添加文字到安装图例后面
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            id: "anzhuang",
            top: legendRemarksTop + "%",
            left: legendRemarksLeft + "%",
            style: {
              text: "99",
              textAlign: "center",
              fill: legendRemarksColor, //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          },
          {
            //添加文字到养护图例后面
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            id: "yanghu",
            top: legendRemarksTop + legendRemarksInterval * 1 + "%",
            left: legendRemarksLeft + "%",
            style: {
              text: "98",
              textAlign: "center",
              fill: legendRemarksColor, //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          },
          {
            //添加文字到养护图例后面
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            id: "weixiu",
            top: legendRemarksTop + legendRemarksInterval * 2 + "%",
            left: legendRemarksLeft + "%",
            style: {
              text: "98",
              textAlign: "center",
              fill: legendRemarksColor, //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          },
          {
            //添加文字到养护图例后面
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            id: "tiaoshi",
            top: legendRemarksTop + legendRemarksInterval * 3 + "%",
            left: legendRemarksLeft + "%",
            style: {
              text: "98",
              textAlign: "center",
              fill: legendRemarksColor, //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          }
        ],
        legend: {
          // type: 'scroll',
          orient: "vertical",
          icon: "rect",
          itemWidth: 14, // 设置宽度
          itemHeight: 14, // 设置高度
          right: 110,
          top: 7,
          width: 10,
          itemGap: 30,
          // label:{
          //   show:true,
          //   formatter:'{a}: {d}',
          //   position:'inside'

          // },
          // padding: [0, 100],
          data: [
            {
              name: "安装"
              // 强制设置图形为圆。
              // icon: "circle",
              // 设置文本为红色
              // textStyle: {
              //   color: "#969799",
              //   formatter:'"工单数量" + "\n" + "\n" + "666"'
              // }
            },
            {
              name: "养护"
              // 强制设置图形为圆。
              // icon: "circle",
              // 设置文本为红色
              // textStyle: {
              //   color: "#969799",
              //   formatter:'"工单数量" + "\n" + "\n" + "666"'
              // }
            },
            {
              name: "维修"
              // 强制设置图形为圆。
              // icon: "circle",
              // 设置文本为红色
              // textStyle: {
              //   color: "#969799",
              //   formatter:'"工单数量" + "\n" + "\n" + "666"'
              // }
            },
            {
              name: "调试"
              // 强制设置图形为圆。
              // icon: "circle",
              // 设置文本为红色
              // textStyle: {
              //   color: "#969799",
              //   formatter:'"工单数量" + "\n" + "\n" + "666"'
              // }
            }
          ],
          textStyle: {
            fontSize: 15,
            color: "#969799"
          }
        },
        color: ["#3AA1FF", "#FBD437", "#4ECB73", "#31B7B7"],
        calculable: true,
        series: [
          {
            name: "访问来源",
            center: ["27%", "45%"], //饼图的位置
            type: "pie", //类型
            radius: ["45%", "65%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "outside"
            },
            emphasis: {},
            labelLine: {
              show: false
            },
            //饼图的数据
            data: [
              { value: 0, name: "安装" },
              { value: 0, name: "养护" },
              { value: 0, name: "维修" },
              { value: 0, name: "调试" }
            ]
          }
        ]
      }
      //
    };
  },
  methods: {
    timeChange(val) {
      console.log(val);
      this.getOrderData();
    },
    changePie(a, b) {
      this.pieoption = {
        series: {
          data: [
            {
              value: a[0],
              name: "安装"
            },
            {
              value: a[1],
              name: "安装"
            },
            {
              value: a[2],
              name: "安装"
            },
            {
              value: a[3],
              name: "安装"
            }
          ]
        },
        graphic: [
          {
            id: "gongdan",
            style: {
              text: "工单数量" + "\n" + "\n" + b,
              textAlign: "center",
              fill: "#969799", //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          },
          {
            id: "anzhuang",
            style: {
              text: a[0] + "",
              textAlign: "center",
              fill: "#969799", //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          },
          {
            id: "yanghu",
            style: {
              text: a[1] + "",
              textAlign: "center",
              fill: "#969799", //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          },
          {
            id: "weixiu",
            style: {
              text: a[2] + "",
              textAlign: "center",
              fill: "#969799", //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          },
          {
            id: "tiaoshi",
            style: {
              text: a[3] + "",
              textAlign: "center",
              fill: "#969799", //文字的颜色
              width: 30,
              height: 30,
              fontSize: fontSizeMultiple(10),
              fontFamily: "Microsoft YaHei"
            }
          }
        ]
      };
      // this.myChart = echarts.init(this.$refs.echartWrap);
      this.myChart.setOption(this.pieoption);
    },
    getOrderData() {
      getOrder({
        appCode: "DEVICE",
        startDate: Number(this.value1 - 1),
        endDate: Number(this.value1),
        status: "2,4"
        // reviewDateTimeBegin:'2019',
        // reviewDateTimeEnd:'2020'
      }).then(res => {
        this.all = res.obj.device_all;
        this.anzhuang = res.obj.device_azjh;
        this.tiaoshi = res.obj.device_ts;
        this.weixiu = res.obj.device_wx;
        this.yanghu = res.obj.device_yh;

        this.echartPie(this.pieoption);
      });
    },
    echartPie(option) {
      // 基于准备好的dom，初始化echarts实例
      if (!this.myChart) {
        this.myChart = echarts.init(this.$refs.echartWrap);
      }
      this.pieoption.graphic = [
        {
          //环形图中间添加文字
          type: "text", //通过不同top值可以设置上下显示
          left: "center",
          top: "38%",
          left: "20.5%",
          style: {
            id: "gongdan",
            text: "工单数量" + "\n" + "\n" + this.all.totalCnt,
            textAlign: "center",
            fill: "#969799", //文字的颜色
            width: 30,
            height: 30,
            fontSize: fontSizeMultiple(10),
            fontFamily: "Microsoft YaHei"
          }
        },
        {
          //添加文字到安装图例后面
          type: "text", //通过不同top值可以设置上下显示
          left: "center",
          id: "anzhuang",
          top: legendRemarksTop + "%",
          left: legendRemarksLeft + "%",
          style: {
            text: "" + this.anzhuang.totalCnt,
            textAlign: "center",
            fill: legendRemarksColor, //文字的颜色
            width: 30,
            height: 30,
            fontSize: fontSizeMultiple(10),
            fontFamily: "Microsoft YaHei"
          }
        },
        {
          //添加文字到养护图例后面
          type: "text", //通过不同top值可以设置上下显示
          left: "center",
          id: "yanghu",
          top: legendRemarksTop + legendRemarksInterval * 1 + "%",
          left: legendRemarksLeft + "%",
          style: {
            text: "" + this.yanghu.totalCnt,
            textAlign: "center",
            fill: legendRemarksColor, //文字的颜色
            width: 30,
            height: 30,
            fontSize: fontSizeMultiple(10),
            fontFamily: "Microsoft YaHei"
          }
        },
        {
          //添加文字到养护图例后面
          type: "text", //通过不同top值可以设置上下显示
          left: "center",
          id: "weixiu",
          top: legendRemarksTop + legendRemarksInterval * 2 + "%",
          left: legendRemarksLeft + "%",
          style: {
            text: "" + this.weixiu.totalCnt,
            textAlign: "center",
            fill: legendRemarksColor, //文字的颜色
            width: 30,
            height: 30,
            fontSize: fontSizeMultiple(10),
            fontFamily: "Microsoft YaHei"
          }
        },
        {
          //添加文字到养护图例后面
          type: "text", //通过不同top值可以设置上下显示
          left: "center",
          id: "tiaoshi",
          top: legendRemarksTop + legendRemarksInterval * 3 + "%",
          left: legendRemarksLeft + "%",
          style: {
            text: "" + this.tiaoshi.totalCnt,
            textAlign: "center",
            fill: legendRemarksColor, //文字的颜色
            width: 30,
            height: 30,
            fontSize: fontSizeMultiple(10),
            fontFamily: "Microsoft YaHei"
          }
        }
      ];
      this.pieoption.series = [
        {
          name: "访问来源",
          center: ["27%", "45%"], //饼图的位置
          type: "pie", //类型
          radius: ["45%", "65%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "outside"
          },
          emphasis: {},
          labelLine: {
            show: false
          },
          //饼图的数据
          data: [
            { value: this.anzhuang.totalCnt, name: "安装" },
            { value: this.yanghu.totalCnt, name: "养护" },
            { value: this.weixiu.totalCnt, name: "维修" },
            { value: this.tiaoshi.totalCnt, name: "调试" }
          ]
        }
      ];
      // 指定图表的配置项和数据
      // var pieoption = {
      //   title: {
      //     text: "",
      //     textStyle: {
      //       color: "#FFFFFF",
      //       fontSize: 25
      //     }
      //   },
      //   tooltip: {
      //     show: true,
      //     trigger: "item",
      //     formatter: "{b}: {c} ({d}%)",
      //     showContent: true
      //   },
      //   graphic: [
      //     {
      //       //环形图中间添加文字
      //       type: "text", //通过不同top值可以设置上下显示
      //       left: "center",
      //       top: "38%",
      //       left: "20.5%",
      //       style: {
      //         text: "工单数量" + "\n" + "\n" + "666",
      //         textAlign: "center",
      //         fill: "#969799", //文字的颜色
      //         width: 30,
      //         height: 30,
      //         fontSize: fontSizeMultiple(10),
      //         fontFamily: "Microsoft YaHei"
      //       }
      //     },
      //     {
      //       //添加文字到安装图例后面
      //       type: "text", //通过不同top值可以设置上下显示
      //       left: "center",
      //       id: "anzhuang",
      //       top: legendRemarksTop+"%",
      //       left: legendRemarksLeft+"%",
      //       style: {
      //         text: "99",
      //         textAlign: "center",
      //         fill: legendRemarksColor, //文字的颜色
      //         width: 30,
      //         height: 30,
      //         fontSize: fontSizeMultiple(10),
      //         fontFamily: "Microsoft YaHei"
      //       }
      //     },
      //     {
      //       //添加文字到养护图例后面
      //       type: "text", //通过不同top值可以设置上下显示
      //       left: "center",
      //       id: "yanghu",
      //       top: legendRemarksTop+legendRemarksInterval*1+"%",
      //       left: legendRemarksLeft+"%",
      //       style: {
      //         text: "98",
      //         textAlign: "center",
      //         fill: legendRemarksColor, //文字的颜色
      //         width: 30,
      //         height: 30,
      //         fontSize: fontSizeMultiple(10),
      //         fontFamily: "Microsoft YaHei"
      //       }
      //     },
      //     {
      //       //添加文字到养护图例后面
      //       type: "text", //通过不同top值可以设置上下显示
      //       left: "center",
      //       id: "weixiu",
      //       top: legendRemarksTop+legendRemarksInterval*2+"%",
      //       left: legendRemarksLeft+"%",
      //       style: {
      //         text: "98",
      //         textAlign: "center",
      //         fill: legendRemarksColor, //文字的颜色
      //         width: 30,
      //         height: 30,
      //         fontSize: fontSizeMultiple(10),
      //         fontFamily: "Microsoft YaHei"
      //       }
      //     },
      //              {
      //       //添加文字到养护图例后面
      //       type: "text", //通过不同top值可以设置上下显示
      //       left: "center",
      //       id: "tiaoshi",
      //       top: legendRemarksTop+legendRemarksInterval*3+"%",
      //       left: legendRemarksLeft+"%",
      //       style: {
      //         text: "98",
      //         textAlign: "center",
      //         fill: legendRemarksColor, //文字的颜色
      //         width: 30,
      //         height: 30,
      //         fontSize: fontSizeMultiple(10),
      //         fontFamily: "Microsoft YaHei"
      //       }
      //     }
      //   ],
      //   legend: {
      //     // type: 'scroll',
      //     orient: "vertical",
      //     icon: "rect",
      //     itemWidth: 14, // 设置宽度
      //     itemHeight: 14, // 设置高度
      //     right: 110,
      //     top: 7,
      //     width: 10,
      //     itemGap: 30,
      //     // label:{
      //     //   show:true,
      //     //   formatter:'{a}: {d}',
      //     //   position:'inside'

      //     // },
      //     // padding: [0, 100],
      //     data: [
      //       {
      //         name: "安装"
      //         // 强制设置图形为圆。
      //         // icon: "circle",
      //         // 设置文本为红色
      //         // textStyle: {
      //         //   color: "#969799",
      //         //   formatter:'"工单数量" + "\n" + "\n" + "666"'
      //         // }
      //       },
      //       {
      //         name: "养护"
      //         // 强制设置图形为圆。
      //         // icon: "circle",
      //         // 设置文本为红色
      //         // textStyle: {
      //         //   color: "#969799",
      //         //   formatter:'"工单数量" + "\n" + "\n" + "666"'
      //         // }
      //       },
      //       {
      //         name: "维修"
      //         // 强制设置图形为圆。
      //         // icon: "circle",
      //         // 设置文本为红色
      //         // textStyle: {
      //         //   color: "#969799",
      //         //   formatter:'"工单数量" + "\n" + "\n" + "666"'
      //         // }
      //       },
      //       {
      //         name: "调试"
      //         // 强制设置图形为圆。
      //         // icon: "circle",
      //         // 设置文本为红色
      //         // textStyle: {
      //         //   color: "#969799",
      //         //   formatter:'"工单数量" + "\n" + "\n" + "666"'
      //         // }
      //       }
      //     ],
      //     textStyle: {
      //       fontSize: 15,
      //       color: "#969799"
      //     }
      //   },
      //   color: ["#3AA1FF", "#FBD437", "#4ECB73", "#31B7B7"],
      //   calculable: true,
      //   series: [
      //     {
      //       name: "访问来源",
      //       center: ["27%", "45%"], //饼图的位置
      //       type: "pie", //类型
      //       radius: ["45%", "65%"],
      //       avoidLabelOverlap: false,
      //       label: {
      //         show: false,
      //         position: "outside"
      //       },
      //       emphasis: {},
      //       labelLine: {
      //         show: false
      //       },
      //       //饼图的数据
      //       data: [
      //         { value: 53, name: "安装" },
      //         { value: 10, name: "养护" },
      //         { value: 10, name: "维修" },
      //         { value: 27, name: "调试" }
      //       ]
      //     }
      //   ]
      // };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.pieoption);
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.date.show = false;
      this.date.select = this.formatDate(date);
    },
    getDepartOrder(){
      getDepartOrder({
        appCode:'DEVICE',
        status:'2,4'
      }).then(
        res=>{
          this.departments.list = res.obj
          console.log(res)
        }

      )
    }
    //
  },
  mounted() {
    this.date.select = this.formatDate(new Date());
    this.getOrderData();
    this.getDepartOrder()

    // this.changePie([10, 20, 30, 40], "8888");
  },
  components: {
    footerTabbar,
    orderList
  }
};
</script>

<style lang="scss" scoped>
#echart-wrap {
  width: 100%;
  height: 4rem;

}
.component-content {
  position: relative;
  padding-bottom: 0.64rem;
  min-height: 100vh;
  background: $color-2;
  user-select: none;
}
.echart-wrap {
  height: 4rem;
}
.panel-item {
  background: #fff;
  border-bottom: 0.2rem #f4f6f6 solid;
}
.panel-title-wrap {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.3rem;
  user-select: none;

  .panel-title {
    width: 0;
    flex-grow: 1;
    color: #555;
    font-weight: bold;
  }
  .edit-item {
    width: 20%;
    display: inline-flex;
    align-items: center;
    border: none;
    background: transparent;
    i {
    }

    time {
      color: #555;
    }
    .icon {
      @include iconfont;
      margin-left: 0.1rem;
      color: #ccc;
      font-size: 0.2rem;
    }
  }
}
.horizontal {
  display: flex;
  flex-wrap: wrap;

  .van-cell {
    flex-basis: 50%;
  }
}
.over-view {
  display: flex;
  align-items: center;

  .view-item {
    width: 0;
    flex-grow: 1;
    padding: 0.2rem;
    text-align: center;

    .num {
      color: $color-1;
    }
    .name {
      margin-top: 0.1rem;
      color: #555;
    }
  }
}
.table-theme-1 {
  width: 100%;

  thead {
    th {
      padding: 0.1rem;
      text-align: center;
      font-weight: bold;
    }
  }
  tbody {
    td {
      padding: 0.1rem;
      text-align: center;
    }
  }
}
</style>
