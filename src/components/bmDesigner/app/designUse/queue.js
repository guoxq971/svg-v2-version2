import { QueueProxy, useDesign } from "../index";
import { CurrentQueue } from "../queueManager/CurrentQueue";
import {
  DEFILE_IMAGE_OSTYPE_MOVE,
  DEFILE_IMAGE_OSTYPE_ROTATE,
} from "../utils/define";

export class UseQueue {
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
        type: DEFILE_IMAGE_OSTYPE_MOVE,
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
        type: DEFILE_IMAGE_OSTYPE_ROTATE,
        image,
      })
    );
  }
}
