import { cutMode } from "../utils/dom/designUtil";
import { addEventOverall } from "../utils/overall";
import { hotkeyInit } from "../utils/hotkeys";
import { imageAdapterV2 } from "../utils/adaptor";
import { getProd } from "@/components/bmDesigner/app/designUse/design";

export class Design {
  // 当前激活的产品id
  prodActiveId;
  // 产品列表
  prodList = [];
  // 模式 预览(preview)/编辑(edit)
  mode = "";
  // 上一个产品的vue图层数据layerList
  oldLayerList = [];
  // 对外暴露的接口
  api = {
    // vue设计图的点击事件
    imgClick: null,
    // vue设计图的删除事件
    imgDelete: null,
    // vue图层-复制事件
    imgCopy: null,
    // 获取vue数据的设计图的图层列表
    getLayerList: null,
    // 更新vue数据的设计图的图层列表
    updateLayerList: null,
    // vue的选择图片事件
    selImage: null,
    // vue的选择背景图片事件
    selBgImage: null,
  };

  // 构造函数
  constructor(param) {
    // 绑定事件
    this.api.imgClick = param.imgClick;
    this.api.imgDelete = param.imgDelete;
    this.api.imgCopy = param.imgCopy;
    this.api.getLayerList = param.getLayerList;
    this.api.updateLayerList = param.updateLayerList;
    this.api.selImage = param.selImage;
    this.api.selBgImage = param.selBgImage;

    // 监听鼠标按下，进入预览模式
    addEventOverall();
    // 初始化快捷键
    hotkeyInit({ copy: this.api.imgCopy });
  }
  /*
   * 添加产品
   * @param {class} prod 产品class
   * */
  addProd(prod) {
    // 添加产品
    this.prodList.push(prod);
    // 设置当前这个产品的id为激活的产品id
    this.setProdActiveId(prod.id);
    // 设置为预览模式
    this.setPreviewMode();
    if (this.getOldLayerList().length > 0) {
      this.getOldLayerList().forEach((item) => {
        if (item.type === "img") {
          this.api.selImage(imageAdapterV2(item));
        } else if (item.type === "bg") {
          this.api.selBgImage(item.color);
        }
      });
    }
  }
  /*
   * 添加产品之前执行的
   * */
  addProdBefore() {
    if (this.prodList.length > 0) {
      // 激活产品的id置为空
      this.setProdActiveId("");
      // 上一个产品的vue图层数据layerList
      this.setOldLayerList(this.api.getLayerList());
      // 将上一个产品的layerList设置为空
      this.api.updateLayerList([]);
      // 将所有产品的样式设置为隐藏
      this.prodList.forEach((item) => {
        item.hide();
        item.remove();
      });
    }
  }
  // 获取上一个产品的vue图层数据layerList
  getOldLayerList() {
    return this.oldLayerList;
  }
  // 设置上一个产品的vue图层数据layerList
  setOldLayerList(layerList) {
    this.oldLayerList = layerList;
  }
  /*
   * 获取产品
   * @param {string} id 产品id
   * @return {class} 产品class
   * */
  getProd(id = this.getProdActiveId()) {
    return this.prodList.find((item) => item.id === id);
  }
  // 获取当前模式
  getMode() {
    return this.mode;
  }
  // 是否是编辑模式
  isEditMode() {
    return this.getMode() === "edit";
  }

  // 是否是预览模式
  isPreviewMode() {
    return this.getMode() === "preview";
  }
  /*
   * 设为编辑模式
   * - 如果是预览模式才执行设置模式为edit
   * - 同步执行切换模式的dom样式切换
   * - 同步执行设计图巡查
   * */
  setEditMode() {
    if (this.isPreviewMode()) {
      this.setMode("edit");
      cutMode(this.getMode());
      this.getProd().patrolImgMode();
    }
  }
  /*
   * 设为预览模式
   * - 设置为预览模式
   * - 同步执行切换模式的dom样式切换
   * */
  setPreviewMode() {
    this.setMode("preview");
    cutMode(this.getMode());
  }
  // 设为模式
  setMode(mode) {
    this.mode = mode;
  }
  // 设置当前激活的产品id
  setProdActiveId(id) {
    this.prodActiveId = id;
  }
  // 获取当前激活的产品id
  getProdActiveId() {
    return this.prodActiveId;
  }
}
