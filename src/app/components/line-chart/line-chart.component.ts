import { Component, Input, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexLegend,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  colors: string[];
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChart {
  public chartOptions: ChartOptions;

  constructor() {
    const timePeriods = [];
    const testData = [];
    const moodLevel = [];

    for (let i = 0; i < 25; i++) {
      timePeriods.push(`${i.toString().padStart(2, '0')}'`);
      testData.push(Math.round(Math.random() * 10));
      moodLevel.push(Math.round(Math.random() * 10));
    }

    this.chartOptions = {
      series: [
        {
          name: 'Energy Level',
          data: [...testData],
        },
        {
          name: 'Mood Level',
          data: [...moodLevel],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: '',
        align: 'left',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [...timePeriods],
      },
      yaxis: {
        title: {
          text: 'Energy & Mood level',
        },
        min: 0,
        max: 10,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };
  }
}
