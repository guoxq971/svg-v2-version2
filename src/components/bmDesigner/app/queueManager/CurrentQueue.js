/*
 * 队列中的当前项
 * */
export class CurrentQueue {
  imageList;
  actionImageId;
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
