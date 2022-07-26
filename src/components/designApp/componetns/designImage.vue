<!--设计图-->
<template>
  <g test="设计图最外层g" type="设计图">
    <g test="设计图的边框的边框-clip" :style="{ clipPath: `url(#${mode})` }">
      <g
        test="设计图的边框"
        style="cursor: move"
        :transform="image.imageBd.transform"
        ref="imgBd"
        :class="`imgBd-${image.id}`"
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
        ></image>
      </g>
    </g>
    <g
      test="编辑的边框"
      :class="`editBd-${image.id}`"
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
        test="编辑的矩形"
        :class="`editRect-${image.id}`"
        :x="image.editRect.x"
        :y="image.editRect.y"
        :width="image.editRect.width"
        :height="image.editRect.height"
        stroke="#000000"
        fill="none"
        style=""
      ></rect>
      <image
        test="编辑移动"
        bm="edit"
        :class="`editMove-${image.id}`"
        :href="image.imageMove.href"
        :x="image.imageMove.x"
        :y="image.imageMove.y"
        :width="image.imageMove.width"
        :height="image.imageMove.height"
      ></image>
      <image
        test="编辑旋转"
        bm="edit"
        :class="`editRotate-${image.id}`"
        :href="image.imageRotate.href"
        :x="image.imageRotate.x"
        :y="image.imageRotate.y"
        :width="image.imageRotate.width"
        :height="image.imageRotate.height"
      ></image>
      <image
        test="编辑缩放"
        bm="edit"
        :class="`editScale-${image.id}`"
        :href="image.imageScale.href"
        :x="image.imageScale.x"
        :y="image.imageScale.y"
        :width="image.imageScale.width"
        :height="image.imageScale.height"
      ></image>
      <image
        test="编辑删除"
        bm="edit"
        :class="`editDelete-${image.id}`"
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
import { DesignImage, ProdMode } from "../interface/prod";
import { ImageMove } from "../../bmDesigner/app/utils/dom/imageMove";
import { useSnap } from "../useSnap";
import { imageRotate } from "@/components/bmDesigner/app/utils/dom/imageRotate";
import { imageScale } from "@/components/bmDesigner/app/utils/dom/imageScale";

export default {
  name: "designImage",
  props: {
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
      default: new DesignImage(),
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
        if (ProdMode.isEdit(this.mode)) {
          this.mountDrag();
        } else if (ProdMode.isPreview(this.mode)) {
          this.unmountDrag();
        }
      },
    },
  },
  methods: {
    unmountDrag() {
      let us = new useSnap(this.svgId, this.image.id);
      let imgBd = us.imgBd();
      let editRotate = us.editRotate();
      let editScale = us.editScale();
      imgBd?.undrag();
      editRotate?.undrag();
      editScale?.undrag();
    },
    mountDrag() {
      let us = new useSnap(this.svgId, this.image.id);
      let imgBd = us.imgBd();
      let editRotate = us.editRotate();
      let editScale = us.editScale();
      // 移动设计图
      let M = new ImageMove();
      imgBd?.drag(
        (...arg) => M.move(...arg, this.image.id, this.svgId),
        (...arg) => M.start(...arg, this.image.id, this.svgId),
        (...arg) => M.end(...arg, this.image.id, this.svgId)
      );
      // 设计图的旋转事件
      let R = new imageRotate();
      editRotate?.drag(
        (...arg) => R.move(...arg, this.image.id, this.svgId),
        (...arg) => R.start(...arg, this.image.id, this.svgId),
        (...arg) => R.end(...arg, this.image.id, this.svgId)
      );
      // 设计图的缩放事件
      let S = new imageScale();
      editScale?.drag(
        (...arg) => S.move(...arg, this.image.id, this.svgId),
        (...arg) => S.start(...arg, this.image.id, this.svgId),
        (...arg) => S.end(...arg, this.image.id, this.svgId)
      );
    },
  },
};
</script>

<style scoped></style>
