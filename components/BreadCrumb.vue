
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
          <span v-show="route == '_brand'">
            <NuxtLink v-if="$route.params._brand" :to='`/${$route.params._categoryslug}/${param}`'>{{param}}</NuxtLink>
          </span> 
          <span v-show="route == '_for'">
            <NuxtLink v-if="$route.params._for" :to='`/${$route.params._categoryslug}/${$route.params._brand}/${param}`'>{{param}}</NuxtLink>
          </span> 
          <span v-show="route == '_productslug'">
            <NuxtLink v-if="$route.params._productslug" :to='`/${$route.params._categoryslug}/${$route.params._brand}/${$route.params._for}/${param}`'>{{param}}</NuxtLink>
          </span> 
      </span>
    </div>
  </div>
<!-- <div class="inner">
  {{$route.params}}
</div> -->
</template> 
<script>
import { defineComponent } from '@vue/composition-api'
import {_} from 'vue-underscore';

export default defineComponent({
  setup() {
    
  },
})
</script>

