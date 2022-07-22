import { uuid } from "../utils/util";
import { useDesign } from "../index";
import { DEFINE_IMAGE_TYPE_BG, DEFINE_IMAGE_TYPE_IMG } from "../utils/define";

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

  // 构造函数
  constructor(param) {
    let { prodId } = param;
    // 设置设计图自定义id
    this.setId(uuid());
    // 设置当前设计图对应的产品id
    this.setProdId(prodId);
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
}
