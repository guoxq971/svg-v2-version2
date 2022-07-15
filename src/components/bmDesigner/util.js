// 设计图入参适配器
import { swapArrData } from "./app/utils/util";
import {
  addImage4TypeByBg,
  addImage4TypeByImg,
  getActiveImage,
  getProd,
} from "./app/designUse/index";
import { layer } from "./app/utils/layer";

// 设计图入参适配器(复制的时候用到)
export function imageAdapterV2(data) {
  return {
    id: data.id,
    name: data.name,
    sid: data.sid,
    url: data.url,
  };
}

// 设计图入参适配器
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

// 设计图-选中
export function vueSelectImage(data, layerList) {
  // 设计器添加设计图操作
  let image = addImage4TypeByImg(data);
  // vue数据操作
  let d = imageAdaptor(image, data);
  layerList.unshift(d);
  image.setData(d);
  return image;
}

// 背景色-应用
export function vueApplyBgColor(color, layerList) {
  const { image, hasBg } = addImage4TypeByBg(color);
  if (hasBg) {
    let layer = vueGetImage(layerList, image.id);
    layer.name = `${color}`;
  } else {
    layerList.push(bgImageAdaptor(image));
  }
}

// 图层-上下移动
export function vueLayerUpDown(type, layerList, activeImgId, msgFlag, data) {
  // 图层dom操作 + 提示信息
  data = data ? data : vueGetImage(layerList, activeImgId);
  let result = layer(type, data.sNode, msgFlag);
  // vue数据操作
  let list = layerIndex(result, layerList, data, type);
  // return这个是置顶、置底的时候用的
  return {
    result,
    layerList: list,
  };
}

// 图层-删除
export function vueDeleteImage(layerList, id) {
  layerList.findIndex((item) => {
    if (item?.sid === id) {
      layerList.splice(layerList.indexOf(item), 1);
    }
  });
}

/*
 * 图层-复制
 * @param {function} picClick 图片点击事件
 * */
export function vueCopyImage(picClick) {
  if (!getProd().hasImageAction) {
    this.$message.warning("请先选择设计图");
    return;
  }
  let image = getActiveImage();
  let newImage = picClick(imageAdapterV2(image.data));
  image.copy(newImage);
}

// 背景预设值
export const predefineColors = [
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
];
