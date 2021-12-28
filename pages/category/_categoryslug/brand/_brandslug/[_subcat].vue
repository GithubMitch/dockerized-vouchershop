<template>
    <main>
      <NuxtChild/>
    </main>
</template>

<script lang='ts'>
import { state, actions, methods } from '../../../../../store/reactives';
import { defineComponent, onMounted, toRaw , ref, toRef} from 'vue';

export default defineComponent({
  setup() {


    return {}
  },
})
</script>