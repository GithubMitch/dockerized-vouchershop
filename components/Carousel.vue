<template>
  <div id="Slider" v-if="show" @mouseover="isHovering = true , stopAutoSlide()" @mouseout="isHovering = false, startAutoSlide()">
    <transition class="slides-group" tag="div" name="slide-fade">
      <div :key="current" class="slide" :class="slides[current].className">
        <p>
          Get your giftcards in 4 clicks ! 
          <!-- I am {{slides[current].className}}!  -->
        </p>
      </div>
    </transition>
    <div class="btn btn-prev" aria-label="Previous slide" @click="slide(-1)">&#10094;</div>
    <div class="btn btn-next" aria-label="Next slide" @click="slide(1)">&#10095;</div>
    <div class="bullets">
      <span v-for="(slide, index) in slides" v-bind:key="index" class="bullet" :class="{active: index ==current}" @click="navigateTo(index)" @mouseover="isHovering = true" @mouseout="isHovering = false"></span>
    </div>
  </div>
</template>

<script>
  import { state } from '../store/reactives'
  import { defineComponent, reactive, onMounted, toRef } from 'vue'
  import {_} from 'vue-underscore'

  export default defineComponent({

    async setup(props) {

      const carouselState = reactive ({
        current: 0,
        direction: 1,
        transitionName: "slide-next",
        active: 'active', 
        show: true,
        autoSlides: true,
        isHovering: false,
        intervalId: null,
        slides: ([
          { className: "blue" },
          { className: "red" },
          { className: "yellow" }
        ])
      })

      const show = toRef(carouselState, 'show');
      const current = toRef(carouselState, 'current');
      const direction = toRef(carouselState, 'direction');
      const transitionName = toRef(carouselState, 'transitionName');
      const active = toRef(carouselState, 'active');
      const autoSlides = toRef(carouselState, 'autoSlides');
      const isHovering = toRef(carouselState, 'isHovering');
      const intervalId = toRef(carouselState, 'intervalId');
      const slides = toRef(carouselState, 'slides');
      const className = toRef(carouselState.slides, 'className');


      const startAutoSlide = async ()  => {
        clearInterval(carouselState.intervalId);
        // let ref = this
        carouselState.autoSlides ? carouselState.intervalId = setInterval(() => {slide(1)}, 3000) : stopAutoSlide() ;
      }      
      const stopAutoSlide = async ()  => {
        clearInterval(carouselState.intervalId);
      }
      const slide = async (dir)  => {
        carouselState.direction = dir;
        dir === 1 ? (carouselState.transitionName = "slide-next") : (carouselState.transitionName = "slide-prev");
        // console.log(carouselState.transitionName)
        let len = carouselState.slides.length;
        carouselState.current = (carouselState.current + dir % len + len) % len;
      }
      const navigateTo = async (dir)  => {
        dir > carouselState.current ? 
          (carouselState.current = dir, carouselState.transitionName = "slide-next") : (carouselState.current = dir, (carouselState.transitionName = "slide-prev"));      
      }

      onMounted(() => {
        // carouselState.show ? startAutoSlide() : stopAutoSlide()     
      }) 

      return {
        show,
        current,
        direction,
        transitionName,
        active,
        autoSlides,
        isHovering,
        intervalId,
        slides,
        className,
        startAutoSlide,
        stopAutoSlide,
        slide,
        navigateTo
      }
    }
  })
</script>

<style lang="scss">

  #Slider {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      height: 300px;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      max-width: 990px;
      margin: 0px auto;
      min-width: 990px;
      position: relative;
      overflow: hidden;
      margin-bottom: 2em;
      margin-top:2em;
      border-radius:9px;

    .slides-group {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    /* FADE IN */
    .fade-enter-active {
      transition: opacity 1s;
    }
    .fade-enter {
      opacity: 0;
    }
    /* GO TO NEXT SLIDE */
    .slide-next-enter-active,
    .slide-next-leave-active {
      transition: transform 0.5s ease-in-out;
    }
    .slide-next-enter {
      transform: translate(100%);
    }
    .slide-next-leave-to {
      transform: translate(-100%);
    }
    /* GO TO PREVIOUS SLIDE */
    .slide-prev-enter-active,
    .slide-prev-leave-active {
      transition: transform 0.5s ease-in-out;
    }
    .slide-prev-enter {
      transform: translate(-100%);
    }
    .slide-prev-leave-to {
      transform: translate(100%);
    }
    /* SLIDES CLASSES */
    .blue {
      background: #4a69bd;
      p {
        color:#fff;
      }
    }
    .red {
      background: #e55039;
    }
    .yellow {
      background: #f6b93b;
    }
    /* SLIDER STYLES */
    .slide {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size:3em;
      transition:.3s ease all;
    }
    .slide-next {}
    .slide-next {}
    .btn {
      z-index: 10;
      cursor: pointer;
      border: 3px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      position: absolute;
      top: calc(50% - 35px);
      left: 1%;
      transition: color, background 0.3s ease-in-out;
      // transition: background 0.1s ease-in-out;
      user-select: none;
      border-radius: 5px;
    }

    .btn-next {
      left: auto;
      right: 1%;
    }

    .btn:focus,
    .btn:target,
    .btn:active
    {
      background:#1985c8;
      color:#fff;
    }

    .bullets {
      display:block;
      position:absolute;
      bottom:0;
      left:0;
      padding:1em;
      width:150px;
      .bullet {
        display:inline-block;
        width:10px;
        height:10px;
        border-radius: 6px;
        border:1px solid white;
        background:#1985c8;
        margin:0 5px;
        cursor:pointer;
        transition: all 300ms ease;
        &:hover, 
        &.active{
          background:#f06c19;
          transform: scale(1.3);
        }
      }
    } 
    
  }
  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>