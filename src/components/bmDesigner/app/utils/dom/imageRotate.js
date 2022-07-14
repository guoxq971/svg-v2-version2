import { DesignProxy } from "../../index";
import { getQuadrant, getAngle, getMouseDirection, getOffset } from "../util";

// 旋转
export class imageRotate {
  // 旋转角度
  text;
  //圆
  circle;
  //记录的鼠标坐标
  x;
  y;

  // 拖拽开始
  start(imgSNode, x, y, event) {
    let prod = DesignProxy().getProd();
    // 记录一次鼠标坐标
    this.x = x;
    this.y = y;
    // 画一个圆, 在图片边框中加入
    let svg = prod.getDom().svg;
    let imgBBox = imgSNode.img.getBBox();
    let imgBdBBox = imgSNode.imgBd.getBBox();
    this.circle = svg.circle(imgBBox.cx, imgBBox.cy, imgBBox.r0).attr({
      fill: "none",
      stroke: "green",
    });
    this.text = svg
      .text(
        imgBdBBox.cx,
        imgBdBBox.cy - imgBdBBox.h / 2 - 30,
        prod.getDesignImage().getAngle().toFixed(2)
      )
      .attr({ stroke: "green" });
    imgSNode.imgBd.add(this.circle);
  }

  // 拖拽中
  move(imgSNode, dx, dy, x, y, event) {
    let prod = DesignProxy().getProd();
    // 获取图片在body的中心坐标
    let imgOs = getOffset(imgSNode.img.node);
    // 旋转角度
    let angle = 0;
    // 如果相等, 就是两条线重合, 是0度
    if (this.x !== x || this.y !== y) {
      angle = getRotate(imgOs.cx, imgOs.cy, this.x, this.y, x, y);
    }
    // 设置旋转 --start
    // 旋转
    let imgBBox = imgSNode.img.getBBox();
    // 图片矩阵
    let IM = imgSNode.imgBd.attr("transform").localMatrix;
    let EM = imgSNode.editBd.attr("transform").localMatrix;
    // 矩阵以angle为角度, cx,cy 为transform-origin 进行一次旋转变化
    IM.rotate(angle, imgBBox.cx, imgBBox.cy);
    EM.rotate(angle, imgBBox.cx, imgBBox.cy);
    // 设置变化后的矩阵
    imgSNode.imgBd.attr("transform", IM);
    imgSNode.editBd.attr("transform", EM);
    // 设置旋转 --end
    // 记录 --start
    // 记录设计图旋转角度
    let _angle = prod.getDesignImage().getAngle() + angle;
    if (_angle > 360) {
      _angle -= 360;
    }
    if (_angle < -360) {
      _angle += 360;
    }
    if (_angle < 0) {
      _angle = 360 - _angle;
    }

    prod.getDesignImage().setAngle(Number(_angle));
    // 记录 --end
    // 重置鼠标坐标(第一次记录是在start中), 使得下次拖拽的时候可以计算出移动形成的角度
    this.x = x;
    this.y = y;
    this.text.node.innerHTML =
      prod.getDesignImage().getAngle().toFixed(2) + "°";
  }

  // 拖拽结束
  end(imgSNode, event) {
    // 移除圆
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
