import { cutMode } from "@/components/bmDesigner/app/utils/dom/designUtil";

export class Design {
  // 当前激活的产品id
  prodActiveId;
  // 产品列表
  prodList = [];
  // 模式 预览(preview)/编辑(edit)
  mode = "";
  constructor() {}
  // 添加产品
  addProd(prod) {
    // 添加产品
    this.prodList.push(prod);
    // 设置当前这个产品的id为激活的产品id
    this.setProdActiveId(prod.id);
    // 设置为预览模式
    this.setPreviewMode();
  }
  // 获取产品
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
  // 设为编辑模式
  setEditMode() {
    if (this.isPreviewMode()) {
      this.setMode("edit");
      cutMode(this.getMode());
      // designApp.patrolImgMode();
    }
  }
  // 设为编辑模式
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
  // 设为预览模式
  setPreviewMode() {
    this.setMode("preview");
    cutMode(this.getMode());
  }
}
