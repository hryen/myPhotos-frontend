<script setup>
import { ref, watch } from "vue";
import AdvancedSearch from "@/components/AdvancedSearch.vue";

const advancedSearchRef = ref(null);

const address = ref("");
watch(address, () => {
  advancedSearchRef.value.address = address.value;
});

function callSearch() {
  if (!advancedSearchRef.value.visible) {
    advancedSearchRef.value.handleReset();
    advancedSearchRef.value.address = address.value;
    advancedSearchRef.value.handleSearch();
  }
}

const searchInputFocus = ref(false);
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="#">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>
    </div>

    <div
      class="search-container"
      @keyup.enter="callSearch"
      :class="[
        searchInputFocus || (advancedSearchRef && advancedSearchRef.visible)
          ? 'focus'
          : '',
      ]"
    >
      <div class="icon">
        <!-- Material Icons -->
        <svg
          @click="t"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          viewBox="0 0 48 48"
        >
          <path
            d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
          />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Search"
        v-model.trim="address"
        @focus="searchInputFocus = true"
        @blur="searchInputFocus = false"
      />

      <div
        class="icon"
        style="cursor: pointer"
        @click="
          advancedSearchRef.visible = !advancedSearchRef.visible
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          viewBox="0 0 48 48"
        >
          <path
            d="M6 37.9v-3h12.35v3Zm0-24.8v-3h20.65v3ZM21.35 42V30.75h3v4.15H42v3H24.35V42Zm-6-12.4v-4.1H6v-3h9.35v-4.2h3v11.3Zm6-4.1v-3H42v3Zm8.3-8.25V6h3v4.1H42v3h-9.35v4.15Z"
          />
        </svg>
      </div>
      <AdvancedSearch ref="advancedSearchRef" />
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #dadce0;

  padding: 0 12px;
  display: flex;
  align-items: center;
}

.navbar-brand {
  width: 244px;
}

.search-container {
  width: 720px;
  background: #f1f3f4;
  border-radius: 8px;

  display: flex;
  height: 48px;
  line-height: 34px;
}

.search-container.focus {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 1px 0 rgba(65, 69, 73, 0.3),
    0 1px 3px 1px rgba(65, 69, 73, 0.15);
}

.search-container .icon {
  margin: 12px 16px;
  color: #5f6368;
}

.search-container input {
  width: 100%;

  background: none;
  border: none;
  outline: none;
  padding: 0;

  line-height: 1.5rem;
  font-size: 1rem;
  letter-spacing: 0.00625em;
  font-weight: 500;
}
</style>
