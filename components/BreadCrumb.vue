
<template>
<div class="breadcrumb">
  <div v-if="$route.params.category || $route.params.giftcards" class="inner">
    <span v-for="(param, route, index) in $route.params" :key="param">
      <ClientOnly>
        {{index > 0 ? ' >' : ''}}
        <NuxtLink  :to='`${ $route.params.category === param ? `/`+$route.params.category : `/`+$route.params.category + `/` + ($route.params.brandname !== undefined ? `brand-`+ param : param)}`'>{{param}}</NuxtLink>
      </ClientOnly>
    </span>
  </div>
</div>
</template> 


