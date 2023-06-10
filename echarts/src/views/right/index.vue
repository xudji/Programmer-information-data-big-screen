<template>
  <div class="right-container">
    <h3 class="title">程序员需求人数</h3>
    <div class="row active">
      <span class="col col-1"><span>日期</span></span>
      <span class="col col-2"><span>地址</span></span>
      <span class="col col-1"><span>人数</span></span>
    </div>
    <div
    
      class="list"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
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
          <span class="col col-1">
            <span>{{ item.num }}</span>
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

// 1. 接受获取数据展示
interface ListItem {
  id: number;
  date: string;
  address: string;
  num: number;
}

const list = ref<Array<ListItem | undefined>>([]);

const socket = useWebSocket("ws://localhost:3000");

socket.handleMessage(function (data) {
  // 如果已经获取的数据超过了显示的数据，暂时不获取数据了
  if (list.value.length > endIndex.value) return;
  list.value = list.value.concat(data);
  // 将startIndex之前的数据，清空
  for (let i = 0; i < startIndex.value - 1; i++) {
    list.value[i] = undefined;
  }
});
// socket.socket.onmessage = function (e) {
//   // 如果已经获取的数据超过了显示的数据，暂时不获取数据了
//   if (list.value.length > endIndex.value) return;
//   list.value = list.value.concat(JSON.parse(e.data));
//   // 将startIndex之前的数据，清空
//   for (let i = 0; i < startIndex.value - 1; i++) {
//     list.value[i] = undefined;
//   }
// };

// 2. 让数据动起来
const y = ref(0);
let timeId: NodeJS.Timer;
let isHover = false;

// 3. 优化
const startIndex = ref(0);
const endIndex = ref(25);
const virtualList = ref<ListItem[]>([]);

onMounted(() => {
  timeId = setInterval(() => {
    if (isHover) return;
    // 一上来不动
    if (list.value.length < 25) {
      virtualList.value = list.value as ListItem[];
      return;
    }

    // 开始动
    y.value -= 2;

    if (y.value % 300 === 0) {
      // 刚好走了30px
      startIndex.value++;
      endIndex.value++;
      virtualList.value = list.value.slice(
        startIndex.value,
        endIndex.value
      ) as ListItem[];
    }
  }, 10);
});

onBeforeUnmount(() => {
  clearInterval(timeId);
});
</script>

<style scoped lang="scss">
.right-container {
  height: 100%;
  padding: 0 10px;
}

.title {
  text-align: center;
  height: 15px;
  margin: 10px 0;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
}

.row {
  display: flex;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #61a8ff;
  text-align: center;
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #68d8fe;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #68d8fe;
  }
}

.col-1 {
  flex: 1;
}
.col-2 {
  flex: 2;
}

.col {
  span {
    display: inline-block;
    transform: scale(0.8);
  }
}

.list {
  height: calc(100% - 35px - 30px);
  overflow: hidden;
}
</style>
