<template>
  <div id="PageSubMenu" 
  >
    <!-- v-if="$route.params._categoryslug && $route.params._brand" -->
    <nav>
      <ul>
        <!-- {{navLinks}} -->
        <li v-for="item in navLinks.subItems" v-bind:key="item.label" class="category">
          <NuxtLink :to="`${navLinks.url}${item.url}`" 
              @click="setGroup(`${item.label}`)"
            >
              <!-- //  TODO HIERBOVEN >> SET GROUP (product.group) FILTER -->
              <!-- @click="setActionLabel(`${item.label}`)" -->

              {{item.label}}
          </NuxtLink>
          <!--  -->
        </li>
            
        <!-- <li>
          <NuxtLink @click="setActionLabel('kids')" 
          :to='`/${$route.params._categoryslug}` + `/${$route.params._brand}` + `/for-him`' value="him" key="him">Him</NuxtLink>
        </li>
        <li>
          <NuxtLink @click="setActionLabel('kids')" 
          :to='`/${$route.params._categoryslug}` + `/${$route.params._brand}` + `/for-her`' value="her" key="her">Her</NuxtLink>
        </li>
        <li>
          <NuxtLink @click="setActionLabel('kids')" 
          :to='`/${$route.params._categoryslug}` + `/${$route.params._brand}` + `/for-kids`' value="kids" key="kids">Kids</NuxtLink>
        </li>
        <li>
          <NuxtLink @click="setActionLabel('opwaarderen')" 
          :to='`/${$route.params._categoryslug}` + `/${$route.params._brand}` + `/for-opwaarderen`' value="opwaarderen" key="opwaarderen">Opwaarderen</NuxtLink>
        </li> -->
      </ul>
    </nav>
  </div>
</template> 

<script>
import { defineComponent } from '@vue/composition-api'
import {_} from 'vue-underscore';
import { state , actions } from '../store/reactives';

export default defineComponent({
  props: {
    navLinks: {
      type: Object,
      default: {},
      required: false
    }
  },
  async setup() {
    const selectedBrand = toRef(state, 'selectedBrand');

    const setActionLabel = (value)  => {
      console.log(value)
      actions.setActionLabel(value)
    }    
    const setGroup = (value)  => {
      console.log(value)
      actions.setGroup(value)
    }
    return {setGroup, setActionLabel, selectedBrand}
  },
})
</script>

