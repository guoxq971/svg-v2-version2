import { DesignImage } from "../Image";
import { DEFINE_IMAGE_TYPE_BG } from "../../utils/define";
import { Dom4BgImage } from "../../utils/dom/entity/Dom4BgImage";

/*
 * 设计图(类型:填充色背景图)
 * */
export class Bg extends DesignImage {
  // 类型
  type = DEFINE_IMAGE_TYPE_BG;
  // 背景图才有的颜色
  color;

  constructor(param) {
    super(param);
    // 设置颜色
    this.setColor(param.data.color);
    // 设置背景图的dom
    super.setDom(new Dom4BgImage(param.data.color));
  }

  // 获取背景图才有的颜色
  getColor() {
    return this.color;
  }

  /*
   * 设置背景图才有的颜色
   * @param {string} color 颜色
   * - 设置背景图才有的颜色
   * - 通过修改设计图的dom的fill属性
   * */
  setColor(color) {
    this.color = color;
    // 背景图的元素同步修改填充色
    this.dom?.bgRect && this.dom.bgRect.attr("fill", color);
  }
}
