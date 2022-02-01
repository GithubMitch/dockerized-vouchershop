<script>
import { state, actions } from '../store/reactives'
import { defineComponent, onMounted, toRaw , ref, watch} from 'vue'

export default defineComponent({
  props: {
    product:{
      type: Object,
      default: {}
    }
  },
  setup() {
    const stockProducts = toRef(state, 'stockProducts');
    const selectedBrand = toRef(state, 'selectedBrand');
    const selectableBrands = toRef(state, 'selectableBrands');
    return {stockProducts, selectableBrands, selectedBrand}
  },
})

</script>

<style>
  /* css */
</style>