/*
 * 移动到指定位置(中心)
 * @param {SNode} snap 节点
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * */
import {
  convertCanvasToImage,
  convertImageToCanvas,
} from "@/components/bmDesigner/app/utils/util";
import { Filter } from "@/components/bmDesigner/app/plugin/filter";

export function moveToCenter(SNode, x, y) {
  if (Snap.is(SNode, "array")) {
    SNode.forEach((item) => {
      let bbox = item.getBBox();
      let M = item.attr("transform").localMatrix;
      M.translate(x - bbox.x - bbox.width / 2, y - bbox.y - bbox.height / 2);
      item.attr({ transform: M });
    });
  } else {
    let bbox = SNode.getBBox();
    let M = SNode.attr("transform").localMatrix;
    M.translate(x - bbox.x - bbox.width / 2, y - bbox.y - bbox.height / 2);
    SNode.attr({ transform: M });
  }
}

/*
 * 设计图缩放
 * @param {object} dom 设计图的所有节点
 * @param {matrix} matrix 缩放矩阵
 * */
export function domUtilImageScale(dom, IM) {
  // 设置变化后的矩阵
  dom.img.attr("transform", IM);
  // 同时改变其他元素
  let bbox = dom.img.getBBox();
  dom.editRect.attr({
    x: bbox.x,
    y: bbox.y,
    width: bbox.width,
    height: bbox.height,
  });
  dom.editMove.attr({ x: -18 + bbox.x, y: -18 + bbox.y });
  dom.editRotate.attr({ x: bbox.x2, y: -18 + bbox.y });
  dom.editScale.attr({ x: bbox.x2, y: bbox.y2 });
  dom.editDelete.attr({ x: -18 + bbox.x, y: bbox.y2 });
}

/*
 * 设计图翻转
 * @param {object} dom 设计图的所有节点
 * @param {string} type 翻转类型
 * */
export function domUtilImageReverse(dom, type) {
  let imgAttr = dom.img.attr();
  let image = new Image();
  image.src = imgAttr.href;
  image.onload = () => {
    let cvs = convertImageToCanvas(image);
    if (cvs.getContext && cvs.getContext("2d")) {
      let ctx = cvs.getContext("2d");
      const filter = new Filter(ctx); // 实例滤镜
      // 水平翻转
      if (type === "y") {
        filter.flipHorizontal(0, 0, image.width, image.height);
      }
      // 垂直翻转
      if (type === "x") {
        filter.flipVertical(0, 0, image.width, image.height);
      }
      let img = convertCanvasToImage(cvs);
      dom.img.attr("href", img.src);
    }
  };
}

/*
 * 设计图旋转
 * @param {object} dom 设计图的所有节点
 * */
export function domUtilImageRotate(dom) {
  // 获取当前节点的矩阵
  function getMatrix() {
    let IM = dom.imgBd.attr("transform").localMatrix;
    let EM = dom.editBd.attr("transform").localMatrix;
    return { IM, EM };
  }
  // 设置变化后的矩阵
  function rotate(angle, M) {
    let { IM, EM } = M;
    let bbox = dom.img.getBBox();
    IM.rotate(angle, bbox.cx, bbox.cy);
    EM.rotate(angle, bbox.cx, bbox.cy);
  }
  // 重新赋值矩阵
  function setMatrix(M) {
    let { IM, EM } = M;
    dom.imgBd.attr({ transform: IM });
    dom.editBd.attr({ transform: EM });
  }
  return {
    getMatrix: getMatrix,
    rotate: rotate,
    setMatrix: setMatrix,
  };
}
