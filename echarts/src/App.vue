<template>
  <div class="container">
    <div
      :style="{
        transform: `scale(${scale})`,
      }"
    >
      <div class="header">
        <h1 class="title">数据大屏实时展示</h1>
        <span class="time">当前时间: {{ time }}</span>
      </div>

      <div class="main">
        <div class="left">
          <Card>
            <Chart :option="barOptions" />
          </Card>
          <Card>
            <Chart :option="lineOptions" />
          </Card>
          <Card>
            <Chart :option="pieOptions" />
          </Card>
        </div>
        <div class="center"><Center /></div>
        <div class="right">
          <Card :style="{ height: '100%' }"><Right /></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import Card from "@/components/Card/index.vue";
import Chart from "@/components/Chart/index.vue";
import Center from "./views/center/index.vue";
import Right from "./views/right/index.vue";
import type { ECOption } from "@/utils/echarts";

// 功能3：大屏适配

const scale = ref(1);

const resize = () => {
  // 设计稿的宽高
  const designDraftWidth = 1366;
  const designDraftHeight = 617;
  // 屏幕的宽高
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  scale.value =
    clientWidth / clientHeight > designDraftWidth / designDraftHeight
      ? // 宽度更宽，这是宽屏
        clientHeight / designDraftHeight
      : // 高度更高，这是窄屏
        clientWidth / designDraftWidth;
};

onMounted(() => {
  window.addEventListener("resize", resize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
});

// 功能2：图表功能
const barOptions = reactive<ECOption>({
  title: {
    text: "各行业程序员数量",
    // textStyle: {
    //   color: "#fff",
    //   fontSize: 12,
    // },
    // left: "center",
    // top: 10,
  },
  xAxis: {
    data: [
      "旅游行业",
      "游戏行业",
      "电商行业",
      "医疗行业",
      "金融行业",
      "教育培训",
      "餐饮行业",
    ],
    // axisLabel: {
    //   // 文字样式
    //   color: "rgba(255, 255, 255, 0.6)",
    //   fontSize: 8,
    // },
    // axisTick: {
    //   // 刻度线
    //   show: false,
    // },
    // axisLine: {
    //   // 轴线
    //   show: true,
    //   lineStyle: {
    //     color: "rgba(255, 255, 255, 0.1)",
    //   },
    // },
  },
  // yAxis: {
  //   axisLabel: {
  //     color: "rgba(255, 255, 255, 0.6)",
  //     fontSize: 8,
  //   },
  //   axisLine: {
  //     show: true,
  //     lineStyle: {
  //       color: "rgba(255, 255, 255, 0.1)",
  //     },
  //   },
  //   splitLine: {
  //     lineStyle: {
  //       color: "rgba(255, 255, 255, 0.1)",
  //     },
  //   },
  // },
  series: {
    type: "bar",
    data: [300, 200, 400, 250, 550, 450, 350],
    barWidth: 15,
    itemStyle: {
      borderRadius: 3,
    },
  },
  // grid: {
  //   top: 45,
  //   bottom: 10,
  //   left: 10,
  //   right: 10,
  //   containLabel: true,
  // },
  tooltip: {
    // backgroundColor: "rgba(0, 0, 0, .5)",
    // borderWidth: 0,
    // textStyle: {
    //   color: "#fff",
    //   fontSize: 12,
    // },
    // formatter: "{b}: {c}个",
    // trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
});

const lineOptions = reactive<ECOption>({
  title: {
    text: "学习变化",
    // textStyle: {
    //   color: "#fff",
    //   fontSize: 12,
    // },
    // left: "center",
    // top: 10,
  },
  xAxis: {
    data: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    // axisLabel: {
    //   // 文字样式
    //   color: "rgba(255, 255, 255, 0.6)",
    //   fontSize: 8,
    // },
    // axisTick: {
    //   // 刻度线
    //   show: false,
    // },
    // axisLine: {
    //   // 轴线
    //   show: true,
    //   lineStyle: {
    //     color: "rgba(255, 255, 255, 0.1)",
    //   },
    // },
  },
  // yAxis: {
  //   axisLabel: {
  //     color: "rgba(255, 255, 255, 0.6)",
  //     fontSize: 8,
  //   },
  //   axisLine: {
  //     show: true,
  //     lineStyle: {
  //       color: "rgba(255, 255, 255, 0.1)",
  //     },
  //   },
  //   splitLine: {
  //     lineStyle: {
  //       color: "rgba(255, 255, 255, 0.1)",
  //     },
  //   },
  // },
  series: [
    {
      type: "line",
      name: "新增项目",
      data: [250, 550, 450, 370, 280, 250, 550, 450, 370, 280, 320, 340],
      smooth: true,
    },
    {
      type: "line",
      name: "新增技能",
      data: [370, 280, 250, 550, 450, 250, 280, 320, 340, 550, 450, 370],
      smooth: true,
    },
  ],
  // grid: {
  //   top: 45,
  //   bottom: 10,
  //   left: 10,
  //   right: 10,
  //   containLabel: true,
  // },
  // tooltip: {
  //   backgroundColor: "rgba(0, 0, 0, .5)",
  //   borderWidth: 0,
  //   textStyle: {
  //     color: "#fff",
  //     fontSize: 12,
  //   },
  //   formatter: "{b}: {c}个",
  //   trigger: "axis",
  //   axisPointer: {
  //     type: "line",
  //   },
  // },
  // legend: {
  //   right: 10,
  //   top: 10,
  //   textStyle: {
  //     fontSize: 9,
  //     color: "#fff",
  //   },
  //   itemWidth: 16,
  //   itemHeight: 8,
  // },
});

const pieOptions = reactive<ECOption>({
  title: {
    text: "工程师年龄分布",
  },
  xAxis: {
    show: false,
  },
  yAxis: {
    show: false,
  },
  series: {
    type: "pie",
    data: [
      {
        name: "20岁以下",
        value: 20,
      },
      {
        name: "20-29岁",
        value: 30,
      },
      {
        name: "30-39岁",
        value: 40,
      },
      {
        name: "40-49岁",
        value: 50,
      },
      {
        name: "50岁以上",
        value: 60,
      },
    ],
    radius: [30, 45],
    labelLine: {
      show: false,
    },
    label: {
      show: false,
    },
  },
  legend: {
    top: "bottom",
    itemWidth: 10,
  },
  tooltip: {
    trigger: "item",
  },
});

// 功能1：定时器显示时间功能
const time = ref(dayjs().format("YYYY年MM月DD日 HH时mm分ss秒"));
let timeId: NodeJS.Timer;
onMounted(() => {
  timeId = setInterval(() => {
    time.value = dayjs().format("YYYY年MM月DD日 HH时mm分ss秒");
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timeId);
});
</script>

<style scoped lang="scss">
// @import "./styles/variables.scss";
.container {
  height: 100vh;
  background-color: $bg-color;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  height: 60px;
  background-image: url("./assets/images/head_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
}

.title {
  color: $text-color-1;
  text-align: center;
  margin: 10px 0 0;
  font-size: 22px;
}

.time {
  position: absolute;
  top: 15px;
  right: 10px;
  color: $text-color-2;
  font-size: 12px;
}

.main {
  width: 1366px;
  height: 557px;
  display: flex;
}

.left,
.right {
  width: 370px;
  height: 100%;
  padding: 0 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.center {
  flex: 1;
  height: 100%;
}
</style>
