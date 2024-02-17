<template>
  <div
    class="h-16 flex items-center gap-2 font-semibold text-base text-zinc-700 select-none"
  >
    <NuxtLink to="/">
      <img
        class="inline-block h-10"
        src="~/assets/ria-logo.png"
        alt="RIA Logo"
      />
    </NuxtLink>
    <NuxtLink to="/">RIA 手册</NuxtLink>
    <span>·</span>
    <span class="opacity-80">{{ bookName }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  bookName: { type: String },
});
</script>
