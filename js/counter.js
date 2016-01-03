function Counter(){
	this.flag=1;
	this.counterElement =  document.getElementsByClassName('counter-num');
	this.counterElement;
	this.totLength;
	this.count = [];
	this.finalNumber = [];
	var that = this;
	this.init = function(){
		that.totLength = that.counterElement.length;
		for(var i = 0 ; i<that.counterElement.length;i++){
			that.count[i]=0;
			that.finalNumber[i] = that.counterElement[i].innerHTML;
		}
		window.onscroll = function(){
		that.counterNumbers();
		}
	this.counterNumbers = function(){
		var intervalId;
		if(window.scrollY > 607 && that.flag!=0){
			intervalId = setInterval(function(){
				for (var i = 0; i < that.counterElement.length; i++) {
					if (that.count[i] <= that.finalNumber[i]) {
						that.counterElement[i].innerHTML = that.count[i]++;
					}
				}
				for(var i=0;i<that.counterElement.length;i++){
					if(Math.max(that.count) == that.finalNumber[i]){
						that.flag=0;
						clearInterval(intervalId);
					}
				}
			},500);
		}
	}
	}
}
var counter = new Counter();
counter.init();
