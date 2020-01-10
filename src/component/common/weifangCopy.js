/*eslint-disable*/
import {range, forceCenter, forceCollide, shuffle, select, forceSimulation} from "d3";
import {UiComponent, createElement, setStyles, Timer} from "@jusfoun-vis/common";
import {
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Scene,
  Mesh,
  MeshPhongMaterial,
  LineSegments,
  MeshBasicMaterial
} from "three";
import {OBJLoader} from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";

function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c)
}

function _createClass(a, b, c) {
  return b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
}

function _defineProperty(a, b, c) {
  return b in a ? Object.defineProperty(a, b, {value: c, enumerable: !0, configurable: !0, writable: !0}) : a[b] = c, a
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

function _slicedToArray(a, b) {
  return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _nonIterableRest()
}

function _arrayWithHoles(a) {
  if (Array.isArray(a)) return a
}

function _iterableToArrayLimit(b, c) {
  var d, e = [], f = !0, g = !1;
  try {
    for (var h, i = b[Symbol.iterator](); !(f = (h = i.next()).done) && (e.push(h.value), !c || e.length !== c); f = !0) ;
  } catch (a) {
    g = !0, d = a
  } finally {
    try {
      f || null == i.return || i.return()
    } finally {
      if (g) throw d
    }
  }
  return e
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance")
}

var PI = Math.PI, DP = 2 * PI, UA = PI / 180, AU = 180 / PI, UiComponentMixInitialize = function () {
  function a() {
    var b;
    return _classCallCheck(this, a), _assertThisInitialized(_assertThisInitialized(b = _possibleConstructorReturn(this, _getPrototypeOf(a).call(this)))).initialize(), b
  }

  return _inherits(a, UiComponent), _createClass(a, [{
    key: "initialize", value: function () {
    }
  }]), a
}(), objKeys = Object.keys, copyObj = function (b, e, f) {
  if (void 0 === e || 0 === objKeys(e).length) return b;
  if (void 0 === b) throw new Error("Target is undefined!");
  var g = objKeys(e), h = g.length, a = Math.ceil(h / 2);
  a = 1 > a ? 1 : a;
  for (var i = 0, j = h - 1; i <= a; i++, j--) {
    var k = g[i], l = g[j], c = e[k], d = e[l];
    ("boolean" == typeof c || c) && valuesExchange(b, k, c, f), ("boolean" == typeof d || d) && valuesExchange(b, l, d, f)
  }
  return b
};

function valuesExchange(a, b, c, d) {
  c instanceof Array ? a[b] = c : "string" != typeof c && 0 < objKeys(c).length && d ? (a[b] = void 0 === a[b] ? {} : a[b], copyObj(a[b], c, d)) : a[b] = c
}

var getEllipsePoint = function (a, b) {
  return function (c) {
    return {x: a + a * Math.cos(c), y: b + b * Math.sin(c), radian: c, angle: c * AU}
  }
}, BubbleChart = function () {
  function a() {
    var b;
    return _classCallCheck(this, a), _defineProperty(_assertThisInitialized(_assertThisInitialized(b = _possibleConstructorReturn(this, _getPrototypeOf(a).call(this)))), "_initWidth", 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_initHeight", 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_chartWidth", 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_chartHeight", 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_invalidateInitSizeFlag", !0), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_invalidateSizeFlag", !1), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_invalidateDataFlag", !1), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_invalidateChartStyleFlag", !1), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_invalidateRenderFlag", !1), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_smallBubbleData", range(220).map(function () {
      return {radius: void 0}
    })), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_bigBubbleData", []), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_data", []), _defineProperty(_assertThisInitialized(_assertThisInitialized(b)), "_chartStyle", {
      gridMargin: [10, 10, 10, 10],
      borderColor: "#00fff6",
      borderWidth: 1,
      fillColor: "#00fff6",
      smallBubbleRadiusRange: [2, 10],
      shapeAngle: 45,
      chartPositionFix: [-5, -5],
      mouseHover: !1,
      bubblesBackgroundImages: [],
      textFontWeight: "bold",
      textFontSize: 20,
      textColor: "#00fff6",
      radiusXYScale: [2.5, 2.2],
      bubbleToggleSize: [1, 1.2]
    }), _assertThisInitialized(_assertThisInitialized(b))._initializeFinished(), b
  }

  return _inherits(a, UiComponentMixInitialize), _createClass(a, [{
    key: "commitProperties", value: function () {
      var a = this;
      a._timer.stop(), a._invalidateSizeFlag && (a._invalidateSizeFlag = !1, a._elementsResize()), a._invalidateChartStyleFlag && (a._invalidateChartStyleFlag = !1, a._chartStyleUpdate()), a._invalidateDataFlag && (a._invalidateDataFlag = !1, a._chartDataUpdate()), a._invalidateRenderFlag && (a._invalidateRenderFlag = !1, a._renderForce && a._renderForce.restart())
    }
  }, {
    key: "_chartStyleUpdate", value: function () {
      var b = this, c = b._chartStyle, d = c.gridMargin, e = c.bubblesBackgroundImages;
      b._chartWidth = b._initWidth - d[0] - d[2], b._chartHeight = b._initHeight - d[1] - d[3];
      var f = b._defs;
      f.selectAll("pattern").remove();
      var a = f.selectAll("pattern").data(e).enter().append("pattern").attr("id", function (a) {
        return a.id
      }).attr("width", 1).attr("height", 1).attr("patternContentUnits", "objectBoundingBox");
      a.selectAll("image").remove(), a.append("image").attr("xlink:href", function (a) {
        return a.path
      }).attr("width", 1).attr("height", 1)
    }
  }, {
    key: "_chartDataUpdate", value: function () {
      var b = this, c = b._chartWidth, d = b._chartHeight, e = b._chartStyle.radiusXYScale, f = c / e[0], a = d / e[1];
      b._getEllipsePoint = getEllipsePoint(f, a);
      var g = b._force(b._data).force("center", forceCenter(c / 2, d / 2)).force("ellipse", b._ellipseForceLayout.call(b)).force("collision", forceCollide(function (a) {
        return 1.05 * a.radius
      })).on("tick", b._createBubbles.bind(b)).on("end", b._shapeToggle.bind(b));
      g.stop(), b._renderForce = g
    }
  }, {
    key: "_shapeToggle", value: function () {
      var b = this, c = b._circles, d = b._bigBubbleData, f = b._chartStyle.bubbleToggleSize,
        g = f.reduce(function (a, b) {
          return b - a
        }, 0);
      b._timer.on("timer", function () {
        var b = [];
        d.forEach(function () {
          b.push(Math.random() * g + f[0])
        }), shuffle(b), c.each(function (c, d) {
          if (c.name) {
            var e = select(this), f = e.attr("transform");
            e.attr("transform-origin", "".concat(c.x, " ").concat(c.y)), "scale(1,1)" === f || null === f ? e.attr("transform", "scale(1)").transition().duration(700).delay(50 * d).attr("transform", "scale(".concat(b[d], ")")) : e.attr("transform", "".concat(f)).transition().duration(700).delay(50 * d).attr("transform", "scale(1)")
          }
        })
      }), b._timer.start()
    }
  }, {
    key: "_createBubbles", value: function () {
      var b = this, e = b._chartStyle, g = e.borderColor, i = e.borderWidth, j = e.fillColor,
        a = e.smallBubbleRadiusRange, k = e.chartPositionFix, m = e.textColor, n = e.textFontSize, l = e.textFontWeight,
        c = e.bubblesBackgroundImages, d = _slicedToArray(a, 1)[0], o = function (a) {
          return a.fillId && 0 < c.length
        },
        h = b._graphGroup.attr("transform", "translate(".concat(k[0], " ").concat(k[1], ")")).selectAll("circle").data(b._data);
      h.enter().append("circle").merge(h).attr("fill", function (a) {
        return a.name ? o(a) ? "url(#".concat(a.fillId, ")") : "transparent" : a.radius <= 1.4 * d ? j : "transparent"
      }).style("stroke-width", i).style("stroke", function (a) {
        return a.name && o(a) ? "none" : g
      }).style("cursor", function (a) {
        return a.name ? "pointer" : "auto"
      }).attr("r", function (a) {
        return a.radius
      }).attr("cx", function (a) {
        return a.x
      }).attr("cy", function (a) {
        return a.y
      }), b._selectionEventHandler(h), h.exit().remove(), b._circles = b._graphGroup.selectAll("circle");
      var p = b._textGroup.attr("transform", "translate(".concat(k[0], " ").concat(k[1], ")")).selectAll("text").data(b._bigBubbleData);
      p.enter().append("text").merge(p).attr("x", function (a) {
        return a.x
      }).attr("y", function (a) {
        return a.y
      }).attr("dy", "0.35em").style("text-anchor", "middle").style("fill", m).style("cursor", "pointer").style("font-weight", l).style("font-size", function (a) {
        return 60 < a.radius ? 1.2 * n : .8 * n
      }).text(function (a) {
        return a.name
      }), b._selectionEventHandler(p), p.exit().remove()
    }
  }, {
    key: "_selectionEventHandler", value: function (a) {
      var b = this;
      a.on("mouseover", b._mouseOverHandler.bind(b)).on("mouseout", b._mouseOutHandler.bind(b)).on("click", function (a, c) {
        a.name && b._mouseClickHandler && b._mouseClickHandler({name: a.name, index: c, x: a.x, y: a.y})
      })
    }
  }, {
    key: "_mouseOverHandler", value: function (a, b) {
      var c = this;
      !1 !== c._chartStyle.mouseHover && (c._timer.stop(), a.name && (c._data[b].radius = 1.2 * c._data[b].radius, c._reRender()))
    }
  }, {
    key: "_mouseOutHandler", value: function (a, b) {
      var c = this;
      !1 !== c._chartStyle.mouseHover && (c._timer.start(), a.name && (c._data[b].radius /= 1.2, c._reRender()))
    }
  }, {
    key: "_ellipseForceLayout", value: function () {
      var j = this._chartStyle, e = this._getEllipsePoint, k = this._data, i = this._bigBubbleData, q = k.length,
        a = DP / q, n = j.smallBubbleRadiusRange, o = j.shapeAngle * UA;
      if (0 < i.length) for (var r = 0, s = o / 4; 4 > r; r++) {
        var c = i[r], d = i[r + 4], t = i[r + 8], h = i[r + 12];
        if (c) {
          var u = s * r;
          c.angle = u
        }
        if (d) {
          var f = PI - o + s * r;
          d.angle = f
        }
        if (t) {
          var p = PI + s * r;
          t.angle = p
        }
        if (h) {
          var x = DP - o + s * r;
          h.angle = x
        }
      }
      for (var g, y = _slicedToArray(n, 1)[0], m = n.reduce(function (a, b) {
        return b - a
      }, 0), v = 0; v < q; v++) {
        g = k[v], g.radius = g.radius ? g.radius : Math.random() * m + y;
        var A = a * v, B = g.angle ? g.angle : A, D = 0 == v % 2 || 0 == v % 3 || 0 == v % 4 || 0 == v % 5;
        (B > o && B <= PI / 2 && D || B >= PI + o && B < 3 * PI / 2 && D) && (B = a * (v - 25)), (B > PI / 2 && B < PI - o && D || B > 3 * PI / 2 && B < DP - o && D) && (B = a * (v + 25));
        var E = e(B), C = E.x, F = E.y;
        g.x = C, g.y = F
      }
    }
  }, {
    key: "_elementsResize", value: function () {
      var b = this, c = b._width, d = b._height;
      setStyles(b._domElement, {
        width: "".concat(c, "px"),
        height: "".concat(d, "px")
      }), b._invalidateInitSizeFlag && (b._invalidateInitSizeFlag = !1, b._initWidth = c, b._initHeight = d, b._chartStyleUpdate());
      var e = 1;
      b._initWidth && b._initHeight && (e = c / b._initWidth);
      var f = b._mainGroup.attr("transform");
      b._d3Svg.attr("width", c).attr("height", d), b._mainGroup.attr("transform", "".concat(f, " scale(").concat(e, ")"))
    }
  }, {
    key: "initialize", value: function () {
      var a = this, b = createElement("div"), c = select(b).append("svg"), d = c.append("g");
      setStyles(b, {position: "absolute"}), a._domElement = b, a._d3Svg = c, a._mainGroup = d, a._defs = d.append("defs"), a._textGroup = d.append("g"), a._graphGroup = d.append("g")
    }
  }, {
    key: "_initializeFinished", value: function () {
      var a = this._chartStyle.gridMargin;
      this._force = forceSimulation, this._mainGroup.attr("transform", "translate(".concat(a[0], ",").concat(a[3], ")")), this._timer = new Timer(1500)
    }
  }, {
    key: "_reRender", value: function () {
      this._invalidateRenderFlag = !0, this._invalidateDataFlag = !0, this._renderForce.stop(), this.invalidateProperties()
    }
  }, {
    key: "_render", value: function () {
      this._invalidateRenderFlag = !0, this.invalidateProperties()
    }
  }, {
    key: "resize", value: function (a, b) {
      this._width = a, this._height = b, this._invalidateSizeFlag = !0, this.invalidateProperties()
    }
  }, {
    key: "render", value: function (a) {
      a ? this._reRender() : this._render()
    }
  }, {
    key: "click", value: function (a) {
      if ("function" != typeof a) throw new Error("listener must be a function");
      this._mouseClickHandler = a
    }
  }, {
    key: "dispose", value: function () {
      this._timer.off("timer"), this._d3Svg.remove()
    }
  }, {
    key: "domElement", get: function () {
      return this._domElement
    }
  }, {
    key: "chartStyle", set: function (a) {
      this._chartStyle = copyObj(this._chartStyle, a), this._invalidateChartStyleFlag = !0, this.invalidateProperties()
    }
  }, {
    key: "smallBubbleQuantity", set: function (a) {
      this._smallBubbleData = range(a).map(function () {
        return {radius: void 0}
      })
    }
  }, {
    key: "data", set: function (a) {
      var b = this;
      if (!(a instanceof Array)) throw new Error("data must be an array");
      0 !== a.length && (b._data = [].concat(a, b._smallBubbleData), b._bigBubbleData = a, b._invalidateDataFlag = !0, b.invalidateProperties())
    }
  }]), a
}(), WeifangFloatingMountain = function () {
  function a(b) {
    var c;
    return _classCallCheck(this, a), _defineProperty(_assertThisInitialized(_assertThisInitialized(c = _possibleConstructorReturn(this, _getPrototypeOf(a).call(this, b)))), "w", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "h", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(c)), "_isUpdateContainerStyle", !1), c.domElement = createElement("div"), c
  }

  return _inherits(a, UiComponent), _createClass(a, [{
    key: "updateContainerStyle", value: function () {
      this._isUpdateContainerStyle = !0, this.invalidateProperties()
    }
  }, {
    key: "commitProperties", value: function () {
      var b = this;
      if (b._isUpdateContainerStyle) {
        b._isUpdateContainerStyle = !1;
        var d = b.domElement, e = b.w, f = b.h;
        setStyles(d, {width: e + "px", height: f + "px"});
        var g = new WebGLRenderer({antialias: !0, alpha: !0});
        g.setSize(e, f), g.setClearColor(16777215, 0), d.appendChild(g.domElement);
        var a = new PerspectiveCamera(78, b.width / b.height, .1, 1e4);
        a.position.set(100, 150, 2e3);
        var h = new AmbientLight({color: 4210752}), i = new DirectionalLight(16777215, 1);
        i.position.set(100, -1e3, -50).normalize(), i.castShadow = !0;
        var j = new PointLight(13421772, 1, 2e3);
        j.position.set(0, 500, 500), j.intensity = 2, j.distance = 200, j.castShadow = !0;
        var k = new Scene;
        k.add(h), k.add(i), setTimeout(function () {
          g.render(k, a)
        }, 1e3), new OrbitControls(a, g.domElement), new OBJLoader().load("/static/module/weifang.obj", function (a) {
          a.traverse(function (a) {
            a instanceof Mesh ? a.material = new MeshPhongMaterial({
              color: "#1150a0",
              opacity: 1
            }) : a instanceof LineSegments && (a.material = new MeshBasicMaterial({color: "#1150a0"}))
          }), a.scale.set(.19, .8, .16), k.add(a)
        }), k.rotation.x = .5, k.rotation.y = .2
      }
    }
  }, {
    key: "width", get: function () {
      return this.w
    }, set: function (a) {
      this.w = a, this.updateContainerStyle()
    }
  }, {
    key: "height", get: function () {
      return this.h
    }, set: function (a) {
      this.h = a, this.updateContainerStyle()
    }
  }]), a
}();
export {BubbleChart, WeifangFloatingMountain};
//# sourceMappingURL=chart-library.min.js.map
