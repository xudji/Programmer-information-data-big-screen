<template>
  <div class="right-container">
    <h3 class="title">程序员需求人数</h3>
    <div class="row active">
      <span class="col col-1"><span>时间</span></span>
      <span class="col col-2"><span>时间</span></span>
      <span class="col col-1"><span>时间</span></span>
    </div>
    <div
      class="list"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        :style="{
          transform: `translateY(${y / 10}px)`,
        }"
      >
        <div
          :style="{
            height: startIndex * 30 + 'px',
          }"
        ></div>
        <div class="row" v-for="item in virtualList" :key="item.id">
          <span class="col col-1">
            <span>{{ item.date }}</span>
          </span>
          <span class="col col-2">
            <span>{{ item.address }}</span>
          </span>
          <span class="col col-1"
            ><span>{{ item.num }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Right",
};
</script>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import useWebSocket from "@/utils/webSocket";

// 1. 数据展示功能
interface ListItem {
  id: number;
  date: string;
  address: string;
  num: number;
}

// 所有原数据
const list = ref<Array<ListItem | undefined>>([]);
// 虚拟列表：只渲染 25 个
const virtualList = ref<ListItem[]>([]);

const startIndex = ref(0);
const endIndex = ref(25);

const socket = useWebSocket("ws://localhost:3000");

socket.onmessage = function (e) {
  if (list.value.length > endIndex.value) return;
  list.value = list.value.concat(JSON.parse(e.data));
  for (let i = 0; i < startIndex.value; i++) {
    list.value[i] = undefined;
  }
};

// 2. 数据动起来
const isHover = ref(false);
const y = ref(0);
let timeId: NodeJS.Timer;

const handleMouseEnter = () => {
  isHover.value = true;
};

const handleMouseLeave = () => {
  isHover.value = false;
};

onMounted(() => {
  timeId = setInterval(() => {
    if (list.value.length <= 25) {
      virtualList.value = list.value as ListItem[];
      return;
    }
    if (isHover.value) return;

    y.value -= 2;

    if (y.value % 300 === 0) {
      startIndex.value++;
      endIndex.value++;
      virtualList.value = list.value.slice(
        startIndex.value,
        endIndex.value
      ) as ListItem[];
    }
  }, 1000 / 60);
});

onBeforeUnmount(() => {
  clearInterval(timeId);
});
</script>

<style scoped lang="scss">
.right-container {
  height: 100%;
  overflow: hidden;
  padding: 0 10px;
}

.title {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  height: 15px;
  margin: 10px 0;
}

.row {
  color: #61a8ff;
  display: flex;
  height: 30px;
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #68d8fe;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #68d8fe;
  }
}
.col {
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  span {
    display: inline-block;
    transform: scale(0.8);
  }
}
.col-1 {
  flex: 1;
}
.col-2 {
  flex: 2;
}

.list {
  height: calc(100% - 35px - 30px);
  overflow: hidden;
}
</style>
