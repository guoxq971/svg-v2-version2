import { uuid } from "../utils/util";
import { Dom4Prod } from "../utils/dom/entity/Dom4Prod";
import { prodAdaptor } from "../utils/adaptor";
import { DesignProxy } from "../index";
import { DEFILE_IMAGE_OSTYPE_CREATE_IMAGE } from "../utils/define";

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
    // 参数转换
    const paramAd = prodAdaptor(param.data);
    // 产品数据(后端返回的数据)
    let { data } = param.data;
    // 需要用到的字段数据
    let { tag, id, container, d1, d2, d3, bgUrl, prodUrl } = paramAd;
    // 设置自定义产品id(与后端参数的id无关)
    this.setId(uuid());
    // 设置产品的数据(后端返回的数据)
    this.setData(data);
    // 设置产品的dom
    this.setDom(new Dom4Prod(container, d1, d2, d3, bgUrl, prodUrl));
  }

  // 隐藏产品
  hide() {
    this.getDom().svg.attr("display", "none");
  }

  // 删除自身
  remove() {
    this.getDom().svg.remove();
  }

  /*
   * 判断当前是否有激活的设计图
   * @return {Boolean} true:有激活的设计图 false:没有激活的设计图
   * */
  hasImageAction() {
    return this.getImageActionId() !== "";
  }
  /*
   * 巡查设计图激活状态
   * - 只将激活的设计图边框设为显示
   * */
  patrolImgMode() {
    // 如果当前没有激活的设计图，就不执行
    if (this.imageActionId === "") return;
    // 找到激活的设计图
    this.designSNodeGroup.forEach((item) => {
      if (item.id !== this.imageActionId) {
        if (item.dom?.editBd) item.dom.editBd.node.style.display = "none";
      } else {
        if (item.dom?.editBd) item.dom.editBd.node.style.display = "inline";
      }
    });
  }
  // 删除设计图
  deleteImage(id) {
    // 找到要删除的设计图
    let index = this.designSNodeGroup.findIndex((item) => item.getId() === id);
    // 页面上的删除
    this.designSNodeGroup[index].dom.imgG.remove();
    // 删除数组中的设计图
    this.designSNodeGroup.splice(index, 1);
    // 如果有绑定的事件，就执行绑定的事件
    let api = DesignProxy().api;
    if (api.imgDelete && typeof api.imgDelete === "function") {
      api.imgDelete(id);
    }
  }
  /*
   * 获取设计图
   * @param {String} id 设计图的id
   * @return {class} 设计图class
   * */
  getImage(id = this.getImageActionId()) {
    return this.designSNodeGroup.find((item) => item.getId() === id);
  }
  // 获取设计图组
  getDesignSNodeGroup() {
    return this.designSNodeGroup;
  }
  /*
   * 添加设计图
   * @param {class} image 设计图class
   * @return {class} 设计图class
   * */
  addImage(image) {
    this.designSNodeGroup.push(image);
    setTimeout(() => {
      image.carryLog({ type: DEFILE_IMAGE_OSTYPE_CREATE_IMAGE });
    });
    return image;
  }

  /*
   * 根据数组内的当前下标排序重新赋值-升序(不会处理背景图)
   * */
  sortByCurIndex() {
    this.designSNodeGroup.forEach((image, index) => {
      image.isNotBg() && image.setLayerIndex(index);
    });
  }
  setDesignGroup(designGroup) {
    this.designSNodeGroup = designGroup;
  }
  /*
   * 设计图中是否存在背景图
   * @return {Boolean} true:存在背景图 false:不存在背景图
   * */
  hasBgImage() {
    return this.getDesignSNodeGroup().some((item) => item.getType() === "bg");
  }
  /*
   * 获取背景图
   * @return {Object} 背景图对象
   * */
  getBgImage() {
    return this.getDesignSNodeGroup().find((item) => item.getType() === "bg");
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
  /*
   * 设置当前产品激活的设计图Id
   * - 同步执行巡查设计图状态
   * - 同步执行vue的图片点击事件
   * @param {String} id 设计图id
   * */
  setImageActionId(id) {
    this.imageActionId = id;
    // 设计图id变动就执行巡查设计图
    this.patrolImgMode();
    // 如果有绑定的事件，就执行绑定的事件
    let api = DesignProxy().api;
    if (api.imgClick && typeof api.imgClick === "function") {
      api.imgClick(id);
    }
    setTimeout(() => {
      this.getDesignSNodeGroup().forEach((image) =>
        image.getDom().imgG.attr("active", "")
      );
      this.getImage().getDom().imgG.attr("active", "这个是激活的");
    });
  }
}
