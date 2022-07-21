// 移动到指定位置(中心)
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
