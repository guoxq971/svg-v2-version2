// 创建裁剪元素
export function createClipPath(svg, id) {
  let dom = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
  dom.setAttribute("id", id);
  svg.node.appendChild(dom);
  return Snap(`#${id}`);
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
