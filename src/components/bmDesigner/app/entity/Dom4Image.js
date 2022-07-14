import { Dom4ImageEntity } from "./Dom4ImageEntity";
import { createImg } from "../utils/dom/dom4Util";

// 设计图的 dom 对象
export class Dom4Image extends Dom4ImageEntity {
  constructor(type, data, id) {
    super();
    if (type === "img") {
      // 创建设计图
      createImg(this, data, id);
    }
  }
}
