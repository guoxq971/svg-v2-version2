// 切换模式
import { DesignProxy } from "../../index";

export function cutMode(type) {
  const prod = DesignProxy().getProd();
  let SNode = prod.getDom();
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
      // if (useDesign.isImg(itemSNode))
      //   itemSNode.editBd.node.style.display = "none";
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
      // if (useDesign.isImg(itemSNode))
      //   itemSNode.editBd.node.style.display = "inline";
    });
  }
  SNode.svg.selectAll(".design-d").forEach((itemSNode) => {
    itemSNode.node.style["clip-path"] = `url("#${id}")`;
  });
}
