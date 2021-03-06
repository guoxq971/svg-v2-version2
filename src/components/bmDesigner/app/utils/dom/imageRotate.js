import { getQuadrant, getAngle, getMouseDirection, getOffset } from "../util";
import {
  DEFILE_IMAGE_OSTYPE_ROTATE,
  DEFINE_IMAGE_OSTYPE_PLUS,
} from "../define";

// 旋转
export class imageRotate {
  // 旋转角度
  text;
  //圆
  circle;
  //记录的鼠标坐标
  x;
  y;
  // 拖拽过程中的角度
  angle;

  // 拖拽开始
  start(imgSNode, x, y, event, image) {
    this.angle = image.getAngle() || 0;
    let prod = image.getProd();
    let dom = image.getDom();
    // 记录一次鼠标坐标
    this.x = x;
    this.y = y;
    // 画一个圆, 在图片边框中加入
    let svg = prod.getDom().svg;
    let designGroup = prod.getDom().designGroup;
    let imgBBox = dom.img.getBBox();
    let imgBdBBox = dom.imgBd.getBBox();
    this.circle = svg.circle(imgBBox.cx, imgBBox.cy, imgBBox.r0).attr({
      fill: "none",
      stroke: "green",
    });
    this.text = svg
      .text(
        imgBdBBox.cx,
        imgBdBBox.cy - imgBdBBox.r1 - 40,
        this.angle.toFixed(2)
      )
      .attr({ stroke: "green" });
    dom.imgBd.add(this.circle);
    designGroup.add(this.text);
  }

  // 拖拽中
  move(imgSNode, dx, dy, x, y, event, image) {
    let dom = image.getDom();
    // 获取图片在body的中心坐标
    let imgOs = getOffset(dom.img.node);
    // 旋转角度
    let angle = 0;
    // 如果相等, 就是两条线重合, 是0度
    if (this.x !== x || this.y !== y) {
      angle = getRotate(imgOs.cx, imgOs.cy, this.x, this.y, x, y);
    }
    this.angle += angle;
    // 设置旋转
    image.imageRotate(angle, DEFINE_IMAGE_OSTYPE_PLUS, false);
    // 重置鼠标坐标(第一次记录是在start中), 使得下次拖拽的时候可以计算出移动形成的角度
    this.x = x;
    this.y = y;
    this.text.node.innerHTML = this.angle.toFixed(2) + "°";
  }

  // 拖拽结束
  end(imgSNode, event, image) {
    // 移除圆
    this.circle.remove();
    this.text.remove();
    image.carryLog({
      angle: this.angle,
      type: DEFILE_IMAGE_OSTYPE_ROTATE,
      handleType: DEFINE_IMAGE_OSTYPE_PLUS,
    });
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
