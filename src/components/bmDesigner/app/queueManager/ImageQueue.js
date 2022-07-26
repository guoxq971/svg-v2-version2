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
  // 设计图的属性
  imageProp = {
    imgMatrix: {},
    imgBdMatrix: {},
    editBdMatrix: {},
    editRect: { x: 0, y: 0, width: 0, height: 0 },
    editMove: { x: 0, y: 0, width: 0, height: 0 },
    editScale: { x: 0, y: 0, width: 0, height: 0 },
    editRotate: { x: 0, y: 0, angle: 0 },
    editDelete: { x: 0, y: 0, width: 0, height: 0 },
  };
  // 显示隐藏
  isShow;
  // 设计图层级
  layerIndex;

  constructor(image) {
    try {
      this.setImage(image);
      this.setId(image.getId());
      if (image.isNotBg()) {
        // 显示隐藏
        this.setIsShow(image.getIsShow());
        // 层级
        this.setLayerIndex(image.getLayerIndex());
        // 平移、缩放、旋转
        this.setX(image.getX());
        this.setY(image.getY());
        this.setAngle(image.getAngle());
        this.setScale(image.getScale());
        this.setCx(Number(image?.getBBox().cx.toFixed(0)));
        this.setCy(Number(image?.getBBox().cy.toFixed(0)));
        let dom = image.getDom();
        this.imageProp.imgMatrix = dom.img.attr("transform").localMatrix;
        this.imageProp.imgBdMatrix = dom.imgBd.attr("transform").localMatrix;
        this.imageProp.editBdMatrix = dom.editBd.attr("transform").localMatrix;
        this.imageProp.editRect = dom.editRect.getBBox();
        this.imageProp.editMove = dom.editMove.getBBox();
        this.imageProp.editScale = dom.editScale.getBBox();
        this.imageProp.editRotate = dom.editRotate.getBBox();
        this.imageProp.editDelete = dom.editDelete.getBBox();
      }
    } catch (e) {
      console.log(e);
    }
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

  getIsShow() {
    return this.isShow;
  }

  setIsShow(isShow) {
    this.isShow = isShow;
  }

  getLayerIndex() {
    return this.layerIndex;
  }

  setLayerIndex(layerIndex) {
    this.layerIndex = layerIndex;
  }
}
