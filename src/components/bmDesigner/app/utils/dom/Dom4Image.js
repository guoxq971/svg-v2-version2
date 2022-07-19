import { Dom4ImageEntity } from "./Dom4ImageEntity";
import { createBg, createImg } from "./dom4Util";

// 设计图的 dom 对象
export class Dom4Image extends Dom4ImageEntity {
  /*
   * 构造函数
   * @param {string} type 类型 [bg, img]
   * @param {object} data vue数据
   * @param {string} id 设计图id
   * @param {object} parent 父级对象(设计图类)
   * */
  constructor(type, data, id, parent) {
    super();
    if (type === "img") {
      // 创建设计图
      createImg(this, data, id, parent);
    }
    if (type === "bg") {
      // 创建设计图
      createBg(this, data);
    }
  }
}
