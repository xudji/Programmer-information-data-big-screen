<template>
  <div
    :style="{
      width: width || '100%',
      height: height || '100%',
    }"
    ref="chartRef"
  ></div>
</template>

<script lang="ts">
export default {
  name: "Chart",
};
</script>

<script lang="ts" setup>
// import * as echarts from "echarts"; // 完整引入
// import type { EChartsOption } from "echarts";
import echarts, { ECOption } from "@/utils/echarts";
import { ref, onMounted } from "vue";
import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";
import commonOption from "./commonOption";

const props = defineProps<{
  width?: string;
  height?: string;
  option: ECOption;
}>();

const chartRef = ref();

onMounted(() => {
  const echartsInstance = echarts.init(chartRef.value);
  // const option = merge(merge({}, commonOption), props.option);
  const option = merge(cloneDeep(commonOption), props.option);
  echartsInstance.setOption(option);
});
</script>

<style scoped></style>
