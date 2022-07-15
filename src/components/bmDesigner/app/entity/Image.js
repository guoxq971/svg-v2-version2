import { uuid } from "../utils/util";
import { Dom4Image } from "@/components/bmDesigner/app/entity/Dom4Image";

// 设计图类
export class DesignImage {
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
  // 设计图的所有dom
  dom;
  // 背景图才有的颜色
  color;
  // 构造函数
  constructor(param) {
    let { type, data } = param;
    this.setId(uuid());
    this.setType(type);
    this.setData(data);
    if (type === "bg") this.setColor(data.color);
    this.setDom(new Dom4Image(type, data, this.getId()));
  }

  // 当前 image 的 type 是 img
  isImg() {
    return this.getType() === "img";
  }
  // 当前 image 的 type 是 bg
  isBg() {
    return this.getType() === "bg";
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
    this.dom?.bgRect && this.dom.bgRect.attr("fill", color);
  }
}
