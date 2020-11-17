import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() data: any[];
  @Input() chartTitle: string;

  // options
  view: any[] = [1000, 500];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Month';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Clients';
  legendPosition = 'below';

  colorScheme = {
    domain: [
      '#f58310',
      '#cb6c11',
      '#8b3d0b',
      '#66330c',
      '#341a06']
  };


  constructor() {
  }

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

}
