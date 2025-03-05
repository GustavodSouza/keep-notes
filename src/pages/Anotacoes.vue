<template>
  <q-item>
    <q-item-section>
      <div class="row">
        <div
          style="position: relative"
          class="cursor-pointer q-pa-md q-ma-sm box"
          v-for="(card, index) in notas"
          :key="index"
        >
          <div @click="abrirNota(card)">
            <span class="text-h5">{{ card.titulo }}</span>
            <p>{{ card.nota }}</p>
          </div>
          <q-icon
            style="position: absolute"
            class="cursor-pointer fixed-bottom-right"
            name="add"
            size="20px"
          >
            <q-menu style="width: 200px">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="excluirNota(card.id)">
                  <q-item-section>
                    <div class="row q-gutter-x-sm">
                      <span>Excluir Nota</span>
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-menu>
          </q-icon>
        </div>
        <div>
          <q-btn class="fixed-bottom-right q-ma-md" round color="primary" icon="add">
            <q-menu style="width: 200px">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="openModal('caixa-selecao')">
                  <q-item-section>
                    <div class="row q-gutter-x-sm">
                      <q-icon name="check" size="20px" />
                      <span>Caixa de Seleção</span>
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="openModal('texto')">
                  <q-item-section>
                    <div class="row q-gutter-x-sm">
                      <q-icon name="book" size="20px" />
                      <span>Texto</span>
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-item-section>
  </q-item>
  <dialog-component ref="textoDialog" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import DialogComponent from 'src/components/dialogs/Dialog.vue'

import { postNota, getNotas, deleteNota, updateNota } from 'src/service/notas.service'

import type { INota } from 'src/interfaces/nota.interface'

export default defineComponent({
  name: 'AnotacoesComponent',

  components: {
    DialogComponent,
  },

  data() {
    return {
      notas: ref<Array<INota>>([]),
    }
  },

  mounted() {
    this.getTodasNotas()
  },

  methods: {
    openModal(tipo: string): void {
      this.$refs.textoDialog.openModal({ tipo }).then((nota: INota) => {
        postNota(nota)
        this.getTodasNotas()
      })
    },

    async getTodasNotas() {
      this.notas = await getNotas()
    },

    async excluirNota(id: string) {
      deleteNota(id)
        .then(() => {
          this.getTodasNotas()
        })
        .catch((error) => {
          console.error(error)
        })
    },

    abrirNota(nota: INota) {
      console.log(nota)
      this.$refs.textoDialog.openModal({ nota }).then((nota: INota) => {
        updateNota(nota)
        this.getTodasNotas()
      })
    },
  },
})
</script>
<style lang="scss">
.box {
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  border: 1px solid black;
  max-width: 300px;
  border-radius: 10px;
}
</style>
