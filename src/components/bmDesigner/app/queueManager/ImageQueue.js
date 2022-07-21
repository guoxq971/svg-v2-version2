// 设计图在队列中存储的数据
export class ImageQueue {
  // 当前项的class [可能是 img、bg、text]
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

  constructor(image) {
    this.setImage(image);
    this.setId(image.getId());
    this.setX(image.getX());
    this.setY(image.getY());
    this.setAngle(image.getAngle());
    this.setScale(image.getScale());
    this.setCx(Number(image?.getBBox().cx.toFixed(0)));
    this.setCy(Number(image?.getBBox().cy.toFixed(0)));
  }

  /*
   * 是否是切换操作
   * @param {currentQueue} queue 对比的当前队列
   * @return {boolean} true-是切换操作 false-不是切换操作
   * */
  isCut(queue) {
    return queue.getImageId() !== this.getImageId();
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
