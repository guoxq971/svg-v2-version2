/*
 * 队列中的当前项
 * */
export class CurrentQueue {
  // 操作中的素有设计图
  imageList;
  // 当前操作的设计图id
  actionImageId;

  // 构造函数
  constructor(param) {
    this.setImageList(param.imageList);
    this.setActionImageId(param.actionImageId);
  }
  setImageList(imageList) {
    this.imageList = imageList;
  }
  setActionImageId(actionImageId) {
    this.actionImageId = actionImageId;
  }
  getImageList() {
    return this.imageList;
  }
  getActionImageId() {
    return this.actionImageId;
  }
}
