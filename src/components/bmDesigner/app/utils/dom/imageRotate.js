import { getAngle, getMouseDirection, getOffset, getQuadrant } from "../util";
import { useSnap } from "../../../../designApp/useSnap";
import { useUtil } from "@/components/designApp/useUtil";

// 旋转
export class imageRotate {
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
  start(x, y, event, imgId, svgId) {
    // 初始化已有的角度
    let imageBBox = useUtil.getBBoxByImage(svgId, imgId);
    this.rotate = imageBBox.rotate;
    // 获取sNode
    let us = new useSnap(svgId, imgId);
    let svg = us.svg();
    let imgBd = us.imgBd();
    let designGroup = us.designGroup();
    let imgBBox = us.img().getBBox();
    let imgBdBBox = imgBd.getBBox();
    // 初始化鼠标坐标
    this.x = x;
    this.y = y;
    // 画一个圆, 在图片边框中加入
    this.circle = createCircle(svg, imgBBox);
    this.text = createText(svg, imgBdBBox, this.rotate);
    // 在对应的元素上添加圆和文字
    imgBd.add(this.circle);
    designGroup.add(this.text);
  }

  // 拖拽中
  move(dx, dy, x, y, event, imgId, svgId, callback) {
    // 获取sNode
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
    // 计算获取最新的角度
    this.rotate += angle;
    if (this.rotate === 360) this.rotate = 0;
    if (this.rotate > 360) this.rotate = this.rotate - 360;
    if (this.rotate < 0) this.rotate = this.rotate + 360;
    // 设置旋转(设置vue数据,由vue数据来更新dom)
    callback(this.rotate);
    // 重置鼠标坐标(第一次记录是在start中), 使得下一个拖拽(move)的时候可以计算出移动形成的角度
    this.x = x;
    this.y = y;
    // 同步修改文字角度
    this.text.node.innerHTML = this.rotate.toFixed(2) + "°";
  }

  // 拖拽结束
  end(event, imgId, svgId) {
    // 移除圆和文字
    this.circle.remove();
    this.text.remove();
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

/*
 * 创建一个圆
 * @param {sNode} svg svg对象
 * @param {object} imgBBox 图片的bbox
 * */
function createCircle(svg, imgBBox) {
  let circle;
  circle = svg.circle(imgBBox.cx, imgBBox.cy, imgBBox.r0).attr({
    fill: "none",
    stroke: "green",
  });
  return circle;
}

/*
 * 创建一个文字
 * @param {sNode} svg svg对象
 * @param {object} imgBdBBox 图片边框的bbox
 * @param {number} rotate 旋转角度
 * */
function createText(svg, imgBdBBox, rotate) {
  let text;
  text = svg
    .text(imgBdBBox.cx, imgBdBBox.cy - imgBdBBox.r1 - 40, rotate.toFixed(2))
    .attr({ stroke: "green" });
  return text;
}
