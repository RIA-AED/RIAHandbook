<template>
  <div class="w-full h-screen grid place-items-center">
    <NResult
      status="404"
      title="你好，这是首页"
      description="但这里还没有任何内容"
    >
      <template #footer>
        <NuxtLink to="/wiki/了解RIA/新人引导页">
          <NButton> 点我去看看手册 </NButton>
        </NuxtLink>
      </template>
    </NResult>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
