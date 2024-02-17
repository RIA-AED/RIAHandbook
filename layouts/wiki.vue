<template>
  <NLayout has-sider class="h-screen">
    <NLayoutSider
      show-trigger="bar"
      :width="280"
      :collapsed-width="0"
      class="bg-zinc-100"
    >
      <SideBar />
    </NLayoutSider>
    <NLayoutContent>
      <div class="mx-16 my-8">
        <slot></slot>
      </div>
    </NLayoutContent>
  </NLayout>
</template>

<script lang="ts" setup></script>

<style></style>
