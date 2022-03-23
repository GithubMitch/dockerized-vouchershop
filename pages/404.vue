<template>
  <NuxtLayout name="default">
    <template #content>
      <div class="inner">
        <h1>404</h1>
        <p>Page not found</p>
        <h3>error</h3>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts">

export default {
  layout: false,
  name: '404',    
}
</script>
