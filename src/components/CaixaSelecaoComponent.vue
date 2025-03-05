<template>
  <div class="column self-center full-width outline" tabindex="0">
    <!-- <template v-for="(item, index) in tasks" :key="index">
      <div class="row items-center q-gutter-x-sm q-py-md no-wrap">
        <q-checkbox class="col-1" v-model="item.check" />
        <input style="height: 30px" class="col-10" v-model="item.task" />
        <q-icon
          class="cursor-pointer"
          :name="icons.fasXmark"
          size="20px"
          @click="removerTask(index)"
        />
      </div>
    </template> -->
    <q-list bordered dense>
      <q-item
        class="row items-center q-gutter-x-sm q-py-md no-wrap"
        v-for="(item, index) in getItensNaoConcluidos"
        :key="index"
      >
        <q-checkbox class="col-1" v-model="item.check" />
        <input style="height: 30px" class="col-10" v-model="item.task" />
        <q-icon
          class="cursor-pointer"
          :name="icons.fasXmark"
          size="20px"
          @click="removerTask(index)"
        />
      </q-item>
    </q-list>
    <q-separator />
    <q-item>
      <span class="cursor-pointer" @click="adicionarCaixaSelecao">
        + Adicionar Caixa de Seleção
      </span>
    </q-item>

    <q-list v-if="getItensConcluidos.length" padding bordered dense class="rounded-borders">
      <q-expansion-item
        v-model="expanded"
        dense
        dense-toggle
        expand-separator
        icon="check"
        :label="getLabelItensConcluidos"
      >
        <q-list padding bordered dense class="rounded-borders">
          <q-item
            class="row items-center q-gutter-x-sm q-py-md no-wrap"
            v-for="(item, index) in getItensConcluidos"
            :key="index"
          >
            <q-checkbox class="col-1" v-model="item.check" />
            <input style="height: 30px" class="col-10" v-model="item.task" />
            <q-icon
              class="cursor-pointer"
              :name="icons.fasXmark"
              size="20px"
              @click="removerTask(index)"
            />
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, shallowRef } from 'vue'

import { fasXmark } from '@quasar/extras/fontawesome-v6'

import type { ICheckbox } from 'src/interfaces/nota.interface'

export default defineComponent({
  name: 'CaixaSelecaoComponent',

  emits: ['itens-selecionados'],

  props: {
    data: Array<ICheckbox>,
  },

  data() {
    return {
      tasks: [{ check: false, task: '' }],
      icons: {
        fasXmark,
      },
      expanded: shallowRef<boolean>(true),
    }
  },

  watch: {
    tasks: {
      handler(value) {
        this.$emit('itens-selecionados', value)
      },
      deep: true,
    },
  },

  computed: {
    getItensConcluidos() {
      return this.tasks.filter((item) => item.check)
    },

    getItensNaoConcluidos() {
      return this.tasks.filter((item) => !item.check)
    },

    getLabelItensConcluidos() {
      if (this.getItensConcluidos.length <= 1) {
        return `${this.getItensConcluidos.length} item marcado.`
      }

      return `${this.getItensConcluidos.length} itens marcados`
    },
  },

  mounted() {
    if (this.data.length) {
      this.tasks = [...this.data]
    }
  },

  methods: {
    adicionarCaixaSelecao(): void {
      this.tasks.push({
        check: false,
        task: '',
      })
    },

    removerTask(index: number): void {
      console.log(index)
      this.tasks.splice(index, 1)
    },
  },
})
</script>
