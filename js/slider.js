function Slider(){
	var sliderDivision
	var animator;
	var sliderWidth;
	var count = 0, intervalId, left, right, previousSlide, nextSlide, img = [], imageSelect,txtImageWrapper;
	
	this.init = function(){
		sliderDivision = document.getElementsByClassName('long-wrapper')[0];
		previousSlide = document.getElementsByClassName('slider-prev')[0];
		txtImageWrapper = document.getElementsByClassName('slider-text-combo')[0];
		nextSlide = document.getElementsByClassName('slider-next')[0];
		imageSelect = document.getElementsByClassName('bullets')[0];
		sliderDivision.style.marginLeft = 0 + 'px';
		slider = sliderDivision.children;
		left = document.getElementsByClassName('nav-left')[0];
		right = document.getElementsByClassName('nav-right')[0];
		getSliderWidth();
		animateNavigation();
		animator = new Animator(sliderDivision);
		animateSlide();
	}
	var getSliderWidth = function(){
		var style = window.getComputedStyle(txtImageWrapper);
		var initial = style.getPropertyValue('width');
		sliderWidth = parseInt(initial);
	}
	var animateSlide = function(){
		left.addEventListener('click', moveSlideLeft);
		right.addEventListener('click', moveSlideRight);
		if(count == slider.length){
			animator.animate('margin-left', (count - 1) * sliderWidth, 1000);
			count = 1;
		}
		else if(count == 0)
			count++;
		else{
			animator.animate('margin-left', -sliderWidth, 1000);
			count++;
		}
		updateSlideNumber();
		intervalId = setTimeout(animateSlide, 2000);
	}
	var moveSlideLeft = function(){
		if(count == 1 && parseInt(sliderDivision.style.marginLeft) % sliderWidth == 0){
			clearTimeout(intervalId);
			count = slider.length;
			sliderDivision.style.marginLeft =  - (slider.length - 1) * sliderWidth + 'px';
			intervalId = setTimeout(animateSlide, 2000);
		}
		else if(parseInt(sliderDivision.style.marginLeft) % sliderWidth != 0){
			count = - parseInt(parseInt(sliderDivision.style.marginLeft) / sliderWidth) + 1;
			console.log(count);
			clearTimeout(intervalId);
			animator.finish(0);
			intervalId = setTimeout(animateSlide, 2000);
		}
		else{
			if(count > 1)
			count--;
			clicked(sliderWidth);
		}
		updateSlideNumber();
	}
	
	var moveSlideRight = function(){
		if(count == slider.length && parseInt(sliderDivision.style.marginLeft)%sliderWidth == 0){
			clearTimeout(intervalId);
			count = 1;
			animator.startPos();
			intervalId = setTimeout(animateSlide, 2000);
		} 
		else if(parseInt(sliderDivision.style.marginLeft)%sliderWidth != 0){
			clearTimeout(intervalId);
			console.log(parseInt(sliderDivision.style.marginLeft));
			animator.finish(-sliderWidth);
			intervalId = setTimeout(animateSlide, 2000);
		}
		else{
			count++;
			clicked(-sliderWidth);
		}
		updateSlideNumber();
	}
	
	var clicked = function(marginValue){
		clearTimeout(intervalId);
		if(marginValue != 0){
			animator.animate('margin-left', marginValue, 1000);
		}
		intervalId = setTimeout(animateSlide, 2000);
	}
	
	var updateSlideNumber = function(){
		var prev, next;
		if (count ==1)
			prev = 5;
		else
			prev = count - 1;
		if(count == 5)
			next = 1;
		else 
			next = count + 1;
		previousSlide.innerHTML = prev + ' / ' + slider.length;
		nextSlide.innerHTML = next + ' / ' + slider.length;
		for(i=1;i<=slider.length;i++){
		img[i].style.background = 'url(\'../oxides/images/bullet-inactive.png\')  50% 50% no-repeat';
	}
		img[count].style.background = 'url(\'../oxides/images/bullet-active.png\')  50% 50% no-repeat';
	}
	var animateNavigation = function(){
		for(i=1;i<=slider.length;i++){
			img[i] = document.createElement('span');
			img[i].setAttribute('id', 'img' + i);
			img[i].setAttribute('class','slider-pos');
			img[i].style.background = 'url(\'../oxides/images/bullet-inactive.png\')  50% 50% no-repeat';
			img[i].addEventListener('click', function(){
				var index = img.indexOf(this);
				if(parseInt(sliderDivision.style.marginLeft)%sliderWidth==0){
					var mul = (count - index)*sliderWidth;
					count = index;
					clicked(mul);
				}
				updateSlideNumber();
			});
			imageSelect.appendChild(img[i]);
			img[i].style.cursor='pointer';
		}
	}
	var checkScreenChanges = function(){
		if(document.hidden == true){
			animator.startPos();
			count++;
			clearTimeout(intervalId);
		}
		else{
			count = 1;
			intervalId = setTimeout(animateSlide, 2000);
		}
	}
	var changeSliderWidth = function(){
		var style = window.getComputedStyle(txtImageWrapper);
		var initial = style.getPropertyValue('width');
		sliderWidth = parseInt(initial);
		animator.startPos();
		count++;
		clearTimeout(intervalId);
		checkScreenChanges();
	}
	document.addEventListener('visibilitychange',checkScreenChanges,false);
	window.addEventListener('resize',changeSliderWidth,false);
}