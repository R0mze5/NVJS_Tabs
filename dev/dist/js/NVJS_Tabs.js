'use strict';

function NVJSTabs(config, ...configAtributes) {
	const self = this;
	let autoInitialize = true;
	let allowDidabled = false;
	let logErrors = false;
	let autoSetFirstTab = true;

	let container = document;

	let tabButtons;
	let tabButtonsClass;
	let tabButtonsDefaults = '.tab__header';
	let tabButtonsTarget;
	let tabButtonsTargetDefaults = 'data-target';
	let tabButtonActiveClass = 'active';

	

	
	let tabBlocks;
	let tabBlocksClass;
	let tabBlocksDefaults = '.tab__block';
	let tabBlockTarget;
	let tabBlockTargetDefaults = 'data-name';
	let tabBlockActiveClass = 'shown';




	function parseData(configData) {
		container = configData.container ? document.querySelectorAll(configData.container) : container;

		if(container.length > 1){
			container = container[0];
			if(logErrors){
				throw new Error(`more than 1 container was initialize`);
			}
		} else {
			container = container[0];
		}

		tabButtonsClass = configData.tabButtons || tabButtonsDefaults;
		tabButtons = Array.prototype.slice.call(container.querySelectorAll(tabButtonsClass), 0);
		tabButtonActiveClass = configData.buttonActiveClass || tabButtonActiveClass;
		tabButtonsTarget = configData.tabButtonsTarget || tabButtonsTargetDefaults;

		tabBlocksClass = configData.tabBlocks || tabBlocksDefaults;
		tabBlocks = Array.prototype.slice.call(container.querySelectorAll(tabBlocksClass), 0);
		tabBlockActiveClass = configData.blockActiveClass || tabBlockActiveClass;
		tabBlockTarget = configData.tabBlockTarget || tabBlockTargetDefaults;

		autoSetFirstTab = configData.autoSetFirstTab != undefined ? configData.autoSetFirstTab : autoSetFirstTab;
		autoInitialize = configData.autoInitialize != undefined ? configData.autoInitialize : autoInitialize;

		if(autoInitialize) self.initialize();
	}


	this.initialize = function(){
		if (tabButtons.length > 0 && tabBlocks.length > 0){

			tabBlocks.forEach(block => {
				setActiveClass.call(block, tabBlockActiveClass);
				cleanActiveElements.call(tabBlocks);
			});

			let activeButtons = [];

			tabButtons.forEach(button => {
				setActiveClass.call(button, tabButtonActiveClass);
				setButtonEvents.call(button);
				if(button.classList.contains(button.activeClass)){
					activeButtons.push(button);
				}
			});

			if(activeButtons.length == 1){
				setActiveElement.call(activeButtons[0]);
			} else if(activeButtons.length > 1){
				cleanActiveElements.call(tabButtons);
				setActiveElement.call(activeButtons[0]);
				if(logErrors){
					throw new Error(`more than 1 active button was choosed`);
				}
			} else if(activeButtons.length == 0 && autoSetFirstTab){
				setActiveElement.call(tabButtons[0]);
			}

    
		} else {
			throw new Error('can\'t configurate tabs, because tabButtons or tabs not found');
		}
	};


	function setActiveClass(activeClass){
		this.activeClass = activeClass;
	}



	function setButtonEvents() {
		let button = this;
		// * проверка, что только 1 таб подходит
		button.target = container.querySelectorAll(`${tabBlocksClass}[${tabBlockTarget}=${button.getAttribute(tabButtonsTarget)}]`);

		if(button.target.length != 1){
			if(button.target.length < 1){
				button.active = false;

				//добавить запрет на изменение достопности недоступных элементов
				button.unavaliable = true;

				button.style.cursor = 'not-allowed';
				/* button.classList.add(tabDisbledClass); */
				if(logErrors){
					throw new Error(`${button} button unavaliable, because no target tab`);
				}
			} 
		} else if(button.target.length > 1 && logErrors){
			throw new Error(`${button} button has more, than 1 linked tab. Only first will choosed`);
		}

		if(!button.unavaliable){
			button.target = button.target[0];
			button.active = true;

			button.addEventListener('click', activateButtonOnClick.bind(button));
		}
	}

	function activateButtonOnClick(event){
		let button = this;
		event.preventDefault();
		if(!button.classList.contains(button.activeClass) && !allowDidabled){
			cleanActiveElements.call(tabButtons);
			cleanActiveElements.call(tabBlocks);
			setActiveElement.call(button);
		}
	}




	function cleanActiveElements(){
		if ((typeof this == 'object')){
			if(this instanceof Array){
				this.forEach(elem => cleanActiveElements.call(elem));
			}

			if((this instanceof Element) && this.classList.contains(this.activeClass)){
				this.classList.remove(this.activeClass);
			}
		}
	}




	function setActiveElement(){
		// * добавить настройку активации таба через tab.show
		this.classList.add(this.activeClass);
		this.target.classList.add(this.target.activeClass);

		// * создать статическое событие show
		// this.dispatchEvent(new Event ('show'));
		// this.target.dispatchEvent(new Event ('show'));
	}


	/* function setBlockEvents() {
		this.addEventListener('show', (event) => {
			event.preventDefault();
			this.classList.add(this.activeClass);
		});
	} */



	function parseConfig() {
		switch(typeof config){
		case 'string': {
			if (container.querySelector(config)){
				if (configAtributes.length < 1){
					parseData({tabButtons: config});
				} else if (configAtributes[0] instanceof Object){
					configAtributes[0].tabButtons = config;
					parseData(configAtributes[0]);
				} else {
					throw new Error('configuration is not object');
				}
			} else {
				throw new Error(`${config} not found on this page`);
			}
		}; 
			break;
		case 'object': {
			if(config instanceof Array){
				config.forEach(element => {
					let tab = new NVJSTabs(element);
				});
			} else {
				parseData(config);
			}
		}
			break;
		}
	}

	parseConfig();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJOVkpTX1RhYnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBOVkpTVGFicyhjb25maWcsIC4uLmNvbmZpZ0F0cmlidXRlcykge1xuXHRjb25zdCBzZWxmID0gdGhpcztcblx0bGV0IGF1dG9Jbml0aWFsaXplID0gdHJ1ZTtcblx0bGV0IGFsbG93RGlkYWJsZWQgPSBmYWxzZTtcblx0bGV0IGxvZ0Vycm9ycyA9IGZhbHNlO1xuXHRsZXQgYXV0b1NldEZpcnN0VGFiID0gdHJ1ZTtcblxuXHRsZXQgY29udGFpbmVyID0gZG9jdW1lbnQ7XG5cblx0bGV0IHRhYkJ1dHRvbnM7XG5cdGxldCB0YWJCdXR0b25zQ2xhc3M7XG5cdGxldCB0YWJCdXR0b25zRGVmYXVsdHMgPSAnLnRhYl9faGVhZGVyJztcblx0bGV0IHRhYkJ1dHRvbnNUYXJnZXQ7XG5cdGxldCB0YWJCdXR0b25zVGFyZ2V0RGVmYXVsdHMgPSAnZGF0YS10YXJnZXQnO1xuXHRsZXQgdGFiQnV0dG9uQWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcblxuXHRcblxuXHRcblx0bGV0IHRhYkJsb2Nrcztcblx0bGV0IHRhYkJsb2Nrc0NsYXNzO1xuXHRsZXQgdGFiQmxvY2tzRGVmYXVsdHMgPSAnLnRhYl9fYmxvY2snO1xuXHRsZXQgdGFiQmxvY2tUYXJnZXQ7XG5cdGxldCB0YWJCbG9ja1RhcmdldERlZmF1bHRzID0gJ2RhdGEtbmFtZSc7XG5cdGxldCB0YWJCbG9ja0FjdGl2ZUNsYXNzID0gJ3Nob3duJztcblxuXG5cblxuXHRmdW5jdGlvbiBwYXJzZURhdGEoY29uZmlnRGF0YSkge1xuXHRcdGNvbnRhaW5lciA9IGNvbmZpZ0RhdGEuY29udGFpbmVyID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWdEYXRhLmNvbnRhaW5lcikgOiBjb250YWluZXI7XG5cblx0XHRpZihjb250YWluZXIubGVuZ3RoID4gMSl7XG5cdFx0XHRjb250YWluZXIgPSBjb250YWluZXJbMF07XG5cdFx0XHRpZihsb2dFcnJvcnMpe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYG1vcmUgdGhhbiAxIGNvbnRhaW5lciB3YXMgaW5pdGlhbGl6ZWApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250YWluZXIgPSBjb250YWluZXJbMF07XG5cdFx0fVxuXG5cdFx0dGFiQnV0dG9uc0NsYXNzID0gY29uZmlnRGF0YS50YWJCdXR0b25zIHx8IHRhYkJ1dHRvbnNEZWZhdWx0cztcblx0XHR0YWJCdXR0b25zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGFiQnV0dG9uc0NsYXNzKSwgMCk7XG5cdFx0dGFiQnV0dG9uQWN0aXZlQ2xhc3MgPSBjb25maWdEYXRhLmJ1dHRvbkFjdGl2ZUNsYXNzIHx8IHRhYkJ1dHRvbkFjdGl2ZUNsYXNzO1xuXHRcdHRhYkJ1dHRvbnNUYXJnZXQgPSBjb25maWdEYXRhLnRhYkJ1dHRvbnNUYXJnZXQgfHwgdGFiQnV0dG9uc1RhcmdldERlZmF1bHRzO1xuXG5cdFx0dGFiQmxvY2tzQ2xhc3MgPSBjb25maWdEYXRhLnRhYkJsb2NrcyB8fCB0YWJCbG9ja3NEZWZhdWx0cztcblx0XHR0YWJCbG9ja3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0YWJCbG9ja3NDbGFzcyksIDApO1xuXHRcdHRhYkJsb2NrQWN0aXZlQ2xhc3MgPSBjb25maWdEYXRhLmJsb2NrQWN0aXZlQ2xhc3MgfHwgdGFiQmxvY2tBY3RpdmVDbGFzcztcblx0XHR0YWJCbG9ja1RhcmdldCA9IGNvbmZpZ0RhdGEudGFiQmxvY2tUYXJnZXQgfHwgdGFiQmxvY2tUYXJnZXREZWZhdWx0cztcblxuXHRcdGF1dG9TZXRGaXJzdFRhYiA9IGNvbmZpZ0RhdGEuYXV0b1NldEZpcnN0VGFiICE9IHVuZGVmaW5lZCA/IGNvbmZpZ0RhdGEuYXV0b1NldEZpcnN0VGFiIDogYXV0b1NldEZpcnN0VGFiO1xuXHRcdGF1dG9Jbml0aWFsaXplID0gY29uZmlnRGF0YS5hdXRvSW5pdGlhbGl6ZSAhPSB1bmRlZmluZWQgPyBjb25maWdEYXRhLmF1dG9Jbml0aWFsaXplIDogYXV0b0luaXRpYWxpemU7XG5cblx0XHRpZihhdXRvSW5pdGlhbGl6ZSkgc2VsZi5pbml0aWFsaXplKCk7XG5cdH1cblxuXG5cdHRoaXMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCl7XG5cdFx0aWYgKHRhYkJ1dHRvbnMubGVuZ3RoID4gMCAmJiB0YWJCbG9ja3MubGVuZ3RoID4gMCl7XG5cblx0XHRcdHRhYkJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IHtcblx0XHRcdFx0c2V0QWN0aXZlQ2xhc3MuY2FsbChibG9jaywgdGFiQmxvY2tBY3RpdmVDbGFzcyk7XG5cdFx0XHRcdGNsZWFuQWN0aXZlRWxlbWVudHMuY2FsbCh0YWJCbG9ja3MpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGxldCBhY3RpdmVCdXR0b25zID0gW107XG5cblx0XHRcdHRhYkJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuXHRcdFx0XHRzZXRBY3RpdmVDbGFzcy5jYWxsKGJ1dHRvbiwgdGFiQnV0dG9uQWN0aXZlQ2xhc3MpO1xuXHRcdFx0XHRzZXRCdXR0b25FdmVudHMuY2FsbChidXR0b24pO1xuXHRcdFx0XHRpZihidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKGJ1dHRvbi5hY3RpdmVDbGFzcykpe1xuXHRcdFx0XHRcdGFjdGl2ZUJ1dHRvbnMucHVzaChidXR0b24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYoYWN0aXZlQnV0dG9ucy5sZW5ndGggPT0gMSl7XG5cdFx0XHRcdHNldEFjdGl2ZUVsZW1lbnQuY2FsbChhY3RpdmVCdXR0b25zWzBdKTtcblx0XHRcdH0gZWxzZSBpZihhY3RpdmVCdXR0b25zLmxlbmd0aCA+IDEpe1xuXHRcdFx0XHRjbGVhbkFjdGl2ZUVsZW1lbnRzLmNhbGwodGFiQnV0dG9ucyk7XG5cdFx0XHRcdHNldEFjdGl2ZUVsZW1lbnQuY2FsbChhY3RpdmVCdXR0b25zWzBdKTtcblx0XHRcdFx0aWYobG9nRXJyb3JzKXtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYG1vcmUgdGhhbiAxIGFjdGl2ZSBidXR0b24gd2FzIGNob29zZWRgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmKGFjdGl2ZUJ1dHRvbnMubGVuZ3RoID09IDAgJiYgYXV0b1NldEZpcnN0VGFiKXtcblx0XHRcdFx0c2V0QWN0aXZlRWxlbWVudC5jYWxsKHRhYkJ1dHRvbnNbMF0pO1xuXHRcdFx0fVxuXG4gICAgXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignY2FuXFwndCBjb25maWd1cmF0ZSB0YWJzLCBiZWNhdXNlIHRhYkJ1dHRvbnMgb3IgdGFicyBub3QgZm91bmQnKTtcblx0XHR9XG5cdH07XG5cblxuXHRmdW5jdGlvbiBzZXRBY3RpdmVDbGFzcyhhY3RpdmVDbGFzcyl7XG5cdFx0dGhpcy5hY3RpdmVDbGFzcyA9IGFjdGl2ZUNsYXNzO1xuXHR9XG5cblxuXG5cdGZ1bmN0aW9uIHNldEJ1dHRvbkV2ZW50cygpIHtcblx0XHRsZXQgYnV0dG9uID0gdGhpcztcblx0XHQvLyAqINC/0YDQvtCy0LXRgNC60LAsINGH0YLQviDRgtC+0LvRjNC60L4gMSDRgtCw0LEg0L/QvtC00YXQvtC00LjRglxuXHRcdGJ1dHRvbi50YXJnZXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgJHt0YWJCbG9ja3NDbGFzc31bJHt0YWJCbG9ja1RhcmdldH09JHtidXR0b24uZ2V0QXR0cmlidXRlKHRhYkJ1dHRvbnNUYXJnZXQpfV1gKTtcblxuXHRcdGlmKGJ1dHRvbi50YXJnZXQubGVuZ3RoICE9IDEpe1xuXHRcdFx0aWYoYnV0dG9uLnRhcmdldC5sZW5ndGggPCAxKXtcblx0XHRcdFx0YnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8v0LTQvtCx0LDQstC40YLRjCDQt9Cw0L/RgNC10YIg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LTQvtGB0YLQvtC/0L3QvtGB0YLQuCDQvdC10LTQvtGB0YLRg9C/0L3Ri9GFINGN0LvQtdC80LXQvdGC0L7QslxuXHRcdFx0XHRidXR0b24udW5hdmFsaWFibGUgPSB0cnVlO1xuXG5cdFx0XHRcdGJ1dHRvbi5zdHlsZS5jdXJzb3IgPSAnbm90LWFsbG93ZWQnO1xuXHRcdFx0XHQvKiBidXR0b24uY2xhc3NMaXN0LmFkZCh0YWJEaXNibGVkQ2xhc3MpOyAqL1xuXHRcdFx0XHRpZihsb2dFcnJvcnMpe1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtidXR0b259IGJ1dHRvbiB1bmF2YWxpYWJsZSwgYmVjYXVzZSBubyB0YXJnZXQgdGFiYCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gXG5cdFx0fSBlbHNlIGlmKGJ1dHRvbi50YXJnZXQubGVuZ3RoID4gMSAmJiBsb2dFcnJvcnMpe1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGAke2J1dHRvbn0gYnV0dG9uIGhhcyBtb3JlLCB0aGFuIDEgbGlua2VkIHRhYi4gT25seSBmaXJzdCB3aWxsIGNob29zZWRgKTtcblx0XHR9XG5cblx0XHRpZighYnV0dG9uLnVuYXZhbGlhYmxlKXtcblx0XHRcdGJ1dHRvbi50YXJnZXQgPSBidXR0b24udGFyZ2V0WzBdO1xuXHRcdFx0YnV0dG9uLmFjdGl2ZSA9IHRydWU7XG5cblx0XHRcdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFjdGl2YXRlQnV0dG9uT25DbGljay5iaW5kKGJ1dHRvbikpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGFjdGl2YXRlQnV0dG9uT25DbGljayhldmVudCl7XG5cdFx0bGV0IGJ1dHRvbiA9IHRoaXM7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRpZighYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhidXR0b24uYWN0aXZlQ2xhc3MpICYmICFhbGxvd0RpZGFibGVkKXtcblx0XHRcdGNsZWFuQWN0aXZlRWxlbWVudHMuY2FsbCh0YWJCdXR0b25zKTtcblx0XHRcdGNsZWFuQWN0aXZlRWxlbWVudHMuY2FsbCh0YWJCbG9ja3MpO1xuXHRcdFx0c2V0QWN0aXZlRWxlbWVudC5jYWxsKGJ1dHRvbik7XG5cdFx0fVxuXHR9XG5cblxuXG5cblx0ZnVuY3Rpb24gY2xlYW5BY3RpdmVFbGVtZW50cygpe1xuXHRcdGlmICgodHlwZW9mIHRoaXMgPT0gJ29iamVjdCcpKXtcblx0XHRcdGlmKHRoaXMgaW5zdGFuY2VvZiBBcnJheSl7XG5cdFx0XHRcdHRoaXMuZm9yRWFjaChlbGVtID0+IGNsZWFuQWN0aXZlRWxlbWVudHMuY2FsbChlbGVtKSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKCh0aGlzIGluc3RhbmNlb2YgRWxlbWVudCkgJiYgdGhpcy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5hY3RpdmVDbGFzcykpe1xuXHRcdFx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hY3RpdmVDbGFzcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXG5cblx0ZnVuY3Rpb24gc2V0QWN0aXZlRWxlbWVudCgpe1xuXHRcdC8vICog0LTQvtCx0LDQstC40YLRjCDQvdCw0YHRgtGA0L7QudC60YMg0LDQutGC0LjQstCw0YbQuNC4INGC0LDQsdCwINGH0LXRgNC10LcgdGFiLnNob3dcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVDbGFzcyk7XG5cdFx0dGhpcy50YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLnRhcmdldC5hY3RpdmVDbGFzcyk7XG5cblx0XHQvLyAqINGB0L7Qt9C00LDRgtGMINGB0YLQsNGC0LjRh9C10YHQutC+0LUg0YHQvtCx0YvRgtC40LUgc2hvd1xuXHRcdC8vIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQgKCdzaG93JykpO1xuXHRcdC8vIHRoaXMudGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50ICgnc2hvdycpKTtcblx0fVxuXG5cblx0LyogZnVuY3Rpb24gc2V0QmxvY2tFdmVudHMoKSB7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCdzaG93JywgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKHRoaXMuYWN0aXZlQ2xhc3MpO1xuXHRcdH0pO1xuXHR9ICovXG5cblxuXG5cdGZ1bmN0aW9uIHBhcnNlQ29uZmlnKCkge1xuXHRcdHN3aXRjaCh0eXBlb2YgY29uZmlnKXtcblx0XHRjYXNlICdzdHJpbmcnOiB7XG5cdFx0XHRpZiAoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoY29uZmlnKSl7XG5cdFx0XHRcdGlmIChjb25maWdBdHJpYnV0ZXMubGVuZ3RoIDwgMSl7XG5cdFx0XHRcdFx0cGFyc2VEYXRhKHt0YWJCdXR0b25zOiBjb25maWd9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChjb25maWdBdHJpYnV0ZXNbMF0gaW5zdGFuY2VvZiBPYmplY3Qpe1xuXHRcdFx0XHRcdGNvbmZpZ0F0cmlidXRlc1swXS50YWJCdXR0b25zID0gY29uZmlnO1xuXHRcdFx0XHRcdHBhcnNlRGF0YShjb25maWdBdHJpYnV0ZXNbMF0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignY29uZmlndXJhdGlvbiBpcyBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtjb25maWd9IG5vdCBmb3VuZCBvbiB0aGlzIHBhZ2VgKTtcblx0XHRcdH1cblx0XHR9OyBcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ29iamVjdCc6IHtcblx0XHRcdGlmKGNvbmZpZyBpbnN0YW5jZW9mIEFycmF5KXtcblx0XHRcdFx0Y29uZmlnLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdFx0bGV0IHRhYiA9IG5ldyBOVkpTVGFicyhlbGVtZW50KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwYXJzZURhdGEoY29uZmlnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRwYXJzZUNvbmZpZygpO1xufSJdLCJmaWxlIjoiTlZKU19UYWJzLmpzIn0=
