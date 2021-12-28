
<template >
<!-- {{$route.params}} -->
  <div v-if="$route.params._categoryslug" class="inner">
    <span  v-for="(param, index) in $route.params" :key="param">
        <span v-show="index !== '_categoryslug'">
          >    
        </span>   
        {{param}} 
    </span>
  </div>
</template> 
<script>
import { defineComponent } from '@vue/composition-api'
import {_} from 'vue-underscore';

export default defineComponent({
  setup() {
    
  },
})
</script>

