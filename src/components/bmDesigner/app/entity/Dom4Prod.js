import {
  createBgImg,
  createBorderDashedRect,
  createClipD1,
  createClipD2,
  createDesignGroup,
  createDesignGroupClipRect,
  createDesignGroupRect,
  createEditBdRedDashedPath,
  createProdDashedPath,
  createProductImg,
  createSvg,
} from "../utils/dom/dom4CreateProd";
import { moveToCenter } from "../utils/dom/dom4Util";
import { Dom4ProdEntity } from "./Dom4ProdEntity";

// 产品的 dom 对象
export class Dom4Prod extends Dom4ProdEntity {
  constructor(container, d1, d2, d3, bgUrl, prodUrl) {
    super();
    // svg 容器
    this.svgContainer = Snap(container);
    // svg 对象
    this.svg = createSvg();
    // 将svg添加到容器内
    this.svgContainer.add(this.svg);
    // 将svg添加到容器内
    this.svgContainer.add(this.svg);
    // defs 裁剪
    this.defsClipD1 = createClipD1(this.svg, { id: "preview", d1 });
    this.defsClipD2 = createClipD2(this.svg, { id: "edit", d2 });
    // [编辑模式]边框红色虚线path
    this.editBdRedDashedPath = createEditBdRedDashedPath(this.svg, { d2 });
    // [预览模式]背景图
    this.previewBgImg = createBgImg(this.svg, { url: bgUrl });
    // [预览/编辑模式]设计图组
    this.designGroup = createDesignGroup(this.svg);
    let RDPBbox = this.editBdRedDashedPath.getBBox();
    this.designGroupRect = createDesignGroupRect(this.svg, {
      w: RDPBbox.width,
      h: RDPBbox.height,
    });
    this.designGroupClipRect = createDesignGroupClipRect(this.svg, {
      w: RDPBbox.width,
      h: RDPBbox.height,
    });
    this.designGroup.add(this.designGroupRect, this.designGroupClipRect);
    // [预览模式]产品图
    this.previewProdImg = createProductImg(this.svg, { url: prodUrl });
    // [编辑模式]产品的红色虚线
    this.editProdDashedPath = createProdDashedPath(this.svg, { d3 });
    // [编辑模式]边框的黑色虚线
    let bbox = this.editProdDashedPath.getBBox();
    this.editBdDashedPath = createBorderDashedRect(this.svg, {
      x: bbox.x,
      y: bbox.y,
      w: bbox.width,
      h: bbox.height,
    });
    // 移动到中心位置
    moveToCenter(
      [
        this.designGroup,
        this.editBdRedDashedPath,
        this.editBdDashedPath,
        this.editProdDashedPath,
      ],
      this.svg.getBBox().cx,
      this.svg.getBBox().cy
    );
  }
}
