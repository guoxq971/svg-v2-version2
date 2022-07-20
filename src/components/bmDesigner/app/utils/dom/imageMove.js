import { useQueue } from "../../index";

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
    let _x = x - this.x;
    let _y = y - this.y;
    this.dx = dx;
    this.dy = dy;
    // 移动
    image.imageMove(_x, _y, image.getOsTypePlus(), false);
    this.x = x;
    this.y = y;
  }

  end(imgSNode, event, image) {
    let bbox = image.getDom().imgBd.getBBox();
    image.carryLog({ x: bbox.x, y: bbox.y });
    useQueue().addQueueByMove(image);
  }
}
