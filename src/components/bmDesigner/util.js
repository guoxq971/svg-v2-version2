import { ArrayMove, SvgImgToBase64, swapArrData } from "./app/utils/util";
import saveSvgAsPng from "save-svg-as-png";
import {
  bgImageAdaptor,
  imageAdapterV2,
  imageAdaptor,
} from "./app/utils/adaptor";
import { useDesign, useQueue } from "./app/index";
import { domUtilCutLayerMsg } from "./app/utils/dom/dom4Util";

// 获取当前激活的图层设计图
export function vueGetActiveImageLayer(layerList, id) {
  return layerList.find((item) => item.sid === id);
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

/*
 * 获取图层-根据sid在vue的layerList中获取
 * @param {string} sid 设计图自定义id
 * @return {object}
 *            {number} index 数据在layerList中的下标
 *            {object} data  在layerList中的数据
 * */
export function vueGetLayerListBySid(sid, layerList) {
  let index = layerList.findIndex((data) => data.sid === sid);
  return {
    index: index,
    data: layerList[index],
  };
}

/*
 * 图层-上下移动
 * @param {string} type up\down\top\bottom
 * @param {layerList} vue数据的图层列表
 * @param {data} vue数据的当前操作数据
 * */
export function vueLayerUpDown(type, layerList, data) {
  let curImage = data.sNode;
  let curIndex = vueGetLayerListBySid(data.sid, layerList).index;
  let cutImage;
  let cutIndex;
  let list;
  if (type === "up") {
    cutIndex = curIndex - 1;
  } else if (type === "down") {
    cutIndex = curIndex + 1;
  } else if (type === "top") {
    cutIndex = 0;
  } else if (type === "bottom") {
    cutIndex = layerList.length - 1;
  }
  cutImage = layerList[cutIndex]?.sNode;
  const isOk = domUtilCutLayerMsg(curImage, cutImage, type);
  if (isOk) {
    let obj = useDesign().swapLayerIndex(
      curImage.id,
      cutImage.id,
      type,
      layerList
    );
    list = obj.list;
  }
  // 返回vue使用数据
  return { isOk, list };
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
