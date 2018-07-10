var ChartType = {
    Bar: "bar",
    Column: "column",
    Line: "line",
    Pie: "pie"
}
function CreateChart(id, type, title, subtitle, categories, yAxisText, series) {
    Highcharts.chart(id, {
        chart: {
            type: type,
            plotBorderWidth: 1
        },
        title: {
            text: title,
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: yAxisText
            }
        },
        series: series,
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        tooltip: {
            backgroundColor: '#FCFFC5',
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 3,
            // formatter: function () {
            //     //return 'The value for <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series ' + this.series.name;
            //     // return '<b>' + this.x + '</b><br/>' +
            //     // this.series.name + ': ' + this.y + '<br/>' +
            //     // 'Total: ' + this.point.stackTotal;
            // },
            crosshairs: [true]
        }
    });
    document.getElementsByClassName('highcharts-credits')[0].style.display = 'none';
}