import { QueueProxy, useDesign } from "../index";
import { ImageQueue } from "../queueManager/ImageQueue";
import { CurrentQueue } from "../queueManager/CurrentQueue";

export class UseQueue {
  // 获取队列
  getQueue() {
    return QueueProxy();
  }

  /*
   * 添加一次队列
   * */
  addQueue(param = {}) {
    const prod = useDesign().getProd();
    const imageList = prod
      .getDesignSNodeGroup()
      .map((image) => new ImageQueue(image));

    this.getQueue().addQueue(
      new CurrentQueue({
        imageList: imageList,
        actionImageId: prod.getImageActionId(),
        ...param,
      })
    );
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
}
