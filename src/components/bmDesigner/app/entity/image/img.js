import { DEFINE_IMAGE_TYPE_IMG } from "../../utils/define";
import { Dom4ImgImage } from "../../utils/dom/Dom4ImgImage";
import { DesignImageProp } from "../../utils/dom/DesignImageProp";

/*
 * 设计图(类型:图片)
 * */
export class Img extends DesignImageProp {
  // 类型
  type = DEFINE_IMAGE_TYPE_IMG;

  constructor(param) {
    super(param);
    // 设置数据
    this.setData(param.data);
    // 设置设计图的dom
    this.setDom(new Dom4ImgImage(param.data, this));
  }
}
