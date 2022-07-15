// 设计图入参适配器
import { swapArrData } from "@/components/bmDesigner/app/utils/util";

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
