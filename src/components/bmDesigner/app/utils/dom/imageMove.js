import { useSnap } from "../../../../designApp/useSnap";

export class ImageMove {
  x;
  y;

  start(x, y, event, id) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy, x, y, event, imgId, svgId, callback) {
    let _x = x - this.x;
    let _y = y - this.y;
    callback(_x, _y);
    // 移动
    this.x = x;
    this.y = y;
  }

  end(event, id) {}
}
