interface HandleMessageCallback {
  (data: any): any;
}

class Socket {
  url: string;
  socket!: WebSocket;

  heartCheckState = false;
  startHeartCheckTimeout = 60000; // 心跳检测间隔开始时间
  endHeartCheckTimeout = 2000; // 心跳检测间隔结束时间

  reconnectTimeout = 60000; // 重连时间
  reconnectCount = 0; // 重连次数
  reconnectMaxCount = 5; // 重连最大次数
  reconnectTimeId!: NodeJS.Timer;

  callbacks: HandleMessageCallback[] = [];

  constructor(url: string) {
    this.url = url;
    this.init();
  }

  /**
   * 初始化 WebSocket
   */
  init() {
    this.socket = new WebSocket(this.url);

    this.socket.onclose = (e: Event) => {
      this.handleClose(e);
    };
    this.socket.onerror = (e: Event) => {
      this.handleError(e);
    };

    this.socket.onopen = (e: Event) => {
      this.handleOpen(e);
    };

    this.socket.onmessage = (e: MessageEvent) => {
      if (e.data === "pong") {
        this.heartCheckState = true;
      } else {
        // 才是别人需要的消息
        let data: any = "";

        try {
          data = JSON.parse(e.data);
        } catch {
          data = e.data;
        }

        this.callbacks.forEach((cb) => cb(data));
      }
    };
  }

  /**
   * 接受消息方法
   */
  handleMessage(cb: HandleMessageCallback) {
    this.callbacks.push(cb);
  }

  /**
   * 发送消息
   */
  sendMessage(data: object | string) {
    if (data && typeof data === "object") {
      data = JSON.stringify(data);
    }
    this.socket.send(data);
  }

  handleOpen(e: Event) {
    console.log("open");
    this.reconnectCount = 0; // 将重连次数设置为0
    this.startHeartCheck();
  }
  handleClose(e: Event) {
    console.log("close");
    this.reconnect();
  }
  handleError(e: Event) {
    console.log("error");
  }

  /**
   * 开始心跳检测
   */
  startHeartCheck() {
    setTimeout(() => {
      // 每隔xx秒向ws服务器发送ping消息（正常情况下，服务器会响应pong消息）
      this.socket.send("ping");
      setTimeout(() => {
        // 检测是否响应pong消息
        if (this.heartCheckState) {
          // 心跳检测通过
          this.heartCheckState = false;
          // 开始下一轮的心跳检测
          this.startHeartCheck();
          return;
        }
        // 说明心跳检测失败：断线了 -> 关闭ws连接
        // this.socket.close();
        this.reconnect();
      }, this.endHeartCheckTimeout);
    }, this.startHeartCheckTimeout);
  }

  /**
   * 重连
   */
  reconnect() {
    if (this.reconnectCount > this.reconnectMaxCount) {
      console.log("重连到最大次数了");
      return;
    }

    console.log("开始重连");
    clearTimeout(this.reconnectTimeId);
    this.reconnectTimeId = setTimeout(() => {
      this.reconnectCount++;
      this.init();
    }, this.reconnectTimeout);
  }
}

const useWebSocket = (url: string) => {
  const socket = new Socket(url);
  return socket;
};

export default useWebSocket;
