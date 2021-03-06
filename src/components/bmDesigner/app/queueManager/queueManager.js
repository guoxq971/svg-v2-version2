import { Message } from "element-ui";
import { useDesign } from "../index";
import {
  DEFILE_QUEUE_OSTYPE_REDO,
  DEFILE_QUEUE_OSTYPE_UNDO,
} from "../utils/define";

// 队列
export class QueueManager {
  // 记录执行次数(log)
  index = 0;
  // 当前项
  currentQueue;
  // 撤销栈
  undoQueue = [];
  // 回退栈
  redoQueue = [];

  log(osType) {
    this.index++;
    let btn = true;
    if (btn) {
      let u = "===============================";
      console.log(u + `任务队列-${this.index}-${osType}` + u);
      console.log("撤销栈", this.undoQueue);
      console.log("回退栈", this.redoQueue);
      console.log("当前项", this.currentQueue);
      console.log(u + u);
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
    // 如果当前项存在，才进行操作
    if (newQueue) {
      // 切换当前激活设计图操作
      useDesign().setImageActionId(
        newQueue.getActionImageId(),
        newQueue.getProd()
      );
      // 循环对所有设计图操作
      newQueue.getImageList().forEach((imageQueue, index) => {
        let image = imageQueue.getImage();
        // 显示隐藏
        image.layerTrigger(imageQueue.getIsShow(), false);
        // 层级
        // useDesign().swapLayerIndex(curSid, cutSid, type, layerList)
        //矩阵
        image.setX(imageQueue.getX());
        image.setY(imageQueue.getY());
        image.setAngle(imageQueue.getAngle());
        image.setScale(imageQueue.getScale());
        let dom = image.getDom();
        dom.imgBd.attr("transform", imageQueue.imageProp.imgBdMatrix);
        dom.editBd.attr("transform", imageQueue.imageProp.editBdMatrix);
        dom.img.attr("transform", imageQueue.imageProp.imgMatrix);
        let props = ["x", "y", "width", "height"];
        let domes = [
          "editRect",
          "editMove",
          "editRotate",
          "editScale",
          "editDelete",
        ];
        domes.forEach((domKey) => {
          props.forEach((prop) => {
            dom[domKey].attr(prop, imageQueue.imageProp[domKey][prop]);
          });
        });
      });
    }
    this.log(osType);
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
   * @param {Object} queue 队列
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
    this.log("add");
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
    this.log("clear");
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
