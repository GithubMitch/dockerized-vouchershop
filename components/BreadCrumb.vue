
<template>
  <div class="breadcrumb">
    <div v-if="$route.params.category" class="inner">
      <span v-for="(param, route) in $route.params" :key="param">
          <span v-show="route !== 'category'">
            >    
          </span> 
          <span v-show="route == 'category'">
            <NuxtLink v-if="$route.params.category" :to='`/${param}`'>{{param}}</NuxtLink>
          </span>  
          <!-- <span v-show="$route.params.brandname">:{{$route.params.brandname}}:</span> -->
          <span v-show="route == 'brandname'">
            <NuxtLink v-if="$route.params.brandname" :to='`/${$route.params.category}/${param}`'>{{param}}</NuxtLink>
          </span> 
          <span v-show="route == '_for'">
            <NuxtLink v-if="$route.params._for" :to='`/${$route.params.category}/${$route.params.brandname}/${param}`'>{{param}}</NuxtLink>
          </span> 
          <!-- <span v-show="route == '_productslug'">
            <NuxtLink v-if="$route.params._productslug" :to='`/${$route.params.category}/${$route.params.brandname}/${$route.params._for}/${param}`'>{{param}}</NuxtLink>
          </span>  -->
      </span>
    </div>
  </div>
</template> 
<script>
import { defineComponent } from '@vue/composition-api'
import {_} from 'vue-underscore';

export default defineComponent({
  setup() {},
})
</script>

