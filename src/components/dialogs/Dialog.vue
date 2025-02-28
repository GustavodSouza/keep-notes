<template>
  <q-dialog v-model="isOpenModal" @hide="limparFormulario">
    <q-card style="max-width: 930px; width: 930px">
      <q-card-actions class="row justify-between q-pa-md">
        <span>
          <q-icon class="cursor-pointer" :name="icons.fasArrowLeft" size="20px" v-close-popup />
        </span>
        <span>
          <q-icon
            class="cursor-pointer"
            :name="isFavoritar ? icons.fasThumbtackSlash : icons.fasThumbtack"
            size="20px"
            @click="isFavoritar = !isFavoritar"
          />
        </span>
      </q-card-actions>
      <q-card-section class="row items-center">
        <q-input class="full-width" v-model="filters.titulo" rounded outlined label="Titulo" />
      </q-card-section>
      <q-card-section class="row items-center">
        <caixa-selecao v-if="isCaixaSelecao" />

        <q-input
          v-else
          class="full-width"
          v-model="filters.nota"
          rounded
          outlined
          label="Nota"
          type="textarea"
        />
      </q-card-section>
      <!-- <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions> -->
      <q-card-actions>
        <q-icon class="cursor-pointer" name="add" size="25px">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="isCaixaSelecao = true">
                  <div class="row q-gutter-x-sm">
                    <q-icon :name="icons.fasSquareCheck" size="20px" />
                    <span>Caixa de Seleção</span>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, shallowRef } from 'vue'

import CaixaSelecao from 'src/components/CaixaSelecaoComponent.vue'

import {
  fasThumbtack,
  fasThumbtackSlash,
  fasArrowLeft,
  fasSquareCheck,
} from '@quasar/extras/fontawesome-v6'

export default defineComponent({
  name: 'DialogComponent',

  components: {
    CaixaSelecao,
  },

  data() {
    return {
      isOpenModal: shallowRef<boolean>(true),
      filters: {
        titulo: shallowRef<string>(''),
        nota: ref<string>(''),
      },
      icons: {
        fasThumbtack,
        fasThumbtackSlash,
        fasArrowLeft,
        fasSquareCheck,
      },
      isFavoritar: shallowRef<boolean>(false),
      isCaixaSelecao: shallowRef<boolean>(false),
    }
  },

  methods: {
    openModal(params): void {
      if (params.tipo === 'caixa-selecao') {
        this.isCaixaSelecao = true
      }

      this.toogleModal(true)
    },

    toogleModal(value: boolean): void {
      this.isOpenModal = value
    },

    limparFormulario(): void {
      this.filters.titulo = ''
      this.filters.nota = ''
      this.isFavoritar = false
      this.isCaixaSelecao = false
    },
  },
})
</script>
