<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-layout justify-center>
            <h2 class="grey--text">Usuario {{ this.$store.getters.getLoggedUser.name }}</h2>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>