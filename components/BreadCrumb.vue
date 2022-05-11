
<template>
  <div class="breadcrumb">
    <div v-if="$route.params._categoryslug" class="inner">
      <span v-for="(param, route) in $route.params" :key="param">
          <span v-show="route !== '_categoryslug'">
            >    
          </span> 
          <span v-show="route == '_categoryslug'">
            <NuxtLink v-if="$route.params._categoryslug" :to='`/${param}`'>{{param}}</NuxtLink>
          </span>  
          <!-- <span v-show="$route.params.brand">:{{$route.params.brand}}:</span> -->
          <span v-show="route == 'brand'">
            <NuxtLink v-if="$route.params.brand" :to='`/${$route.params._categoryslug}/${param}`'>{{param}}</NuxtLink>
          </span> 
          <span v-show="route == '_for'">
            <NuxtLink v-if="$route.params._for" :to='`/${$route.params._categoryslug}/${$route.params.brand}/${param}`'>{{param}}</NuxtLink>
          </span> 
          <span v-show="route == '_productslug'">
            <NuxtLink v-if="$route.params._productslug" :to='`/${$route.params._categoryslug}/${$route.params.brand}/${$route.params._for}/${param}`'>{{param}}</NuxtLink>
          </span> 
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

