
<template>
  <div class="loader"></div>
</template> 
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  async setup() {
      // const setupAppReady = toRef(state, 'setupAppReady')
    // const setupAppReady = toRef(state, 'setupAppReady');

    // return {}
  },
})
</script>

<style scoped>
  .inprogress {
      opacity: 1;
      animation: inprogress 2s linear forwards infinite;
  }
  @keyframes inprogress {
    0%,100% { opacity: 0 }
    50% { opacity: 1 }
  }

  .loader{
    position: inline-block;
    width: 300px;
    height: 20px;
    background: orange;
    margin: 0 auto;
    background: orange repeating-linear-gradient(135deg, #7d560e14, #ffffff73 23px);
    margin: 0 auto;
    border: 2px solid #DDD;
    box-shadow: 0 10px 10px -7px #00000050;
    animation: animatedBackground 500s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes animatedBackground {
    from {
      background-position: 0 0;
    }
  /*use negative width if you want it to flow right to left else and positive for left to right*/
    to {
      background-position: 10000px 0;
    }
  }
</style>

