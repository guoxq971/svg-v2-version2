/*
 * 移动到指定位置(中心)
 * @param {SNode} snap 节点
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * */
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
 * */
export function utilImageScale(dom, IM) {
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
