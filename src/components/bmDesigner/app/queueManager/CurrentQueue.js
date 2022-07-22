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
  /*
   * 获取队列中的产品
   * @return {Prod} 产品class
   * */
  getProd() {
    console.log(this.imageList);
    return this.imageList
      .find((image) => image.getId() === this.actionImageId)
      .getImage()
      .getProd();
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
