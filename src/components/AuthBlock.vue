<template>
  <div class="flex min-h-screen w-full">
    <div class="auth-hero pt-20 text-center w-2/5">
      <h1 class="text-3xl text-white uppercase font-bold mb-5">WHEN YOU ARE NOT THERE, <br> CAMDOG  HAS YOUR BACK</h1>
      <p class="text-white text-sm font-thin mb-12">Turns any existing IP Camera System into a powerful <br> Grade Threat Detector</p>
      <!-- <span class="auth-iphones "></span> -->
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AuthBLock'
  }
</script>
<style scoped>
.auth-hero {
  position: relative;
  overflow: hidden;
  background-image: url('@/assets/images/auth-iphones.png'), linear-gradient(324.93deg, #27533A 0.74%, #040306 100%);
  background-size: 70%, 100%;
  background-repeat: no-repeat;
  background-position: 35% 250px, 0 0;
}

</style>