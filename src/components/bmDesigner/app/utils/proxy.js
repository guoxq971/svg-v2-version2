import { Design } from "../entity/Design";
import { QueueManager } from "../queueManager/queueManager";
import { UseQueue } from "../designUse/queue";
import { UseDesign } from "../designUse/design";

// 设计器类
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

// 设计器类-快捷方式
export const ProxyCreateUseDesign = (function () {
  let instance;
  return function () {
    // 代理函数只做管理单例
    if (instance) {
      return instance;
    }
    return (instance = new UseDesign());
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
