import { QueueProxy } from "@/components/bmDesigner/app";
import { CurrentQueue } from "@/components/bmDesigner/app/queueManager/CurrentQueue";

export class ImageMove {
  x;
  y;
  dx;
  dy;
  org_x;
  org_y;

  start(imgSNode, x, y, event, image) {
    this.x = x;
    this.y = y;
    this.org_x = image.getX();
    this.org_y = image.getY();
  }

  move(imgSNode, dx, dy, x, y, event, image) {
    let prod = image.getProd();
    let dom = image.getDom();
    let _x = x - this.x;
    let _y = y - this.y;
    this.dx = dx;
    this.dy = dy;
    // 移动
    image.imageMove(_x, _y);
    this.x = x;
    this.y = y;
  }

  end(imgSNode, event, image) {
    QueueProxy().addQueue(
      new CurrentQueue({
        type: "move",
        image,
        id: image.id,
        x: image.getX(),
        y: image.getY(),
      })
    );
  }
}
