import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartService } from 'src/app/services/chart.service';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChartData } from 'src/app/models/chart-data.model';
import { User } from 'src/app/models/user';

// https://coolors.co/3b405b-564b49-af2922-12110c-9d917c-b3883f-57315b-7e1226 CORES BASEADOS NOS RAZR V3 >>DAQUELE<< DIA

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  private root!: am5.Root;
  private chartData: ChartData[] = [];
  private category: object[] = [];
  api: string = environment.apiUrl;
  content!: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private ChartService: ChartService,
    private http: HttpClient
  ) {}

  user: User = <User>{};
  id = 4;
  data: any = Array<ChartData>();

  // makes the application viable in the browser by validating it
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  teste: any;
  testes = [];

  ngOnInit() {}

  // insert content on chart after chart being initialized from the parent component
  ngAfterViewInit() {
    // Data fetching from chart service
    // PEGAR ID DO USER
    this.http
      .get('https://localhost:9000/chart_data/load_chart/' + this.id)
      .subscribe((res) => {
        this.teste = res;
        this.testes = this.teste.list;
        Object.entries(res).forEach(([key, value]) => {
          this.content = `${key}: ${value}`;
        });
        this.content = this.content.replace('undefinedjsonarray: ', '');
        this.content = this.content.replace('jsonarray: ', '');
        this.content = this.content.slice(0, -3) + '\n]';
        const trueContent = JSON.parse(this.content)
        console.log('content',typeof(trueContent))
        console.log(trueContent)
        this.data = trueContent
      });
    // console.log('agora',typeof(agora))

    //PASSAR O JSON PRA CÁ
    var data = this.data;
    // console.log(this.data)
    var root = am5.Root.new('chartdiv');
    root.dateFormatter.setAll({
      dateFormat: 'yyyy-MM-dd',
      dateFields: ['valueX', 'openValueX'],
    });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    var colors = chart.get('colors');

    // Create both axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.2,
          cellEndLocation: 0.8,
        }),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ['axis'],
          animationDuration: 200,
        }),
      })
    );

    let cat = [{ category: 'produto' }];

    yAxis.data.setAll(cat);

    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'hour', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    // push series in the chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        openValueXField: 'fromDate',
        valueXField: 'toDate',
        categoryYField: 'category',
        sequencedInterpolation: true,
      })
    );
    series.columns.template.setAll({
      height: 30,
      templateField: 'columnSettings',
      strokeOpacity: 0,
      tooltipText: '{task}:\n[bold]{openValueX}[/] \n [bold]{valueX}[/]',
      // "{category}: {openValueX.formatDate('yyyy-MM-dd HH:mm')} - {valueX.formatDate('yyyy-MM-dd HH:mm')}",
    });

    series.data.processor = am5.DataProcessor.new(root, {
      dateFields: ['fromDate', 'toDate'],
      dateFormat: 'yyyy-MM-dd HH:mm',
    });
    series.data.setAll(data);

    series.appear();

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text: '{personnel}',
          fill: root.interfaceColors.get('alternativeText'),
          centerY: am5.p50,
          centerX: am5.p50,
          populateText: true,
        }),
      });
    });

    legend.data.push(series);

    // create scrollbars on both vertical and horizontal axes
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    );

    chart.set(
      'scrollbarY',
      am5.Scrollbar.new(root, {
        orientation: 'vertical',
      })
    );

    // init all animations on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
    chart.appear(1000, 100);

    // fill declaration to make collors
    function createFill(
      category: string,
      date: string,
      openDate: string,
      color: am5.Color,
      span: number
    ) {
      //nova declaração de parametros
      var fillAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'category',
          renderer: am5xy.AxisRendererY.new(root, {
            inversed: true,
            cellStartLocation: yAxis
              .get('renderer')
              .get('cellStartLocation', 0),
            cellEndLocation:
              span - yAxis.get('renderer').get('cellStartLocation', 0),
          }),
        })
      );

      fillAxis.get('renderer').labels.template.set('forceHidden', true);

      fillAxis.data.setAll(yAxis.data.values);

      // series.columns.template.setAll({
      //   height: am5.p100,
      //   templateField: 'columnSettings',
      //   strokeOpacity: 0,
      //   fillOpacity: 0.5,
      //   tooltipText: '{task}:\n [bold]{openValueX}[/] - [bold]{valueX}[/]', //declaração da tooltip no formato task | data inicial - data final
      // });

      series.data.processor = am5.DataProcessor.new(root, {
        dateFields: ['fromDate', 'toDate'],
        dateFormat: 'yyyy-MM-dd HH:mm',
      });
      series.data.setAll(data);
    }
  }
  // clears the chart on component removal
  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}
