<!--设计图-->
<template>
  <g
    test="设计图最外层g"
    type="设计图"
    :style="{ display: image.isShow ? 'inline' : 'none' }"
  >
    <g test="设计图的边框的边框-clip" :style="{ clipPath: `url(#${mode})` }">
      <g
        :class="`imgBd-${image.id}`"
        test="设计图的边框"
        style="cursor: move"
        :transform="image.imageBd.transform"
        ref="imgBd"
      >
        <image
          :class="`img-${image.id}`"
          test="设计图"
          bm="edit"
          :href="image.image.href"
          :x="image.image.x"
          :y="image.image.y"
          :width="image.image.width"
          :height="image.image.height"
          style="cursor: move; overflow: hidden"
          :transform="image.image.transform"
        ></image>
      </g>
    </g>
    <g
      :class="`editBd-${image.id}`"
      test="编辑的边框"
      :style="{
        display: ProdMode.isEdit(mode)
          ? activeId === image.id
            ? 'inline'
            : 'none'
          : 'none',
      }"
      :transform="image.editBd.transform"
    >
      <rect
        :class="`editRect-${image.id}`"
        test="编辑的矩形"
        :x="image.editRect.x"
        :y="image.editRect.y"
        :width="image.editRect.width"
        :height="image.editRect.height"
        stroke="#000000"
        fill="none"
        style=""
      ></rect>
      <image
        :class="`editMove-${image.id}`"
        test="编辑移动"
        bm="edit"
        :href="image.imageMove.href"
        :x="image.imageMove.x"
        :y="image.imageMove.y"
        :width="image.imageMove.width"
        :height="image.imageMove.height"
      ></image>
      <image
        :class="`editRotate-${image.id}`"
        test="编辑旋转"
        bm="edit"
        :href="image.imageRotate.href"
        :x="image.imageRotate.x"
        :y="image.imageRotate.y"
        :width="image.imageRotate.width"
        :height="image.imageRotate.height"
      ></image>
      <image
        :class="`editScale-${image.id}`"
        test="编辑缩放"
        bm="edit"
        :href="image.imageScale.href"
        :x="image.imageScale.x"
        :y="image.imageScale.y"
        :width="image.imageScale.width"
        :height="image.imageScale.height"
      ></image>
      <image
        :class="`editDelete-${image.id}`"
        test="编辑删除"
        bm="edit"
        :href="image.imageDelete.href"
        :x="image.imageDelete.x"
        :y="image.imageDelete.y"
        :width="image.imageDelete.width"
        :height="image.imageDelete.height"
      ></image>
    </g>
  </g>
</template>

<script>
import { ProdMode } from "../interface/prod";
import { ImageMove } from "./imageMove";
import { useSnap } from "../useSnap";
import { imageRotate } from "./imageRotate";
import { imageScale } from "./imageScale";
import { useQueue } from "@/components/designApp/queue";

export default {
  name: "designImage",
  props: {
    prod: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // svgId
    svgId: {
      type: String,
      default: "",
    },
    // 当前的产品模式
    mode: {
      type: String,
      default: "",
    },
    // 当前激活的设计图id
    activeId: {
      type: String,
      default: "",
    },
    // 设计图的属性
    image: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      ProdMode,
    };
  },
  watch: {
    mode: {
      handler() {
        this.init();
      },
      // immediate: true,
    },
  },
  methods: {
    // 初始化
    init() {
      if (ProdMode.isEdit(this.mode)) {
        this.mountDrag();
      } else if (ProdMode.isPreview(this.mode)) {
        this.unmountDrag();
      }
    },
    // 卸载拖拽
    unmountDrag() {
      let us = new useSnap(this.svgId, this.image.id);
      let imgBd = us.imgBd();
      let editRotate = us.editRotate();
      let editScale = us.editScale();
      let editDelete = us.editDelete();
      imgBd?.undrag();
      editRotate?.undrag();
      editScale?.undrag();
      editDelete?.unclick();
    },
    // 挂载拖拽
    mountDrag() {
      let svgId = this.svgId;
      let imgId = this.image.id;
      let image = this.image;
      let us = new useSnap(svgId, imgId);
      let imgBd = us.imgBd();
      let editRotate = us.editRotate();
      let editScale = us.editScale();
      let editDelete = us.editDelete();
      let callbackEnd = (type) => useQueue().addQueue(type);
      // 移动设计图
      let M = new ImageMove();
      let callbackRMove = (_x, _y) => image.setMove(_x, _y);
      imgBd?.drag(
        (...arg) => M.move(...arg, imgId, svgId, callbackRMove),
        (...arg) => M.start(...arg, imgId, svgId),
        (...arg) => M.end(...arg, imgId, svgId, () => callbackEnd("移动"))
      );
      // 设计图的旋转事件
      let R = new imageRotate();
      let callbackRotate = (rotate) => image.setRotate(rotate);
      editRotate?.drag(
        (...arg) => R.move(...arg, imgId, svgId, callbackRotate),
        (...arg) => R.start(...arg, imgId, svgId),
        (...arg) => R.end(...arg, imgId, svgId, () => callbackEnd("旋转"))
      );
      // 设计图的缩放事件
      let S = new imageScale();
      let callbackScale = (scale) => image.setScale(scale);
      editScale?.drag(
        (...arg) => S.move(...arg, imgId, svgId, callbackScale),
        (...arg) => S.start(...arg, imgId, svgId),
        (...arg) => S.end(...arg, imgId, svgId, () => callbackEnd("缩放"))
      );
      // 设计图的删除事件
      editDelete.click(() => {
        this.prod.imageList = this.prod.imageList.filter(
          (item) => item.id !== this.image.id
        );
        useQueue().addQueue(`图层删除`);
      });
    },
  },
  mounted() {
    let us = new useSnap(this.svgId, this.image.id);
    let img = us.img();
    img.mousedown(() => {
      this.$emit("imgClick", this.image.id);
    });
    this.init();
  },
};
</script>

<style scoped></style>
