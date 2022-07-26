import { DesignImage } from "../../../entity/Image";
import { Message } from "element-ui";
import { getOffset } from "../../util";
import {
  DEFILE_IMAGE_OSTYPE_COPY,
  DEFILE_IMAGE_OSTYPE_MOVE,
  DEFILE_IMAGE_OSTYPE_ROTATE,
  DEFILE_IMAGE_OSTYPE_SCALE,
  DEFINE_IMAGE_OSTYPE_PLUS,
  DEFINE_IMAGE_OSTYPE_REAL,
  defineCN,
} from "../../define";
import {
  domUtilImageMove,
  domUtilImageReverse,
  domUtilImageRotate,
  domUtilImageScale,
} from "../dom4Util";
import { useQueue } from "../../../index";

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
    let bbox = {};
    try {
      bbox = this.getDom().imgG.getBBox();
    } catch (e) {
      console.error(
        e,
        "getBBox is abstract method, 这是个抽象方法，未实现, 现在用的是父类的默认方法，可能会出现错误"
      );
    }
    return bbox;
  }

  /*
   * 执行一次记录
   * @param {number} param.x 移动距离x
   * @param {number} param.y 移动距离y
   * @param {number} param.angle 旋转角度
   * @param {number} param.scale 缩放比例
   * @param {boolean} param.isAddQueue 是否执行一次添加队列
   * @param {string} param.type 操作类型
   * */
  carryLog(param = {}) {
    let { angle, scale, x, y, isAddQueue, type, handleType } = param;
    isAddQueue = isAddQueue !== false ? true : isAddQueue;
    handleType = handleType ? handleType : "未知";
    let logArr = [];
    // x,y
    if (
      !["", null, undefined].includes(x) &&
      !["", null, undefined].includes(y)
    ) {
      logArr.push("|| ", x, y);
      this.setX(Number(x));
      this.setY(Number(y));
    }
    // angle
    if (!["", null, undefined].includes(angle)) {
      logArr.push("|| ", angle);
      this.setAngle(Number(angle));
    }
    // scale
    if (!["", null, undefined].includes(scale)) {
      logArr.push("|| ", scale);
      this.setScale(Number(scale));
    }
    if (isAddQueue) {
      logArr.push("|| 进入队列");
      useQueue().addQueue();
    } else {
      logArr.push("|| 没有进入队列");
    }
    console.log(
      `carryLog 操作类型：${defineCN(type)} ${handleType}`,
      ...logArr
    );
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
  imageMove(
    x,
    y,
    type = DEFINE_IMAGE_OSTYPE_PLUS,
    isLog = true,
    isAddQueue = true
  ) {
    let dom = this.getDom();
    let M = domUtilImageMove(dom).getMatrix();
    if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
      M.matrix.e += x;
      M.matrix.f += y;
      // domUtilImageMove(dom).move(x, y, M);
    }
    if (type === DEFINE_IMAGE_OSTYPE_REAL) {
      // domUtilImageMove(dom).move(-this.getX(), -this.getY(), M);
      // domUtilImageMove(dom).move(x, y, M);
      M.matrix.e = x;
      M.matrix.f = y;
    }
    domUtilImageMove(dom).setMatrix(M);
    // 记录值
    if (isLog) {
      this.carryLog({
        handleType: type,
        x,
        y,
        type: DEFILE_IMAGE_OSTYPE_MOVE,
        isAddQueue,
      });
    }
  }

  /*
   * 设计图移动到指定位置
   * @param {number} x 移动距离x
   * @param {number} y 移动距离y
   * */
  imageMoveReal(x, y, isAddQueue = true, isLog = true) {
    if (isAddQueue) {
      this.imageHandleReal({ type: DEFILE_IMAGE_OSTYPE_MOVE, x, y });
    } else {
      this.imageHandleReal({
        type: DEFILE_IMAGE_OSTYPE_MOVE,
        x,
        y,
        isAddQueue,
        isLog,
      });
    }
  }

  /*
   * 设计图真实操作
   * - 回退到初始
   * - 执行操作
   * - 恢复到当前
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
    let isAddQueue = param.isAddQueue !== false ? true : param.isAddQueue;
    let isLog = param.isLog !== false ? true : param.isLog;
    // 将设计图回退到初始状态(这个不会记录)
    this.imageRotate(360 - angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    this.imageScale(1 / scale, DEFINE_IMAGE_OSTYPE_PLUS, false);
    // 执行操作
    switch (type) {
      case DEFILE_IMAGE_OSTYPE_MOVE:
        param.callback
          ? param.callback()
          : this.imageMove(
              param.x,
              param.y,
              DEFINE_IMAGE_OSTYPE_REAL,
              isLog,
              isAddQueue
            );
        break;
      case DEFILE_IMAGE_OSTYPE_ROTATE:
        param.callback
          ? param.callback()
          : this.imageRotate(
              param.angle,
              DEFINE_IMAGE_OSTYPE_REAL,
              isLog,
              isAddQueue
            );
        break;
      case DEFILE_IMAGE_OSTYPE_SCALE:
        param.callback
          ? param.callback()
          : this.imageScale(
              param.scale,
              DEFINE_IMAGE_OSTYPE_REAL,
              isLog,
              isAddQueue
            );
        break;
      default:
        console.error(`imageHandleReal 暂不支持的操作类型 ${type}`);
        break;
    }
    // 将设计图恢复(这个不会记录)
    this.imageRotate(angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    this.imageScale(scale, DEFINE_IMAGE_OSTYPE_PLUS, false);
  }

  /*
   * 旋转设计图
   * @param {number} angle 旋转角度
   * @param {string} type 类型 plus=累加,real=操作到真实数值
   * @param {boolean} isLog 是否记录
   * @param {boolean} isAddQueue 是否添加队列
   * */
  imageRotate(
    angle,
    type = DEFINE_IMAGE_OSTYPE_PLUS,
    isLog = true,
    isAddQueue = true
  ) {
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
      this.carryLog({
        angle: _angle,
        type: DEFILE_IMAGE_OSTYPE_ROTATE,
        isAddQueue: isAddQueue,
        handleType: type,
      });
    }
  }

  /*
   * 设计图旋转到指定角度
   * */
  imageRotateReal(angle, isAddQueue = true, isLog = true) {
    this.imageRotate(angle, DEFINE_IMAGE_OSTYPE_REAL, isLog, isAddQueue);
  }

  /*
   * 缩放设计图
   * @param {number} scale 缩放比例
   * @param {string} type 类型 plus=累加,real=操作到真实数值
   * @param {boolean} isLog 是否记录
   * */
  imageScale(
    scale,
    type = DEFINE_IMAGE_OSTYPE_PLUS,
    isLog = true,
    isAddQueue = true
  ) {
    let dom = this.getDom();
    // 图片矩阵
    let M = domUtilImageScale(dom).getMatrix();
    // 累计
    if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
      domUtilImageScale(dom).scale(scale, M);
    }
    // 真实
    else if (type === DEFINE_IMAGE_OSTYPE_REAL) {
      domUtilImageScale(dom).scale(1 / this.getScale(), M);
      domUtilImageScale(dom).scale(scale, M);
    }
    // 设置节点缩放
    domUtilImageScale(dom).setMatrix(M);
    // 记录值
    if (isLog) {
      let _scale;
      if (type === DEFINE_IMAGE_OSTYPE_PLUS) {
        _scale = this.getScale() * scale;
      }
      if (type === DEFINE_IMAGE_OSTYPE_REAL) {
        _scale = scale;
      }
      this.carryLog({
        scale: _scale,
        type: DEFILE_IMAGE_OSTYPE_SCALE,
        isAddQueue,
        handleType: type,
      });
    }
  }

  /*
   * 缩放设计图到指定比例
   * */
  imageScaleReal(scale, isAddQueue = true, isLog = true) {
    this.imageScale(scale, DEFINE_IMAGE_OSTYPE_REAL, isLog, isAddQueue);
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
      type: DEFILE_IMAGE_OSTYPE_COPY,
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
