<template>
  <div class="select" >
    
    <select class="custom-select" v-model="select">      
      <option v-for="(option, i) of options" :ref="`option_` + i" :class="`option_` + i"
        :key="i" :value="i.option"  :tabindex="i"  :selected=" i === 0 ? true : false"
        > {{option.pmname}}
      </option>
    </select>
    <!-- <pre>{{options[0].pmsubName}}</pre> -->
  
    <div class="select-styled"  :class="{active:isActive}" @click="toggleActive($event);">
      <div class="option selected">
          <div class="visual"><img :src="`/assets/logos/${optionType}${ !select.pmname && !options[0].pmname ? options[0].pmsubName.replace(/ /g, '_') : !select.pmname && !options[0].pmsubName ? options[0].pmname : select.pmname}.png`" /></div>
          <div class="info"><strong>{{ select.pmname || select.pmsubName }}</strong><em class="desc">{{ !select.pmname ? options[0].desc : select.desc }}</em></div>
      </div>
    </div>

    <ul  class="select-options"  :class="{active:isActive}">
      <li v-for="(option, i) of options"
          :key="option.id || option.pmsubId"
          :id="option.id || option.pmsubId"
          :portalPmId="option.portalPmId"
          :txAmountClient="option.txAmountClient"
          :txAmountCustomer="option.txAmountCustomer"
          :txPercentageClient="option.txPercentageClient"
          :txPercentageCustomer="option.txPercentageCustomer"
          :validcountry="option.validcountry"
          @click="
            toggleActive($event);
            {select = option};
            selectOption(`option_` + i , select);
            selectChange(select)
          ">

          <div class="option selected">
              <div class="visual"><img :src="`/assets/logos/${optionType}${option.pmname || option.pmsubName.replace(/ /g, '_')}.png`" /></div>
              <div class="info"><strong>{{ option.pmname || option.pmsubName }}</strong><em class="desc">{{ option.desc }}</em></div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { defineComponent , ref, toRaw } from 'vue'
  export default defineComponent({
    props: {
      options: {
        type: Array,
        required: true,
      },
      default: {
        type: Object,
        required: false,
        default: null,
      },
      tabindex: {
        type: Number,
        required: false,
        default: 0,
      },
      elementIndex: {
        type: Number,
        required: true,
        default: 0,
      },
      optionType: {
        type: String,
        required: false,
        default: `paymethods/`,
      },
    },
    emits: {
      'selectChange' (payload) {
        if (payload) {
          console.log("selectChange : Valid Payload", payload)
          return true
        } else {
          console.error('selectChange: Not a valid payload')
          console.log('Payload : (empty)')
          return false 
        }
      },
    },
    methods: {
      selectOption(index, selected) {
        let allRefs = this.$refs
        let opt = this.$refs[index];
        for (const key in allRefs) {
          if (allRefs.hasOwnProperty.call(allRefs, key)) {
            const element = allRefs[key];
            element.removeAttribute("selected")
          }
        }
        opt.setAttribute("selected", "selected");
      },

    },
    async setup(props, {emit}) {
      const options = ref(toRaw(props.options))
      const select = ref(props.default ? props.default[0] : null);
      const isActive = ref(false);
      const toggleActive = (e) => {
        isActive.value == false ? isActive.value = true : isActive.value = false;
        return
      }
      const selectChange = (iets) => {
        emit("selectChange", iets)
      }
      watch([select], (newValues, prevValues) => {
        console.log("OPEN & SELECTED=",prevValues, newValues)
        // emit("selectChange", select.value)
      })
      // STANDARD EMIT  () => SELECT FIRST OPTION
      emit("selectChange", select.value)

      return {
        select, 
        isActive,
        toggleActive,
        selectChange,
      }
    }

  })
</script>

<style scoped lang="scss">
.select select {
  top:4em;
  position:relative;
}
  .custom-select {
    display:none;
  }
  .selected.open {
    display:none;
  }

  $background: #e74c3c;
  $select-color: #333;
  $select-background: #fff;
  $select-width: 100%;
  $select-height: 50px; 

  h1 {
    font-weight: normal;
    font-size: 40px;
    font-weight: normal;
    text-transform: uppercase;
    span { 
      font-size: 13px;
      display: block;
      padding-left: 4px;
    }
  }
  p {
    margin-top: 200px;
    a {
      text-transform: uppercase;
      text-decoration: none;
      display: inline-block;
      color: #fff;
      padding: 5px 10px;
      margin: 0 5px;
      background-color: darken($select-background, 2);
      // @include transition(all 0.2s ease-in);
      &:hover {
        background-color: darken($select-background, 5);
      }
    }
  }
  .select-hidden {
    display: none;
    visibility: hidden;
    padding-right: 10px;
  }
  .select {
    cursor: pointer;
    display: inline-block;
    position: relative;
    font-size: 16px;
    color: $select-color;
    width: $select-width;
    height: $select-height;

  }
  #SubSelect .select-options {
    .visual {
      margin-left:0;
      margin-right:0;
    }
    .option.selected  {
      padding:0;
    }
  }
  .visual {
    margin-left:1em;
    margin-right:1em;
    // background:red;
    // width:50px;
    // height:50px;
    img {max-height:50px;max-width:30px;}
  }
  .select-styled {
    position: absolute; 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $select-background;
    padding: 4px 0px;
    border-radius:5px;
    border:1px solid #333;
    border: 1px solid rgba(60,60,60,.26);
    // @include transition(all 0.2s ease-in);

    &:after {
      content:"";
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-color: $select-color transparent transparent transparent;
      position: absolute;
      top: 1.2em;
      right: 10px;
    }
    &:hover {
      background-color: darken($select-background, 2);
    }
    &:active, &.active {
      background-color: darken($select-background, 5);
      &:after {
        top: calc(1.2em - 7px);
        border-color: transparent transparent $select-color transparent;
      }
    }
  }

  .select-options {
    display: none; 
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 999;
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: darken($select-background, 5);
    margin-top: -2px;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-top: 0;
    border-radius:0 0 4px 4px;
    overflow:hidden;
    li {
      margin: 0;
      padding: .25em 0;
      text-indent: 15px;
      border-top: 1px solid darken($select-background, 10);
      // @include transition(all 0.15s ease-in);
      &:hover, 
      &.is-selected {
        color: $select-background;
        background: $select-color;
      }
      &[rel="hide"] {
        display: none;
      }
    }
    &.active {
      display:block;
    }
  }  
</style>