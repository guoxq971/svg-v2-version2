import { utils } from "../plugin/layerUtils";
import { Message } from "element-ui";
import { useDesign } from "../index";

/*
 * 图层操作
 * @param {string} type 操作类型 down\up
 * @param {any} sNode 设计图的SNode(class组)
 * @param {boolean} msgFlag 是否显示消息
 * */
export function layer(type, sNode, msgFlag = true) {
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
