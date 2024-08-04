<template>
  <v-responsive class="border rounded">
    <v-app id="app" :theme="theme">
      <v-app-bar class="px-3">
        <v-app-bar-title>
          <RouterLink to="/" class="my-logo">pokemon </RouterLink>
        </v-app-bar-title>
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
    <footers />
  </v-responsive>
</template>

<script lang="ts" setup>
const theme = ref("dark");

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<style lang="scss">
.v-application__wrap {
  min-height: 87vh !important;
}
</style>
