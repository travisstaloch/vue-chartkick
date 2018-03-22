/*
 * Vue Chartkick
 * Create beautiful JavaScript charts with one line of Vue
 * https://github.com/ankane/vue-chartkick
 * v0.2.1
 * @license MIT
 */

let chartId = 1

let createComponent = function(Vue, tagName, chartType) {
  let chartProps = [
    'colors',
    'curve',
    'decimal',
    'discrete',
    'donut',
    'download',
    'label',
    'legend',
    'library',
    'max',
    'messages',
    'min',
    'points',
    'prefix',
    'refresh',
    'stacked',
    'suffix',
    'thousands',
    'title',
    'xtitle',
    'xtype',
    'ytitle'
  ]
  Vue.component(tagName, {
    props: ['data', 'id', 'width', 'height'].concat(chartProps),
    render: function(createElement) {
      return createElement(
        'div',
        {
          attrs: {
            id: this.chartId
          },
          style: this.chartStyle
        },
        ['Loading...']
      )
    },
    data: function() {
      return {
        chartId: null
      }
    },
    computed: {
      chartStyle: function() {
        // hack to watch data and options
        this.data
        this.chartOptions

        return {
          height: this.height || '300px',
          lineHeight: this.height || '300px',
          width: this.width || '100%',
          textAlign: 'center',
          color: '#999',
          fontSize: '14px',
          fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif"
        }
      },
      chartOptions: function() {
        let options = {}
        let props = chartProps
        for (let i = 0; i < props.length; i++) {
          let prop = props[i]
          if (this[prop] !== undefined) {
            options[prop] = this[prop]
          }
        }
        return options
      }
    },
    created: function() {
      this.chartId = this.chartId || this.id || 'chart-' + chartId++
    },
    mounted: function() {
      this.chart = new chartType(this.chartId, this.data, this.chartOptions)
    },
    updated: function() {
      this.chart.updateData(this.data, this.chartOptions)
    }
  })
}

const VueChartkick = {
  version: '0.2.1',
  install: function(Vue, options) {
    let Chartkick = options.Chartkick
    createComponent(Vue, 'line-chart', Chartkick.LineChart)
    createComponent(Vue, 'pie-chart', Chartkick.PieChart)
    createComponent(Vue, 'column-chart', Chartkick.ColumnChart)
    createComponent(Vue, 'bar-chart', Chartkick.BarChart)
    createComponent(Vue, 'area-chart', Chartkick.AreaChart)
    createComponent(Vue, 'scatter-chart', Chartkick.ScatterChart)
    createComponent(Vue, 'geo-chart', Chartkick.GeoChart)
    createComponent(Vue, 'timeline', Chartkick.Timeline)
    createComponent(Vue, 'candlestick-chart', Chartkick.CandlestickChart)
    createComponent(Vue, 'combo-chart', Chartkick.ComboChart)
  }
}

// in browser
if (typeof window !== 'undefined' && window.Vue && window.Chartkick) {
  window.Vue.use(VueChartkick, { Chartkick: window.Chartkick })
}

export default VueChartkick
