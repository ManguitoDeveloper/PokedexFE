import { Component, AfterViewInit, ViewChild, Input, OnChanges } from '@angular/core';
// import Chart from 'chart.js/auto';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.scss'],
})
export class StatChartComponent implements AfterViewInit, OnChanges {

  @ViewChild('radarChart') radarChart: any;

  @Input() stats!: number[];

  ngAfterViewInit(): void {
    this.createRadarChart();
  }

  ngOnChanges(): void {
    if (this.radarChart) {
      this.radarChart.data.datasets[0].data = this.stats
      this.radarChart.update();
    }
  }

  createRadarChart() {
    this.radarChart = new Chart(this.radarChart.nativeElement, {
      type: this.radarChartType,
      data: this.radarChartData,
      options: this.radarChartOptions
    });
  }

  // Radar

  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
       }
    },
    scales: {
      r: {
        pointLabels: {
          color: 'white',
          font: { size: 12, weight: 'bold', lineHeight: 0.5 },
        },
        suggestedMin: 0,
        suggestedMax: 270,
        backgroundColor: 'rgba(0, 0, 0, .05)',
        grid: {
          color: 'rgb(255, 255, 255)',
          lineWidth: 0.2,
        },
        angleLines: {
          color: 'rgba(255, 255, 255, .5)',
        },
        ticks: {
          display: false,
          stepSize: 45,
        },
      },
    },
  };

  radarChartLabels: string[] = ['HP', 'Atk', 'Def', 'Sp Atk', 'Sp Def', 'Spd'];

  radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {
        data: [],
        pointRadius: 0,
        backgroundColor: 'rgba(255,255,255, .5)',
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 0.2,
        pointBackgroundColor: 'rgba(255,255,255, .5)',
        pointBorderColor: 'rgb(255,255,255)'
      },
    ],
  };

  radarChartType: ChartType = 'radar';
}
