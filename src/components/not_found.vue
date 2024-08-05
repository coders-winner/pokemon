<template>
  <v-container class="my-cont">
    <v-empty-state
      headline="Whoops, 404"
      title="Page not found"
      text="The page you were looking for does not exist"
      image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
    >
      <v-btn to="/" size="x-large">go back to the main page</v-btn>
    </v-empty-state>
  </v-container>
</template>
