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
            color="primary"
            @click="isFavoritar = !isFavoritar"
          />
        </span>
      </q-card-actions>
      <q-card-section class="row items-center">
        <q-input class="full-width" v-model="filters.titulo" rounded outlined label="Titulo" />
      </q-card-section>
      <q-card-section class="row items-center">
        <caixa-selecao
          v-if="isCaixaSelecao"
          :data="checkboxes"
          @itens-selecionados="checkboxes = $event"
        />

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
      <q-card-actions class="row justify-between">
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
        <q-btn
          color="primary"
          label="Ok"
          @click="isEditarNota ? editar() : salvar()"
          v-close-popup
        />
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
import type { ICheckbox } from 'src/interfaces/nota.interface'

export default defineComponent({
  name: 'DialogComponent',

  components: {
    CaixaSelecao,
  },

  data() {
    return {
      isOpenModal: shallowRef<boolean>(false),
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
      callback: null as ((value) => void) | null,
      isEditarNota: shallowRef<boolean>(false),
      id: shallowRef<string>(''),
      checkboxes: ref<Array<ICheckbox>>([]),
    }
  },

  watch: {
    id(value) {
      if (value) {
        this.isEditarNota = true
      } else {
        this.isEditarNota = false
      }
    },
  },

  methods: {
    openModal(params) {
      return new Promise((resolve) => {
        if (params.tipo === 'caixa-selecao') {
          this.isCaixaSelecao = true
        }

        if (params.nota) {
          console.log(params.nota)
          this.filters.titulo = params.nota.titulo
          this.filters.nota = params.nota.nota
          this.isFavoritar = params.nota.isFixed
          this.id = params.nota.id
          this.isCaixaSelecao = params.nota.isCheckbox
          this.checkboxes = params.nota.checkboxes
        }

        this.toogleModal(true)
        this.callback = resolve
      })
    },

    toogleModal(value: boolean): void {
      this.isOpenModal = value
    },

    limparFormulario(): void {
      this.filters.titulo = ''
      this.filters.nota = ''
      this.isFavoritar = false
      this.isCaixaSelecao = false
      this.id = ''
      this.isFavoritar = false
    },

    salvar() {
      if (this.isCaixaSelecao) {
        this.callback({
          isCheckbox: true,
          checkboxes: this.checkboxes,
          titulo: this.filters.titulo,
          isFixed: this.isFavoritar,
        })
      } else {
        this.callback({
          ...this.filters,
          isFixed: this.isFavoritar,
        })
      }
    },

    editar() {
      if (this.isCaixaSelecao) {
        this.callback({
          isCheckbox: true,
          checkboxes: this.checkboxes,
          titulo: this.filters.titulo,
          id: this.id,
          isFixed: this.isFavoritar,
        })
      } else {
        const payload = {
          ...this.filters,
          id: this.id,
          isFixed: this.isFavoritar,
        }
        this.callback(payload)
      }
    },
  },
})
</script>
