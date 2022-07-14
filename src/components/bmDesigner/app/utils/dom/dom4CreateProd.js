import { createClipPath } from "./dom4Create";
// 创建 svg
export function createSvg(param = {}) {
  let { w, h } = param;
  w = w || 544;
  h = h || 544;
  return Snap(w, h).attr({
    viewBox: "0 0 500 500",
    style: "border:1px dotted green;",
  });
}

// 创建 defs 裁剪
export function createClipD1(svg, param = {}) {
  let { id, d1 } = param;
  id = id || "preview";
  return createClipPath(svg, id)
    .attr("test", "[预览模式]-d1")
    .toDefs()
    .add(svg.path().attr("d", d1));
}

export function createClipD2(svg, param = {}) {
  let { id, d2 } = param;
  id = id || "edit";
  return createClipPath(svg, id)
    .attr("test", "[编辑模式]-d2")
    .toDefs()
    .add(svg.path().attr("d", d2));
}

// 创建 [编辑模式]边框红色虚线path
export function createEditBdRedDashedPath(svg, param = {}) {
  let { d2 } = param;
  return svg.path().attr({
    test: "[编辑模式]边框红色虚线path",
    style: "stroke-dasharray: 5; stroke-width=1.838235294117647",
    fill: "#ffffff",
    stroke: "#ff0000",
    d: d2,
  });
}

// [预览模式]创建背景图
export function createBgImg(svg, param = {}) {
  let { url, x, y, w, h } = param;
  x = x || 0;
  y = y || 0;
  w = w || 500;
  h = h || 500;
  return svg
    .image()
    .attr({ test: "[预览模式]背景图", href: url, x, y, width: w, height: h });
}

// 创建设计图组
export function createDesignGroup(svg, param = {}) {
  return svg.g().attr({ test: "设计图-组合" });
}

// 创建设计图组的 rect
export function createDesignGroupRect(svg, param = {}) {
  let { w, h } = param;
  return svg.rect().attr({
    test: "设计图组合rect",
    x: 0,
    y: 0,
    width: w,
    height: h,
    fill: "none",
  });
}

// 创建设计图组clip的 rect
export function createDesignGroupClipRect(svg, param = {}) {
  let { w, h } = param;
  return svg.rect().attr({
    test: "设计图组合rect",
    x: 0,
    y: 0,
    width: w,
    height: h,
    fill: "none",
    class: "design-d",
  });
}

// [预览模式]创建产品图
export function createProductImg(svg, param = {}) {
  let { url, x, y, w, h } = param;
  x = x || 0;
  y = y || 0;
  w = w || 500;
  h = h || 500;
  return svg.image().attr({
    test: "[预览模式]产品图",
    href: url,
    x,
    y,
    width: w,
    height: h,
    style: "pointer-events: none;",
  });
}

// [编辑模式]产品的红色虚线path
export function createProdDashedPath(svg, param = {}) {
  let { d3 } = param;
  return svg.path().attr({
    test: "[设计模式][产品的红色虚线]path-d3",
    d: d3,
    fill: "none",
    stroke: "red",
    style: "stroke-width:1.8;stroke-dasharray:5;",
  });
}

// [编辑模式]边框的黑色虚线rect
export function createBorderDashedRect(svg, param = {}) {
  let { x, y, w, h } = param;
  return svg.rect().attr({
    test: "[编辑模式]边框的黑色虚线rect",
    x: x,
    y: y,
    width: +w + 2,
    height: +h + 2,
    fill: "none",
    stroke: "rgb(0, 0, 0)",
    style: "stroke-dasharray: 2;",
  });
}
