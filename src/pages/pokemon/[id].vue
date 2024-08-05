<template>
  <v-container class="my-cont">
    <v-breadcrumbs :items="crumbs"></v-breadcrumbs>
    <not_found v-if="showFound" />
    <v-card
      v-if="pokemon"
      class="ma-2 d-flex justify-space-around align-center"
    >
      <div class="ma-4">
        <v-hover v-slot="{ isHovering, props }">
          <div class="mx-auto" width="300px" v-bind="props">
            <v-img
              height="400px"
              width="400px"
              :src="pokemon.sprites.front_default"
            >
              <v-img
                v-if="
                  isHovering && pokemon.sprites.other.showdown.front_default
                "
                style="background: rgb(var(--v-theme-surface))"
                height="400px"
                :src="pokemon.sprites.other.showdown.front_default"
              ></v-img>
            </v-img>
          </div>
        </v-hover>
      </div>
      <div>
        <h1 class="mx-4 mt-4">{{ pokemon.name }}</h1>

        <v-list lines="one">
          <v-list-item
            >base experience: {{ pokemon.base_experience }}
          </v-list-item>
          <v-list-item>weight: {{ pokemon.weight }} </v-list-item>
          <v-list-item>height: {{ pokemon.height }} </v-list-item>
          <v-list-item v-for="(item, id) in pokemon.types" :key="id">
            type {{ id + 1 }}: {{ item.type.name }}
          </v-list-item>
          <v-list-item v-for="(item, id) in pokemon.abilities" :key="id">
            ability {{ id + 1 }}: {{ item.ability.name }}
          </v-list-item>
        </v-list>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">stat</th>
            <th class="text-left">values</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pokemon.stats" :key="item.name">
            <td>{{ item.stat.name }}</td>
            <td>{{ item.base_stat }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <div v-if="pokemon">
      <h1 class="text-center">Evolution</h1>
      <div v-if="evolution" class="d-flex flex-wrap justify-center">
        <div v-for="item in evolution" :key="item.name">
          <cartPokemon :item="item" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import axios from "axios";

const route: any = useRoute();
const showFound = ref(false);
const pokemon = ref();
const species = ref();
const evolution: any = ref([]);
const crumbs = ref([
  {
    title: "Back",
    disabled: false,
    to: "/",
  },
]);

async function api() {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    .then(function (response) {
      pokemon.value = response.data;
      if (!species.value) speciesApi();
      // console.log(response.data);
      crumbs.value.push(
        ...[
          {
            title: pokemon.value.name,
            disabled: true,
            to: "../pokemon/" + pokemon.value.id,
          },
        ]
      );
    })
    .catch(function (error) {
      showFound.value = true;
      console.log(error);
    });
}
api();

function speciesApi() {
  axios
    .get(pokemon.value.species.url)
    .then(function (response) {
      species.value = response.data;
      evolutionApi();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function evolutionApi() {
  axios
    .get(species.value.evolution_chain.url)
    .then(function (response) {
      evolution.value.push(response.data.chain.species);

      if (response.data.chain.evolves_to[0]) {
        evolution.value.push(response.data.chain.evolves_to[0].species);

        if (response.data.chain.evolves_to[0].evolves_to[0])
          evolution.value.push(
            response.data.chain.evolves_to[0].evolves_to[0].species
          );
      }
      evolution.value = evolution.value.map((e: any) => {
        e.url = e.url.replace(/pokemon-species/, "pokemon");
        return e;
      });
      // console.log(response.data.chain.species);
    })
    .catch(function (error) {
      console.log(error);
    });
}
watch(route, () => {
  api();
  crumbs.value = [
    {
      title: "Back",
      disabled: false,
      to: "/",
    },
  ];
});
</script>
