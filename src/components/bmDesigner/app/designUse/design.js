import { DesignProxy, useQueue } from "../index";
import { Bg } from "../entity/image/bg";
import { Img } from "../entity/image/img";
import { utils } from "@/components/bmDesigner/app/plugin/layerUtils";
import { ArrayMove } from "@/components/bmDesigner/app/utils/util";
import { vueGetLayerListBySid } from "@/components/bmDesigner/util";

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
  setImageActionId(image, prod) {
    if (typeof image === "string") {
      prod.setImageActionId(image);
    } else {
      image.getProd().setImageActionId(image.getData().sid);
    }
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
        new Bg({ data: { color: color }, prodId: prod.getId() })
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
    let image = prod.addImage(new Img({ data: data, prodId: prod.id }));
    // 将图片设置为激活状态
    prod.setImageActionId(image.getId());
    // 进入编辑模式
    this.setEditMode();
    return image;
  }

  /*
   * 根据设计图层级获取设计图(不包含背景图)
   * @param {number|string} layerIndex 设计图层级
   * */
  getImageByLayerIndex(layerIndex) {
    let index = layerIndex;
    if (layerIndex === "max") {
      index = this.getMaxLayerIndex();
    }
    if (layerIndex === "min") {
      index = this.getMinLayerIndex();
    }
    // 根据层级获取设计图
    let image = this.getProd()
      .getDesignSNodeGroup()
      .find((image) => image.getLayerIndex() === index);
    console.log(
      "getImageByLayerIndex",
      this.getProd().getDesignSNodeGroup(),
      index,
      image
    );
    return image;
  }

  /*
   * 获取产品内的设计图组图层层级-最大值
   * */
  getMaxLayerIndex(prod) {
    prod = prod || this.getProd();
    let indexes = prod
      .getDesignSNodeGroup()
      .filter((e) => e.isNotBg())
      .map((e) => e.getLayerIndex());
    return Math.max(...indexes);
  }

  /*
   * 获取产品内的设计图组图层层级-最小值
   * */
  getMinLayerIndex(prod) {
    prod = prod || this.getProd();
    let indexes = prod
      .getDesignSNodeGroup()
      .filter((e) => e.isNotBg())
      .map((e) => e.getLayerIndex());
    return Math.min(...indexes);
  }

  /*
   * 将两个设计图的层级互换, 并在视图中重新渲染
   * @param {class} curSid 操作的设计图id
   * @param {class} cutSid 要互换的设计图id
   * @param {string} type 操作类型 up\down\top\bottom
   * @param {array} layerList 排序完后的list
   * */
  swapLayerIndex(curSid, cutSid, type, layerList, isAddQueue = true) {
    let curImage = this.getProd().getImage(curSid);
    let cutImage = this.getProd().getImage(cutSid);
    let curIndex = vueGetLayerListBySid(curSid, layerList).index;
    let cutIndex = vueGetLayerListBySid(cutSid, layerList).index;
    // 操作vue数据
    let vueDisposeFinishLayerList = ArrayMove(layerList, curIndex, cutIndex);
    let sidList = vueDisposeFinishLayerList.map((e) => {
      return { sid: e.sid };
    });
    // 操作dom
    if (["up", "top"].includes(type)) {
      cutImage.getDom().imgG.after(curImage.getDom().imgG);
    }
    if (["down", "bottom"].includes(type)) {
      cutImage.getDom().imgG.before(curImage.getDom().imgG);
    }
    // 操作image类
    let list = [];
    sidList.forEach((data) => {
      list.unshift(this.getProd().getImage(data.sid));
    });
    this.getProd().setDesignGroup(list);
    this.getProd().sortByCurIndex();
    if (isAddQueue) {
      useQueue().addQueue();
    }
    return {
      list: vueDisposeFinishLayerList,
    };
  }
}
