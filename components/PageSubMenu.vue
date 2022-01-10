<template>
  <div id="PageSubMenu">
    <nav>
      <ul>
        <li>
            <NuxtLink to="/category/him" key="him">Him</NuxtLink> 
        </li>
        <li>
          <NuxtLink to="/category/her" key="her">Her</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/category/kids" key="kids">Kids</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/category/couples" key="couples">Couples</NuxtLink>
        </li>
      </ul>
    </nav>
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

