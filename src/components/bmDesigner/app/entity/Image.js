import { uuid } from "../utils/util";
import { useDesign, useQueue } from "../index";
import {
  DEFINE_IMAGE_TYPE_BG,
  DEFINE_IMAGE_TYPE_IMG,
  defineCN,
} from "../utils/define";

/*
 * 设计图类(用来被继承的类)
 * */
export class DesignImage {
  // vue 数据
  data = {};
  // 设计图的所有dom[不同的设计图不同的dom. bg、img、text]
  dom;
  // 设计图的产品id
  prodId;
  // 自定义设计图id
  id;
  // 是否展示
  isShow = true;
  // 是否删除
  isDelete = false;
  // 设计图层级(默认是背景图的级别)
  layerIndex = 999999;

  // 构造函数
  constructor(param) {
    let { prodId } = param;
    // 设置设计图自定义id
    this.setId(uuid());
    // 设置当前设计图对应的产品id
    this.setProdId(prodId);
    this.setType(param.type);
    this.setLayerIndexByInit();
    setTimeout(() => {
      this.getDom().imgG.attr("type", defineCN(this.getType()));
    });
  }

  /*
   * 设置初始化的图层层级
   * - 只设置非背景图的图层层级
   * - 设置关系为取最大值 + 1
   * */
  setLayerIndexByInit() {
    if (this.isNotBg()) {
      let designGroup = this.getProd().getDesignSNodeGroup();
      if (designGroup.length === 0) {
        this.setLayerIndex(1);
      } else {
        let indexes = designGroup
          .filter((e) => e.isNotBg())
          .map((e) => e.getLayerIndex());
        this.setLayerIndex(Math.max(...indexes) + 1);
      }
    }
  }

  /*
   * 执行一次记录
   * @param {boolean} param.isAddQueue 是否执行一次添加队列
   * @param {string} param.type 操作类型
   * */
  carryLog(param = {}) {
    let { isAddQueue, type, handleType } = param;
    isAddQueue = isAddQueue !== false ? true : isAddQueue;
    handleType = handleType ? handleType : "未知";
    let logArr = [];
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
   * 图层显示\隐藏
   * - 操作dom元素的显示隐藏
   * - 操作vue数据的显示隐藏
   * @param {boolean} type 是否显示 true-显示 false-隐藏
   * @param {boolean} isAddQueue 是否添加到队列 true-添加 false-不添加
   * */
  layerTrigger(type = null, isAddQueue = true) {
    let dom = this.getDom().imgG;
    let isShow = !this.getIsShow();
    let display = dom.node.style.display === "none" ? "inline" : "none";
    let domIsShow = !this.getData().isShow;
    if (type !== null) {
      isShow = type;
      display = type ? "inline" : "none";
      domIsShow = type;
    }
    // 操作image类
    this.setIsShow(isShow);
    // 操作dom
    dom.node.style.display = display;
    // 操作vue数据
    let data = this.getData();
    data.isShow = domIsShow;
    this.setData(data);
    // 是否添加到队列
    if (isAddQueue) {
      useQueue().addQueue();
    }
  }

  /*
   * 当前 image 的 type 是 img
   * @return {boolean} true 是 img, false 不是
   * */
  isImg(type = null) {
    type = type === null ? this.getType() : type;
    return type === DEFINE_IMAGE_TYPE_IMG;
  }

  /*
   * 当前 image 的 type 是 bg
   * @return {boolean} true 是 bg, false 不是
   * */
  isBg(type = null) {
    type = type === null ? this.getType() : type;
    return type === DEFINE_IMAGE_TYPE_BG;
  }

  /*
   * 当前 image 的 type 不是 bg
   * @return {boolean} true 不是 bg, false 是
   * */
  isNotBg(type = null) {
    type = type === null ? this.getType() : type;
    return type !== DEFINE_IMAGE_TYPE_BG;
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

  // 获取设计图的所有dom
  getDom() {
    return this.dom;
  }

  // 设置设计图的所有dom
  setDom(dom) {
    this.dom = dom;
  }

  // 获取类型
  getType() {
    return this.type;
  }

  // 设置类型 [bg, img]
  setType(type) {
    this.type = type;
  }

  // 设置设计图的产品id
  setProdId(prodId) {
    this.prodId = prodId;
  }

  // 获取设计图的产品id
  getProdId() {
    return this.prodId;
  }

  // 获取设计图的层级
  getLayerIndex() {
    return this.layerIndex;
  }

  // 设置设计图的层级
  setLayerIndex(layerIndex) {
    this.layerIndex = layerIndex;
  }

  // 设置是否展示
  setIsShow(isShow) {
    this.isShow = isShow;
  }

  // 获取是否展示
  getIsShow() {
    return this.isShow;
  }

  // 设置是否删除
  setIsDelete(isDelete) {
    this.isDelete = isDelete;
  }

  // 获取是否删除
  getIsDelete() {
    return this.isDelete;
  }
}
