<template>
  <div style="position: relative">
    <div style="position: absolute">
      <el-button @click="prod.mode = 'edit'">编辑模式</el-button>
      <el-button @click="prod.mode = 'preview'">预览模式</el-button>
    </div>
    <svg
      :id="`svg-${id}`"
      height="544"
      version="1.1"
      width="544"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      style="border: 1px dotted green"
    >
      <defs>
        <clipPath :id="prodMode.preview" test="[预览模式]-d1">
          <path :d="prod.previewD1"></path>
        </clipPath>
        <clipPath :id="prodMode.edit" test="[编辑模式]-d2">
          <path :d="prod.editD2"></path>
        </clipPath>
      </defs>
      <path
        test="[编辑模式]边框红色虚线path"
        :style="{
          strokeDasharray: 5,
          display: displayByMode(prod.editBdRedPath.type),
        }"
        fill="#ffffff"
        stroke="#ff0000"
        :d="prod.editBdRedPath.d"
        :transform="prod.editBdRedPath.transform"
      ></path>
      <image
        test="[预览模式]背景图"
        :href="prod.previewBgImage.href"
        :x="prod.previewBgImage.x"
        :y="prod.previewBgImage.y"
        :width="prod.previewBgImage.width"
        :height="prod.previewBgImage.height"
        :style="{ display: displayByMode(prod.previewBgImage.type) }"
      ></image>
      <g
        test="设计图-组合"
        :transform="prod.designGroup.transform"
        :class="`designGroup-${id}`"
      >
        <rect
          test="设计图组合rect"
          :x="prod.designGroup.rect.x"
          :y="prod.designGroup.rect.y"
          :width="prod.designGroup.rect.width"
          :height="prod.designGroup.rect.height"
          fill="none"
          style=""
        ></rect>
        <rect
          test="设计图组合rect"
          :x="prod.designGroup.rect.x"
          :y="prod.designGroup.rect.y"
          :width="prod.designGroup.rect.width"
          :height="prod.designGroup.rect.height"
          fill="none"
          :style="{ clipPath: `url(#${prod.mode})` }"
        ></rect>
        <!--设计图组合-->
        <designImage
          v-for="item in prod.imageList"
          :key="item.id"
          :active-id="prod.activeId"
          :mode="prod.mode"
          :image="item"
          :svg-id="id"
        />
      </g>
      <image
        test="[预览模式]产品图"
        :href="prod.previewProdImage.href"
        :x="prod.previewProdImage.x"
        :y="prod.previewProdImage.y"
        :width="prod.previewProdImage.width"
        :height="prod.previewProdImage.height"
        :style="{
          pointerEvents: 'none',
          display: displayByMode(prod.previewProdImage.type),
        }"
      ></image>
      <path
        test="[设计模式][产品的红色虚线]path-d3"
        :d="prod.editProdRedPath.d"
        fill="none"
        stroke="#ff0000"
        :style="{
          strokeWidth: 1.8,
          strokeDasharray: 5,
          display: displayByMode(prod.editProdRedPath.type),
        }"
        :transform="prod.editProdRedPath.transform"
      ></path>
      <rect
        test="[编辑模式]边框的黑色虚线rect"
        :x="prod.editBdBackRect.x"
        :y="prod.editBdBackRect.y"
        :width="prod.editBdBackRect.width"
        :height="prod.editBdBackRect.height"
        fill="none"
        stroke="#000000"
        :style="{
          strokeDasharray: 2,
          display: displayByMode(prod.editBdBackRect.type),
        }"
        :transform="prod.editBdBackRect.transform"
      ></rect>
    </svg>
  </div>
</template>

<script>
import { ProdInterface, ProdMode } from "./interface/prod";
import { mock } from "../bmDesigner/mock";
import designImage from "./componetns/designImage";
import { uuid } from "../bmDesigner/app/utils/util";

export default {
  name: "index",
  components: {
    designImage,
  },
  data() {
    return {
      id: uuid(),
      prodMode: ProdMode,
      prod: new ProdInterface(mock.productList()[0]),
    };
  },
  computed: {
    /*
     * 根据模式(mode)和元素类型(type)返回对应的 display
     * @param {number} type 元素类型
     * */
    displayByMode() {
      return (type) => {
        let display = "none";
        if (this.prod.isPreviewMode()) {
          if (ProdMode.isPreview(type)) {
            display = "inline";
          } else if (ProdMode.isEdit(type)) {
            display = "none";
          }
        } else if (this.prod.isEditMode()) {
          if (ProdMode.isPreview(type)) {
            display = "none";
          } else if (ProdMode.isEdit(type)) {
            display = "inline";
          }
        }
        return display;
      };
    },
  },
  mounted() {
    console.log(this.prod);
  },
};
</script>

<style scoped></style>
