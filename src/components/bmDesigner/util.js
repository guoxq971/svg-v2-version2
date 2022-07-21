import { SvgImgToBase64, swapArrData } from "./app/utils/util";
import { layer } from "./app/utils/layer";
import saveSvgAsPng from "save-svg-as-png";
import {
  bgImageAdaptor,
  imageAdapterV2,
  imageAdaptor,
} from "./app/utils/adaptor";
import { useDesign } from "./app/index";

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
export function vueGetActiveImageLayer(layerList, id) {
  return layerList.find((item) => item.sid === id);
}

/*
 * 置顶\置底
 * @param {string} type 置顶\置底
 * @param {function} handlerLayer vue函数、图层上下移动
 * */
export function vueSetTop(type, handlerLayer) {
  if (useDesign().getActiveImage().isBg()) {
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
  let image = useDesign().addImage4TypeByImg(data);
  // vue数据操作
  let d = imageAdaptor(image, data);
  layerList.unshift(d);
  image.setData(d);
  return image;
}

// 背景色-应用
export function vueApplyBgColor(color, layerList) {
  const { image, hasBg } = useDesign().addImage4TypeByBg(color);
  if (hasBg) {
    let layer = vueGetActiveImageLayer(layerList, image.id);
    layer.name = `${color}`;
  } else {
    let d = bgImageAdaptor(image);
    layerList.push(d);
    image.setData(d);
  }
}

// 图层-上下移动
export function vueLayerUpDown(type, layerList, activeImgId, msgFlag, data) {
  // 图层dom操作 + 提示信息
  data = data ? data : vueGetActiveImageLayer(layerList, activeImgId);
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
  if (!useDesign().getProd().hasImageAction) {
    this.$message.warning("请先选择设计图");
    return;
  }
  let image = useDesign().getActiveImage();
  let newImage = picClick(imageAdapterV2(image.data));
  image.copy(newImage);
}

// 下载 svg 图片
export function downloadSvg(
  name = "test.jpg",
  svg = useDesign().getProd().getDom().svg
) {
  SvgImgToBase64(name, svg, () => saveSvgAsPng.saveSvgAsPng(svg.node, name));
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
