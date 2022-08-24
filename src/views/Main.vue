<template>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  position: absolute;
  top: 64px;
  left: 0;

  width: 100%;
  height: calc(100% - 64px);

  padding-left: 256px;
}
</style>
