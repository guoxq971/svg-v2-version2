import { convertCanvasToImage, convertImageToCanvas } from "../util";
import { Filter } from "../../plugin/filter";
import { useDesign } from "../../index";
import { Message } from "element-ui";
import { utils } from "../../plugin/layerUtils";

/*
 * 获取移动到中心的矩阵
 * */
export function domUtilGetMatrixByMoveToCenter(sNode, x, y) {
  let bbox = sNode.getBBox();
  let M = sNode.attr("transform").localMatrix;
  M.translate(x - bbox.x - bbox.width / 2, y - bbox.y - bbox.height / 2);
  return {
    matrix: M,
  };
}

/*
 * 移动到指定位置(中心)
 * @param {SNode} snap 节点
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * */
export function domUtilMoveToCenter(SNode, x, y) {
  let matrix;
  if (Snap.is(SNode, "array")) {
    SNode.forEach((item) => {
      let bbox = item.getBBox();
      let M = item.attr("transform").localMatrix;
      M.translate(x - bbox.x - bbox.width / 2, y - bbox.y - bbox.height / 2);
      matrix = M;
      // item.attr({ transform: M });
    });
  } else {
    let bbox = SNode.getBBox();
    let M = SNode.attr("transform").localMatrix;
    M.translate(x - bbox.x - bbox.width / 2, y - bbox.y - bbox.height / 2);
    matrix = M;
    // SNode.attr({ transform: M });
  }
  return { matrix };
}

/*
 * 切换模式
 * @param {string} type 模式
 * */
export function domUtilCutMode(type, prod) {
  // 产品的dom
  let SNode = prod.getDom();
  // 产品下所有的设计图
  let designSNodeGroup = prod.getDesignSNodeGroup();
  let id;

  if (type === "preview") {
    id = SNode.defsClipD1.attr("id");
    SNode.editBdRedDashedPath.node.style.display = "none";
    SNode.editProdDashedPath.node.style.display = "none";
    SNode.editBdDashedPath.node.style.display = "none";
    SNode.editProdDashedPath.node.style.display = "none";
    SNode.previewProdImg.node.style.display = "inline";
    SNode.previewBgImg.node.style.display = "inline";
    designSNodeGroup.forEach((itemSNode) => {
      if (itemSNode.isImg()) itemSNode.dom.editBd.node.style.display = "none";
    });
  }

  if (type === "edit") {
    id = SNode.defsClipD2.attr("id");
    SNode.editBdRedDashedPath.node.style.display = "inline";
    SNode.editProdDashedPath.node.style.display = "inline";
    SNode.editBdDashedPath.node.style.display = "inline";
    SNode.editProdDashedPath.node.style.display = "inline";
    SNode.previewProdImg.node.style.display = "none";
    SNode.previewBgImg.node.style.display = "none";
    designSNodeGroup.forEach((itemSNode) => {
      if (itemSNode.isImg()) itemSNode.dom.editBd.node.style.display = "inline";
    });
  }

  // 将需要裁剪的元素的clip-path设置为相应的id
  SNode.svg.selectAll(".design-d").forEach((itemSNode) => {
    itemSNode.node.style["clip-path"] = `url("#${id}")`;
  });
}

/*
 * 切换图层-判断并提示
 * @param {image} image 当前图层
 * @param {image} cutImage 对比图层
 * @param {boolean} type 操作类型 up\down
 * @return {boolean} 是否可以切换 true:可以切换 false:不可以切换
 * */
export function domUtilCutLayerMsg(image, cutImage, type) {
  let prod = useDesign().getProd();
  // 1 背景图不能操作图层
  if (image.isBg()) {
    Message.warning("背景图不能进行移动的图层操作");
    return;
  }
  // 2 设计图不能为空
  if (prod.designSNodeGroup.length === 0) {
    Message.warning("请先选择设计图");
    return;
  }
  // 3 当前设计图只有一张
  if (prod.designSNodeGroup.length === 1) {
    Message.warning("当前只有一张设计图");
    return;
  }
  // 4 当前设计图已经在顶层
  if (
    ["up", "top"].includes(type) &&
    image.getLayerIndex() === useDesign().getMaxLayerIndex()
  ) {
    Message.warning("当前设计图已经在顶层");
    return;
  }
  // 5 当前设计图已经在底层
  if (
    ["down", "bottom"].includes(type) &&
    image.getLayerIndex() === useDesign().getMinLayerIndex()
  ) {
    Message.warning("当前设计图已经在底层");
    return;
  }
  return true;
}

/*
 * 切换图层-image的layerIndex切换
 * */
export function domUtilCutLayerDom(image, cutImage) {}

/*
 * 图层操作
 * @param {string} type 操作类型 down\up
 * @param {any} sNodeDom 设计图的SNode(class组)
 * @param {boolean} msgFlag 是否显示消息
 * */
export function domUtilLayer(type, sNode, msgFlag = true) {
  let prod = useDesign().getProd();
  let sNodeDom = sNode.getDom();
  if (sNode.isBg(sNode)) {
    msgFlag && Message.warning("背景图不能进行移动的图层操作");
    return;
  }
  if (prod.designSNodeGroup.length === 0) {
    msgFlag && Message.warning("请先选择设计图");
    return;
  }
  if (prod.designSNodeGroup.length === 1) {
    msgFlag && Message.warning("当前只有一张设计图");
    return;
  }
  if (type === "up") {
    if (utils.next(sNodeDom.imgG.node) === null) {
      msgFlag && Message.warning("已经在最上层");
      return;
    }
    // dom操作，更换位置
    let curSNode = sNodeDom.imgG;
    let nextSNode = Snap(utils.next(curSNode.node));
    curSNode.insertAfter(nextSNode);
  }
  if (type === "down") {
    // 如果当前设计图是背景图
    if (sNode.isBg()) {
      // 比较的元素是否是背景图, 如果是就不能继续往下
      if (
        Snap(utils.prev(sNodeDom.imgG.node)) ===
        useDesign().getBgImage(sNode.getProdId()).getDom().imgG
      ) {
        msgFlag && Message.warning("已经在最下层，不能超过背景图");
        return;
      }
    }
    // 边界判断
    if (
      utils.prev(sNodeDom.imgG.node) === null ||
      utils.prev(sNodeDom.imgG.node)?.nodeName === "rect"
    ) {
      msgFlag && Message.warning("已经在最下层");
      return;
    }
    // dom操作，更换位置
    let curSNode = sNodeDom.imgG;
    let nextSNode = Snap(utils.prev(curSNode.node));
    curSNode.insertBefore(nextSNode);
  }
  return true;
}

/*
 * 设计图缩放
 * @param {object} dom 设计图的所有节点
 * */
export function domUtilImageScale(dom) {
  // 获取当前节点的矩阵
  function getMatrix() {
    let IM = dom.img.attr("transform").localMatrix;
    return { IM };
  }
  // 设置变化后的矩阵
  function scale(scale, M) {
    let { IM } = M;
    let bbox = dom.img.getBBox();
    IM.scale(scale, scale, bbox.cx, bbox.cy);
  }
  // 重新赋值矩阵
  function setMatrix(M) {
    let { IM } = M;
    dom.img.attr({ transform: IM });
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
  return {
    getMatrix,
    scale,
    setMatrix,
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

/*
 * 设计图移动
 * @param {object} dom 设计图的所有节点
 * */
export function domUtilImageMove(dom) {
  // 获取当前节点的矩阵
  function getMatrix() {
    let matrix = dom.imgBd.attr("transform").localMatrix;
    return { matrix };
  }

  // 设置变化后的矩阵
  function move(x, y, M) {
    let { matrix } = M;
    matrix.translate(x, y);
  }

  // 重新赋值矩阵
  function setMatrix(M) {
    let { matrix } = M;
    dom.imgBd.attr("transform", matrix);
    dom.editBd.attr("transform", matrix);
  }

  return {
    getMatrix: getMatrix,
    move: move,
    setMatrix: setMatrix,
  };
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
