import { useDesign } from "../../../index";
import { cratePicBgRect, createPicImgG } from "../dom4CreateImage";
import { Dom4ImageEntity } from "./Dom4ImageEntity";
/*
 * 创建背景图
 * @param {String} color 背景颜色
 * */
export class Dom4BgImage extends Dom4ImageEntity {
  // 背景rect
  bgRect;

  // 构造函数
  constructor(color) {
    super();
    this.init(color);
  }

  init(color) {
    const prod = useDesign().getProd();
    let { svg, designGroup } = prod.getDom();
    // 最外层
    this.imgG = createPicImgG(svg);
    // 如果存在其他设计图，就把背景放在最上层
    if (prod.getDesignSNodeGroup().length) {
      designGroup.prepend(this.imgG);
    } else {
      designGroup.add(this.imgG);
    }
    this.bgRect = cratePicBgRect(svg, { color });
    this.imgG.add(this.bgRect);
  }
}
