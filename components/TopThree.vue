<template>
  <div id="topthree">    
    <h2>Meest populair</h2>
    <div class="popular">
      <div class="select" v-for="(brand, index) in topThree" v-bind:key="index">
        <NuxtLink v-if="brand.type !== 'giftcards'" @click="setBrand(brand.key)"
          :to="{name: `category-brand-brandname`, params: {category: `${brand.type}`, brandname: `${brand.key}`}}">
          <div class="brand">
            <div class="visual">
              <img :src="`/assets/logos/${brand.key}.png`" />
            </div>
            <label for="brand-name">{{brand.name}}</label>
          </div>
        </NuxtLink>
        <NuxtLink v-else :to="{name: `category`, params: {category: `${brand.type}`}}">
          <div class="brand">
            <div class="visual">
              <img :src="`/assets/logos/${brand.key}.png`" />
            </div>
            <label for="brand-name">{{brand.name}}</label>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { actions, state } from '../store/reactives.ts'
import {_} from 'vue-underscore'

export default defineComponent({
  async setup(props) {
    const isLoading = ref(true)
    const brands = toRef(state, 'brands');
    const topThree = toRef(state, 'topThree');

    const setBrand = (brand) => {
      actions.setSelectedBrand(brand);
    }

    const randomizeBrands = () => {
      for (let i = 0; i <=2 ; i++) {
        if (topThree.value.length <= 2) {
          let randIndex = Math.floor(Math.random() * 10)
          let randBrand = brands.value[randIndex]
          if (randBrand === topThree.value[0] || randBrand === topThree.value[1] || randBrand === topThree.value[2]) {
            i--;
          } else {
            randBrand.type = 'beltegoed'
            if (randBrand.key == 'paysafecard' || randBrand.key == 'apple' )
              randBrand.type = 'giftcards'
            topThree.value.push(randBrand)
          }
        }
      }
      return
    }

    watch([brands], (newValues, prevValues) => {
      console.log("old / new values =",prevValues, newValues)
      randomizeBrands();
      isLoading.value = false
    })
    randomizeBrands();
    return {setBrand,topThree}
  }
})
</script>

<style lang="scss">
@mixin brandCircle($size, $bottom:0, $right:0, $content : '1', $line-height: 3em, $font-size: 1.5em) {
  border-radius: 50%;
  content: "";
  display:block;
  font-weight:700;
  font-size:1.5em;
  height: $size;
  position:absolute;
  width: $size;

  @if $bottom != 0 "and" $right != 0  "and" $content != '1' "and" $line-height != 3em "and" $font-size != 1.5em {
    bottom: $bottom;
    content: $content;
    font-size: $font-size;
    right: $right;
    line-height: $line-height;
  }
}

#topthree {
  h1, h2 {
    line-height: 2em;
    color: #0c4971;
  }
  .popular {
    .select{
      position: relative;
      display: inline-flex;
      min-height: 140px;
      user-select: none;

      a {text-decoration: none;color:inherit;}

      // popular circle 1, 2 and 3
      &:nth-child(1){
        .brand {
          &::after {
            @include brandCircle( 50px, calc(-50px / 2), calc(-50px / 2), '1', 1.65em, 2em); //( (width/height), (bottom), (right)
          }
        }
      }
      &:nth-child(2){
        .brand {
          &::after {
            @include brandCircle( 40px, calc(-40px / 2), calc(-40px / 2), '2', 1.75em, 1.5em ); //( (width/height), (bottom), (right)
          }
        }
      }
      &:nth-child(3){
        .brand {
          &::after {
            @include brandCircle( 30px, calc(-30px / 2), calc(-30px / 2), '3', 2em, 1em); //( (width/height), (bottom), (right)
          }
        }
      }

    }
    .brand{
      position: relative;
      background: #FFF;
      display: inline-flex;
      justify-content: space-between;
      flex-flow: column;
      border: 1px solid #00000030;
      // box-shadow: 0px 0px 3px #00000030;
      padding: 10px;
      margin: 33px;
      margin-top: 0px;
      margin-left: 0px;
      min-height: 146px;
      vertical-align: top;
      text-align: center;
      border-radius: 9px;
      min-width: 140px;



      &::after {
        background:#1985c8;
        background:orange;
        background:#f06c19;
        //#1985c8
        color:#fff;
        transition: all 300ms cubic-bezier(.47,1.64,.41,.8);
      }

      * > &:hover {
        &::after {
          transform: scale(1.25);
          background:#4b9fd4;
          background:orange;
          // background:orange;

          // 4b9fd4
        }
      }
      &:active{
        transform: scale(0.99) translateY(1px);
      }

      &:hover{
        cursor: pointer;
        .fold {
          opacity: 0.8;
          transform: scale(1.12) translate( -1px , 1px);
        }
      }
      &:active{
        transform: scale(0.99) translateY(1px);
      }

      label{
        flex: 1 1 10%;
        vertical-align: middle;
        text-transform: uppercase;
        font-weight: bold;
        padding: 10px 5px 0px;
        cursor: pointer;
      }

      .visual{
        display: inline-flex;
        justify-content: center;
        flex-flow: column;
        flex: 0 1 50%;
        img{
          max-width: 144px;
          max-height: 100px;
        }
      }
    }
  } 
}

.fold{
  position: absolute;
  top: 0px;
  right: 0px;
  transition: all 0.3s;
  height:45px;
  width:45px;
  svg.foldHolder{
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 0 7px 0 0px;
    overflow: hidden;
    
    .triangle{
      fill: #ed6c23;
      fill:url(#MyGradient)
    }
  }
  .fold svg.foldHolder {
    right: -1px !important;
    overflow: hidden !important;
    border-radius: 0px 6px 0px 0px !important;
  }
  &:hover{
    opacity: 0.8;
    transform: scale(1.12) translate( -1px , 1px);
  }
  .tip{
    z-index: 99;
    position: relative;
    right: -12px;
    color: #FFF;
    font-weight: bold;
    font-size: 12px;
    padding-right: 5px;
    text-shadow: -0.5px -0.5px 4px #7b381180;
    display: inline-block;
    text-align: center;
    overflow: visible;    
  }
  .type{
    text-transform: uppercase;
    font-size: 14px;
    opacity: 0.75;
  }
}
</style>