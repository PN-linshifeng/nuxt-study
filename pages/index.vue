<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-scope-market</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>

      <p style="margin-top: 100px">
        <router-link to="/order">订单</router-link>
      </p>
      <p style="margin-top: 100px"><nuxt-link to="/a">a</nuxt-link></p>
      <p style="margin-top: 100px; margin-bottom: 100px">
        <nuxt-link to="/b">b</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '123',
      htmlAttrs: {
        lang: 'en',
        amp: true,
      },
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
