<template>
  <div>
    <NConfigProvider :theme-overrides="themeOverrides">
      <NaiveConfig>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </NaiveConfig>
    </NConfigProvider>
  </div>
</template>

<script setup>
const themeOverrides = {
  common: {
    primaryColor: "#6385E2FF",
    primaryColorHover: "#7F9BE7FF",
    primaryColorPressed: "#5A7DCEFF",
    primaryColorSuppl: "rgba(42, 70, 148, 1)",
  },
  Menu: {
    itemHeight: "26px",
    itemColorActive: "rgba(99, 133, 226, 0)",
    itemColorHover: "rgba(255, 255, 255, 0)",
    itemColorActiveHover: "rgba(99, 133, 226, 0)",
  },
};
</script>
