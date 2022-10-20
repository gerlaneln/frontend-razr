import { Component, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
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
import { UserService } from 'src/app/services/user.service';

// https://coolors.co/3b405b-564b49-af2922-12110c-9d917c-b3883f-57315b-7e1226 CORES BASEADOS NOS RAZR V3 >>DAQUELE<< DIA

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  private root!: am5.Root;
  private chartData: ChartData[] = [];

  api: string = environment.apiUrl;
  content!: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private ChartService: ChartService,
    private http: HttpClient,
    private categoriesList: ChartService,
    private userService: UserService
  ) {}

  data: any = Array<ChartData>();
  category: any = Array<ChartData>();
  user: User = <User>{};

  // makes the application viable in the browser by validating it
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  //a

  holder: any;
  // holders = [];

  ngOnInit() {}

  // insert content on chart after chart being initialized from the parent component
  ngAfterViewInit() {
    // gets the user id from the storage
    const id = JSON.parse(sessionStorage.getItem('user') || '{}');
    console.log(id);

    // Data fetching from api
    let data: any = [];
    let category: any = [];
    
    let dataX: any = [];
    let categoryX: any = [];
    this.http
      .get('https://backend-razr.herokuapp.com/chart_data/load_chart/' + id)
      .subscribe((res) => {
        this.holder = res;
        dataX = this.holder.jsonarray
        categoryX = this.holder.categoriesArray
        
        
        // parses and insert on the category variable
        categoryX = categoryX.slice(0, -5) + '}]';
        category = JSON.parse(categoryX)  
        // parses and fill the chart with data
        dataX = dataX.slice(0, -3) + ']';
        data = JSON.parse(dataX)
        
        console.log('AGORA FOI? data ',typeof(data))
        console.log('AGORA FOI? cate ',typeof(category))
        
        console.log('AGORA FOI? data ',(data))
        console.log('AGORA FOI? cate ',(category))
        
        
        // this.holders = this.holder.list;
        // Object.entries(res).forEach(([key, value]) => {
        //   this.content = `${key}: ${value}`;
        // });
        // this.content = this.content.replace('undefinedjsonarray: ', '');
        // this.content = this.content.replace('jsonarray: ', '');
        // this.content = this.content.replace('categoriesArray: ', '');
        // this.content = this.content.slice(0, -4) + '\n]';
        // category = JSON.parse(this.content);
        // console.log('category ', category);

        // this.category = res;
        // this.category = Object.values(this.category)[0];
        // this.category = this.category.slice(0, -3) + '\n]';
        // this.category = this.category.slice(0, -3) + '}\n]';
        // data = JSON.parse(this.category);
        // console.log('data ', data);
        // console.log('data ', typeof(data));

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
        // var legend = chart.children.push(
        //   am5.Legend.new(root, {
        //     centerX: am5.p50,
        //     x: am5.p50,
        //   })
        // );

        // pushes the legend as button bellow the charts
        // legend.data.push(series);

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

        // sets the categories to be shown on the chart, each line being a category
        yAxis.data.setAll(category);

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
          tooltipText: '[bold]{openValueX}[/] \n [bold]{valueX}[/]',
          // "{category}: {openValueX.formatDate('yyyy-MM-dd HH:mm')} - {valueX.formatDate('yyyy-MM-dd HH:mm')}",
        });

        series.data.processor = am5.DataProcessor.new(root, {
          dateFields: ['fromDate', 'toDate'],
          dateFormat: 'yyyy-MM-dd HH:mm',
        });

        //  sets the content to be shown on the chart, each square represents a period(usually a month)
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

        // initiates all animations on load
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

          series.data.processor = am5.DataProcessor.new(root, {
            dateFields: ['fromDate', 'toDate'],
            dateFormat: 'yyyy-MM-dd HH:mm',
          });
          series.data.setAll(data);
        }
      });

    // clears the chart on component removal
    //   this.ngOnDestroy();
    //   {
    //     this.browserOnly(() => {
    //       if (this.root) {
    //         this.root.dispose();
    //       }
    //     });
    //   }
    // }
  }
  ngOnDestroy() {
    {
      this.browserOnly(() => {
        if (this.root) {
          this.root.dispose();
        }
      });
    }
  }
}
