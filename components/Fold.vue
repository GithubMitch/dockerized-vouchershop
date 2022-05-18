<template>
  <div v-if="$props.productPage" class="fold">
           
    <NuxtLink :to="$props.productPage" @click="setProductPage($props.product)" id="productPageprop" >
      <svg class="foldHolder" :height="height" :width="width">
        <polygon :points="'0,0 '+ height+ ',0 '+ width + ',' + width"  
          class="triangle">
          <!-- REMOVE THIS AND STYLE IN PARENT from and to  -->
        </polygon>
        <defs> 
          <linearGradient :id="MyGradient">
            <stop :offset="gradient.from[1]+'%'" :stop-color="gradient.from[0]"></stop>
            <stop :offset="gradient.to[1]+'%'" :stop-color="gradient.to[0]"></stop>
          </linearGradient>
        </defs>  
      </svg>
      <div class="tip" 
      >
        <!-- :style="adjustedTextStyle" -->
        <span v-if="text != ''">{{text}}</span>
        <div class="tipContent" v-else>
          <NuxtLayout name="fold">
            <template #foldIcon>
              <i v-if="$route.path !== '/checkout'" class="i simple-line-icons:info"></i>
              <!-- <i  class="i simple-line-icons:info"></i> -->
              <i v-else class="i simple-line-icons:close"></i>
            </template>
          </NuxtLayout>
            <!-- <template>
            </template> -->
        </div>
      </div>
    </NuxtLink>
  </div> 
  <div v-else class="fold">
    <svg class="foldHolder" :height="height" :width="width">
      <polygon :points="'0,0 '+ height+ ',0 '+ width + ',' + width"  
        class="triangle">
        <!-- REMOVE THIS AND STYLE IN PARENT from and to  -->
      </polygon>
      <defs> 
        <linearGradient :id="MyGradient">
          <stop :offset="gradient.from[1]+'%'" :stop-color="gradient.from[0]"></stop>
          <stop :offset="gradient.to[1]+'%'" :stop-color="gradient.to[0]"></stop>
        </linearGradient>
      </defs>  
    </svg>
    <div class="tip" 
    >
      <!-- :style="adjustedTextStyle" -->
      <span v-if="text != ''">{{text}}</span>
      <div class="tipContent" v-else>
        <NuxtLayout name="fold">
          <template #foldIcon>
            <i v-if="$route.path !== '/checkout'" class="i simple-line-icons:info"></i>
            <!-- <i  class="i simple-line-icons:info"></i> -->
            <i v-else class="i simple-line-icons:close"></i>
          </template>
        </NuxtLayout>
          <!-- <template>
          </template> -->
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
  import { state, actions } from '../store/reactives';
  import {
    defineComponent,
    toRef,
    onMounted
    } from 'vue';

  export default defineComponent({
    layout: 'false',
    props: {
      width: {
        type: String,
        default: 30
      }, 
      height: {
        type: String,
        default: 30
      }, 
      gradient: {
        type: Object,
        default: {
          from: ['#dc1313',5],
          to: ['#6d0909',95]
        }
      },
      text: {
        type: String,
        default: '',
      },
      textStyle: {
        type: Object,
        default: {}
      },
      MyGradient: {
        type: String,
        default: "MyGradient"
      },
      productPage: {
        type: String,
        default: '',
        required: false
      },
      product: {
        type: Object,
        default: {},
        required: false
      }
    },

    async setup(props) {
      const router = useRouter()
      const route = useRoute()

      // if (props.productPage != '')
      //   console.log("props.productPage", props.productPage)

      const setProductPage = async (product)  => {
        await actions.setProductPage(product)
      }

      onMounted(() => {
        // let triangles = document.querySelectorAll('.fold .foldHolder');
        // let i = 0;
        // triangles.forEach((triangle)=> {
        //   console.log(triangle)
        //   triangle.style.fill = ('url(#'+ 'MyGradient_' + i + ')')
        //   i++
        // })

        // let isFilled = document.querySelector('.'+ MyGradient +' .foldHolder').getAttribute("style");
        // console.log(isFilled)
        
        // if (!isFilled) {
        //   document.querySelector('.'+props.MyGradient+' .foldHolder').style.fill = ('url(#'+ props.MyGradient +')');
        // } else {
        //   let triangles = document.querySelectorAll('.'+props.MyGradient+' .foldHolder');
        //   triangles.forEach((triangle)=> {
        //     triangle.style.fill = ('url(#'+ props.MyGradient +')')
        //   })
        // }
      })
      return {
        router, route, 
        setProductPage
      }
    }

  })

</script>

<style lang="scss" scoped>
// .item.giftcards {
//   .fold {
//     svg.foldHolder {
//       .triangle {
//         fill:linear-gradient(to right, red, #f06d06);

//       }
//     }
//   }
// }
.fold{
  position: absolute;
  top: 0px;
  right: -1px;
  transition: all 0.3s ease-in-out;
  z-index:50;
  svg.foldHolder{
    position: absolute;
    top: 0px;
    right: 0px;
    .triangle {
      fill:url(#MyGradient)
    }
  }
  &:hover{
    opacity: 0.8;
    transform: scale(1.12) translate( -1px , 1px);
  }
  .tip{
    z-index: 99;
    position: relative;
    color: #FFF;
    font-weight: bold;
    font-size: 12px;
    padding-right: 4px;
    padding-top: 4px;
    text-shadow: -0.5px -0.5px 4px #7b381180;

    display: inline-block;
    text-align: center;
    overflow: visible;
    i {
      &:before {
        font-size:1.3em;
      }
    }
  }
  #productPageprop {
    padding:0;
    position:relative;
    z-index:999;
    background:none;
  }
}
</style>