import { DesignProxy } from "@/components/bmDesigner/app";

export class ImageMove {
  x;
  y;

  start(imgSNode, x, y, event) {
    this.x = x;
    this.y = y;
  }

  move(imgSNode, dx, dy, x, y, event, type = "move") {
    let _x = x - this.x;
    let _y = y - this.y;
    // 移动--start
    let matrix = imgSNode.imgBd.attr("transform").localMatrix;
    if (type === "move") {
      matrix.e += _x;
      matrix.f += _y;
    }
    if (type === "real") {
      matrix.e = _x;
      matrix.f = _y;
    }
    imgSNode.imgBd.attr("transform", matrix);
    imgSNode.editBd.attr("transform", matrix);
    // 移动--end
    // 记录--start
    let bbox = imgSNode.imgBd.getBBox();
    DesignProxy().getProd().getDesignImage().setX(bbox.x);
    DesignProxy().getProd().getDesignImage().setY(bbox.y);
    // 记录--end
    this.x = x;
    this.y = y;
  }

  end(imgSNode, event) {}
}
