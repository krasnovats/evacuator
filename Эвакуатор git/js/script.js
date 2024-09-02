(function($) {
	let pagify = {
		items: {},
		container: null,
		totalPages: 1,
		perPage: 3,
		currentPage: 0,
		createNavigation: function() {
			this.totalPages = Math.ceil(this.items.length / this.perPage);

			$('.pagination', this.container.parent()).remove();
			
			let instanceIndex = this.instanceIndex;
			
			let pagination = $('<div class="pagination instance' + this.instanceIndex + '"></div>').append('<a class="nav prev disabled" data-next="false"><</a>');

			for (let i = 0; i < this.totalPages; i++) {
				let pageElClass = "page";
				if (!i)
					pageElClass = "page current";
				var pageEl = '<a class="' + pageElClass + '" data-page="' + (
				i + 1) + '">' + (
				i + 1) + "</a>";
				pagination.append(pageEl);
			}
			pagination.append('<a class="nav next" data-next="true">></a>');

			this.container.after(pagination);

			let that = this;
			$("body").off("click", ".pagination.instance" + this.instanceIndex + " .nav");
			this.navigator = $("body").on("click", ".pagination.instance" + this.instanceIndex + " .nav", function() {
				let el = $(this);
				that.navigate(el.data("next"));
			});

			$("body").off("click", ".pagination.instance" + this.instanceIndex + " .page");
			this.pageNavigator = $("body").on("click", ".pagination.instance" + this.instanceIndex + " .page", function() {
				let el = $(this);
				that.goToPage(el.data("page"));
			});
		},
		navigate: function(next) {
			if (isNaN(next) || next === undefined) {
				next = true;
			}
			$(".pagination.instance" + this.instanceIndex + " .nav").removeClass("disabled");
			if (next) {
				this.currentPage++;
				if (this.currentPage > (this.totalPages - 1))
					this.currentPage = (this.totalPages - 1);
				if (this.currentPage == (this.totalPages - 1))
					$(".pagination.instance" + this.instanceIndex + " .nav.next").addClass("disabled");
				}
			else {
				this.currentPage--;
				if (this.currentPage < 0)
					this.currentPage = 0;
				if (this.currentPage == 0)
					$(".pagination.instance" + this.instanceIndex + " .nav.prev").addClass("disabled");
				}

			this.showItems();
		},
		updateNavigation: function() {

			let pages = $(".pagination.instance" + this.instanceIndex + " .page");
			pages.removeClass("current");
			$('.pagination.instance' + this.instanceIndex + ' .page[data-page="' + (
			this.currentPage + 1) + '"]').addClass("current");
		},
		goToPage: function(page) {

			this.currentPage = page - 1;

			$(".pagination.instance" + this.instanceIndex + " .nav").removeClass("disabled");
			if (this.currentPage == (this.totalPages - 1))
				$(".pagination.instance" + this.instanceIndex + " .nav.next").addClass("disabled");

			if (this.currentPage == 0)
				$(".pagination.instance" + this.instanceIndex + " .nav.prev").addClass("disabled");
			this.showItems();
		},
		showItems: function() {
			this.items.hide();
			let base = this.perPage * this.currentPage;
			this.items.slice(base, base + this.perPage).show();

			this.updateNavigation();
		},
		init: function(container, items, perPage, index) {
			this.instanceIndex = index;
			this.container = container;
			this.currentPage = 0;
			this.totalPages = 1;
			this.perPage = perPage;
			this.items = items;
			
			this.createNavigation();
			this.showItems();
		}
	};
	
	let instances = [];

	$.fn.pagify = function(perPage, itemSelector) {
		let el = $(this);
		let items = $(itemSelector, el);

		if (isNaN(perPage) || perPage === undefined) {
			perPage = 3;
		}
		
		if (items.length <= perPage) {
			return true;
		}
		
		let instance = $.extend({}, pagify);
		let index = instances.push(instance);

		instance.init(el, items, perPage, (index-1));
	};
})(jQuery);

//Example usage
$(".box1").pagify(4, ".item");




//Slider
new Swiper('.image-slider', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
  
	// If we need pagination
	pagination: {
	  el: '.swiper-pagination',
	  //Точки-буллеты
	  clickable: true,
	  // //Динамические буллеты
	  // dynamicBullets: true,
	  // renderBullet: function (index, className) {
		// return '<span class="' + className + '">' + (index + 1) + '</span>';
	  // },
	},
	
  
	// Navigation arrows
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},
  
	// And if we need scrollbar
	// scrollbar: {
	//   el: '.swiper-scrollbar',
	//   draggable: true,
	// },

	grabCursor: true,
	slideToClickedSlide: true,

	//Управление колесом мыши
	// mousewheel: {
    //   sesitivity: 1,
	// },	

	//Смена прозрачности
	// effect: 'fade',
	// fadeEffect: {
	// 	crossFade: true,
	// }

	effect: 'flip',

	// breakpoints: {
	// 	320: {

	// 	},
	// 	480: {

	// 	},
	// 	992: {

	// 	}
	// },

	// Zoom картинки
	// zoom: {
	// 	maxRatio: 5,
	// 	minRatio: 1,
	// },

	//Обновить свайпер при изменении элементов слайдера
	observer: true,

	//Обновить свайпер при изменении родительских элементов слайдера
	observeParents: true,

	//Обновить свайпер при изменении дочерних элементов слайдера
	observeSlideChildren: true,

  });


/*Табы*/
	
$(".tab-list").on("click", ".tab", function (event) {
	event.preventDefault();

	$(".tab").removeClass("active");
	$(".tab-content").removeClass("show");

	$(this).addClass("active");
	$($(this).attr('href')).addClass("show");
});


/*Кнопка наверх*/

$(function() {
	$(window).scroll(function() {
	if($(this).scrollTop() != 0) {
	$('#topNubex').fadeIn();
	} else {
	$('#topNubex').fadeOut();
	}
	});
	$('#topNubex').click(function() {
	$('body,html').animate({scrollTop:0},700);
	});
	});
  

	/*input file*/
	$('form').submit(function (e) {
		e.preventDefault();
	});
	$('form input').on('change', function () {
		var file        = $(this).prop('files')[0],
				convertToMb = Math.floor(file.size / 1024 / 1024);
		
		$('form #r').html(
			"<div>Name: <span>" + file.name + "</span></div>" +
			"<div>Type: <span>" + file.type + "</span></div>" +
			"<div>Size: <span>" + file.size + ' bytes (' + convertToMb + ' mb)' + "</span> </div>"
			);
		console.log(file);
	});
	
	$('form button').click(function () {
		$('input').click();
	});



	//Pop-up
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth -'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock_');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock_');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}