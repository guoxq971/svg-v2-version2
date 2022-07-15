import { DesignProxy } from "../../index";

/*
 * 切换模式
 * @param {string} type 模式
 * */
export function cutMode(type) {
  // 产品
  const prod = DesignProxy().getProd();
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
