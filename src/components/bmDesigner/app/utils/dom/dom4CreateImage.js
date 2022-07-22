import { DesignProxy } from "@/components/bmDesigner/app";

// 创建 设计图最外层
export function createPicImgG(svg) {
  return svg.g().attr({ test: "设计图最外层g" });
}

// 创建 设计图的边框的边框-clip
export function cratePicImgClip(svg, param = {}) {
  return svg.g().attr({
    test: "设计图的边框的边框-clip",
    class: "design-d",
  });
}

// 创建 设计图的边框
export function cratePicImgBd(svg, param = {}) {
  return svg.g().attr({ test: "设计图的边框", style: "cursor:move;" }).drag();
}

// 创建 设计图
export function cratePicImg(svg, param = {}) {
  let { url } = param;
  return svg.image().attr({
    test: "设计图",
    bm: "edit",
    href: url,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    style: "cursor:move;overflow:hidden;",
  });
}

// 创建 编辑的边框
export function cratePicEditBd(svg, param = {}) {
  return svg.g().attr({ test: "编辑的边框" });
}

// 创建 编辑的矩形
export function cratePicEditRect(svg, param = {}) {
  return svg.rect().attr({
    test: "编辑的矩形",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    stroke: "#000",
    fill: "none",
  });
}

// 创建 编辑移动
export function cratePicEditMove(svg, param = {}) {
  return svg.image().attr({
    test: "编辑移动",
    bm: "edit",
    href: require("../../img/move.png"),
    x: -18,
    y: -18,
    width: 18,
    height: 18,
  });
}

// 创建 编辑旋转
export function cratePicEditRotate(svg, param = {}) {
  return svg.image().attr({
    test: "编辑旋转",
    bm: "edit",
    href: require("../../img/rotating.png"),
    x: 100,
    y: -18,
    width: 18,
    height: 18,
  });
}

// 创建 编辑缩放
export function cratePicEditScale(svg, param = {}) {
  return svg.image().attr({
    test: "编辑缩放",
    bm: "edit",
    href: require("../../img/zoom.png"),
    x: 100,
    y: 100,
    width: 18,
    height: 18,
  });
}

// 创建 编辑删除
export function cratePicEditDelete(svg, param = {}) {
  return svg.image().attr({
    test: "编辑删除",
    bm: "edit",
    href: require("../../img/delete.png"),
    x: -18,
    y: 100,
    width: 18,
    height: 18,
  });
}

// 创建 背景的矩形
export function cratePicBgRect(svg, param = {}) {
  let { color } = param;
  let bbox = svg.getBBox();
  return svg.rect().attr({
    test: "背景的矩形",
    class: "design-d",
    x: 0,
    y: 0,
    width: bbox.w,
    height: bbox.h,
    fill: color,
  });
}

// 创建裁剪元素
export function createClipPath(svg, id) {
  let dom = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
  dom.setAttribute("id", id);
  svg.node.appendChild(dom);
  return Snap(`#${id}`);
}
