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
} from "./dom4CreateImage";
import { DesignProxy } from "@/components/bmDesigner/app";
import { ImageMove } from "./imageMove";
import { imageRotate } from "@/components/bmDesigner/app/utils/dom/imageRotate";
import { imageScale } from "@/components/bmDesigner/app/utils/dom/imageScale";

// 移动到指定位置(中心)
export function moveToCenter(SNode, x, y) {
  if (Snap.is(SNode, "array")) {
    SNode.forEach((item) => {
      let bbox = item.getBBox();
      let M = item.attr("transform").localMatrix;
      M.translate(x - bbox.x - bbox.width / 2, y - bbox.y - bbox.height / 2);
      item.attr({ transform: M });
    });
  } else {
    let bbox = SNode.getBBox();
    let M = SNode.attr("transform").localMatrix;
    M.translate(x - bbox.x - bbox.width / 2, y - bbox.y - bbox.height / 2);
    SNode.attr({ transform: M });
  }
}

// 创建设计图
export function createImg(that, param, id) {
  let { svg, defsClipD2, designGroup } = DesignProxy().getProd().getDom();
  let { url, imgClick, imgDel } = param;
  let SNode = that;
  // 最外层
  SNode.imgG = createPicImgG(svg);
  designGroup.add(SNode.imgG);
  // 裁剪的defs
  SNode.imgClip = cratePicImgClip(svg, { d: `#${defsClipD2.attr("id")}` });
  SNode.imgG.add(SNode.imgClip);
  // 设计图的边框
  SNode.imgBd = cratePicImgBd(svg);
  SNode.imgClip.add(SNode.imgBd);
  // 设计图
  SNode.img = cratePicImg(svg, { url });
  SNode.imgBd.add(SNode.img);
  // 编辑边框
  SNode.editBd = cratePicEditBd(svg);
  SNode.imgG.add(SNode.editBd);
  // 编辑的 rect、move、rotate、scale、delete
  SNode.editRect = cratePicEditRect(svg);
  SNode.editMove = cratePicEditMove(svg);
  SNode.editRotate = cratePicEditRotate(svg);
  SNode.editScale = cratePicEditScale(svg);
  SNode.editDelete = cratePicEditDelete(svg);
  SNode.editBd.add(
    SNode.editRect,
    SNode.editMove,
    SNode.editRotate,
    SNode.editScale,
    SNode.editDelete
  );
  // 绑定对应事件
  // 设计图的移动事件
  let M = new ImageMove();
  SNode.imgBd.drag(
    (...arg) => M.move(SNode, ...arg),
    (...arg) => M.start(SNode, ...arg),
    (...arg) => M.end(SNode, ...arg)
  );
  // 设计图的旋转事件
  let R = new imageRotate();
  SNode.editRotate.drag(
    (...arg) => R.move(SNode, ...arg),
    (...arg) => R.start(SNode, ...arg),
    (...arg) => R.end(SNode, ...arg)
  );
  // 设计图的缩放事件
  let S = new imageScale();
  SNode.editScale.drag(
    (...arg) => S.move(SNode, ...arg),
    (...arg) => S.start(SNode, ...arg),
    (...arg) => S.end(SNode, ...arg)
  );
  // 设计图的删除事件
  SNode.editDelete.click(() => {
    useDesign.remove(designSNode, SNode);
    // vue绑定的的点击事件
    imgDel && imgDel(SNode.id);
  });
  // 设计图的点击事件：如果当前是预览模式，就进入编辑模式
  SNode.img.mousedown(() => {
    DesignProxy().getProd().setImageActionId(id);
    DesignProxy().setEditMode();
    // vue绑定的的点击事件
    imgClick && imgClick();
  });
}
