export default {
  title: {
    // text: "学习变化",
    textStyle: {
      color: "#fff",
      fontSize: 12,
    },
    left: "center",
    top: 10,
  },
  xAxis: {
    // data: [
    //   "1月",
    //   "2月",
    //   "3月",
    //   "4月",
    //   "5月",
    //   "6月",
    //   "7月",
    //   "8月",
    //   "9月",
    //   "10月",
    //   "11月",
    //   "12月",
    // ],
    axisLabel: {
      // 文字样式
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: 8,
    },
    axisTick: {
      // 刻度线
      show: false,
    },
    axisLine: {
      // 轴线
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  yAxis: {
    axisLabel: {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: 8,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
    splitLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  // series: [
  //   {
  //     type: "line",
  //     name: "新增项目",
  //     data: [250, 550, 450, 370, 280, 250, 550, 450, 370, 280, 320, 340],
  //     smooth: true,
  //   },
  //   {
  //     type: "line",
  //     name: "新增技能",
  //     data: [370, 280, 250, 550, 450, 250, 280, 320, 340, 550, 450, 370],
  //     smooth: true,
  //   },
  // ],
  grid: {
    top: 45,
    bottom: 10,
    left: 10,
    right: 10,
    containLabel: true,
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, .5)",
    borderWidth: 0,
    textStyle: {
      color: "#fff",
      fontSize: 12,
    },
    formatter: "{b}: {c}个",
    trigger: "axis",
    axisPointer: {
      type: "line",
    },
  },
  legend: {
    right: 10,
    top: 10,
    textStyle: {
      fontSize: 9,
      color: "#fff",
    },
    itemWidth: 16,
    itemHeight: 8,
  },
};
