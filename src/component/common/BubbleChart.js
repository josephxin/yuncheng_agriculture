import {
	createElement,
	setStyles,
	Timer,
} from '@jusfoun-vis/common';
import * as d3 from 'd3';
import {
	ellipseForceLayout,
	getEllipsePoint,
	copyObj,
	UiComponentMixInitialize,
} from "./chart-library.min";

class BubbleChart extends UiComponentMixInitialize {
	constructor() {
		super();
		const me = this;
		me._initializeFinished();
	}

	_initWidth = 0;
	_initHeight = 0;
	_chartWidth = 0;
	_chartHeight = 0;
	_invalidateInitSizeFlag = true;
	_invalidateSizeFlag = false;
	_invalidateDataFlag = false;
	_invalidateChartStyleFlag = false;
	_invalidateRenderFlag = false;

	_smallBubbleData = d3.range(220).map(() => ({
		radius: undefined
	}));
	_bigBubbleData = [];
	_data = [];
	_chartStyle = {
		gridMargin: [10, 10, 10, 10],
		borderColor: '#00fff6',
		borderWidth: 1,
		fillColor: '#00fff6',
		smallBubbleRadiusRange: [2, 10],
		shapeAngle: 45,
		chartPositionFix: [-5, -5],
		mouseHover: false,
		bubblesBackgroundImages: [],
		textFontWeight: 'bold',
		textFontSize: 20,
		textColor: '#00fff6',
		radiusXYScale: [2.5, 2.2],
		bubbleToggleSize: [1, 1.2],
	};

	get domElement() {
		return this._domElement;
	}

	set chartStyle(o) {
		const me = this;
		me._chartStyle = copyObj(me._chartStyle, o);

		me._invalidateChartStyleFlag = true;
		me.invalidateProperties();
	}

	set smallBubbleQuantity(value) {
		const me = this;
		me._smallBubbleData = d3.range(value).map(() => ({
			radius: undefined
		}));
	}

	set data(value) {
		const me = this;

		if(!(value instanceof Array)) {
			throw new Error('data must be an array');
		}

		if(value.length === 0) return;

		me._data = [].concat(value, me._smallBubbleData);
		me._bigBubbleData = value;

		me._invalidateDataFlag = true;
		me.invalidateProperties();
	}

	commitProperties() {
		const me = this;
		me._timer.stop();

		if(me._invalidateSizeFlag) {
			me._invalidateSizeFlag = false;
			me._elementsResize();
		}

		if(me._invalidateChartStyleFlag) {
			me._invalidateChartStyleFlag = false;
			me._chartStyleUpdate();
		}

		if(me._invalidateDataFlag) {
			me._invalidateDataFlag = false;
			me._chartDataUpdate();
		}

		if(me._invalidateRenderFlag) {
			me._invalidateRenderFlag = false;
			me._renderForce && me._renderForce.restart();
		}
	}

	_chartStyleUpdate() {
		const me = this;
		const {
			gridMargin,
			bubblesBackgroundImages
		} = me._chartStyle;
		me._chartWidth = me._initWidth - gridMargin[0] - gridMargin[2];
		me._chartHeight = me._initHeight - gridMargin[1] - gridMargin[3];

		const defs = me._defs;
		defs.selectAll('pattern').remove();
		const pattern = defs.selectAll('pattern')
			.data(bubblesBackgroundImages)
			.enter()
			.append('pattern')
			.attr('id', d => d.id)
			.attr('width', 1)
			.attr('height', 1)
			.attr('patternContentUnits', 'objectBoundingBox');
		pattern.selectAll('image').remove();
		pattern
			.append('image')
			.attr('xlink:href', d => d.path)
			.attr('width', 1)
			.attr('height', 1)
	}

	_chartDataUpdate() {
		const me = this;
		const chartWidth = me._chartWidth;
		const chartHeight = me._chartHeight;
		const radiusXYScale = me._chartStyle.radiusXYScale;

		const radiusX = chartWidth / radiusXYScale[0];
		const radiusY = chartHeight / radiusXYScale[1];
		me._getEllipsePoint = getEllipsePoint(radiusX, radiusY);

		let force = me._force(me._data)
			.force('center', d3.forceCenter(chartWidth / 2, chartHeight / 2))
			.force('ellipse', me._ellipseForceLayout.call(me))
			.force('collision', d3.forceCollide(d => d.radius * 1.05))
			.on('tick', me._createChart.bind(me))
			.on('end', me._toggle.bind(me));
		force.stop();
		me._renderForce = force;
	}

	_toggle() {
		const me = this;
		const circles = me._circles;
		let bigBubbleData = me._bigBubbleData;
		const bubbleToggleSize = me._chartStyle.bubbleToggleSize;
		const toggleRange = bubbleToggleSize.reduce((c, n) => n - c, 0);
		me._timer.on('timer', () => {
			let scaleArr = [];
			bigBubbleData.forEach(() => {
				scaleArr.push(Math.random() * toggleRange + bubbleToggleSize[0]);
			});
			d3.shuffle(scaleArr);
			circles.each(function(d, i) {
				if(d.name) {
					let d3This = d3.select(this);
					let thisScale = d3This.attr('transform');
					d3This.attr('transform-origin', `${d.x} ${d.y}`);
					if(thisScale === 'scale(1,1)' || thisScale === null) {
						d3This
							.attr('transform', `scale(1)`)
							.transition()
							.duration(700)
							.delay(i * 50)
							.attr('transform', `scale(${scaleArr[i]})`);
					} else {
						d3This
							.attr('transform', `${thisScale}`)
							.transition()
							.duration(700)
							.delay(i * 50)
							.attr('transform', `scale(1)`);
					}
				}
			})
		});
		me._timer.start();
	}

	// tick更新的方法
	_createChart() {
		const me = this;
		const chartStyle = me._chartStyle;
		const {
			borderColor,
			borderWidth,
			fillColor,
			smallBubbleRadiusRange,
			chartPositionFix,
			textColor,
			textFontSize,
			textFontWeight,
			bubblesBackgroundImages
		} = chartStyle;

		let [smallRadiusMin] = smallBubbleRadiusRange;

		const fillCondition = d => d.fillId && bubblesBackgroundImages.length > 0;

		let circles = me._graphGroup
			.attr('transform', `translate(${chartPositionFix[0]} ${chartPositionFix[1]})`)
			.selectAll('circle')
			.data(me._data);
		circles.enter()
			.append('circle')
			.merge(circles)
			.attr('fill', d => {
				if(d.name) {
					return fillCondition(d) ? `url(#${d.fillId})` : 'transparent';
				} else {
					if(d.radius <= (smallRadiusMin * 1.4)) {
						return fillColor;
					} else {
						return 'transparent';
					}
				}
			})
			.style('stroke-width', borderWidth)
			.style('stroke', d => d.name && fillCondition(d) ? 'none' : borderColor)
			.style('cursor', d => d.name ? 'pointer' : 'auto')
			.attr('r', d => d.radius)
			.attr('cx', d => d.x)
			.attr('cy', d => d.y);
		me._eventProxy(circles);
		circles.exit().remove();
		me._circles = me._graphGroup.selectAll('circle');

		// 文字
		let text = me._textGroup
			.attr('transform', `translate(${chartPositionFix[0]} ${chartPositionFix[1]})`)
			.selectAll('text')
			.data(me._bigBubbleData);

		text.enter()
			.append('text')
			.merge(text)
			.attr('x', d => d.x)
			.attr('y', d => d.num ? d.y+10 : d.y)
			.attr('dy', '0.35em')
			.style('text-anchor', 'middle')
			.style('fill', textColor)
			.style('cursor', 'pointer')
			.style('font-weight', textFontWeight)
			.style('font-size', d => d.radius > 60 ? textFontSize * 0.8 : textFontSize * 0.8)
			.text(d => d.name);
		me._eventProxy(text);
		text.exit().remove();
		
		// 文字
		let text2 = me._textGroup2
			.attr('transform', `translate(${chartPositionFix[0]} ${chartPositionFix[1]})`)
			.selectAll('text')
			.data(me._bigBubbleData);
		text2.enter()
			.append('text')
			.merge(text2)
			.attr('x', d => d.x)
			.attr('y', d => d.num ? d.y-10 : d.y)
			.attr('dy', '0.35em')
			.style('text-anchor', 'middle')
			.style('fill', '#fff')
			.style('cursor', 'pointer')
			.style('font-weight', textFontWeight)
			.style('font-size', d => d.radius > 60 ? textFontSize * 0.8 : textFontSize * 0.8)
			.text(d => d.num ? d.num+'km' : '');
		me._eventProxy(text2);
		text2.exit().remove();
	}

	_eventProxy(d3Selection) {
		const me = this;
		d3Selection
			.on('mouseover', me._mouseOverHandler.bind(me))
			.on('mouseout', me._mouseOutHandler.bind(me))
			.on('click', (d, i) => {
				//console.log(d, i, this);
				if(d.name && me._mouseClickHandler) {
					me._mouseClickHandler({
						name: d.name,
						index: i,
						x: d.x,
						y: d.y
					});
				}
			});
	}

	_mouseOverHandler(d, i) {
		const me = this;
		//console.log(me._chartStyle.mouseHover);
		if(me._chartStyle.mouseHover === false) return;
		me._timer.stop();
		if(d.name) {
			me._data[i].radius = me._data[i].radius * 1.2;
			me._reRender();
		}
	}

	// 鼠标移出
	_mouseOutHandler(d, i) {
		const me = this;
		if(me._chartStyle.mouseHover === false) return;
		me._timer.start();
		if(d.name) {
			me._data[i].radius = me._data[i].radius / 1.2;
			me._reRender();
			me._renderForce.stop();
		}
	}

	_ellipseForceLayout() {
		const me = this;
		const chartStyle = me._chartStyle;
		let getPoint = me._getEllipsePoint;
		let nodes = me._data;
		let bigBubbleData = me._bigBubbleData;
		ellipseForceLayout(chartStyle, getPoint, bigBubbleData, nodes)
	}

	_elementsResize() {
		const me = this;
		const width = me._width;
		const height = me._height;
		setStyles(me._domElement, {
			width: `${width}px`,
			height: `${height}px`,
		});

		if(me._invalidateInitSizeFlag) {
			me._invalidateInitSizeFlag = false;
			me._initWidth = width;
			me._initHeight = height;
			me._chartStyleUpdate();
		}

		let scale = 1;
		if(me._initWidth && me._initHeight) {
			scale = width / me._initWidth;
		}
		let mainGroupTranslate = me._mainGroup.attr('transform');
		me._d3Svg.attr('width', width).attr('height', height);
		me._mainGroup.attr('transform', `${mainGroupTranslate} scale(${scale})`);
	}

	initialize() {
		const me = this;
		const domElement = createElement('div');
		const d3Svg = d3.select(domElement).append('svg');
		const mainGroup = d3Svg.append('g');

		setStyles(domElement, {
			position: 'absolute',
		});

		me._domElement = domElement;
		me._d3Svg = d3Svg;
		me._mainGroup = mainGroup;
		me._defs = mainGroup.append('defs');
		me._textGroup = mainGroup.append('g');
		me._textGroup2 = mainGroup.append('g');
		me._graphGroup = mainGroup.append('g');
	}

	_initializeFinished() {
		const me = this;
		let {
			gridMargin,
		} = me._chartStyle;
		me._force = d3.forceSimulation;
		me._mainGroup.attr('transform', `translate(${gridMargin[0]},${gridMargin[3]})`);
		me._timer = new Timer(1500);
	}

	_reRender() {
		const me = this;
		me._invalidateRenderFlag = true;
		me._invalidateDataFlag = true;
		me._renderForce.stop();
		me.invalidateProperties();
	}

	_render() {
		const me = this;
		me._invalidateRenderFlag = true;
		me.invalidateProperties();
	}

	resize(w, h) {
		const me = this;
		me._width = w;
		me._height = h;

		me._invalidateSizeFlag = true;
		me.invalidateProperties();
	}

	render(isForceReRender) {
		const me = this;
		if(isForceReRender) {
			me._reRender();
		} else {
			me._render();
		}
	}

	click(listener) {
		const me = this;
		if(typeof listener !== 'function') {
			throw new Error('listener must be a function');
		}
		me._mouseClickHandler = listener;
	}

	dispose() {
		const me = this;
		me._timer.off('timer');
		me._d3Svg.remove();
	}
}

export default BubbleChart;