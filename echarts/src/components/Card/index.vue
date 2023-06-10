<template>
  <div class="card">
    <div class="top-border"></div>
    <div class="bottom-border"></div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "Card",
};
</script>

<script lang="ts" setup></script>

<style scoped lang="scss">
.card {
  // width: 100%;
  height: 175px;
  background-image: url("@/assets/images/line.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // border-width: 1px;
  // border-style: solid;
  // border-color: $border-color-1;
  border: 1px solid $border-color-1;
  position: relative;
}
// 定义混合
@mixin border($position-1, $position-2) {
  position: absolute;
  #{$position-1}: 0;
  #{$position-2}: 0;
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-width: 0;
  border-#{$position-1}: 1px;
  border-#{$position-2}: 1px;
  border-style: solid;
  border-color: $border-color-2;
}

.top-border,
.bottom-border {
  position: absolute;
  left: 0;
  width: 100%;
}
.top-border {
  top: 0;
  &::before {
    // 使用混合
    @include border(top, left);
  }
  &::after {
    @include border(top, right);
  }
}
.bottom-border {
  bottom: 0;
  &::before {
    // 使用混合
    @include border(bottom, left);
  }
  &::after {
    @include border(bottom, right);
  }
}
</style>
