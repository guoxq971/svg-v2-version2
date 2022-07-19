import { useDesign } from "../index";

// uuid函数
export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/*
 * 求三个坐标的 cosA 值
 * 坐标 [0,0] [50,50] [50,0]
 * [0,0] [50,50] 为边a
 * [0,0] [50,50] 为边b
 * [50,0] [50,50] 为边c
 * 求ab的角度
 * */
export function getAngle(x1, y1, x2, y2, x3, y3) {
  let a = getDistance(x1, y1, x2, y2);
  let b = getDistance(x1, y1, x3, y3);
  let c = getDistance(x2, y2, x3, y3);
  let value = Math.acos((a * a + b * b - c * c) / (2 * a * b));
  return (value * 180) / Math.PI;
}

/*
 * 获取鼠标方向
 * x,y = 参考坐标
 * x1,y1 = 鼠标坐标
 * 规则：
 * up: y2 > y
 * down: y2 < y
 * left: x2 < x
 * right: x2 > x
 * */
export function getMouseDirection(x, y, x2, y2) {
  let direction;
  // 移动方向
  if (y2 > y) {
    direction = "up";
  } else if (y2 < y) {
    direction = "down";
  } else if (x2 > x) {
    direction = "right";
  } else if (x2 < x) {
    direction = "left";
  }
  return direction;
}

// 获取元素(el)在 body 上的信息
export function getOffset(el) {
  var box = el.getBoundingClientRect(),
    doc = el.ownerDocument,
    body = doc.body,
    docElem = doc.documentElement,
    clientTop = docElem.clientTop || body.clientTop || 0,
    clientLeft = docElem.clientLeft || body.clientLeft || 0,
    zoom = 1;
  if (body.getBoundingClientRect) {
    var bound = body.getBoundingClientRect();
    zoom = (bound.right - bound.left) / body.clientWidth;
  }
  if (zoom > 1) {
    clientTop = 0;
    clientLeft = 0;
  }
  var top =
      box.top / zoom +
      (window.pageYOffset ||
        (docElem && docElem.scrollTop / zoom) ||
        body.scrollTop / zoom) -
      clientTop,
    left =
      box.left / zoom +
      (window.pageXOffset ||
        (docElem && docElem.scrollLeft / zoom) ||
        body.scrollLeft / zoom) -
      clientLeft;
  // 右下角坐标
  box.x2 = box.right / zoom;
  box.y2 = box.bottom / zoom;
  // 宽高
  box.w = box.right - box.left;
  box.h = box.bottom - box.top;
  // 圆心坐标
  box.cx = box.left + box.w / 2;
  box.cy = box.top + box.h / 2;
  // 对角线长度
  box.line = Math.sqrt(
    Math.pow(box.x2 - box.x, 2) + Math.pow(box.y2 - box.y, 2)
  );
  return {
    top: top,
    left: left,
    box,
    x: box.x,
    y: box.y,
    ...box,
  };
}

/*
 * 获取象限
 * ox,oy = 中心点坐标
 * x2,y2 = 鼠标坐标
 * 如果 x2 > ox && y2 < oy, 则在第一象限
 * 如果 x2 < ox && y2 < oy, 则在第二象限
 * 如果 x2 < ox && y2 > oy, 则在第三象限
 * 如果x2 > ox && y2 > oy, 则在第四象限
 * */
export function getQuadrant(ox, oy, x2, y2) {
  let quadrant;
  if (x2 > ox && y2 < oy) {
    quadrant = 1;
  } else if (x2 < ox && y2 < oy) {
    quadrant = 2;
  } else if (x2 < ox && y2 > oy) {
    quadrant = 3;
  } else if (x2 > ox && y2 > oy) {
    quadrant = 4;
  }
  return quadrant;
}

// 求两点之间的距离
export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// 数组位置交换
export const swapArrData = (index1, index2, arr) => {
  const temp = arr.splice(index2, 1, arr[index1]);
  arr[index1] = temp[0];
  return arr;
};

// 图转canvas
export function convertImageToCanvas(image) {
  let canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);

  return canvas;
}

// canvas转图
export function convertCanvasToImage(canvas, x, y, w, h) {
  let image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}

// 将 svg 内，所有 image 节点的 href 转为 base64
export function SvgImgToBase64(
  name = "test.jpg",
  svg = useDesign().getProd().getDom().svg,
  fn = null
) {
  let domList = svg.selectAll("image");
  let len = domList.length;
  domList.forEach((item) => {
    let node = item.node;
    let img = node.getAttribute("href");
    let image = new Image();
    image.crossOrigin = "";
    image.src = img;
    image.onload = () => {
      let base64 = getBase64Image(image);
      node.setAttribute("href", base64); //更改href属性
      len--;
      if (len === 0) {
        fn();
      }
    };
  });
}

// 将指定图片转 base64, 并返回 base64
export function getBase64Image(img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  let dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
}
