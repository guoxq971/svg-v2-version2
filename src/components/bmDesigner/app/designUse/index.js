import { DesignProxy } from "../index";
import { DesignImage } from "../entity/Image";

// 获取产品
export function getProd() {
  return DesignProxy().getProd();
}

// 获取激活的设计图
export function getActiveImage() {
  return DesignProxy().getProd().getImage();
}

// 获取背景图
export function getBgImage() {
  return getProd().getBgImage();
}

// 获取设计图id
export function getImageActionId() {
  return DesignProxy().getProd().getImageActionId();
}

// 删除设计图
export function deleteImageById(id) {
  return DesignProxy().getProd().deleteImage(id);
}

// 设置激活的设计图id
export function setImageActionId(id) {
  DesignProxy().getProd().setImageActionId(id);
  DesignProxy().setEditMode();
}

// 添加类型为type的设计图
export function addImage4TypeByImg(data) {
  let prod = DesignProxy().getProd();
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
  let prod = DesignProxy().getProd();
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
