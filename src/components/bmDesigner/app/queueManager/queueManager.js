import { Message } from "element-ui";
import { useDesign } from "../index";
import {
  DEFILE_QUEUE_OSTYPE_REDO,
  DEFILE_QUEUE_OSTYPE_UNDO,
} from "../utils/define";

// 队列
export class QueueManager {
  // 当前项
  currentQueue;
  // 撤销栈
  undoQueue = [];
  // 回退栈
  redoQueue = [];

  log() {
    let btn = true;
    if (btn) {
      console.log("撤销栈", this.undoQueue);
      console.log("回退栈", this.redoQueue);
      console.log("当前项", this.currentQueue);
      console.log(arguments);
      console.log("===============================");
    }
  }

  /*
   * 执行
   * @param {Object} newQueue 新的当前项
   * @param {Object} oldQueue 旧的当前项
   * @param {String} osType 操作类型
   * 1. 如果old和new的id不同，则从新设置设计图激活id
   * */
  execute(newQueue, oldQueue, osType) {
    let logMsg = "";
    // 如果当前项存在，才进行操作
    if (newQueue) {
      let image = newQueue.getImage();
      // 切换设计图操作
      if (newQueue.isCut(oldQueue)) {
        useDesign().setImageActionId(newQueue.getImage());
      }
      // 设置移动
      if (newQueue.isCut(oldQueue)) {
        image.imageMoveReal(newQueue.getX(), newQueue.getY());
      } else {
        let dx = newQueue.getCx() - oldQueue.getCx();
        let dy = newQueue.getCy() - oldQueue.getCy();
        if (dx !== 0 || dy !== 0) {
          image.imageMove(dx, dy);
        }
      }
      // 设置旋转
      if (newQueue.isCut(oldQueue)) {
        image.imageRotateReal(newQueue.getAngle());
      } else {
        if (newQueue.getAngle() !== oldQueue.getAngle()) {
          image.imageRotateReal(newQueue.getAngle());
        }
      }
    }
    this.log(logMsg, newQueue, oldQueue);
  }

  /*
   * 撤销
   * 1. 如果撤销栈为空，则提示撤销栈为空
   * 2. 将当前项添加到回退栈
   * 3. 获取撤销栈的最后一项
   * 4. 将当前项设置为撤销栈的最后一项
   * 5. 执行命令 execute()
   * */
  undo() {
    if (this.isUndoQueueEmpty()) {
      Message.warning("撤销栈为空");
      return;
    }
    let oldQueue = this.getCurrentQueue();
    let newQueue = this.getUndoQueue().pop();
    this.addRedoQueue(oldQueue);
    this.setCurrentQueue(newQueue);
    this.execute(newQueue, oldQueue, this.getUndoType());
  }

  /*
   * 回退
   * 1. 如果回退栈为空，则提示回退栈为空
   * 2. 将当前项添加到撤销栈
   * 3. 获取回退栈的最后一项
   * 4. 将当前项设置为回退栈的最后一项
   * 5. 执行命令 execute()
   * */
  redo() {
    if (this.isRedoQueueEmpty()) {
      Message.warning("回退栈为空");
      return;
    }
    let oldQueue = this.getCurrentQueue();
    let newQueue = this.getRedoQueue().pop();
    this.addUndoQueue(oldQueue);
    this.setCurrentQueue(newQueue);
    this.execute(newQueue, oldQueue, this.getRedoType());
  }

  /*
   *  添加队列
   * 1. 获取当前项
   * 2. 当前项不为空，则将当前项添加到撤销栈
   * 3. 设置接受的queue为当前项
   * 4. 如果回退栈不为空，则清空回退栈
   * */
  addQueue(queue) {
    let currentQueue = this.getCurrentQueue();
    if (currentQueue) {
      this.addUndoQueue(currentQueue);
    }
    this.setCurrentQueue(queue);
    if (!this.isRedoQueueEmpty()) this.clearRedoQueue();
    this.log(
      `添加队列；当前操作:${queue.getOsType()}, 操作值:${queue.getValueByType()}`
    );
  }

  // 添加撤销栈
  addUndoQueue(queue) {
    this.undoQueue.push(queue);
  }

  // 添加回退栈
  addRedoQueue(queue) {
    this.redoQueue.push(queue);
  }

  // 获取撤销栈
  getUndoQueue() {
    return this.undoQueue;
  }

  // 获取回退栈
  getRedoQueue() {
    return this.redoQueue;
  }

  // 获取撤销栈长度
  getUndoQueueLength() {
    return this.getUndoQueue().length;
  }

  // 获取回退栈长度
  getRedoQueueLength() {
    return this.getRedoQueue().length;
  }

  /*
   * 回退栈是否为空
   * @return {Boolean} true为空，false不为空
   * */
  isRedoQueueEmpty() {
    return this.getRedoQueueLength() === 0;
  }

  /*
   * 撤销栈是否为空
   * @return {Boolean} true为空，false不为空
   * */
  isUndoQueueEmpty() {
    return this.getUndoQueueLength() === 0;
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
    this.log();
  }

  // 设置当前项
  setCurrentQueue(queue) {
    this.currentQueue = queue;
  }

  // 获取当前项
  getCurrentQueue() {
    return this.currentQueue;
  }

  // 获取撤销操作类型
  getUndoType() {
    return DEFILE_QUEUE_OSTYPE_UNDO;
  }

  // 获取回退操作类型
  getRedoType() {
    return DEFILE_QUEUE_OSTYPE_REDO;
  }

  // 操作类型是否为撤销操作
  isUndoType(type) {
    return type === this.getUndoType();
  }

  // 操作类型是否为回退操作
  isRedoType(type) {
    return type === this.getRedoType();
  }
}
