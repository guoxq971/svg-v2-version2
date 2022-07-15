import {
  convertCanvasToImage,
  convertImageToCanvas,
  getOffset,
  uuid,
} from "../utils/util";
import { Dom4Image } from "./Dom4Image";
import { getProd } from "../designUse/index";
import { Message } from "element-ui";
import { Filter } from "../plugin/filter";

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
  // 是否翻转
  reverse = false;
  // 设计图的所有dom
  dom;
  // 背景图才有的颜色
  color;

  // 构造函数
  constructor(param) {
    let { type, data, prodId } = param;
    // 设置设计图自定义id
    this.setId(uuid());
    // 设置当前设计图对应的产品id
    this.setProdId(prodId);
    // 设置设计图类型
    this.setType(type);
    // 如果类型是背景图,则设置颜色
    if (type === "bg") this.setColor(data.color);
    // 设置设计图的dom
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
  }

  /*
   * 翻转
   * @param {string} type 翻转类型 x垂直, y水平
   * */
  imageReverse(type) {
    if (this.isBg()) return;
    if (!["x", "y"].includes(type)) {
      Message.warning(`暂不支持${type}类型翻转`);
      return;
    }
    this.setReverse(!this.getReverse());
    let dom = this.getDom();
    let imgAttr = dom.img.attr();
    let image = new Image();
    image.src = imgAttr.href;
    image.onload = () => {
      let cvs = convertImageToCanvas(image);
      if (cvs.getContext && cvs.getContext("2d")) {
        let ctx = cvs.getContext("2d");
        const filter = new Filter(ctx); // 实例滤镜
        // 水平翻转
        if (type === "y") {
          filter.flipHorizontal(0, 0, image.width, image.height);
        }
        // 垂直翻转
        if (type === "x") {
          filter.flipVertical(0, 0, image.width, image.height);
        }
        let img = convertCanvasToImage(cvs);
        dom.img.attr("href", img.src);
      }
    };
  }

  /*
   * 移动设计图
   * @param {number} x 移动距离x
   * @param {number} y 移动距离y
   * @param {string} type 移动类型 move=移动距离,real=移动到真实位置
   * @param {boolean} isLog 是否记录
   * */
  imageMove(x, y, type = "move", isLog = true) {
    if (this.isBg()) return;
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

  /*
   * 缩放设计图
   * @param {number} scale 缩放比例
   * @param {boolean} isLog 是否记录
   * */
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
   * @param {boolean} isLog 是否记录
   * */
  imageAlign(type, isLog = true) {
    if (this.isBg()) return;
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

  /*
   * 复制设计图
   * @param {class} newImage 新的设计图类
   * */
  copy(newImage) {
    if (this.isBg()) return;
    newImage.imageMove(this.getX(), this.getY(), "real");
    newImage.imageScale(this.getScale());
    newImage.imageRotate(this.getAngle());
    newImage.imageMove(50, 50);
  }

  /*
   * 图层显示\隐藏
   * - 操作dom元素的显示隐藏
   * - 操作vue数据的显示隐藏
   * */
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

  /*
   * 当前 image 的 type 是 img
   * @return {boolean} true 是 img, false 不是
   * */
  isImg() {
    return this.getType() === "img";
  }
  /*
   * 当前 image 的 type 不是 img
   * @return {boolean} true 不是 img, false 是
   * */
  isNotImg() {
    return this.getType() !== "img";
  }
  /*
   * 当前 image 的 type 是 bg
   * @return {boolean} true 是 bg, false 不是
   * */
  isBg() {
    return this.getType() === "bg";
  }
  /*
   * 获取当前设计图对应的产品
   * @return {class} 产品类
   * */
  getProd() {
    return getProd(this.getProdId());
  }
  /*
   * 获取数据
   * @return {object} vue数据
   * */
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
  /*
   * 设置背景图才有的颜色
   * @param {string} color 颜色
   * - 设置背景图才有的颜色
   * - 通过修改设计图的dom的fill属性
   * */
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
  // 设置翻转状态
  setReverse(reverse) {
    this.reverse = reverse;
  }
  // 获取翻转状态
  getReverse() {
    return this.reverse;
  }
}
