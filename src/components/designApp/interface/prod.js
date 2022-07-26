import { uuid } from "../../bmDesigner/app/utils/util";

export class ProdMode {
  static preview = "preview";
  static edit = "edit";

  static isPreview(mode) {
    return mode === ProdMode.preview;
  }
  static isEdit(mode) {
    return mode === ProdMode.edit;
  }
}

/*
 * 产品
 * */
export class ProdInterface {
  constructor(param) {
    this.mode = ProdMode.preview;
    this.id = uuid();
    param = { ...param, prodId: this.id };
    this.previewD1 = param.d1;
    this.editD2 = param.d2;
    this.editBdRedPath = new EditBdRedPath(param);
    this.previewBgImage = new PreviewBgImage(param);
    this.designGroup = new DesignGroup(param);
    this.previewProdImage = new PreviewProdImage(param);
    this.editProdRedPath = new EditProdRedPath(param);
    this.editBdBackRect = new EditBdBlackRect(param);
  }

  isPreviewMode() {
    return this.mode === ProdMode.preview;
  }
  isEditMode() {
    return this.mode === ProdMode.edit;
  }
}

// [编辑模式]边框红色虚线path
class EditBdRedPath {
  constructor(param) {
    this.type = ProdMode.edit;
    this.d = param.d2;
    this.transform = "matrix(1,0,0,1,8.624,20.35)";
  }
}

// [预览模式]背景图
class PreviewBgImage {
  constructor(param) {
    this.type = ProdMode.preview;
    this.href = param.bgUrl;
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
    this.style = "display: inline";
  }
}

// 设计图-组合
class DesignGroup {
  constructor(param) {
    this.transform = "matrix(1,0,0,1,8.625,20.375)";
    this.rect = new DesignGroupRect(param);
  }
}
// 设计图-组合的 rect
class DesignGroupRect {
  constructor(param) {
    let bbox = Snap.path.getBBox(param.d2);
    this.x = 0;
    this.y = 0;
    this.width = bbox.width;
    this.height = bbox.height;
  }
}

// [预览模式]产品图
class PreviewProdImage {
  constructor(param) {
    this.type = ProdMode.preview;
    this.href = param.productImg;
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
    this.style = "pointer-events: none; display: inline";
  }
}

// [设计模式][产品的红色虚线]path-d3
class EditProdRedPath {
  constructor(param) {
    this.type = ProdMode.edit;
    this.d = param.d3;
    this.style = "stroke-width: 1.8; stroke-dasharray: 5; display: none";
    this.transform = "matrix(1,0,0,1,9.254,20.372)";
  }
}

// [编辑模式]边框的黑色虚线rect
class EditBdBlackRect {
  constructor(param) {
    this.type = ProdMode.edit;
    this.x = 0;
    this.y = 0;
    this.width = 483.492;
    this.height = 461.256;
    this.style = "stroke-dasharray: 2; display: none";
    this.transform = "matrix(1,0,0,1,8.254,19.372)";
  }
}
