import { Design } from "../entity/Design";

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
