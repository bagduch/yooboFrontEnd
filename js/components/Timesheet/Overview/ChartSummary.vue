<template>
  <div class="columns">
    <div class="column is-two-thirds">is-two-thirds</div>
    <div class="column">
      <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
    </div>
  </div>
</template>
<script>
    import PieChart from "../../Charts/PieChart";

    export default {
        name: "ChartSummary",
        components: {PieChart},
        data() {
            return {
                chartOptions: {
                    hoverBorderWidth: 20
                },
                chartData: {
                    hoverBackgroundColor: "red",
                    hoverBorderWidth: 10,
                    labels: ["Green", "Red", "Blue"],
                    datasets: [
                        {
                            label: "Data One",
                            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
                            data: [1, 10, 5]
                        }
                    ]
                }
            };
        },
    }

</script>
