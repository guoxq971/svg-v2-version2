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
  id;
  x;
  y;
  angle;
  scale;

  constructor(param) {
    const { type, image } = param;
    this.setType(type);
    this.setImage(image);
    this.setId(image.getId());
    this.setX(image.getX());
    this.setY(image.getY());
    this.setAngle(image.getAngle());
    this.setScale(image.getScale());
  }
  /*
   * 是否是切换操作
   * @param {currentQueue} queue 对比的当前队列
   * @return {boolean} true-是切换操作 false-不是切换操作
   * */
  isCut(queue) {
    return queue.getImageId() !== this.getImageId();
  }
  /*
   * 是否是移动操作
   * @param {currentQueue} queue 对比的当前队列
   * @return {boolean} true-是移动操作 false-不是移动操作
   * */
  isMove(queue) {
    return this.getX() !== queue.getX() || this.getY() !== queue.getY();
  }
  /*
   * 是否是旋转操作
   * @param {currentQueue} queue 对比的当前队列
   * @return {boolean} true-是旋转操作 false-不是旋转操作
   * */
  isRotate(queue) {
    return this.getAngle() !== queue.getAngle();
  }
  /*
   * queue对比的type是否一致
   * @param {currentQueue} queue 对比的当前队列
   * @return {boolean} true-一致 false-不一致
   * */
  isSameType(queue) {
    return this.getType() === queue.getType();
  }
  /*
   * 根据类型取值
   * @param {string} type 类型
   * */
  getValueByType() {
    switch (this.getType()) {
      case OS_TYPE.MOVE:
        return `${this.getX()},${this.getY()}`;
      case OS_TYPE.ROTATE:
        return this.getAngle();
      case OS_TYPE.SCALE:
        return this.getScale();
      default:
        return null;
    }
  }
  /*
   * type是缩放
   * */
  isScaleType() {
    return this.getType() === OS_TYPE.SCALE;
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
  getImageId() {
    return this.getImage().getId();
  }
  getX() {
    return this.x;
  }
  setX(x) {
    this.x = x;
  }
  getY() {
    return this.y;
  }
  setY(y) {
    this.y = y;
  }
  getAngle() {
    return this.angle;
  }
  setAngle(angle) {
    this.angle = angle;
  }
  getScale() {
    return this.scale;
  }
  setScale(scale) {
    this.scale = scale;
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
}
