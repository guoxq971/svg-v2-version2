import { useDesign } from "../../../index";
import {
  cratePicEditBd,
  cratePicEditDelete,
  cratePicEditMove,
  cratePicEditRect,
  cratePicEditRotate,
  cratePicEditScale,
  cratePicImg,
  cratePicImgBd,
  cratePicImgClip,
  createPicImgG,
} from "../dom4CreateImage";
import { ImageMove } from "../imageMove";
import { imageRotate } from "../imageRotate";
import { imageScale } from "../imageScale";
import { Dom4ImageEntity } from "./Dom4ImageEntity";

/*
 * 创建设计图
 * */
export class Dom4ImgImage extends Dom4ImageEntity {
  // 编辑边框
  editBd;
  // 编辑rect
  editRect;
  // 编辑移动
  editMove;
  // 编辑缩放
  editScale;
  // 编辑旋转
  editRotate;
  // 编辑删除
  editDelete;

  // 构造函数
  constructor(param, parent) {
    super();
    this.init(param, parent);
  }

  init(param, parent) {
    let prod = useDesign().getProd();
    let { svg, defsClipD2, designGroup } = prod.getDom();
    let { url } = param;
    let id = parent.id;
    // 最外层
    this.imgG = createPicImgG(svg);
    designGroup.add(this.imgG);
    // 裁剪的defs
    this.imgClip = cratePicImgClip(svg, { d: `#${defsClipD2.attr("id")}` });
    this.imgG.add(this.imgClip);
    // 设计图的边框
    this.imgBd = cratePicImgBd(svg);
    this.imgClip.add(this.imgBd);
    // 设计图
    this.img = cratePicImg(svg, { url });
    this.imgBd.add(this.img);
    // 编辑边框
    this.editBd = cratePicEditBd(svg);
    this.imgG.add(this.editBd);
    // 编辑的 rect、move、rotate、scale、delete
    this.editRect = cratePicEditRect(svg);
    this.editMove = cratePicEditMove(svg);
    this.editRotate = cratePicEditRotate(svg);
    this.editScale = cratePicEditScale(svg);
    this.editDelete = cratePicEditDelete(svg);
    this.editBd.add(
      this.editRect,
      this.editMove,
      this.editRotate,
      this.editScale,
      this.editDelete
    );
    // 绑定对应事件
    // 设计图的移动事件
    let M = new ImageMove();
    this.imgBd.drag(
      (...arg) => M.move(this, ...arg, parent),
      (...arg) => M.start(this, ...arg, parent),
      (...arg) => M.end(this, ...arg, parent)
    );
    // 设计图的旋转事件
    let R = new imageRotate();
    this.editRotate.drag(
      (...arg) => R.move(this, ...arg, parent),
      (...arg) => R.start(this, ...arg, parent),
      (...arg) => R.end(this, ...arg, parent)
    );
    // 设计图的缩放事件
    let S = new imageScale();
    this.editScale.drag(
      (...arg) => S.move(this, ...arg, parent),
      (...arg) => S.start(this, ...arg, parent),
      (...arg) => S.end(this, ...arg, parent)
    );
    // 设计图的删除事件
    this.editDelete.click(() => {
      prod.deleteImage(id);
    });
    // 设计图的点击事件：如果当前是预览模式，就进入编辑模式
    this.img.mousedown(() => {
      prod.setImageActionId(id);
      useDesign().setEditMode();
    });
  }
}
