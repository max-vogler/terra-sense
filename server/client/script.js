"use strict";

(function showCharts() {
    _.forEach(document.querySelectorAll("canvas[data-bar-chart]"), function (chart) {
        var sensor = chart.dataset.barChart;
        var ctx = chart.getContext("2d");

        fetch('/api/entries?filter[order]=createdAt:string%20ASC&filter[where][sensor]=' + sensor).then(function (result) {
            return result.json();
        }).then(function (entries) {
            var labels = entries.map(function (entry) {
                return "";
            });

            var values = _.map(entries, "value");
            new Chart(ctx).Line({
                labels: labels,
                datasets: [
                    {
                        label: "",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: values
                    }
                ]
            });
        });
    });

    _.forEach(document.querySelectorAll("canvas[data-pie-chart]"), function (chart) {
        var sensor = chart.dataset.pieChart;
        var ctx = chart.getContext("2d");
        var max = parseFloat(chart.dataset.max);

        fetch('/api/entries?filter[limit]=1&filter[order]=createdAt:string%20DESC&filter[where][sensor]=' + sensor).then(function (result) {
            return result.json();
        }).then(function (entries) {
            new Chart(ctx).Doughnut([
                {
                    value: entries[0].value,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: sensor
                },
                {
                    value: max - entries[0].value,
                    color: "#dedede",
                    highlight: "#dedede",
                    label: ""
                }
            ]);
        });
    });
})();
