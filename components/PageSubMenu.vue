<template>
  <div id="PageSubMenu" 
  >
    <!-- v-if="$route.params._categoryslug && $route.params._brand" -->
    <nav>
      <ul>
        <li v-for="item in navLinks.subItems" v-bind:key="item.label" class="category">
          <NuxtLink :to="`${navLinks.url}${item.url}`" 
              @click="setGroup(`${item.label}`)"
            >
              <!-- //  TODO  >> SET GROUP (product.group) FILTER -->
              <!-- @click="setActionLabel(`${item.label}`)" -->

              {{item.label}}
          </NuxtLink>
          <!--  -->
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
  props: {
    navLinks: {
      type: Object,
      default: {},
      required: false
    }
  },
  async setup() {

    const setActionLabel = (value)  => {
      console.log(value)
      actions.setActionLabel(value)
    }    
    const setGroup = (value)  => {
      console.log(value)
      actions.setGroup(value)
    }
    return {setGroup, setActionLabel}
  },
})
</script>

