<template>
  <v-container v-if="pokemons">
    <div class="d-flex flex-wrap justify-center">
      <div v-for="item in pokemons.results" :key="item.name">
        <cartPokemon :item="item" />
      </div>
    </div>

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="Math.ceil(pokemons.count / 20)"
        :total-visible="10"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import axios from "axios";
const pokemons: any = ref();
// const page = ref(1);

function api() {
  axios
    .get(url.value)
    .then(function (response) {
      pokemons.value = response.data;
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

import { useStore } from "@/stores/app";

const store = useStore();

const page: any = computed({
  get() {
    return store.getPages;
  },
  set(value) {
    store.aPages(value);
  },
});
const url: any = ref(
  `https://pokeapi.co/api/v2/pokemon?offset=${(page.value - 1) * 20}&limit=20`
);

api();

watch(page, () => {
  url.value = `https://pokeapi.co/api/v2/pokemon?offset=${
    (page.value - 1) * 20
  }&limit=20`;
  api();
});
</script>
