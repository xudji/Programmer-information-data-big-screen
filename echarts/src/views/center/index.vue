<template>
  <div class="center">
    <img class="img jt-img" src="@/assets/images/jt.png" alt="jt" />
    <img class="img lbx-img" src="@/assets/images/lbx.png" alt="lbx" />
    <img class="img map-img" src="@/assets/images/map.png" alt="map" />
    <Chart :option="mapOption" />
  </div>
</template>

<script lang="ts">
export default {
  name: "Center",
};
</script>

<script lang="ts" setup>
import { reactive } from "vue";
import echarts, { ECOption } from "@/utils/echarts";

import Chart from "@/components/Chart/index.vue";
import china from "./china.json";

// 注册地图
echarts.registerMap("china", china as any);

const mapOption = reactive<ECOption>({
  title: {
    show: false,
  },
  xAxis: {
    show: false,
  },
  yAxis: {
    show: false,
  },
  legend: {
    show: false,
  },
  tooltip: {
    show: false,
  },
  // 使用地图
  geo: {
    map: "china",
    itemStyle: {
      areaColor: "rgba(104, 216, 254, 0.5)",
      borderColor: "rgba(104, 216, 254, 0.8)",
    },
    label: {
      color: "#fff",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(104, 216, 254)",
      },
      label: {
        color: "#fff",
      },
    },
  },
  series: [
    {
      type: "effectScatter",
      coordinateSystem: "geo",
      data: [
        [116.4551, 40.8539, "北京"],
        [114.06667, 22.61667, "深圳"],
        [114, 30, "武汉"],
        [121.373237, 31.273094, "上海"],
      ],
      itemStyle: {
        color: "#fff",
      },
      label: {
        show: true,
        formatter: "{@[2]}",
        color: "#fff",
        offset: [20, 0],
        fontSize: 10,
      },
    },
    {
      type: "lines",
      data: [
        {
          coords: [
            [116.4551, 40.8539], // 起点
            [114.06667, 22.61667], // 终点
          ],
        },
        {
          coords: [
            [116.4551, 40.8539], // 起点
            [121.373237, 31.273094], // 终点
          ],
        },
        {
          coords: [
            [116.4551, 40.8539], // 起点
            [114, 30], // 终点
          ],
        },
      ],
      lineStyle: {
        color: "#fff",
        width: 2,
        curveness: 0.2,
      },
      effect: {
        show: true,
        symbol:
          "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
        symbolSize: 12,
        trailLength: 0,
      },
    },
  ],
});
</script>

<style scoped lang="scss">
.center {
  width: 100%;
  height: 100%;
  position: relative;
}

.img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  opacity: 0.3;
}

.lbx-img {
  width: 500px;
  height: 500px;
  animation: rotate linear 20s infinite;
}

.map-img {
  width: 350px;
  height: 350px;
  animation: rotate linear 20s infinite;
}

.jt-img {
  width: 380px;
  height: 380px;
  animation: rotate linear 20s infinite reverse;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
