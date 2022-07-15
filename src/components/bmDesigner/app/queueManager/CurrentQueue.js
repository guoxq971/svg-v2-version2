// 当前项
export class CurrentQueue {
  // 操作的类型[move, rotate, scale]
  type;
  // 设计图class
  image;
  // 操作的值
  x;
  y;
  angle;
  scale;
  id;

  constructor(param) {
    const { id, type, image, x, y, angle, scale } = param;
    this.id = id;
    this.setType(type);
    this.setX(x);
    this.setY(y);
    this.setAngle(angle);
    this.setScale(scale);
    this.setImage(image);
  }

  setType(type) {
    this.type = type;
  }
  getType() {
    return this.type;
  }
  setImage(image) {
    this.image = image;
  }
  getImage() {
    return this.image;
  }
  setX(x) {
    this.x = x;
  }
  getX() {
    return this.x;
  }
  setY(y) {
    this.y = y;
  }
  getY() {
    return this.y;
  }
  setAngle(angle) {
    this.angle = angle;
  }
  getAngle() {
    return this.angle;
  }
  setScale(scale) {
    this.scale = scale;
  }
  getScale() {
    return this.scale;
  }
}
