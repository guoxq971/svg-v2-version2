import {
  convertCanvasToImage,
  convertImageToCanvas,
  getOffset,
  uuid,
} from "../utils/util";
import { Message } from "element-ui";
import { Filter } from "../plugin/filter";
import { useDesign, useQueue } from "../index";
import {
  DEFINE_IMAGE_OSTYPE_PLUS,
  DEFINE_IMAGE_OSTYPE_REAL,
  DEFINE_IMAGE_TYPE_BG,
  DEFINE_IMAGE_TYPE_IMG,
} from "../utils/define";

// 设计图类
export class DesignImage {
  // vue 数据
  data = {};
  // 设计图的所有dom[不同的设计图不同的dom、bg、img、text]
  dom;
  // 设计图的产品id
  prodId;
  // 自定义设计图id
  id;
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

  // 构造函数
  constructor(param) {
    let { prodId } = param;
    // 设置设计图自定义id
    this.setId(uuid());
    // 设置当前设计图对应的产品id
    this.setProdId(prodId);
  }

  /*
   * 获取设计图当前在svg中的数据
   * */
  // geBBox() {
  //   let bbox = this.getDom().imgBd?.getBBox();
  //   return bbox;
  // }

  /*
   * (伪造抽象类)获取设计图中的信息
   * */
  getBBox() {
    console.error(
      "getBBox is abstract method, 这是个抽象方法，未实现, 现在用的是父类的默认方法，可能会出现错误"
    );
    return this.getDom().imgG.getBBox();
  }

  // 执行一次记录
  carryLog(param = {}) {
    let { angle, scale, x, y } = param;
    // x,y
    if (
      !["", null, undefined].includes(x) &&
      !["", null, undefined].includes(y)
    ) {
      console.log("carryLog move", x, y);
      this.setX(Number(x));
      this.setY(Number(y));
    }
    // angle
    if (!["", null, undefined].includes(angle)) {
      console.log("carryLog rotate", angle);
      this.setAngle(Number(angle));
    }
    // scale
    if (!["", null, undefined].includes(scale)) {
      console.log("carryLog scale", scale);
      this.setScale(Number(scale));
    }
  }

  /*
   * 翻转
   * @param {string} type 翻转类型 x垂直, y水平
   * */
  imageReverse(type) {
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
   * @param {string} type 类型 plus=累加,real=操作到真实数值
   * @param {boolean} isLog 是否记录
   * */
  imageMove(x, y, type = DEFINE_IMAGE_OSTYPE_PLUS, isLog = true) {
    let dom = this.getDom();
    let matrix = dom.imgBd.attr("transform").localMatrix;
    if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
      matrix.e += x;
      matrix.f += y;
      // matrix.translate(x, y);
    }
    if (type === DEFINE_IMAGE_OSTYPE_REAL) {
      matrix.e = x;
      matrix.f = y;
    }
    dom.imgBd.attr("transform", matrix);
    dom.editBd.attr("transform", matrix);
    // 记录值
    if (isLog) {
      this.carryLog({ x, y });
    }
  }

  /*
   * 设计图移动到指定位置
   * @param {number} x 移动距离x
   * @param {number} y 移动距离y
   * */
  imageMoveReal(x, y) {
    let angle = this.getAngle();
    this.imageRotate(360 - angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    this.imageMove(x, y, DEFINE_IMAGE_OSTYPE_REAL);
    this.imageRotate(angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
  }

  /*
   * 旋转设计图
   * @param {number} angle 旋转角度
   * @param {string} type 类型 plus=累加,real=操作到真实数值
   * @param {boolean} isLog 是否记录
   * */
  imageRotate(angle, type = DEFINE_IMAGE_OSTYPE_PLUS, isLog = true) {
    let dom = this.getDom();
    let imgBBox = dom.img.getBBox();
    // 图片矩阵
    let IM = dom.imgBd.attr("transform").localMatrix;
    let EM = dom.editBd.attr("transform").localMatrix;
    // 矩阵以angle为角度, cx,cy 为transform-origin 进行一次旋转变化
    // 累计
    if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
      IM.rotate(angle, imgBBox.cx, imgBBox.cy);
      EM.rotate(angle, imgBBox.cx, imgBBox.cy);
    }
    // 真实
    else if (type === DEFINE_IMAGE_OSTYPE_REAL) {
      let nowAngle = this.getAngle();
      IM.rotate(-nowAngle, imgBBox.cx, imgBBox.cy);
      EM.rotate(-nowAngle, imgBBox.cx, imgBBox.cy);
      IM.rotate(angle, imgBBox.cx, imgBBox.cy);
      EM.rotate(angle, imgBBox.cx, imgBBox.cy);
    }
    // 设置变化后的矩阵
    dom.imgBd.attr("transform", IM);
    dom.editBd.attr("transform", EM);
    // 记录值
    if (isLog) {
      let _angle;
      if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
        _angle = this.getAngle() + angle;
        if (_angle > 360) {
          _angle -= 360;
        }
        if (_angle < -360) {
          _angle += 360;
        }
        if (_angle < 0) {
          _angle = 360 - _angle;
        }
      }
      if (type === DEFINE_IMAGE_OSTYPE_REAL) {
        _angle = angle;
      }
      if (_angle === 360) _angle = 0;
      this.carryLog({ angle: _angle });
    }
  }

  /*
   * 设计图旋转到指定角度
   * */
  imageRotateReal(angle) {
    this.imageRotate(angle, DEFINE_IMAGE_OSTYPE_REAL);
  }

  /*
   * 缩放设计图
   * @param {number} scale 缩放比例
   * @param {string} type 类型 plus=累加,real=操作到真实数值
   * @param {boolean} isLog 是否记录
   * */
  imageScale(scale, type = DEFINE_IMAGE_OSTYPE_PLUS, isLog = true) {
    let dom = this.getDom();
    let imgBBox = dom.img.getBBox();
    // 图片矩阵
    let IM = dom.img.attr("transform").localMatrix;
    // 累计
    if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
      IM.scale(scale, scale, imgBBox.cx, imgBBox.cy);
    }
    // 真实
    else if (type === DEFINE_IMAGE_OSTYPE_REAL) {
      let nowScale = this.getScale();
      IM.scale(1 / nowScale, 1 / nowScale, imgBBox.cx, imgBBox.cy);
      IM.scale(scale, scale, imgBBox.cx, imgBBox.cy);
    }
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
      let _scale;
      if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
        _scale = this.getScale();
        _scale *= scale;
      }
      if (type === DEFINE_IMAGE_OSTYPE_REAL) {
        _scale = scale;
      }
      this.carryLog({ scale: _scale });
    }
  }

  /*
   * 缩放设计图到指定比例
   * */
  imageScaleReal(scale) {
    this.imageScale(scale, DEFINE_IMAGE_OSTYPE_REAL);
  }

  /*
   * 特殊移动设计图
   * @param {string} type 居中类型 x垂直, y水平
   * @param {boolean} isLog 是否记录
   * */
  imageAlign(type, isLog = true) {
    let angle = this.getAngle();
    let scale = this.getScale();
    // 回正
    this.imageRotate(360 - angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    this.imageScale(1 / scale, DEFINE_IMAGE_OSTYPE_PLUS, false);
    let imgBd = this.getDom().imgBd;
    let imgBdBox = getOffset(imgBd.node);
    let groupRectBBox = this.getProd().getDom().designGroupRect.getBBox();
    let matrix = imgBd.attr("transform").localMatrix;
    // 垂直居中
    if (type === "x") {
      matrix.f = groupRectBBox.cy - imgBdBox.w / 2;
    }
    // 水平居中
    if (type === "y") {
      matrix.e = groupRectBBox.cx - imgBdBox.h / 2;
    }
    this.imageMove(matrix.e, matrix.f, DEFINE_IMAGE_OSTYPE_REAL);
    // 转回已有
    this.imageRotate(angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    this.imageScale(scale, DEFINE_IMAGE_OSTYPE_PLUS, false);
    if (isLog) {
      // 记录值
      this.carryLog();
    }
  }

  /*
   * 复制设计图
   * @param {class} newImage 新的设计图类
   * */
  copy(newImage) {
    newImage.imageMove(
      this.getX(),
      this.getY(),
      DEFINE_IMAGE_OSTYPE_REAL,
      false
    );
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
    return this.getType() === DEFINE_IMAGE_TYPE_IMG;
  }

  /*
   * 当前 image 的 type 不是 img
   * @return {boolean} true 不是 img, false 是
   * */
  isNotImg() {
    return this.getType() !== DEFINE_IMAGE_TYPE_IMG;
  }

  /*
   * 当前 image 的 type 是 bg
   * @return {boolean} true 是 bg, false 不是
   * */
  isBg() {
    return this.getType() === DEFINE_IMAGE_TYPE_BG;
  }

  /*
   * 获取当前设计图对应的产品
   * @return {class} 产品类
   * */
  getProd() {
    return useDesign().getProd(this.getProdId());
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

  // 获取类型
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
