import { QueueProxy, useDesign, useQueue } from "../index";
import { CurrentQueue, OS_TYPE } from "../queueManager/CurrentQueue";

export class UseQueue {
  getOsTypeMove() {
    return OS_TYPE.MOVE;
  }

  getOsTypeRotate() {
    return OS_TYPE.ROTATE;
  }

  getOsTypeScale() {
    return OS_TYPE.SCALE;
  }

  // 获取队列
  getQueue() {
    return QueueProxy();
  }

  /*
   * 撤销
   * */
  undo() {
    this.getQueue().undo();
  }

  /*
   * 回退
   * */
  redo() {
    this.getQueue().redo();
  }

  /*
   * 清空
   * */
  clear() {
    this.getQueue().clear();
  }

  /*
   * 移动
   * */
  addQueueByMove(image) {
    if (!image) image = useDesign().getActiveImage();
    // 添加队列
    this.getQueue().addQueue(
      new CurrentQueue({
        type: this.getOsTypeMove(),
        image,
      })
    );
  }

  /*
   * 旋转
   * */
  addQueueByRotate(image) {
    if (!image) image = useDesign().getActiveImage();
    // 添加队列
    this.getQueue().addQueue(
      new CurrentQueue({
        type: this.getOsTypeRotate(),
        image,
      })
    );
  }
}
