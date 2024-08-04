<template>
  <v-card v-if="pokemon" class="ma-2" max-width="344" min-width="200">
    <RouterLink :to="`/pokemon/` + pokemon.id">
      <v-hover v-slot="{ isHovering, props }">
        <div class="mx-auto" max-width="600" v-bind="props">
          <v-img height="200px" :src="pokemon.sprites.front_default">
            <v-img
              v-if="isHovering && pokemon.sprites.other.showdown.front_default"
              style="background: rgb(var(--v-theme-surface))"
              height="200px"
              :src="pokemon.sprites.other.showdown.front_default"
            ></v-img>
          </v-img>
        </div>
      </v-hover>
    </RouterLink>

    <v-card-title> {{ props.item.name }} </v-card-title>

    <!-- <v-card-subtitle> {{ props.item }} </v-card-subtitle> -->

    <v-card-actions>
      <v-btn
        :to="`/pokemon/` + pokemon.id"
        color="orange-lighten-2"
        text="Explore"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <v-list lines="one">
            <v-list-item-subtitle
              >base experience: {{ pokemon.base_experience }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              >weight: {{ pokemon.weight }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              >height: {{ pokemon.height }}
            </v-list-item-subtitle>
          </v-list>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
const show = ref(false);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const pokemon = ref();
axios
  .get(props.item.url)
  .then(function (response) {
    pokemon.value = response.data;
    // console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
</script>
