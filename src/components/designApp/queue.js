import _ from "lodash";
import { Message } from "element-ui";
class queue {
  constructor() {
    // 撤销栈
    this.undoStack = [];
    // 回退栈
    this.redoStack = [];
    // 当前项
    this.current = null;
  }

  addQueue(prod, type) {
    let keys = Object.keys(prod);
    let copyProd = { msgType: type };
    keys.forEach((key) => {
      if (key === "vueThis") return;
      copyProd[key] = _.cloneDeep(prod[key]);
    });
    if (this.current) {
      this.undoStack.push(this.current);
    }
    if (this.redoStack.length) {
      this.redoStack = [];
    }
    this.current = copyProd;
    console.log(useQueue());
  }

  // 撤销
  undo() {
    if (this.undoStack.length === 0) {
      Message.warning("没有可撤销的操作");
      return;
    }
    this.redoStack.push(this.current);
    this.current = this.undoStack.pop();
    return this.current;
  }
}

// 单例模式导出queue
export const useQueue = (function () {
  let instance;
  return function () {
    // 代理函数只做管理单例
    if (instance) {
      return instance;
    }
    return (instance = new queue());
  };
})();
