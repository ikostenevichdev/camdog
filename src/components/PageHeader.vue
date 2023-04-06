<template>
  <header class="fixed top-0 z-50 header flex items-center justify-between px-8 h-20 bg-white shadow">
    <slot />
  </header>
</template>

<script>
export default {
  name: "PageHeader"
}
</script>

<style scoped>
.header {
  width: calc(100% - 106px);
}
</style>
