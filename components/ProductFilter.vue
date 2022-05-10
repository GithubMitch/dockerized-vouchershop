
<template>
  <div class="breadcrumb">
    <div v-if="$route.params" class="inner">
      <!-- <span v-for="(param, route) in $route.params" :key="param"> -->
          <!-- <span v-show="selectedCategory">
            x {{selectedCategory}}
          </span>
          <span v-show="selectedBrand">
            x {{selectedBrand}}
          </span>
          <span v-show="selectedActionLabel">
            x {{selectedActionLabel}}
          </span>
          <span v-show="selectedGroup">
            x {{selectedGroup}}
          </span> -->
    </div>
    <!-- <div v-if="$route.params._categoryslug" class="inner">
      <span v-for="(param, route) in $route.params" :key="param">
          <span v-show="route !== '_categoryslug'">
            >    
          </span> 
          <span v-show="route == '_categoryslug'">
            <NuxtLink v-if="$route.params._categoryslug" :to='`/${param}`'>{{param}}</NuxtLink>
          </span>  
          <span v-show="$route.params._brand">:{{$route.params._brand}}:</span>
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
    </div> -->
    
  </div>
</template> 
<script>
import { defineComponent } from '@vue/composition-api'
import {_} from 'vue-underscore';
import { state, actions } from '../store/reactives';

export default defineComponent({

  async setup() {
    // const selectedCategory = toRef(state, 'selectedCategory');
    // const selectedActionLabel = toRef(state, 'selectedActionLabel');
    // const selectedGroup = toRef(state, 'selectedGroup');


    return {
      // selectedCategory,
      // selectedBrand,
      // selectedActionLabel,
      // selectedGroup
    }
  }
})
</script>

