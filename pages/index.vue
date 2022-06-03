<template>
  <div id="app">
    <h1 class="visually-hidden">
      Idaproject Testwork
    </h1>
    <NuxtHeader />
    <main class="content">
      <NuxtForm />
      <NuxtRender />
    </main>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss">
@import '~assets/scss/fonts.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: $greyLight;
}

#app {
  padding: 0 32px 83px;
  color: $black;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
}

.visually-hidden {
  position: absolute;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
}

.content {
  display: flex;
}
</style>
