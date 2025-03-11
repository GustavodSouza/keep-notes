<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row justify-between" style="background-color: brown">
        <span class="text-h5">Keep Notes - Anotações</span>
        <q-toggle
          :label="`Modo ${modoNoturno ? 'Claro' : 'Escuro'}`"
          v-model="modoNoturno"
          @update:model-value="setModo"
        />
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-sm">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const modoNoturno = shallowRef<boolean>(true)

const setModo = () => {
  $q.dark.set(modoNoturno.value)
}
</script>
