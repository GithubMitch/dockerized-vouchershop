<template>
  <div class="select" >
      
    <select class="custom-select" v-model="select">      
      <option v-for="(option, i) of options" :ref="`option_` + i" :class="`option_` + i"
        :key="i" :value="option"  :tabindex="i"  :selected=" i === 0 ? true : false"
        > {{option.name}}
        <!-- @change="selectChange(select)" -->
      </option>
    </select>

    <div class="select-styled"  :class="{active:isActive}" @click="toggleActive($event);">
      <div class="option selected">
          <div class="visual"><img :src="`../../assets/logos/${optionType}${ !select.name ? options[0].key : select.key }.png`" /></div>
          <div class="info"><strong>{{ !select.name ? options[0].name : select.name }}</strong><em class="desc">{{ !select.name ? options[0].desc : select.desc }}</em></div>
      </div>
      <!-- {{ !select.name ? options[0].name : select.name }} -->
      
      <!-- <div class="option selected">
        <div class="visual">
            <i v-if="!select.name" style="margin-left: 4px;font-size: 2.5em;" class="i simple-line-icons:credit-card"></i>
            <img v-else :src="`../../../assets/logos/paymethods/${select.key}.png`" />
        </div>
        <div class="info">
          <strong>
            {{ !select.name ? select : select.name }}
          </strong>
          <em class="desc">{{ !select.name ? select : select.name }}</em>
        </div>
      </div> -->
    </div>
    <ul class="select-options"  :class="{active:isActive}">
      <li v-for="(option, i) of options"
          :key="i"
          @click="
            toggleActive($event);
            {select = option};
            selectOption(`option_` + i , select);
            selectChange(select)
          ">

          <div class="option selected">
              <div class="visual"><img :src="`../../assets/logos/${optionType}${option.key}.png`" /></div>
              <div class="info"><strong>{{ option.name }}</strong><em class="desc">{{ option.desc }}</em></div>
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
        type: String,
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
        // if (payload.name && payload.key) {
        if (payload) {
          console.log("Valid Payload", payload)
          return true
        } else {
          console.error('Not a valid payload')
          return false 
        }
      },
    },
    methods: {
      // sendData(option) {
      //   this.$emit('sending-start', {option})
      // },
      selectOption(index, selected) {
        let allRefs = this.$refs
        let opt = this.$refs[index];
        for (const key in allRefs) {
          if (allRefs.hasOwnProperty.call(allRefs, key)) {
            const element = allRefs[key];
            element.removeAttribute("selected")
          }
        }
        console.log('OPT', opt);
        opt.setAttribute("selected", "selected");
        
        // return this.$emit("selectChange", selected)

      },

    },
    async setup(props, {emit}) {
      const options = ref(toRaw(props.options))
      const select = ref(props.default ? props.default : props.options.length ? props.options[0]  : null);
      const isActive = ref(false);

      const toggleActive = (e) => {
        isActive.value == false ? isActive.value = true : isActive.value = false;
        return
      }

      // const selectChange = (event) => {
      //   emit("selectChange", event.target.value)
      // }
      const selectChange = (iets) => {
        console.log('IETS',iets)
        emit("selectChange", iets)
      }

      watch([select], (newValues, prevValues) => {
        console.log("OPEN & SELECTED=",prevValues, newValues)
        // emit("selectChange", select.value)
      })

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
  $select-color: #fff;
  $select-background: #ff7514;
  $select-width: 100%;
  $select-height: 71px; 

  // body { 
  //   font-family: Lato, Arial;
  //   color: $select-color;
  //   padding: 20px;
  //   background-color: $background;
  // }
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
  .select-styled {
    position: absolute; 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $select-background;
    padding: 4px 0px;
    // @include transition(all 0.2s ease-in);
    .visual {
      margin-right:1em;
    }
    &:after {
      content:"";
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-color: $select-color transparent transparent transparent;
      position: absolute;
      top: 2em;
      right: 10px;
    }
    &:hover {
      background-color: darken($select-background, 2);
    }
    &:active, &.active {
      background-color: darken($select-background, 5);
      &:after {
        top: calc(2em - 7px);
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