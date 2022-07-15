// 设计图入参适配器
import { swapArrData } from "@/components/bmDesigner/app/utils/util";
import { getActiveImage } from "@/components/bmDesigner/app/designUse";

export function imageAdaptor(image, data) {
  data.sid = image.getId();
  return {
    sid: data.sid,
    type: "img",
    sNode: image,
    id: data.id,
    url: data.url,
    name: data.name,
    isShow: true,
  };
}

// (背景图)设计图入参适配器
export function bgImageAdaptor(image) {
  return {
    sid: image.getId(),
    type: "bg",
    sNode: image,
    id: "",
    url: "",
    name: `${image.getColor()}`,
    color: image.getColor(),
    isShow: true,
  };
}

// 图层数据下标调动
export function layerIndex(result, layerList, data, type) {
  if (result) {
    // vue 的数据操作
    let index = layerList.findIndex((item) => item.sid === data.sid);
    if (type === "up") {
      layerList = swapArrData(index, index - 1, layerList);
    }
    if (type === "down") {
      layerList = swapArrData(index, index + 1, layerList);
    }
  }
  return layerList;
}

// 获取当前激活的图层设计图
export function vueGetImage(layerList, id) {
  return layerList.find((item) => item.sid === id);
}

/*
 * 置顶\置底
 * @param {string} type 置顶\置底
 * @param {function} handlerLayer vue函数、图层上下移动
 * */
export function vueSetTop(type, handlerLayer) {
  if (getActiveImage().isBg()) {
    this.$message.warning("背景图不能置顶、置底");
    return;
  }
  const fn = () => {
    let result = handlerLayer(type, null, false);
    if (result) fn();
  };
  // 递归 fn 函数，直到没有图层可以置顶或置底
  fn();
}
