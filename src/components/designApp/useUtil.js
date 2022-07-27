import { imageRotate } from "@/components/bmDesigner/app/utils/dom/imageRotate";

export class useUtil {
  /*
   * 获取图片信息，根据传入的图片id
   * */
  static getImageBBox(svgId, imgId) {
    let rotate = imageRotate.getRotateByImage(svgId, imgId);
    return {
      rotate: rotate,
    };
  }
}
