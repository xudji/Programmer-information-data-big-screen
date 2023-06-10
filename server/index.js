const { WebSocketServer } = require("ws");
const Mock = require("mockjs");

// 1. 创建ws服务器
const wss = new WebSocketServer({
  port: 3000,
});

// 一定需要调用
Mock.Random.date();
Mock.Random.city();
Mock.Random.integer();

let id = 1;

function sendMessage(socket) {
  // 1000 - 10000 的随机：1~10秒随机
  const randomTime = Math.round(Math.random() * 2000 + 1000);

  setTimeout(() => {
    // 生成随机数据
    let data = Mock.mock({
      // 生成list数据，长度1-10
      "list|15-25": [
        {
          date: "@date",
          address: "@city",
          num: "@integer(100, 10000)",
        },
      ],
    });

    data = data.list.map((item) => {
      return {
        ...item,
        id: id++,
      };
    });

    socket.send(JSON.stringify(data));

    sendMessage(socket);
  }, randomTime);
}

// 2. 监听客户端连接事件
wss.on("connection", function (socket) {
  sendMessage(socket);

  socket.on("message", function (data) {
    if (data.toString() === "ping") {
      socket.send("pong");
    }
  });
});
