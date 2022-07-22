import { DesignImage } from "../../entity/Image";
import { Message } from "element-ui";
import { getOffset } from "../util";
import {
  DEFILE_IMAGE_OSTYPE_MOVE,
  DEFILE_IMAGE_OSTYPE_ROTATE,
  DEFILE_IMAGE_OSTYPE_SCALE,
  DEFINE_IMAGE_OSTYPE_PLUS,
  DEFINE_IMAGE_OSTYPE_REAL,
} from "../define";
import {
  domUtilImageReverse,
  domUtilImageRotate,
  domUtilImageScale,
} from "./dom4Util";

/*
 * 设计图属性
 * */
export class DesignImageProp extends DesignImage {
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

  constructor(param) {
    super(param);
  }

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
    // 设置节点翻转
    domUtilImageReverse(this.getDom(), type);
    // 记录翻转
    this.setReverse(!this.getReverse());
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
    this.imageHandleReal({ type: DEFILE_IMAGE_OSTYPE_MOVE, x, y });
  }

  /*
   * 设计图真实操作
   * @param {string} param.type 操作类型
   * @param {number} param.x, param.y 移动距离
   * @param {number} param.angle 旋转角度
   * @param {number} param.scale 缩放比例
   * @param {function} param.callback 回调函数, 会覆盖原有的操作(处理特殊场景)
   * */
  imageHandleReal(param) {
    let type = param.type;
    let angle = this.getAngle();
    let scale = this.getScale();
    this.imageRotate(360 - angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    this.imageScale(1 / scale, DEFINE_IMAGE_OSTYPE_PLUS, false);
    switch (type) {
      case DEFILE_IMAGE_OSTYPE_MOVE:
        param.callback
          ? param.callback()
          : this.imageMove(param.x, param.y, DEFINE_IMAGE_OSTYPE_REAL);
        break;
      case DEFILE_IMAGE_OSTYPE_ROTATE:
        param.callback
          ? param.callback()
          : this.imageRotate(param.angle, DEFINE_IMAGE_OSTYPE_REAL);
        break;
      case DEFILE_IMAGE_OSTYPE_SCALE:
        param.callback
          ? param.callback()
          : this.imageScale(param.scale, DEFINE_IMAGE_OSTYPE_REAL);
        break;
      default:
        console.error(`imageHandleReal 暂不支持的操作类型 ${type}`);
        break;
    }
    this.imageRotate(angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    this.imageScale(scale, DEFINE_IMAGE_OSTYPE_PLUS, false);
  }

  /*
   * 旋转设计图
   * @param {number} angle 旋转角度
   * @param {string} type 类型 plus=累加,real=操作到真实数值
   * @param {boolean} isLog 是否记录
   * */
  imageRotate(angle, type = DEFINE_IMAGE_OSTYPE_PLUS, isLog = true) {
    const dom = this.getDom();
    // 图片矩阵
    let M = domUtilImageRotate(dom).getMatrix();
    switch (type) {
      case DEFINE_IMAGE_OSTYPE_PLUS:
        domUtilImageRotate(dom).rotate(angle, M);
        break;
      case DEFINE_IMAGE_OSTYPE_REAL:
        domUtilImageRotate(dom).rotate(-this.getAngle(), M);
        domUtilImageRotate(dom).rotate(angle, M);
        break;
    }
    // 设置变化后的矩阵
    domUtilImageRotate(dom).setMatrix(M);
    // 记录值
    if (isLog) {
      let _angle;
      if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
        _angle = this.getAngle() + angle;
        if (_angle > 360) {
          _angle -= 360;
        } else if (_angle < -360) {
          _angle += 360;
        } else if (_angle < 0) {
          _angle = 360 - _angle;
        }
      } else if (type === DEFINE_IMAGE_OSTYPE_REAL) {
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
    // 设置节点缩放
    domUtilImageScale(dom, IM);
    // 记录值
    if (isLog) {
      let _scale;
      if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
        _scale = this.getScale() * scale;
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
   * */
  imageAlign(type) {
    this.imageHandleReal({
      type: DEFILE_IMAGE_OSTYPE_MOVE,
      callback: () => {
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
      },
    });
  }

  /*
   * 复制设计图
   * @param {class} newImage 新的设计图类
   * */
  copy(newImage) {
    let x = this.getX() + 50;
    let y = this.getY() + 50;
    let angle = this.getAngle();
    let scale = this.getScale();
    newImage.imageMove(x, y, DEFINE_IMAGE_OSTYPE_REAL, false);
    newImage.imageScale(angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    newImage.imageRotate(scale, DEFINE_IMAGE_OSTYPE_PLUS, false);
    newImage.carryLog({
      x: x,
      y: y,
      angle: angle,
      scale: scale,
    });
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

  // 设置翻转状态
  setReverse(reverse) {
    this.reverse = reverse;
  }

  // 获取翻转状态
  getReverse() {
    return this.reverse;
  }
}
