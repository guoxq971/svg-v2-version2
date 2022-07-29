import { uuid } from "../util";
import { useSnap } from "../useSnap";
import { useUtil } from "../useUtil";
import {
  convertCanvasToImage,
  convertImageToCanvas,
} from "@/components/bmDesigner/app/utils/util";
import { Filter } from "@/components/bmDesigner/app/plugin/filter";

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
  constructor(param, vueThis) {
    let that = this;
    vueThis.$nextTick(() => {
      that.svgId = vueThis.id;
    });
    // 设计图id
    this.vueThis = vueThis;
    // 模式
    this.mode = ProdMode.preview;
    // 产品自定义id
    this.id = uuid();
    // 当前激活的设计图自定义id
    this.activeId = "";
    param = { ...param, prodId: this.id };
    // 设计图的列表
    this.imageList = [];
    param.imageList.forEach((item) => {
      this.addImage(new DesignImage({ ...item, svgId: this.svgId }));
    });
    this.setActiveId(this.imageList[0]?.id || "");
    // 产品的 d
    this.previewD1 = param.d1;
    this.editD2 = param.d2;
    // 编辑-边框的红色虚线
    this.editBdRedPath = new EditBdRedPath(param);
    // 预览-背景图
    this.previewBgImage = new PreviewBgImage(param);
    // 设计图组
    this.designGroup = new DesignGroup(param);
    // 预览-产品图
    this.previewProdImage = new PreviewProdImage(param);
    // 编辑-产品的红色虚线
    this.editProdRedPath = new EditProdRedPath(param);
    // 编辑-边框的黑色rect
    this.editBdBackRect = new EditBdBlackRect(param);
  }
  getImage(imgId) {
    return this.imageList.find((item) => item.id === imgId);
  }
  /*
   * 获取当前激活的设计图
   * */
  getActiveImage() {
    return this.imageList.find((item) => item.id === this.activeId);
  }
  /*
   * 添加设计图
   * @param {object} image vue数据 + svgId
   * @param {object} imageDta vue数据
   * */
  addImage(image, imageData) {
    let img = new DesignImage(image, imageData);
    this.imageList.push(img);
    return img;
  }
  /*
   * 添加背景图
   * */
  addImageBg(image) {
    let img = new DesignImageBg(image);
    this.imageList.push(img);
    return img;
  }
  /*
   * 设置当前激活的设计图自定义id
   * */
  setActiveId(id) {
    this.activeId = id;
    this.vueThis.$emit("changeActiveId", id);
  }
  setEditMode() {
    this.mode = ProdMode.edit;
  }
  setPreviewMode() {
    this.mode = ProdMode.preview;
  }
  isPreviewMode() {
    return this.mode === ProdMode.preview;
  }
  isEditMode() {
    return this.mode === ProdMode.edit;
  }
}

// 背景图
export class DesignImageBg {
  type = "bg";
  id = uuid();
  isShow = true;
  color = "";
  svgId = "";
  imgData = {
    name: "背景图",
  };
  x = 0;
  y = 0;
  width = 500;
  height = 500;
  constructor(param) {
    this.color = param.color;
    this.svgId = param.svgId;
    let us = new useSnap(this.svgId, this.id);
    let svg = us.svg();
    let bbox = svg.getBBox();
    this.width = bbox.w;
    this.height = bbox.h;
  }
}

// 设计图
export class DesignImage {
  type = "img";
  // 自定义设计图id
  id = uuid();
  // 显示隐藏
  isShow = true;
  // vue数据
  imageData = {};
  // 翻转-水平 0=不翻转 1=翻转
  reverseX = 0;
  reverseXImg;
  // 翻转-垂直 0=不翻转 1=翻转
  reverseY = 0;
  reverseYImg;
  reverseXYImg;
  // 用于监听，每次翻转后，更新图片
  reverse = 0;
  reverseName = "";
  constructor(param, imageData) {
    this.imageData = imageData;
    this.svgId = param.svgId;
    this.imgData = param;
    this.imageBd = {
      transform: "matrix(1,0,0,1,0,0)",
    };
    this.image = {
      transform: "matrix(1,0,0,1,0,0)",
      orgHref: param?.url,
      href: param?.url,
      x: 0,
      y: 0,
      width: param?.width,
      height: param?.height,
    };
    this.editBd = {
      transform: "matrix(1,0,0,1,0,0)",
    };
    this.editRect = {
      x: 0,
      y: 0,
      width: param?.width,
      height: param?.height,
    };
    this.imageMove = {
      href: DefineImage.move,
      x: -18,
      y: -18,
      width: 18,
      height: 18,
    };
    this.imageRotate = {
      href: DefineImage.rotate,
      x: param?.width,
      y: -18,
      width: 18,
      height: 18,
    };
    this.imageScale = {
      href: DefineImage.scale,
      x: param?.width,
      y: param?.height,
      width: 18,
      height: 18,
    };
    this.imageDelete = {
      href: DefineImage.delete,
      x: -18,
      y: param?.height,
      width: 18,
      height: 18,
    };
  }

  /*
   * 设置翻转
   * @param {number} reverse x-水平翻转 y-垂直翻转
   * */
  setReverse(reverse) {
    this.reverseName = reverse;
    if (reverse === "x") {
      this.reverseX = this.reverseX === 0 ? 1 : 0;
    }
    if (reverse === "y") {
      this.reverseY = this.reverseY === 0 ? 1 : 0;
    }
    this.reverse = uuid();
  }

  /*
   * 设计图的display属性
   * @param {boolean} isShow true-显示 false-隐藏
   * */
  setIsShow(isShow) {
    this.isShow = isShow;
  }
  /*
   * 根据设计图的矩阵返回角度
   * @param {number} rotate 角度
   * */
  getRotate() {
    let imgId = this.id;
    let svgId = this.svgId;
    let { rotate } = useUtil.getBBoxByImage(svgId, imgId);
    return rotate;
  }
  /*
   * 根据角度更改dom的矩阵
   * @param {number} rotate 角度
   * */
  setRotate(rotate) {
    let imgId = this.id;
    let svgId = this.svgId;
    let { imgBdMatrix, editBdMatrix } = useUtil.getMatrixByRotateReal(
      svgId,
      imgId,
      rotate
    );
    this.imageBd.transform = imgBdMatrix.toString();
    this.editBd.transform = editBdMatrix.toString();
  }
  /*
   * 根据x,y更改dom的矩阵
   * */
  setMove(x, y) {
    let imgId = this.id;
    let svgId = this.svgId;
    let obj = useUtil.getMatrixByMoveReal(svgId, imgId, x, y);
    this.imageBd.transform = obj.imgBdMatrix.toString();
    this.editBd.transform = obj.editBdMatrix.toString();
  }
  /*
   * 根据所i放比例更改dom的矩阵
   * @param {number} scale 缩放比例
   * */
  setScale(scale) {
    let imgId = this.id;
    let svgId = this.svgId;
    let obj = useUtil.getMatrixByScaleReal(svgId, imgId, scale);
    let promise = new Promise((resolve) => resolve());
    promise
      .then(() => (this.image.transform = obj.imgMatrix.toString()))
      .then(() => {
        // 获取sNode节点
        let us = new useSnap(svgId, imgId);
        let bbox = us.img().getBBox();
        this.editRect.x = bbox.x;
        this.editRect.y = bbox.y;
        this.editRect.width = bbox.width;
        this.editRect.height = bbox.height;
        this.imageMove.x = -18 + bbox.x;
        this.imageMove.y = -18 + bbox.y;
        this.imageRotate.x = bbox.x2;
        this.imageRotate.y = -18 + bbox.y;
        this.imageScale.x = bbox.x2;
        this.imageScale.y = bbox.y2;
        this.imageDelete.x = -18 + bbox.x;
        this.imageDelete.y = bbox.y2;
      });
  }
}

// [编辑模式]边框红色虚线path
class EditBdRedPath {
  constructor(param) {
    this.type = ProdMode.edit;
    this.d = param.d2;
    this.transform = "matrix(1,0,0,1,0,0)";
  }
}

// [预览模式]背景图
class PreviewBgImage {
  constructor(param) {
    this.type = ProdMode.preview;
    this.href = param.bgImg;
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
    this.transform = "matrix(1,0,0,1,0,0)";
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
    this.transform = "matrix(1,0,0,1,0,0)";
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
    this.transform = "matrix(1,0,0,1,0,0)";
  }
}

class DefineImage {
  static move =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA0lBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19/f39dXV38/Px+fn4AAABbW1v7+/tYWFgPDw9WVlb6+vpUVFT5+fl9fX1RUVH4+Ph8fHxPT0/39/cQEBABAQFMTEx7e3tKSkr19fV6enoODg5ISEhFRUXz8/NDQ0Py8vJBQUHx8fF4eHg+Pj48PDzw8PDl5eXv7+/m5uagoKCenp7u7u41NTVmmCopAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8UlEQVQoz23Q2VLCQBAF0MvqwmpGIyANDIIYIosZEEnAKOj//5LTVWQGUjkPt253vzWQyxfuUgr5HFAsOeI+RTilIsrOQwanjCv3MYO4RstO7bbtLXSeEl2irhk66PVP9F5fkqmHQd+Q0vYBhs+GlLYPMRqzFw4pTR2PMHnVPOKUkpM8zgmmvu97RG/abMZJ5OnVFHMhxOLysNCrOZbvWkCcSnFSwLnEymUBh1KmuiusPwylbF9j82koZfsG2/Ak4pdEybTFLjy7mH24w/7LiCLb97iJvzP83KJyyDocKqjWjvFvSnysVYF6o/mX0mzU8Q875FlKui96zAAAAABJRU5ErkJggg==";
  static rotate =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABX1BMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/Pzo6Oh+fn4uLi4HBwcGBgYqKip3d3fl5eVbW1v7+/u1tbUSEhIAAAAICAgxMTEzMzMMDAynp6dYWFi0tLQEBASKiorw8PDz8/OYmJgPDw8BAQFWVlb6+vrv7+8ZGRkKCgrCwsLPz8/h4eFUVFT5+fmRkZGAgICVlZV0dHRRUVH4+PhEREQDAwPx8fEsLCxPT0/39/fJycnGxsYcHBwWFhbu7u5MTEz19fVKSkp2dnY/Pz9ISEhkZGQrKyvm5uaSkpJycnJFRUXe3t4ODg4LCwva2tpDQ0Py8vKpqamIiIjp6enq6uqUlJSgoKBBQUHk5OQaGhoJCQkyMjKampo+Pj56enpwcHA8PDyenp41NTV1I7FBAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABN0lEQVQoz23J6TsCURgF8LfV0mqGFqRMcdUVSpvQQlFN0UJEabEVEeX/f9yZO5/mmd+H895zD4BKrVmS0ahVAFodwy7LsIxOC3pmRQGjhzmbXQE7Dw67Igc4VyVr664Nt2eTo80JXh+1tY12/AGM8K5YvRCk/3v7+CDk84UPI1FxCUIsLkgcJY/FR/wkgk/JiUEqLcigbFpyhs5JpiCXF1xccnlJARdJ5qDE83y5cnVdqVR5KuAmUYIay7IZRATrLBXAJGrQqBM3CN0m6lQVF0k2oGkT3N23bJIH9EiyCe2wINQJS8pP3R45begPJM8vr4PB23skOhRaH0YF6uMTjf1fXdT9FusIJtJQ6Py4kmPPb4+2CUxDiqawwCUUtBbBMFQahgYwmmZcVYabmYwAZov1T8ZqMcM/0Mxz3GjPMWoAAAAASUVORK5CYII=";
  static scale =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA1VBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/PwAAABKSkpbW1v7+/tLS0v19fVYWFgWFhbx8fFWVlb6+voVFRVSUlJUVFT5+fnv7+9RUVH4+Pjy8vLz8/NPT0/39/djY2NMTExiYmLw8PBJSUlISEhQUFDq6upFRUXu7u4UFBRDQ0Po6OhBQUHr6+s+Pj48PDzl5eXm5uagoKCenp41NTVutcKlAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA9klEQVQoz23Q6VLCMBQF4MPqwmqjZbmlFgsUmhYQoRVElgq+/yOZOEIzNd9MJif3/LoBcvnCQ0YhnwOKJYM9ZjCjVETZeNIwyrgxWxrsFu2WVhudrkCSxbqpDnq2IOfPjq3oof9XvLjq3O5jMBSIRuSxoWKA8UQgy/fIcyapMXggWGEwFY0ZXHHM5oIrTshfnXB+McOCXbjmGw/FvZSPBSznyuXEXcdfyWwhMlN+TPH7imSMsJ4qNjF9EMm0xjZUfY7ErjJssXMV+0h+jkw7HP7Nf4sDjkutI+4SX+PrHpWTrjhVUK2dk01Gcq5VgXqj+Z3RbNTxA1TOTngb3xHTAAAAAElFTkSuQmCC";
  static delete =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX195eXkBAQEAAABdXV38/PxKSkqysrJbW1v7+/tJSUkREREFBQUMDAxYWFja2tpWVlb6+voKCgpTU1NUVFT5+fnGxsZOTk6mpqbHx8dRUVH4+Ph1dXWDg4P39/fCwsLe3t7Z2dnDw8NPT090dHTb29seHh4fHx/Nzc1MTEyCgoIdHR3Ly8v19fVzc3PY2NjKyspISEiBgYHX19fJyclFRUXz8/NycnLW1tbIyMhDQ0Py8vKAgIAcHBxBQUHx8fF+fn7t7e2qqqrOzs6xsbE+Pj6YmJg8PDzj4+M7Ozvw8PDs7OxZWVnl5eXv7+/m5uagoKCenp7u7u41NTUwGSPSAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABQ0lEQVQoz23JV1PCQBQF4Eu1UE00AqFJAiKiKE0RVGAlCgqhSVEpCijo/393bwZmGCbfwzl3zwJotLq9DTqtBkBvYNj9DSxj0IOROVDBGGGLO1TBboNjdTtdPO9yrl4OcHuWvD6Px+ddvdzgP6ICgiCIQUEIivQI4OKHEBZ/vIbHJQThEypyuiaCSxiiZ9R5LHSxFIpd4hKFeAIlU+mrxHUmccOlksoQh2wa5VK3d+lULn2fp4GyUGBRrpghbDHHkgcaqADeEpKKj6RUlErkiQbyQplDUuWZcBWJIy80UBmqNSRX6qRWkWukQQNVodlCcrv+2mrLLdKggZrQ6SK513/rvue7H/2erAwdGCg9HI2V7o4/h0oPYPSFJlORV4jTiTKMYGf2reJnF0xztY+5CcyWxex3w2xhMQNYbfa/DXabFf4BuK96ZClD1l4AAAAASUVORK5CYII=";
}
