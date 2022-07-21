import {
  DEFILE_IMAGE_OSTYPE_MOVE,
  DEFILE_IMAGE_OSTYPE_ROTATE,
  DEFILE_IMAGE_OSTYPE_SCALE,
} from "../utils/define";

// 队列-当前项
export class CurrentQueue {
  // 操作的类型 OS_TYPE
  osType;
  // 设计图class
  image;
  // 设计图id
  id;
  // 移动距离
  x;
  y;
  // 旋转角度
  angle;
  // 缩放比例
  scale;
  // 中心点坐标
  cx;
  cy;

  constructor(param) {
    const { type, image } = param;
    this.setOsType(type);
    this.setImage(image);
    this.setId(image.getId());
    this.setX(image.getX());
    this.setY(image.getY());
    this.setAngle(image.getAngle());
    this.setScale(image.getScale());
    this.setCx(Number(image.geBBox().cx.toFixed(0)));
    this.setCy(Number(image.geBBox().cy.toFixed(0)));
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
    return this.getOsType() === queue.getType();
  }

  /*
   * 根据类型取值
   * @param {string} type 类型
   * */
  getValueByType() {
    switch (this.getOsType()) {
      case DEFILE_IMAGE_OSTYPE_MOVE:
        return `${this.getX()},${this.getY()}`;
      case DEFILE_IMAGE_OSTYPE_ROTATE:
        return this.getAngle();
      case DEFILE_IMAGE_OSTYPE_SCALE:
        return this.getScale();
      default:
        return null;
    }
  }

  /*
   * osType 是缩放
   * */
  isScaleOsType() {
    return this.getOsType() === DEFILE_IMAGE_OSTYPE_SCALE;
  }

  /*
   * osType 是移动
   * */
  isMoveOsType() {
    return this.getOsType() === DEFILE_IMAGE_OSTYPE_MOVE;
  }

  /*
   * osType 是旋转
   * */
  isRotateOsType() {
    return this.getOsType() === DEFILE_IMAGE_OSTYPE_ROTATE;
  }

  setOsType(type) {
    this.osType = type;
  }

  getOsType() {
    return this.osType;
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

  getCx() {
    return this.cx;
  }

  setCx(cx) {
    this.cx = cx;
  }

  setCy(cy) {
    this.cy = cy;
  }

  getCy() {
    return this.cy;
  }
}
