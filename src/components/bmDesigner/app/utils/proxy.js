import { Design } from "../entity/Design";
import { QueueManager } from "../queueManager/queueManager";
import { UseQueue } from "../designUse/queue";

export const ProxyCreateDesign = (function () {
  let instance;
  return function (param) {
    // 代理函数只做管理单例
    if (instance) {
      return instance;
    }
    return (instance = new Design(param));
  };
})();

// 撤销、重做
export const ProxyCreateQueueManager = (function () {
  let instance;
  return function () {
    // 代理函数只做管理单例
    if (instance) {
      return instance;
    }
    return (instance = new QueueManager());
  };
})();

// 撤销、重做-快捷封装
export const ProxyCreateUseQueue = (function () {
  let instance;
  return function () {
    // 代理函数只做管理单例
    if (instance) {
      return instance;
    }
    return (instance = new UseQueue());
  };
})();
