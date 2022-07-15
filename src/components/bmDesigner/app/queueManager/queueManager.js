// 队列
import { Message } from "element-ui";

export class QueueManager {
  // 当前项
  currentQueue = {};
  // 撤销栈
  undoQueue = [];
  // 回退栈
  redoQueue = [];

  log() {
    console.log("===============================");
    console.log("撤销栈", this.undoQueue);
    console.log("回退栈", this.redoQueue);
    console.log("当前项", this.currentQueue);
  }

  // 撤销
  undo() {
    if (this.getUndoQueue().length === 0) {
      Message.warning("撤销栈为空");
      return;
    }
    this.redoQueue.push(this.getCurrentQueue());
    this.setCurrentQueue(this.undoQueue.pop());
    this.log();
    return this.getCurrentQueue();
  }

  // 回退
  redo() {
    if (this.getRedoQueue().length === 0) {
      Message.warning("回退栈为空");
      return;
    }
    this.undoQueue.push(this.getCurrentQueue());
    this.setCurrentQueue(this.redoQueue.pop());
    this.log();
    return this.getCurrentQueue();
  }

  // 添加队列
  addQueue(queue) {
    this.setCurrentQueue(queue);
    this.undoQueue.push(queue);
    if (this.getRedoQueue().length > 0) {
      this.clearRedoQueue();
    }
    this.log();
  }

  // 获取撤销栈
  getUndoQueue() {
    return this.undoQueue;
  }

  // 获取回退栈
  getRedoQueue() {
    return this.redoQueue;
  }

  // 清空撤销栈
  clearUndoQueue() {
    this.undoQueue = [];
  }

  // 清空回退栈
  clearRedoQueue() {
    this.redoQueue = [];
  }

  // 清空撤销栈和回退栈
  clear() {
    this.clearUndoQueue();
    this.clearRedoQueue();
  }

  // 设置当前项
  setCurrentQueue(queue) {
    this.currentQueue = queue;
  }
  // 获取当前项
  getCurrentQueue() {
    return this.currentQueue;
  }
}
