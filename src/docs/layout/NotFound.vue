<script setup lang="ts">
import { L } from '../i18n';
</script>

<template>
  <div style="padding: 48px 0">
    <div class="eve-display">404</div>
    <p class="eve-text-secondary"><L zh="此星系不存在" en="No such system" /></p>
    <RouterLink to="/" style="color: var(--eve-text-link); font-weight: 700; text-decoration: none">
      <L zh="返回空间站" en="Back to station" />
    </RouterLink>
  </div>
</template>
