function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}

var Geo = function g(j) {
  _classCallCheck(this, g);
  var e = j.mapLayoutSize || "85%", k = j.mapAspectScale || "0.75",
    a = j.center && 2 === j.center.length ? j.center : ["50%", "51%"], l = j.mapType || "weifang",
    o = j.area1Color || "rgba(12,255,255,0.5)", i = j.area1BorderColor || "#02748d", n = j.area1BorderWidth || 1,
    q = j.geoSilent || !1, d = j.mapFontColor || "#cfe6ff", c = j.mapLabelFontSize || 18,
    h = j.area2BorderColor || "#13fafc", f = j.area2BorderHoverColor || "#03e289", m = j.area2Color || "#124ea9",
    p = j.area2BorderWidth || 4, r = j.colorStart || "#ffae01", s = j.colorEnd || "#e9680f";
  this.geo = -1 < l.indexOf("china") ? [{
    show: !0,
    layoutCenter: a.map(function (a, b) {
      return 1 === b ? parseFloat(a) + 3 + "%" : a
    }),
    layoutSize: e,
    aspectScale: k,
    roam: !1,
    regions: [{name: "\u5357\u6D77\u8BF8\u5C9B", value: 0, itemStyle: {normal: {opacity: 0, label: {show: !1}}}}],
    map: l,
    itemStyle: {normal: {areaColor: o, borderColor: i, borderWidth: n}, emphasis: {areaColor: o}},
    silent: !0
  }, {
    show: !0,
    layoutCenter: a,
    layoutSize: e,
    aspectScale: k,
    roam: !1,
    map: l,
    regions: [{
      name: "\u5357\u6D77\u8BF8\u5C9B",
      value: 0,
      label: {normal: {show: !1}, emphasis: {show: !1}},
      itemStyle: {
        normal: {opacity: 1, color: "#124ea9", borderColor: "#3fadee", borderWidth: 1},
        emphasis: {color: "#124ea9", borderColor: "#3fadee", borderWidth: 1}
      }
    }],
    label: {
      normal: {
        show: !0,
        color: d,
        fontWeight: "bold",
        fontSize: c,
        padding: 3,
        textShadowColor: "#3e77b5",
        textShadowBlur: 2,
        textShadowOffsetY: 2
      }, emphasis: {show: !0, color: "#cfe6ff", fontSize: c}
    },
    itemStyle: {
      normal: {color: m, borderColor: h, borderWidth: p},
      emphasis: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{offset: 0, color: r}, {offset: 1, color: s}],
          globalCoord: !1
        }, borderWidth: p + 1, borderColor: f
      }
    },
    silent: q
  }] : [{
    show: !0,
    layoutCenter: a.map(function (a, b) {
      return 1 === b ? parseFloat(a) + 2 + "%" : a
    }),
    layoutSize: e,
    aspectScale: k,
    roam: !1,
    map: l,
    itemStyle: {normal: {areaColor: o, borderColor: i, borderWidth: n}, emphasis: {areaColor: o}},
    silent: !0
  }, {
    show: !0,
    layoutCenter: a,
    layoutSize: e,
    aspectScale: k,
    roam: !1,
    map: l,
    label: {
      normal: {
        show: !0,
        color: d,
        fontWeight: "bold",
        fontSize: c,
        padding: 3,
        textShadowColor: "#3e77b5",
        textShadowBlur: 2,
        textShadowOffsetY: 2
      }, emphasis: {show: !0, color: "#cfe6ff", fontSize: c}
    },
    itemStyle: {
      normal: {color: m, borderColor: h, borderWidth: p},
      emphasis: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{offset: 0, color: r}, {offset: 1, color: s}],
          globalCoord: !1
        }, borderWidth: p, borderColor: f
      }
    },
    silent: q
  }]
};
export default Geo;
//# sourceMappingURL=mapgeo.min.js.map
