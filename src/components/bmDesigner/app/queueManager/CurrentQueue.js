import { useQueue } from "../index";

// 操作类型枚举
export const OS_TYPE = {
  // 移动
  MOVE: "move",
  // 旋转
  ROTATE: "rotate",
  // 缩放
  SCALE: "scale",
};

// 队列-当前项
export class CurrentQueue {
  // 操作的类型 OS_TYPE
  type;
  // 设计图class
  image;
  // 这个id是 image.id
  id;
  // 操作的值 --start
  // 移动-x
  x;
  // 移动-y
  y;
  // 旋转角度
  angle;
  // 缩放比例
  scale;
  // 操作的值 --end

  constructor(param) {
    const { id, type, image, x, y, angle, scale } = param;
    this.setId(id);
    this.setType(type);
    this.setX(x);
    this.setY(y);
    this.setAngle(angle);
    this.setScale(scale);
    this.setImage(image);
  }
  /*
   * 是否是切换操作
   * @param {string} imageId 设计图class的id
   * @return {boolean} true-是切换操作 false-不是切换操作
   * */
  isCut(imageId) {
    return imageId !== this.getId();
  }
  /*
   * 是否是移动操作
   * @return {boolean} true-是移动操作 false-不是移动操作
   * */
  isMove() {
    return this.getType() === useQueue().getOsTypeMove();
  }
  /*
   * 是否是旋转操作
   * @return {boolean} true-是旋转操作 false-不是旋转操作
   * */
  isRotate() {
    return this.getType() === useQueue().getOsTypeRotate();
  }
  /*
   * 是否是旋转操作
   * @return {boolean} true-是旋转操作 false-不是旋转操作
   * */
  isScale() {
    return this.getType() === useQueue().getOsTypeScale();
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
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
}
