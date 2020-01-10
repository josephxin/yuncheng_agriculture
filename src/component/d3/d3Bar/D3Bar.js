/*eslint-disable*/
import {select, geoStereographic, geoPath, max, scaleLinear} from "d3";
import {UiComponent, SVG_NS, createElementNS, Timer} from "@jusfoun-vis/common";
import weifangJson from './370700-weifang.json';

function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(b, c) {
  for (var d, e = 0; e < c.length; e++) d = c[e], d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d)
}

function _createClass(b, c, d) {
  return c && _defineProperties(b.prototype, c), d && _defineProperties(b, d), b
}

function _defineProperty(b, c, d) {
  return c in b ? Object.defineProperty(b, c, {value: d, enumerable: !0, configurable: !0, writable: !0}) : b[c] = d, b
}

function _inherits(a, b) {
  if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function");
  a.prototype = Object.create(b && b.prototype, {
    constructor: {
      value: a,
      writable: !0,
      configurable: !0
    }
  }), b && _setPrototypeOf(a, b)
}

function _getPrototypeOf(a) {
  return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (a) {
    return a.__proto__ || Object.getPrototypeOf(a)
  })(a)
}

function _setPrototypeOf(a, b) {
  return (_setPrototypeOf = Object.setPrototypeOf || function (a, b) {
    return a.__proto__ = b, a
  })(a, b)
}

function _assertThisInitialized(a) {
  if (void 0 === a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return a
}

function _possibleConstructorReturn(a, b) {
  return b && ("object" == typeof b || "function" == typeof b) ? b : _assertThisInitialized(a)
}

var D3Bar = function () {
  function b() {
    var c;
    _classCallCheck(this, b), _defineProperty(_assertThisInitialized(_assertThisInitialized(c = _possibleConstructorReturn(this, _getPrototypeOf(b).call(this)))), "_domElement", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_timer", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_d3Svg", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_d3MainGroup", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_projection", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_mapPath", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_barWidth", 10), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_barHeight", 80), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_scale", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_data", []), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_mapCenter", [119, 36.6]), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_mapScale", 6500), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_geoCoordMapPro", {
      安丘: [119.095605, 36.345468, 12, 15],
      昌乐: [118.935911, 36.614154, 11, 20],
      昌邑: [119.408654, 36.865393, 16, 18],
      坊子: [119.223744, 36.622047, 30, 20],
      高密: [119.721839, 36.399652, 42, 30],
      寒亭: [119.189486, 37.074213, 62, 70],
      奎文: [119.17926, 36.763532, 32, 30],
      临朐: [118.531175, 36.428896, 18, 15],
      青州: [118.487108, 36.760185, 19, 50],
      寿光: [118.828568, 37.10169, 55, 30],
      潍城: [119.033727, 36.733087, 20, 30],
      诸城: [119.358705, 36.122712, 75, 55]
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_legendData", [{
      name: "\u75C5\u5BB3",
      color: "#42bfcc"
    }, {
      name: "\u866B\u5BB3",
      color: "#c3b335"
    }]), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_invalidateDataFlag", !1), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_invalidateStyleFlag", !1);
    var d = _assertThisInitialized(_assertThisInitialized(c)), a = createElementNS(SVG_NS, "svg");
    d._domElement = a;
    var e = select(a);
    d._d3Svg = e;
    var f = e.append("g");
    return d._d3MainGroup = f, d._projection = geoStereographic(), d._mapPath = geoPath(), c
  }

  return _inherits(b, UiComponent), _createClass(b, [{
    key: "commitProperties", value: function () {
      function b() {
        select(".chartG") && select(".chartG").remove();
        var b = d.append("g").attr("class", "chartG").attr("transform", "translate(".concat(-50, ",", 10, ")")),
          f = g._projection, h = g._mapPath;
        f.center(g._mapCenter).scale(g._mapScale).translate([e / 2, a / 2]), h.projection(f), b.selectAll(".mapPathG").data(weifangJson.features).enter().append("g").attr("class", "mapPathG").append("path").attr("d", h).attr("stroke", "#48c6f2").attr("stroke-width", 0).attr("fill", "#0e4e9d");
        var i = g._projection, j = g._mapPath;
        f.center(g._mapCenter).scale(g._mapScale).translate([e / 1.95, a / 2.1]), h.projection(i), b.selectAll(".mapPathCopyG").data(weifangJson.features).enter().append("g").attr("class", "mapPathCopyG").each(function (b, k) {
          function a(a, b, d, e, g, h, i, c, j) {
            f.append("path").attr("d", "M".concat(a, " ").concat(b, " H").concat(a, " V").concat(b, " H").concat(a, " Z")).transition().delay(1e3 * k).attr("d", "M".concat(a, " ").concat(b, " H").concat(a + d, " V").concat(b - e, " H").concat(a, " Z")).attr("fill", g).attr("fill-opacity", i).attr("stroke", "#000").attr("stroke-width", 0).transition().delay(1e3 * (j - k)).attr("d", "M".concat(a, " ").concat(b, " H").concat(a, " V").concat(b, " H").concat(a, " Z")), f.append("path").attr("d", "M".concat(a, " ").concat(b, " L").concat(a + c, " ").concat(b - c, " L").concat(a + c, " ").concat(b - c, " L").concat(a, " ").concat(b, " Z")).transition().delay(1e3 * k).attr("d", "M".concat(a + d, " ").concat(b, " L").concat(a + d + c, " ").concat(b - c, " L").concat(a + d + c, " ").concat(b - e - c, " L").concat(a + d, " ").concat(b - e, " Z")).attr("fill", h).attr("fill-opacity", i).attr("stroke", "#000").attr("stroke-width", 0).transition().delay(1e3 * (j - k)).attr("d", "M".concat(a, " ").concat(b, " L").concat(a + c, " ").concat(b - c, " L").concat(a + c, " ").concat(b - c, " L").concat(a, " ").concat(b, " Z")), f.append("path").attr("d", "M".concat(a, " ").concat(b, " L").concat(a, " ").concat(b, " L").concat(a + c, " ").concat(b - c, " L").concat(a + c, " ").concat(b - c, " Z")).transition().delay(1e3 * k).attr("d", "M".concat(a, " ").concat(b - e, " L").concat(a + d, " ").concat(b - e, " L").concat(a + d + c, " ").concat(b - e - c, " L").concat(a + c, " ").concat(b - e - c, " Z")).attr("fill", h).attr("fill-opacity", i).attr("stroke", "#000").attr("stroke-width", 0).transition().delay(1e3 * (j - k)).attr("d", "M".concat(a, " ").concat(b, " L").concat(a, " ").concat(b, " L").concat(a + c, " ").concat(b - c, " L").concat(a + c, " ").concat(b - c, " Z"))
          }

          select(this).append("path").attr("d", j).attr("stroke", "#48c6f2").attr("stroke-width", 1).attr("fill", "#0e4c87").attr("opacity", .5);
          var m = b.properties.name, e = j.centroid(b), i = e[0], n = e[1];
          select(this).append("text").attr("class", "label").attr("transform", "translate(".concat(i, ",").concat(n, ")")).attr("dy", 15).attr("fill", "#fff").style('font-size','14px').text(function () {
            return m
          });
          var o = g._geoCoordMapPro, c = g._barWidth, l = g._barHeight, d = [], p = [];
          for (var q in o) d.push(o[q][2]), p.push(o[q][3]);
          max(d.concat(p));
          var h = scaleLinear().domain([0, 100]).range([0, l]);
          g._scale = h;
          var f = select(this);
          a(i, n, c, h(o[m][2]), "#61e1f4", "#42bfcc", 1, 3, 15), a(i + 15, n, c, h(o[m][3]), "#fffe24", "#c3b335", 1, 3, 15),
          select(this).on("click", function () {
            console.log("病虫害上报分析地图--当前点击区域", m);
            sessionStorage.setItem("bchAreaName",m)
          }),
          
          select(this).on("mouseover", function () {
            select(".toolTopG") && select(".toolTopG").remove();
            var a = select(this).append("g").attr("class", "toolTopG").style("pointer-events", "none");
            a.append("rect").attr("x", i).attr("y", n - 50).attr("width", "100px").attr("height", "50px").attr("fill", "#013263").attr("stroke-width", 2).attr("stroke", "#01ACAC"), a.selectAll(".numText").data([{
              name: m,
              value: ""
            }, {name: "\u75C5\u5BB3", value: o[m][2]}, {
              name: "\u866B\u5BB3",
              value: o[m][3]
            }]).enter().append("text").attr("class", "numText").text(function (a) {
              return a.name + ":" + a.value
            }).attr("x", i + 10).attr("y", function (a, b) {
              return 0 === b ? n - 35 : 1 === b ? n - 20 : n - 5
            }).attr("fill", "#fff").style('font-size','14px')
          }).on("mouseout", function () {
            select(".toolTopG").remove()
          })
        })
      }

      var g = this, d = g._d3MainGroup, e = g._width, a = g._height;
      b(), d.append("g").attr("class", "legendG").attr("transform", "translate(".concat(e - 140, ",", 10, ")")).selectAll(".legend").data(g._legendData).enter().append("g").attr("class", "legend").each(function (a, b) {
        select(this).append("rect").attr("x", b * (10 + 14 * a.name.length + 30)).attr("fill", a.color).attr("width", 10).attr("height", 5), select(this).append("text").attr("x", b * (10 + 14 * a.name.length + 30) + 10 + 5).attr("dy", 7).attr("fill", "#fff").attr("font-size", "14px").text(a.name)
      });
      try {
        g._timer = new Timer(15e3);
        var c = g._timer;
        c.on("timer", function () {
          b()
        }), c.start()
      } catch (a) {
        console.log(a)
      }
    }
  }, {
    key: "updateDisplayList", value: function () {
      var b = this, c = b._domElement.parentNode, d = b._width;
      !isFinite(d) && c && (d = c.clientWidth);
      var e = b._height;
      !isFinite(e) && c && (e = c.clientHeight), b._d3Svg.attr("width", d).attr("height", e), b._d3MainGroup
    }
  }, {
    key: "resize", value: function (a, b) {
      this.width = a, this.height = b
    }
  }, {
    key: "stopTimer", value: function () {
      this._timer && this._timer.off("timer")
    }
  }, {
    key: "domElement", get: function () {
      return this._domElement
    }
  }, {
    key: "data", set: function (a) {
      this._data = a, this._invalidateDataFlag = !0, this.invalidateProperties()
    }
  }]), b
}();
export default D3Bar;
//# sourceMappingURL=chart-library.min.js.map
