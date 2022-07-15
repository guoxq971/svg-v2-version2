import { QueueProxy } from "../index";
import { CurrentQueue } from "../queueManager/CurrentQueue";

export class UseQueue {
  /*
   * 移动
   * */
  move(image) {
    QueueProxy().addQueue(
      new CurrentQueue({
        type: "move",
        id: image.id,
        image,
        x: image.getX(),
        y: image.getY(),
      })
    );
  }
}
