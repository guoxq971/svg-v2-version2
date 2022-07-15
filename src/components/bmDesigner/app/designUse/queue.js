// 操作通道-move
import { QueueProxy } from "../index";
import { CurrentQueue } from "../queueManager/CurrentQueue";

export function addQueueByMove(image) {
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
