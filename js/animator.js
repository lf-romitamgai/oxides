function Animator(element) {
	this.el = element;
	var that = this;
	var intervalId;
	var cssProp;
	element.style[cssProp] = 0 + 'px';
	this.animate = function(cssProperty, value, duration) {
		var style = window.getComputedStyle(element);
		var initial = style.getPropertyValue(cssProperty);
		initial = parseInt(initial);
		var step = value / (duration / 50);
		var counter = 0;
		cssProp = cssProperty;
		intervalId = setInterval(function() {
			counter++;
			var current = step * counter;
			element.style[cssProperty] = current+initial + 'px';
			if (counter >= duration / 50){
				clearInterval(intervalId);
				that.finish();
			}
		}, 50);
	}
	this.finish = function(val){
		clearInterval(intervalId);
		var num = parseInt(parseInt(element.style[cssProp]) / 1280);
		element.style[cssProp] = (num) * 1280 + val + 'px';
	}
	this.startPos = function(){
		that.finish(0);
		element.style[cssProp] = 0 + 'px';		
	}
	
	
}

