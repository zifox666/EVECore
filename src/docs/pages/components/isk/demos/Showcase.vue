<script setup lang="ts">
import { ref } from 'vue';
import EveIsk from '@/components/eve/EveIsk.vue';
import EveButton from '@/components/eve/EveButton.vue';
import { DemoGroup } from '@/docs/kit';

const wallet = ref(1_284_500_000);
function bump(n: number) {
  wallet.value += n;
}
</script>

<template>
  <DemoGroup :label="{ zh: '金额', en: 'Amounts' }" :hint="{ zh: '等宽，千分位', en: 'Mono with separators' }">
    <EveIsk :value="1_284_500_000.5" />
    <EveIsk :value="385_900" :decimals="0" />
    <EveIsk :value="5.12" :suffix="false" />
    <EveIsk :value="0" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '负数', en: 'Negative' }" :hint="{ zh: '不加 delta 时保持正文色', en: 'Stays body colour without delta' }">
    <EveIsk :value="-12_400" />
    <EveIsk :value="-1_000_000_000.25" :suffix="false" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '涨跌', en: 'Delta' }" :hint="{ zh: '只改文字色，显示绝对值', en: 'Text colour only; absolute value' }">
    <EveIsk :value="53_000" delta />
    <EveIsk :value="-12_400" delta />
    <EveIsk :value="0" delta />
    <EveIsk :value="1_850_000.75" delta :suffix="false" />
    <EveIsk :value="-0.7" delta :suffix="false" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '滚动计数', en: 'Animated' }" :hint="{ zh: '点击按钮看 600ms 滚动', en: 'Click to see the 600ms roll' }">
    <EveIsk :value="wallet" animated :decimals="0" />
    <EveButton @click="bump(250_000_000)">Sell Loot</EveButton>
    <EveButton @click="bump(-90_000_000)">Buy Ship</EveButton>
    <EveIsk :value="wallet" animated delta :decimals="0" :suffix="false" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '无小数与大数', en: 'Decimals and big numbers' }">
    <EveIsk :value="123_456_789_012.34" />
    <EveIsk :value="0.0049" :decimals="4" />
    <EveIsk :value="9_999_999_999_999" :decimals="0" />
  </DemoGroup>
</template>
