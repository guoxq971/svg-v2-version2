import { Message } from "element-ui";
import { cloneDeep } from "@/components/designApp/util";
import { useVueProd } from "@/components/designApp/useUtil";
class queue {
  constructor() {
    // 撤销栈
    this.undoStack = [];
    // 回退栈
    this.redoStack = [];
    // 当前项
    this.current = null;
  }

  log() {
    console.log("====");
    console.log("当前", useQueue().current);
    console.log("撤回栈", useQueue().undoStack);
    console.log("回退栈", useQueue().redoStack);
  }

  addQueue(type) {
    setTimeout(() => {
      let prod = useVueProd().vurProd.prod;
      let keys = Object.keys(prod);
      let copyProd = { msgType: type };
      keys.forEach((key) => {
        if (["vueThis", "msgType"].includes(key)) return;
        copyProd[key] = cloneDeep(prod[key]);
      });
      if (this.current) {
        this.undoStack.push(this.current);
      }
      if (this.redoStack.length) {
        this.redoStack = [];
      }
      this.current = copyProd;
      this.log();
    });
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
  // 回退
  redo() {
    if (this.redoStack.length === 0) {
      Message.warning("没有可回退的操作");
      return;
    }
    this.undoStack.push(this.current);
    this.current = this.redoStack.pop();
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
