import { getOffset, getDistance } from "../util";
import { DEFILE_IMAGE_OSTYPE_SCALE, DEFINE_IMAGE_OSTYPE_PLUS } from "../define";

// 缩放
export class imageScale {
  // 鼠标点击在缩放图片上距离图片右下角的偏移量
  offset_x = 0;
  offset_y = 0;
  //记录的鼠标坐标
  x;
  y;
  scale;

  // 拖拽开始
  start(imgSNode, x, y, event, image) {
    // 图片在body中的右下角坐标
    let os = getOffset(imgSNode.img.node);
    // 计算鼠标到设计图右下角的偏移量
    this.offset_x = x - os.x2;
    this.offset_y = y - os.y2;
    this.x = os.x2;
    this.y = os.y2;
    this.scale = image.getScale();
  }

  // 拖拽中
  move(imgSNode, dx, dy, x, y, event, image) {
    // 获取图片在body的坐标信息
    let imgOs = getOffset(imgSNode.img.node);
    let x2 = x - this.offset_x;
    let y2 = y - this.offset_y;
    // 计算缩放比例
    let scale = getScale(imgOs.cx, imgOs.cy, this.x, this.y, x2, y2);
    this.scale *= scale;
    // 缩放
    image.imageScale(scale, DEFINE_IMAGE_OSTYPE_PLUS, false);
    // 重置鼠标坐标(第一次记录是在start中), 使得下次拖拽的时候可以计算出移动形成的缩放比例
    this.x = x2;
    this.y = y2;
  }

  // 拖拽结束
  end(imgSNode, event, image) {
    image.carryLog({
      scale: this.scale,
      type: DEFILE_IMAGE_OSTYPE_SCALE,
      handleType: DEFINE_IMAGE_OSTYPE_PLUS,
    });
  }
}

/*
    # 缩放正负逻辑
    1. 坐标原点a[ox, oy], 当前点b[x, y], 移动点c[x2, y2]
        2. 求 角bac 的度数
        3. 移动 c 得到缩放后的 角bac2
        4. 角bac2 / 角bac = 缩放比例
* */
function getScale(ox, oy, x, y, x2, y2) {
  // 计算缩放比例
  let line = getDistance(ox, oy, x, y);
  let newLine = getDistance(ox, oy, x2, y2);
  return newLine / line;
}
