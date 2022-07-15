import { DesignProxy } from "../index";
import { DesignImage } from "../entity/Image";

// 获取产品
export function getProd(prodId) {
  if (prodId) {
    return DesignProxy().getProd(prodId);
  } else {
    return DesignProxy().getProd();
  }
}

// 获取激活的设计图
export function getActiveImage(prodId) {
  if (prodId) {
    return getProd(prodId).getImage();
  } else {
    return getProd().getImage();
  }
}

// 获取背景图
export function getBgImage(prodId) {
  if (prodId) {
    return getProd(prodId).getBgImage();
  } else {
    return getProd().getBgImage();
  }
}

/*
 * 设置激活的设计图id
 * @param {class} image 设计图class
 * */
export function setImageActionId(image) {
  image.getProd().setImageActionId(data.sid);
  DesignProxy().setEditMode();
}

// 添加类型为type的设计图
export function addImage4TypeByImg(data) {
  let prod = getProd();
  // 初始化图片添加到产品中，并返回图片sNode
  let image = prod.addImage(
    new DesignImage({ type: "img", data: data, prodId: prod.id })
  );
  // 将图片设置为激活状态
  prod.setImageActionId(image.getId());
  // 进入编辑模式
  DesignProxy().setEditMode();
  return image;
}

// 添加类型为bg的设计图
export function addImage4TypeByBg(color) {
  let image;
  let prod = getProd();
  let hasBg = getProd().hasBgImage();
  if (hasBg) {
    image = getProd().getBgImage();
    image.setColor(color);
  } else {
    // 初始化图片添加到产品中，并返回图片sNode
    image = prod.addImage(
      new DesignImage({ type: "bg", data: { color: color } })
    );
  }
  // 将图片设置为激活状态
  prod.setImageActionId(image.getId());
  // 进入编辑模式
  DesignProxy().setEditMode();
  return {
    image,
    hasBg,
  };
}
