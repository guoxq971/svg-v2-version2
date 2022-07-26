import { useSnap } from "../../../../designApp/useSnap";

export class ImageMove {
  x;
  y;

  start(x, y, event, id) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy, x, y, event, imgId, svgId) {
    let us = new useSnap(svgId, imgId);
    let _x = x - this.x;
    let _y = y - this.y;
    // 移动
    let imgBd = us.imgBd();
    let editBd = us.editBd();
    let matrix = imgBd.attr("transform").localMatrix;
    matrix.e += _x;
    matrix.f += _y;
    imgBd.attr("transform", matrix);
    editBd.attr("transform", matrix);
    this.x = x;
    this.y = y;
  }

  end(event, id) {}
}
