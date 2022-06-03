<template>
  <svg
    viewBox="0 0 4 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <rect rx="2" class="icon__rect" />
  </svg>
</template>

<script>
export default {
  name: 'IconLabel'
}
</script>

<style lang="scss" scoped>
.icon {
  width: 4px;
  height: 4px;

  &__rect {
    width: 4px;
    height: 4px;
    fill: $pink;
  }
}
</style>
