<template>
  <div>
    <div class="sticky top-0 px-8 bg-zinc-100 bg-opacity-50 backdrop-blur z-10">
      <SideBarHead :book-name="bookStore.currentBook?.label" />
      <div class="h-0 w-full border-b mb-2"></div>
    </div>
    <NMenu :options="menuOptions" @update:value="onUpdate" />
  </div>
</template>

<script setup lang="ts">
import type {
  MenuMixedOption,
  MenuOption,
} from "naive-ui/es/menu/src/interface";

const router = useRouter();
const bookStore = useBookStore();

const menuOptions = computed(() => {
  return bookStore.currentBook?.articles as MenuMixedOption[];
});

const onUpdate = (key: string, item: MenuOption) => {
  router.push({ name: "article", params: { article: key } });
};
</script>
