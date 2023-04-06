
<template>
  <div class="flex">
    <Sidebar v-if="isLoaded && !authPage.includes($route.name)" />
    <main class="w-full" :class="{'w-full pt-20 main-bg pl-[105px]': !authPage.includes($route.name)}">
      <router-view />
    </main>
    <vue-snotify />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  data() {
    return {
      isLoaded: false,
      authPage: ["login", "registration","success-registration", "forgot-password"],
    };
  },
  components: {
    Sidebar,
    Navbar,
  },
  mounted () {
    setTimeout(() => {
      this.isLoaded = true
    }, 100)
  }
};
</script>
