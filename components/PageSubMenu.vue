<template>
  <div id="PageSubMenu" v-if="$route.params._categoryslug && $route.params._brand">
    <nav>
      <ul>
        <li>
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
        </li>
      </ul>
    </nav>
  </div>
</template> 

<script>
import { defineComponent } from '@vue/composition-api'
import {_} from 'vue-underscore';
import { state , actions } from '../store/reactives';

export default defineComponent({
  
  async setup() {
    const selectedBrand = toRef(state, 'selectedBrand');

    const setActionLabel = (value)  => {
      console.log(value)
      actions.setActionLabel(value)
    }
    return {setActionLabel, selectedBrand}
  },
})
</script>

