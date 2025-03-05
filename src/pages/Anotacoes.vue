<template>
  <q-item v-if="notas.some((item: INota) => item.isFixed)">
    <q-item-section>
      <span>Fixadas</span>
      <cards-component
        :notas="notas.filter((item: INota) => item.isFixed)"
        @abrir-nota="abrirNota"
        @excluir-nota="excluirNota"
        @atualizar-dashboard="getTodasNotas"
      />
    </q-item-section>
  </q-item>
  <q-item v-if="notas.some((item: INota) => !item.isFixed)">
    <q-item-section>
      <span>Outras</span>
      <cards-component
        :notas="notas.filter((item: INota) => !item.isFixed)"
        @abrir-nota="abrirNota"
        @excluir-nota="excluirNota"
        @atualizar-dashboard="getTodasNotas"
      />
    </q-item-section>
  </q-item>
  <botao-adicionar @open-modal="openModal" />
  <dialog-component ref="textoDialog" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import BotaoAdicionar from 'src/components/BotaoAdicionar.vue'
import CardsComponent from 'src/components/CardsComponent.vue'
import DialogComponent from 'src/components/dialogs/Dialog.vue'

import { postNota, getNotas, deleteNota, updateNota } from 'src/service/notas.service'

import type { INota } from 'src/interfaces/nota.interface'

import { notify } from 'src/plugins/notify'

export default defineComponent({
  name: 'AnotacoesComponent',

  components: {
    BotaoAdicionar,
    CardsComponent,
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
      this.$refs.textoDialog.openModal({ tipo }).then((callback) => {
        postNota(callback)
        notify('positive', 'Nota crriada com sucesso')
        this.getTodasNotas()
      })
    },

    async getTodasNotas() {
      this.notas = await getNotas()
    },

    async excluirNota(id: string) {
      deleteNota(id)
        .then(() => {
          notify('positive', 'Nota excluída com sucesso')
          this.getTodasNotas()
        })
        .catch((error) => {
          console.error(error)
        })
    },

    abrirNota(nota: INota) {
      this.$refs.textoDialog.openModal({ nota }).then((callback) => {
        updateNota(callback)
        notify('positive', 'Nota atualizada com sucesso')
        this.getTodasNotas()
      })
    },
  },
})
</script>
