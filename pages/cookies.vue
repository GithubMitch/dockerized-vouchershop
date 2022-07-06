<template>
  <NuxtLayout name="default">
    <template #content>
      <Carousel/>
      <div class="content">
        <h1>
          Disclaimer
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam semper risus ut bibendum placerat. Nam auctor nunc massa, sed convallis quam rutrum pellentesque. Curabitur orci diam, fermentum vel lorem sed, placerat vehicula diam. Sed fringilla sapien non convallis ultricies. Nullam lacinia tincidunt pulvinar. Praesent metus turpis, commodo non imperdiet et, ultrices quis turpis. Nam vitae est neque. Suspendisse euismod vitae felis sed rhoncus. Vestibulum pellentesque dui nulla, at viverra neque luctus at. Quisque interdum nibh sapien, vitae mollis nulla fermentum vitae. Curabitur convallis vitae enim sit amet feugiat. Cras erat metus, tristique sed volutpat eu, tempor at nibh. Pellentesque dapibus purus leo, eget aliquet nulla volutpat nec. Morbi pellentesque non massa sed varius.
        </p>
        <p>
          Proin lobortis, quam sed malesuada commodo, ligula sapien pharetra leo, vel fermentum ipsum lectus et lorem. Suspendisse eget turpis at mi dapibus euismod non at magna. Suspendisse convallis urna a libero scelerisque tristique. Curabitur sit amet malesuada massa. Donec vitae lorem non lacus volutpat dictum. Curabitur consequat, est eu sollicitudin commodo, augue eros eleifend lorem, sit amet tempor lectus quam ut felis. Praesent enim risus, dictum vel enim id, dignissim pretium justo. Suspendisse eget leo eros. Sed iaculis suscipit nibh at sagittis. Nulla vitae malesuada diam. Pellentesque iaculis eget sapien quis egestas. Nunc suscipit est dolor, vel rutrum magna rhoncus ac. Donec gravida, sapien ac pharetra euismod, leo elit convallis enim, nec ornare neque quam vel diam. Donec commodo arcu ullamcorper, faucibus eros sit amet, rhoncus orci. Proin vel mi est. Proin imperdiet, felis nec egestas viverra, purus urna laoreet ante, id laoreet odio eros eget sem.
        </p>
        <p>
          Pellentesque tempor ullamcorper lacus malesuada tempus. Curabitur sagittis mattis lectus. Maecenas a dolor neque. Donec accumsan dolor eu diam gravida efficitur. Quisque varius arcu a elit consectetur ullamcorper. Quisque dolor risus, venenatis a scelerisque in, dignissim id augue. Nullam euismod risus suscipit eros ullamcorper consectetur. Donec vel elementum massa, sagittis vulputate ex. In dictum accumsan justo, at fermentum lectus malesuada eget. Maecenas mollis a nulla in maximus. Vivamus vel feugiat tortor, nec elementum quam. Vivamus hendrerit mauris at leo ullamcorper, et auctor turpis pulvinar.
        </p>
        <p>
          Quisque vestibulum arcu eget ante rhoncus, sit amet posuere enim imperdiet. Aenean facilisis metus vel vulputate convallis. Nulla facilisi. Curabitur sit amet nulla accumsan, tempor leo in, pretium tortor. Maecenas elementum mollis elit in ornare. Nam quis venenatis magna. Vestibulum eu augue at neque aliquam auctor.
        </p>
        <p>
          Donec congue, eros sit amet elementum fringilla, leo neque scelerisque orci, et malesuada est tortor vitae justo. Phasellus mattis risus a ipsum mattis consectetur. Pellentesque dapibus a tortor tincidunt venenatis. Etiam nunc lorem, viverra a gravida sed, feugiat ac odio. Mauris sagittis consequat pulvinar. Nam mattis maximus velit. Quisque ultrices ante at rutrum luctus. Nam facilisis mauris vitae dui ornare, sit amet tempus tortor ullamcorper. Quisque mollis hendrerit odio a vulputate. Etiam iaculis malesuada sapien, eget aliquet justo ultricies quis. Nam in imperdiet erat.
        </p>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts">
  export default {
    layout:'default',
    name: 'overview',    
  }
</script>

<style>
  .content {
    max-width:1640px;
    margin:0 auto;
    padding:0 1em;
  }
</style>
