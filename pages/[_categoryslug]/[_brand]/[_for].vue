<template>
  <NuxtLayout name="category">
    <template #content>
      <NuxtChild 
      :selectedBrand="selectedBrand" 
      :products="stockProducts"
      :actionLabel="selectedActionLabel"
      />
    </template>
  </NuxtLayout>
</template>

<script lang="ts">
  import { state, actions } from '../../../store/reactives';
  import gsap from "gsap";

  import {
    defineComponent,
    toRef,
    onMounted
  } from 'vue';

  export default defineComponent({
    layout: "category",
    async setup(props) {
      const route = useRoute()
      const selectedBrand = toRef(state, 'selectedBrand');
      const stockProducts = toRef(state, 'stockProducts');
      const selectedActionLabel = toRef(state, 'selectedActionLabel');
      // console.log("selectedActionLabel", selectedActionLabel.value);

      const beforeEnter = (el) => {
        el.style.opacity = 0;
        gsap.set(el, {
          opacity: 0,
          y: 30,
          })
      }
      const enter = (el, done) => {
        gsap.to(el, {
          stagger: 1.2,
          duration: 0.74,
          opacity: 1,
          overwrite: false,
          ease: "power2.inOut",
          scaleY: 1,
          scaleX: 1,
          // delay: 0.7,
          y: 0,
          delay: el.dataset.index * 0.1,
          onComplete: done
        })
      }
      const leave = (el, done) => {
        gsap.to(el, {
          opacity: 0,
          scaleY: 0,
          scaleX: 0,
          y: 30,
          delay: el.dataset.index * 0.34,
          onComplete: ()=> { el.dataset.index = 1; return done }
        })
      }

    onMounted(() => {
      /* do something before Vue calls this component's render function */
      selectedBrand.value == '' ? actions.setSelectedBrand(route.params._brandslug) : console.log('Selected brand value :', selectedBrand.value);
      // stockProducts.value == '' ? actions.setSelectedBrand(route.params._brandslug) : console.log('Selected brand value :', selectedBrand.value);
    }) 

      return{selectedBrand, stockProducts, selectedActionLabel};
    }
  })
</script>