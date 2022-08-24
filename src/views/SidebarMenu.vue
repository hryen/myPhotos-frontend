<script setup>
import router from "@/router";
</script>

<template>
  <div class="menu">
    <a
      class="menu-item"
      :class="[router.currentRoute.value.path === '/' ? 'active' : '']"
      @click="router.push('/')"
    >
      <!-- Material Icons -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 48 48"
      >
        <path
          d="M11.8 34.15h24.45l-7.35-9.8-6.6 8.55-4.65-6.35ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z"
        />
      </svg>
      <span>照片</span>
    </a>

    <a
      class="menu-item"
      :class="[router.currentRoute.value.path === '/favorites' ? 'active' : '']"
      @click="router.push('/favorites')"
    >
      <!-- Material Icons -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 48 48"
      >
        <path
          d="m17.15 35.85 6.85-5.2 6.85 5.2-2.75-8.65 6.3-4.1h-7.55L24 14.45l-2.85 8.65H13.6l6.3 4.1ZM11.65 44l4.65-15.2L4 20h15.2L24 4l4.8 16H44l-12.3 8.8L36.35 44 24 34.6ZM24 25.15Z"
        />
      </svg>
      <span>收藏夹</span>
    </a>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 64px;
  left: 0;

  /* height: 100%; */
  width: 256px;
  padding: 24px 24px 0 0;

  z-index: 100;
}
.menu a {
  outline: none;
  text-decoration: none;
  cursor: pointer;
  color: #000;
}
.menu-item {
  border-radius: 0 24px 24px 0;

  padding: 8px 12px 8px 24px;
  display: flex;
  align-items: center;
  gap: 24px;

  line-height: 1.25rem;
  font-size: 0.875rem;
  letter-spacing: 0.0178571429em;
  font-weight: 500;
}
.menu-item:hover {
  background: #f1f3f4;
}
.menu-item.active {
  fill: #1a73e8;
  color: #1a73e8;
  background: #e8f0fe;
}
</style>
