import { uuid } from "../utils/util";
import { Dom4Prod } from "./Dom4Prod";
import { prodAdaptor } from "../utils/adaptor";

// 产品类
export class Prod {
  // 当前产品激活的设计图Id
  imageActionId;
  // 产品自定义id(与后端参数的id无关)
  id;
  // 后端的产品数据
  data;
  // 产品的所有dom
  dom;
  // 当前产品的所有设计图的 SNode
  designSNodeGroup = [];
  // 构造函数
  constructor(param) {
    const paramAd = prodAdaptor(param);
    let { data } = param;
    let { tag, id, container, d1, d2, d3, bgUrl, prodUrl } = paramAd;
    this.setId(uuid());
    this.setData(data);
    this.setDom(new Dom4Prod(container, d1, d2, d3, bgUrl, prodUrl));
  }
  // 获取设计图
  getDesignImage(id = this.getImageActionId()) {
    return this.designSNodeGroup.find((item) => item.getId() === id);
  }
  // 获取设计图组
  getDesignSNodeGroup() {
    return this.designSNodeGroup;
  }
  // 添加设计图
  addDesignSNode(image) {
    this.designSNodeGroup.push(image);
    this.setImageActionId(image.getId());
  }
  // 获取产品的自定义id(与后端参数的id无关)
  getId() {
    return this.id;
  }
  // 设置产品的自定义id(与后端参数的id无关)
  setId(id) {
    this.id = id;
  }
  // 获取产品的数据
  getData() {
    return this.data;
  }
  // 设置产品的数据
  setData(data) {
    this.data = data;
  }
  // 获取产品的dom
  getDom() {
    return this.dom;
  }
  // 设置产品的dom
  setDom(dom) {
    this.dom = dom;
  }
  // 获取当前产品激活的设计图Id
  getImageActionId() {
    return this.imageActionId;
  }
  // 设置当前产品激活的设计图Id
  setImageActionId(imageActionId) {
    console.log("setImageActionId", imageActionId);
    this.imageActionId = imageActionId;
  }
}
