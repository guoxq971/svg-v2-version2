import { getOffset, uuid } from "../utils/util";
import { Dom4Image } from "./Dom4Image";
import { getProd } from "../designUse/index";

// 设计图类
export class DesignImage {
  // 设计图的产品id
  prodId;
  // vue 数据
  data = {};
  // 自定义设计图id
  id;
  // 类型 [bg, img]
  type = "";
  // 设计图旋转角度
  angle = 0;
  // 设计图缩放比例
  scale = 1;
  // 设计图移动x
  x = 0;
  // 设计图移动y
  y = 0;
  // 设计图矩阵(对应scale)
  imageMatrix;
  // 设计图边框矩阵(对应真实的x,y 和 angle)
  imageBdMatrix;
  // 设计图的所有dom
  dom;
  // 背景图才有的颜色
  color;

  // 构造函数
  constructor(param) {
    let { type, data, prodId } = param;
    this.setId(uuid());
    this.setProdId(prodId);
    this.setType(type);
    if (type === "bg") this.setColor(data.color);
    this.setDom(new Dom4Image(type, data, this.getId(), this));
  }

  // 执行一次记录
  carryLog(param = {}) {
    let { angle, scale } = param;
    // x,y
    let bbox = this.getDom().imgBd.getBBox();
    this.setX(bbox.x);
    this.setY(bbox.y);
    // angle
    if (angle) {
      this.setAngle(Number(angle));
    }
    // scale
    if (scale) {
      this.setScale(Number(scale));
    }
    this.setLogMatrix();
  }

  // 设置日志矩阵
  setLogMatrix() {
    this.setImageMatrix();
    this.setImageBdMatrix();
  }

  /*
   * 移动设计图
   * @param {number} x 移动距离x
   * @param {number} y 移动距离y
   * @param {string} type 移动类型 move=移动距离,real=移动到真实位置
   * @param {boolean} isLog 是否记录
   * */
  imageMove(x, y, type = "move", isLog = true) {
    let dom = this.getDom();
    let matrix = dom.imgBd.attr("transform").localMatrix;
    if (type === "move") {
      matrix.e += x;
      matrix.f += y;
    }
    if (type === "real") {
      matrix.e = x;
      matrix.f = y;
    }
    dom.imgBd.attr("transform", matrix);
    dom.editBd.attr("transform", matrix);
    // 记录值
    if (isLog) {
      this.carryLog();
    }
  }

  /*
   * 旋转设计图
   * @param {number} angle 旋转角度
   * @param {boolean} isLog 是否记录
   * */
  imageRotate(angle, isLog = true) {
    let dom = this.getDom();
    let imgBBox = dom.img.getBBox();
    // 图片矩阵
    let IM = dom.imgBd.attr("transform").localMatrix;
    let EM = dom.editBd.attr("transform").localMatrix;
    // 矩阵以angle为角度, cx,cy 为transform-origin 进行一次旋转变化
    IM.rotate(angle, imgBBox.cx, imgBBox.cy);
    EM.rotate(angle, imgBBox.cx, imgBBox.cy);
    // 设置变化后的矩阵
    dom.imgBd.attr("transform", IM);
    dom.editBd.attr("transform", EM);
    // 记录值
    if (isLog) {
      let _angle = this.getAngle() + angle;
      if (_angle > 360) {
        _angle -= 360;
      }
      if (_angle < -360) {
        _angle += 360;
      }
      if (_angle < 0) {
        _angle = 360 - _angle;
      }
      this.carryLog({ angle: _angle });
    }
  }

  // 缩放设计图
  imageScale(scale, isLog = true) {
    let dom = this.getDom();
    let imgBBox = dom.img.getBBox();
    // 图片矩阵
    let IM = dom.img.attr("transform").localMatrix;
    IM.scale(scale, scale, imgBBox.cx, imgBBox.cy);
    // 设置变化后的矩阵
    dom.img.attr("transform", IM);
    // 同时改变其他元素
    let bbox = dom.img.getBBox();
    dom.editRect.attr({
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
    });
    dom.editMove.attr({ x: -18 + bbox.x, y: -18 + bbox.y });
    dom.editRotate.attr({ x: bbox.x2, y: -18 + bbox.y });
    dom.editScale.attr({ x: bbox.x2, y: bbox.y2 });
    dom.editDelete.attr({ x: -18 + bbox.x, y: bbox.y2 });
    // 记录值
    if (isLog) {
      let _scale = this.getScale();
      _scale *= scale;
      this.carryLog({ scale: _scale });
    }
  }

  /*
   * 特殊移动设计图
   * @param {string} type 居中类型 x垂直, y水平
   * */
  align(type, isLog = true) {
    let angle = this.getAngle();
    let scale = this.getScale();
    // 回正
    this.imageRotate(360 - angle);
    this.imageScale(1 / scale);
    let imgBd = this.getDom().imgBd;
    let imgBdBox = getOffset(imgBd.node);
    let groupRectBBox = getProd().getDom().designGroupRect.getBBox();
    let matrix = imgBd.attr("transform").localMatrix;
    // 垂直居中
    if (type === "x") {
      matrix.f = groupRectBBox.cy - imgBdBox.w / 2;
    }
    // 水平居中
    if (type === "y") {
      matrix.e = groupRectBBox.cx - imgBdBox.h / 2;
    }
    this.imageMove(matrix.e, matrix.f, "real");
    // 转回已有
    this.imageRotate(angle);
    this.imageScale(scale);
    // 记录值
    if (isLog) {
      this.carryLog();
    }
  }

  // 图层显示\隐藏
  layerTrigger() {
    // 操作元素
    let dom = this.getDom().imgG;
    dom.node.style.display =
      dom.node.style.display === "none" ? "inline" : "none";
    // 操作vue数据
    let data = this.getData();
    data.isShow = !data.isShow;
    this.setData(data);
  }
  // 当前 image 的 type 是 img
  isImg() {
    return this.getType() === "img";
  }
  // 当前 image 的 type 是 bg
  isBg() {
    return this.getType() === "bg";
  }
  // 获取当前设计图对应的产品
  getProd() {
    return getProd(this.getProdId());
  }
  // 获取数据
  getData() {
    return this.data;
  }
  // 设置数据
  setData(data) {
    this.data = data;
  }
  // 获取自定义设计图id
  getId() {
    return this.id;
  }
  // 设置自定义设计图id
  setId(id) {
    this.id = id;
  }
  // 获取类型 [bg, img]
  getType() {
    return this.type;
  }
  // 设置类型 [bg, img]
  setType(type) {
    this.type = type;
  }
  // 获取设计图旋转角度
  getAngle() {
    return this.angle;
  }
  // 设置设计图旋转角度
  setAngle(angle) {
    this.angle = angle;
  }
  // 获取设计图缩放比例
  getScale() {
    return this.scale;
  }
  // 设置设计图缩放比例
  setScale(scale) {
    this.scale = scale;
  }
  // 获取设计图移动x
  getX() {
    return this.x;
  }
  // 设置设计图移动x
  setX(x) {
    this.x = x;
  }
  // 获取设计图移动y
  getY() {
    return this.y;
  }
  // 设置设计图移动y
  setY(y) {
    this.y = y;
  }
  // 获取设计图的所有dom
  getDom() {
    return this.dom;
  }
  // 设置设计图的所有dom
  setDom(dom) {
    this.dom = dom;
  }
  // 获取背景图才有的颜色
  getColor() {
    return this.color;
  }
  // 设置背景图才有的颜色
  setColor(color) {
    this.color = color;
    // 背景图的元素同步修改填充色
    this.dom?.bgRect && this.dom.bgRect.attr("fill", color);
  }
  // 设置设计图的产品id
  setProdId(prodId) {
    this.prodId = prodId;
  }
  // 获取设计图的产品id
  getProdId() {
    return this.prodId;
  }
  // 设置设计图矩阵
  setImageMatrix(matrix) {
    this.imageMatrix = matrix;
  }
  // 获取设计图矩阵
  getImageMatrix() {
    return this.imageMatrix;
  }
  // 设置设计图边框矩阵
  setImageBdMatrix(matrix = this.getDom().imgBd.attr("transform").localMatrix) {
    this.imageBdMatrix = matrix;
  }
  // 获取设计图边框矩阵
  getImageBdMatrix() {
    return this.imageBdMatrix;
  }
  // 设置设计图矩阵
  setImageGroupMatrix(
    matrix = this.getDom().img.attr("transform").localMatrix
  ) {
    this.imageGroupMatrix = matrix;
  }
}
