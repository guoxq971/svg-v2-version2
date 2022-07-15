export class ImageMove {
  x;
  y;

  start(imgSNode, x, y, event, image) {
    this.x = x;
    this.y = y;
  }

  move(imgSNode, dx, dy, x, y, event, image) {
    let prod = image.getProd();
    let dom = image.getDom();
    let _x = x - this.x;
    let _y = y - this.y;
    // 移动
    image.imageMove(_x, _y);
    this.x = x;
    this.y = y;
  }

  end(imgSNode, event, image) {}
}
