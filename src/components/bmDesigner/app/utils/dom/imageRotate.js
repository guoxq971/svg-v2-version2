import { getAngle, getMouseDirection, getOffset, getQuadrant } from "../util";
import { useSnap } from "../../../../designApp/useSnap";

// 旋转
export class imageRotate {
  // 获取角度，根据传入的矩阵
  static getRotateByMatrix(matrix) {
    let { a, b, c, d, e, f } = matrix;
    return Math.atan2(b, a) * (180.0 / Math.PI);
  }
  // 获取矩阵(imgBd、editBd)，根据指定的图片和指定的角度(真实)
  static getMatrixByAngle(svgId, imgId, angle) {
    let us = new useSnap(svgId, imgId);
    let orgMatrix = us.imgBd().attr("transform").localMatrix;
    let rotate = imageRotate.getRotateByMatrix(orgMatrix);
    let obj = imageRotate.getMatrix(svgId, imgId, -rotate);
    let { cx, cy } = obj;
    let a = imageRotate.getMatrixByMatrix(obj.imgBdMatrix, angle, cx, cy);
    let b = imageRotate.getMatrixByMatrix(obj.editBdMatrix, angle, cx, cy);
    return {
      imgBdMatrix: a,
      editBdMatrix: b,
    };
  }
  /*
   * 获取矩阵(单个)，根据矩阵和传入的角度(累加)
   * */
  static getMatrixByMatrix(matrix, angle, cx, cy) {
    return matrix.rotate(angle, cx, cy);
  }
  /*
   * 获取矩阵(imgBd、editBd)，根据指定的图片和角度(累加)
   * */
  static getMatrix(svgId, imgId, angle) {
    let us = new useSnap(svgId, imgId);
    let img = us.img();
    let imgBd = us.imgBd();
    let editBd = us.editBd();
    // 设置旋转
    let IM = imgBd.attr("transform").localMatrix;
    let EM = editBd.attr("transform").localMatrix;
    let bbox = img.getBBox();
    IM.rotate(angle, bbox.cx, bbox.cy);
    EM.rotate(angle, bbox.cx, bbox.cy);
    return {
      cx: bbox.cx,
      cy: bbox.cy,
      imgBdMatrix: IM,
      editBdMatrix: EM,
    };
  }
  /*
   * 根据指定图片和角度，直接操作don的矩阵
   * */
  static imgRotate(svgId, imgId, angle) {
    let us = new useSnap(svgId, imgId);
    let imgBd = us.imgBd();
    let editBd = us.editBd();
    let { imgBdMatrix, editBdMatrix } = imageRotate.getMatrix(
      svgId,
      imgId,
      angle
    );
    imgBd.attr({ transform: imgBdMatrix });
    editBd.attr({ transform: editBdMatrix });
  }
  // 旋转角度
  text;
  //圆
  circle;
  //记录的鼠标坐标
  x;
  y;
  // 角度
  rotate = 0;

  // 拖拽开始
  start(x, y, event, imgId, svgId, rotate) {
    this.rotate = rotate;
    let us = new useSnap(svgId, imgId);
    // 记录一次鼠标坐标
    this.x = x;
    this.y = y;
    // 画一个圆, 在图片边框中加入
    let svg = us.svg();
    let imgBd = us.imgBd();
    let designGroup = us.designGroup();
    let imgBBox = us.img().getBBox();
    let imgBdBBox = imgBd.getBBox();
    this.circle = svg.circle(imgBBox.cx, imgBBox.cy, imgBBox.r0).attr({
      fill: "none",
      stroke: "green",
    });
    this.text = svg
      .text(
        imgBdBBox.cx,
        imgBdBBox.cy - imgBdBBox.r1 - 40,
        this.rotate.toFixed(2)
      )
      .attr({ stroke: "green" });
    imgBd.add(this.circle);
    designGroup.add(this.text);
  }

  // 拖拽中
  move(dx, dy, x, y, event, imgId, svgId, callback) {
    let us = new useSnap(svgId, imgId);
    let img = us.img();
    // 获取图片在body的中心坐标
    let imgOs = getOffset(img.node);
    // 旋转角度
    let angle = 0;
    // 如果相等, 就是两条线重合, 是0度
    if (this.x !== x || this.y !== y) {
      angle = getRotate(imgOs.cx, imgOs.cy, this.x, this.y, x, y);
    }
    this.rotate += angle;
    if (this.rotate === 360) this.rotate = 0;
    if (this.rotate > 360) this.rotate = this.rotate - 360;
    if (this.rotate < 0) this.rotate = this.rotate + 360;
    // 设置旋转
    callback(this.rotate);
    // imageRotate.imgRotate(svgId, imgId, angle);
    // 重置鼠标坐标(第一次记录是在start中), 使得下次拖拽的时候可以计算出移动形成的角度
    this.x = x;
    this.y = y;
    this.text.node.innerHTML = this.rotate.toFixed(2) + "°";
  }

  // 拖拽结束
  end(event, imgId, svgId, callback) {
    // 移除圆
    this.circle.remove();
    this.text.remove();
    // callback(this.rotate);
  }
}

/*
    # 旋转逻辑
    1. 记录三个点
        1. 中心点        [os.cx, os.cy]
        2. 鼠标点击的点   [x, y]
        3. 鼠标移动的点   [x2, y2]
    2. 计算角度
        1. 计算三个点行成的 三条边的 角度
    3. 计算方式
        start: 缓存 this.x=x; this.y=y
        move: angle 计算出来后， this.x=x2; this.y=y2;
* */
function getRotate(ox, oy, x, y, x2, y2) {
  // ox, oy 坐标中心点
  // x, y 鼠标点击的点
  // x2, y2 鼠标移动的点
  // 方向
  let direction = getMouseDirection(x, y, x2, y2);
  // 象限
  let quadrant = getQuadrant(ox, oy, x2, y2);
  // 规则
  let rule = {};
  switch (quadrant) {
    case 1:
      rule = {
        name: "在第一象限",
        up: "+",
        down: "-",
        left: "-",
        right: "+",
      };
      break;
    case 2:
      rule = {
        name: "在第二象限",
        up: "-",
        down: "+",
        left: "-",
        right: "+",
      };
      break;
    case 3:
      rule = {
        name: "在第三象限",
        up: "-",
        down: "+",
        left: "+",
        right: "-",
      };
      break;
    case 4:
      rule = {
        name: "在第四象限",
        up: "+",
        down: "-",
        left: "+",
        right: "-",
      };
  }
  // 计算角度
  let angle = getAngle(ox, oy, x, y, x2, y2);
  // 计算旋转角度
  return angle * { "+": 1, "-": -1 }[rule[direction]];
}
