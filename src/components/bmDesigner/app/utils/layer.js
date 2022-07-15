import { utils } from "../plugin/layerUtils";
import { Message } from "element-ui";
import { getBgImage, getProd } from "../designUse/design";

/*
 * 图层操作
 * @param {string} type 操作类型 down\up
 * @param {any} sNode 设计图的SNode(class组)
 * @param {boolean} msgFlag 是否显示消息
 * */
export function layer(type, sNode, msgFlag = true) {
  let prod = getProd();
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
    let curSNode = sNodeDom.imgG;
    let nextSNode = Snap(utils.next(curSNode.node));
    curSNode.insertAfter(nextSNode);
  }
  if (type === "down") {
    if (sNode.isBg()) {
      if (
        Snap(utils.prev(sNodeDom.imgG.node)) ===
        getBgImage(sNode.getProdId()).getDom().imgG
      ) {
        msgFlag && Message.warning("已经在最下层，不能超过背景图");
        return;
      }
    }
    if (
      utils.prev(sNodeDom.imgG.node) === null ||
      utils.prev(sNodeDom.imgG.node)?.nodeName === "rect"
    ) {
      msgFlag && Message.warning("已经在最下层");
      return;
    }
    let curSNode = sNodeDom.imgG;
    let nextSNode = Snap(utils.prev(curSNode.node));
    curSNode.insertBefore(nextSNode);
  }
  return true;
}
