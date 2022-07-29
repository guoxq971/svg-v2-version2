<template>
  <g test="设计图最外层g" type="背景图" :style="{ clipPath: `url(#${mode})` }">
    <rect
      test="背景的矩形"
      :x="image.x"
      :y="image.y"
      :width="image.width"
      :height="image.height"
      :fill="image.color"
    />
  </g>
</template>

<script>
export default {
  name: "designImageBg",
  props: {
    mode: {
      type: String,
      default: "",
    },
    image: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped></style>
