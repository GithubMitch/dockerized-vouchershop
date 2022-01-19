<template>
  <div class="select" :tabindex="tabindex">
      
    <select class="custom-select" 
      v-model="select" 
      @change="changeCustom(select)"
    >
      <option v-for="(option, i) of options" :ref="`option_` + i" :class="`option_` + i"
        :key="i" :value="option" :index="i"
        > {{option.name}}
      </option>
      <!-- <options class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
        >
          {{ option }}
        </div> -->
        <!-- <slot name="selected-option-container">
        </slot>
        <slot name="option">
        </slot> -->
    </select>

    <div class="select-styled" :class="{active:isActive}" @click="toggleActive($event);">{{select.name}}</div>
    <ul class="select-options"  :class="{active:isActive}">
      <li v-for="(option, i) of options"
          :key="i"
          :rel="(option)"
          :value="option"

          @click="
            toggleActive($event);
            selectOption(`option_` + i);
            {select = option};
          ">
            <!-- sendData(option); -->
          {{option.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { defineComponent, reactive, onMounted, toRef , ref, toRaw } from 'vue'
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
    },
    emits: {
      'sending-start' (payload) {
        if (payload.option) {
          console.log("Valid Payload", payload.option)
          return true
        } else {
          console.error('Not a valid payload')
          console.log("false")
          return false 
        }
      },
    },
    methods: {
      sendData(option) {
        this.$emit('sending-start', {option})
      },
      selectOption(index) {
        let allRefs = this.$refs
        let opt = this.$refs[index];
        for (const key in allRefs) {
          if (allRefs.hasOwnProperty.call(allRefs, key)) {
            const element = allRefs[key];
            element.removeAttribute("selected")
          }
        }
        console.log(opt);
        opt.setAttribute("selected", "selected");
      },

    },
    async setup(props, {emit}) {
      const options = ref(toRaw(props.options))
      const select = ref(props.default ? props.default : props.options.length ? props.options[0]  : null);
      const isActive = ref(false);

      const toggleActive = (e) => {
        isActive.value == false ? isActive.value = true : isActive.value = false;
      }

      // const changeCustom = (event) => {
      //   emit("changeCustom", event.target.value)
      // }
      const changeCustom = (iets) => {
        console.log(iets)
        emit("changeCustom", iets)

      }

      watch([select], (newValues, prevValues) => {
        // console.log("OPEN & SELECTED=",prevValues, newValues)
      })

      return {
        select, 
        isActive,
        toggleActive,
        changeCustom
        // selectOption
      }
    }

  })
</script>

<style scoped lang="scss">
.select select {
  top:4em;
  position:relative;
}
  .selected.open {
    display:none;
  }

  $background: #e74c3c;
  $select-color: #fff;
  $select-background: #c0392b;
  $select-width: 220px;
  $select-height: 40px; 

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
    padding: 8px 15px;
    // @include transition(all 0.2s ease-in);
    &:after {
      content:"";
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-color: $select-color transparent transparent transparent;
      position: absolute;
      top: 16px;
      right: 10px;
    }
    &:hover {
      background-color: darken($select-background, 2);
    }
    &:active, &.active {
      background-color: darken($select-background, 5);
      &:after {
        top: 9px;
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
      padding: 12px 0;
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