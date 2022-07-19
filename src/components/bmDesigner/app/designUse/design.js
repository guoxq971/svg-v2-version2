import { DesignProxy, useDesign } from "../index";
import { DesignImage } from "../entity/Image";

export class UseDesign {
  /*
   * 进入编辑模式
   * */
  setEditMode() {
    DesignProxy().setEditMode();
  }

  /*
   * 获取产品 - 默认获取当前产品
   * @param {string} prodId 产品class的id
   * */
  getProd(prodId) {
    if (prodId) {
      return DesignProxy().getProd(prodId);
    } else {
      return DesignProxy().getProd();
    }
  }

  /*
   * 获取激活的设计图 - 默认获取当前激活产品的激活设计图
   * @param {string} prodId 产品class的id
   * */
  getActiveImage(prodId) {
    if (prodId) {
      return this.getProd(prodId).getImage();
    } else {
      return this.getProd().getImage();
    }
  }

  /*
   * 获取背景图 - 默认获取当前激活产品的设计图
   * */
  getBgImage(prodId) {
    if (prodId) {
      return this.getProd(prodId).getBgImage();
    } else {
      return this.getProd().getBgImage();
    }
  }

  /*
   * 设置激活的设计图id
   * @param {class} image 设计图class
   * */
  setImageActionId(image) {
    image.getProd().setImageActionId(data.sid);
    this.setEditMode();
  }

  /*
   * 添加类型为bg的设计图
   * @param {string} color 背景颜色
   * */
  addImage4TypeByBg(color) {
    let image;
    let prod = this.getProd();
    let hasBg = this.getProd().hasBgImage();
    if (hasBg) {
      image = this.getProd().getBgImage();
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
    this.setEditMode();
    return {
      image,
      hasBg,
    };
  }

  /*
   * 添加类型为img的设计图
   * @param {object} data 设计图数据
   * */
  addImage4TypeByImg(data) {
    let prod = this.getProd();
    // 初始化图片添加到产品中，并返回图片sNode
    let image = prod.addImage(
      new DesignImage({ type: "img", data: data, prodId: prod.id })
    );
    // 将图片设置为激活状态
    prod.setImageActionId(image.getId());
    // 进入编辑模式
    this.setEditMode();
    return image;
  }
}
