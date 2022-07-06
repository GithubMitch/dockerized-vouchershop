<template>
  <div id="PageSubMenu">
    <nav>
      <ul id="brandMenu" style="border-bottom: 1px solid black;" v-if="$route.params.category === 'beltegoed'">
        <li v-for="brand in brands" v-bind:key="brand" class="category">
          <NuxtLink :to="{name: `category-brand-brandname` , params: {  category: $route.params.category !== undefined ? $route.params.category : 'ja', brandname: brand.name }}"
              @click="setGroup(`${brand.name}`)"
              exact>
              {{brand.name}}
          </NuxtLink>
        </li>
      </ul>
      <ul id="groupMenu">
        <li v-for="item in navLinks.subItems" v-bind:key="item.label" class="category">
          <NuxtLink :to="{name: `category-group` , params: {  category: $route.params.category !== undefined ? $route.params.category : navLinks.url , group: item.label }}"
              @click="setGroup(`${item.label}`)" exact>
              {{item.label}}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template> 

<script>
import { defineComponent } from '@vue/composition-api'
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
    const brands = toRef(state, 'brands')
    const setActionLabel = (value)  => {
      console.log(value)
      actions.setActionLabel(value)
    }    
    const setGroup = (value)  => {
      console.log(value)
      actions.setGroup(value)
    }
    return {setGroup, setActionLabel, brands}
  },
})
</script>

