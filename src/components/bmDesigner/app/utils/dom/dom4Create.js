// 创建裁剪元素
export function createClipPath(svg, id) {
  let dom = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
  dom.setAttribute("id", id);
  svg.node.appendChild(dom);
  return Snap(`#${id}`);
}
