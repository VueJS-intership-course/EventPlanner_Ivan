<template>
  <highcharts class="pie" :options="pieOptions" v-if="expenseData.length > 0"></highcharts>
  <p class="m-auto" v-if="expenseData.length < 1">Add an expense to show the chart</p>
</template>

<script setup>
import { computed, ref } from "vue";
import eventStore from "@/store/eventsStore";

const useEventStore = eventStore();

const expenseData = computed(() => useEventStore.selectedEvent.expenses);

const pieOptions = ref({
  chart: {
    type: "pie",
  },
  title: {
    text: "Expenses",
  },
  series: [
    {
      name: "Category",
      colorByPoint: true,
      data: expenseData,
    },
  ],
  accessibility: {
    enabled: false,
  },
});
</script>

<style lang="scss" scoped>
.pie {
  min-height: 13rem;
}
</style>
