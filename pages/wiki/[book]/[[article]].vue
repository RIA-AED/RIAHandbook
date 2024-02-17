<template>
  <div>
    <WikiDisplay :page="articleKey" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "article",
  layout: "wiki",
});

const route = useRoute();
const bookStore = useBookStore();

const bookKey = computed(() => bookStore.currentBookKey);
const articleKey = computed(() => bookStore.currentArticleKey);

bookStore.setCurrentBookKey(route.params.book as string);
bookStore.setCurrentArticleKey(route.params.article as string);

watch(
  () => route.params.book,
  () => {
    bookStore.setCurrentBookKey(route.params.book as string);
  }
);

watch(
  () => route.params.article,
  () => {
    bookStore.setCurrentArticleKey(route.params.article as string);
  }
);
</script>

<style></style>
