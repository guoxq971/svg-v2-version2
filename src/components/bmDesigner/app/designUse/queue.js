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
  addQueue() {
    let imageList = [];
    const prod = useDesign().getProd();
    prod.getDesignSNodeGroup().forEach((image) => {
      imageList.push(new ImageQueue(image));
    });
    this.getQueue().addQueue(
      new CurrentQueue({
        imageList: imageList,
        actionImageId: prod.getImageActionId(),
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
