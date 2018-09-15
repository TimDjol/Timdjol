$(function() {
	//menu
	$(".toggle_mnu").click(function() {
		$(".sandwich").toggleClass("active");
	});
	$(".top_mnu ul a").click(function() {
		$(".top_mnu").fadeOut(600);
		$(".sandwich").toggleClass("active");
		$(".top_text").css("opacity", "1");
	}).append("<span>");
	$(".toggle_mnu").click(function() {
		if ($(".top_mnu").is(":visible")) {
			$(".top_text").css("opacity", "1");
			$(".top_mnu").fadeOut(600);
			$(".top_mnu li a").removeClass("fadeInUp animated");
		} else {
			$(".top_text").css("opacity", ".1");
			$(".top_mnu").fadeIn(600);
			$(".top_mnu li a").addClass("fadeInUp animated");
		};
	});

	//animate scroll
	$(".top_mnu ul a").mPageScroll2id();
	$("a.scroll-mouse").mPageScroll2id();

	//popup
	$("a[href='#callback']").click(function() {
		var dataForm = $(this).data("form");
		var dataText = $(this).data("text");
		$(".form-callback h4").text(dataText);
		$(".form-callback [name=admin-data]").val(dataForm);
	});

	$("a[href='#callback']").magnificPopup({
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
		focus: '#name'
	});

	$(".popup_content").magnificPopup({
		type:"inline",
		midClick: true
	});

	//typeit
	var instance = new TypeIt('#nameauthor', {
		strings: ['Темирлан Джолдошев'],
		speed: 170,
	});

	//phone
	$("input[name=phone]").inputmask(undefined, {
		oncleared:function(){
			$(this).prev().html('');
		},
		onKeyValidation:function(result, opts){
			if ($(this).inputmask("getmetadata")) {
				var country_name = $(this).inputmask("getmetadata")["name_ru"];
				var src = '/img/flags/'+$(this).inputmask("getmetadata")["cc"].toLowerCase()+'.png';
				$(this).prev().html('<img src="'+src+'" /> '+ country_name);
			}
		}
	});

	//animate
	$(".top_text h1").animated("fadeInDown", "fadeOutUp");
	$(".top_text p").animated("fadeInUp", "fadeOutDown");
	
	$(".title").animated("fadeInUp", "fadeOutDown");

	$(".left").animated("fadeInLeft", "fadeOutDown");
	$(".right").animated("fadeInRight", "fadeOutDown");

	$(".animation_1").animated("flipInY", "fadeOutDown");
	$(".animation_3").animated("fadeInRight", "fadeOutDown");

	$(".left .resume_item").animated("fadeInLeft", "fadeOutDown");
	$(".right .resume_item").animated("fadeInRight", "fadeOutDown");

	//animate
	$(".statistic .numbers").waypoint(function() {
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
		$(".num-item h3 span").each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({ number: tcount,
				easing: 'easeInQuad',
				"font-size": "3.7125em",
				numberStep: comma_separator_number_step},
				3200);
		});
	}, {
		offset: '70%'
	});

	//price
	$('.owl-price').owlCarousel({
		loop: true,
		smartSpeed: 700,
		autoplay: true,
		autoplayTimeout: 5000,
		margin: 30,
		stagePadding: 20,
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		nav: false,
		dots: true,
		// autoHeight:true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
			},
			768: {
				items: 2,
				autoplayTimeout: 9000,
			},
			992: {
				items: 3,
			},
			1200: {
				items: 3,
			}
		}
	});

	//load more
	$('.btn-more').click(function() {
		$(this).parents('.price-item').find('.more').show('slow');
		$(this).hide();
	});

	//tabs
	$("#portfolio_grid").mixItUp();
	$(".s_portfolio li").click(function() {
		$(".s_portfolio li").removeClass("active");
		$(this).addClass("active");
	});
	$(".portfolio_item").each(function(i) {
		$(this).find(".port_item_cont a").attr("href", "#work_" + i);
		$(this).find(".podrt_descr").attr("id", "work_" + i);
	});

	//lazy load
	var lazyLoadInstances = [];
	var lazyLazy = new LazyLoad({
		elements_selector: ".portfolio_item, .modal-box-content",
		callback_set: function(el) {
			var oneLL = new LazyLoad({
				container: el
			});
			lazyLoadInstances.push(oneLL);
		}
	});

	//validation
	$("input, select, textarea").jqBootstrapValidation();

	//send email
	$("#footer").submit(function() { //Change
		var th = $(this);
		event.preventDefault();
		$.ajax({
			type: "POST",
		url: "mailfooter.php", //Change
		data: th.serialize()
	}).done(function() {
		$.magnificPopup.open({ 
			items: {
				src: '<div class="footsuccess"><h3>Спасибо за вашу заявку!</h3></div>',
				type: 'inline'
			}
		});
		setTimeout(function() {
		// Done Functions
		th.trigger("reset");
	}, 3000);
	});
	return false;
});

	$("#callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			th.find(".successform").addClass("active");
			setTimeout(function() {
				// Done Functions
				th.find(".successform").removeClass("active");
				th.trigger("reset");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});

	//social popup
	$('.call-button').click(function() {
		$('.soc-list').toggle('slow').toggleClass('active');
	});

	//top
	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > $(window).height()) {
			$('.top').addClass("active");
		} else {
			$('.top').removeClass("active");
		};
	});

	//scroll readable
	$("body").prognroll({
		height: 3,
		color: "#FF6347",
		custom: false
	});

	//browser
	var is_chrome = !!window.chrome && !is_opera;
	var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !isEdge;
	var is_firefox = typeof window.InstallTrigger !== 'undefined';
	var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	if (is_safari){
		// $('head').removeAttr('data-image-src');
		// $('head').removeAttr('data-parallax');
		// $('head').removeAttr('data-natural-width');
		// $('head').removeAttr('data-natural-height');
		// $('head').removeAttr('data-speed');
		$('.head').addClass('bg');
	}

//copyright
function copyLink() {
		var istS = 'Источник:'; // Слово должно находится в кавычках!
		var copyR = '© timdjol.com'; // Слово должно находится в кавычках!
		var body_element = document.getElementsByTagName('body')[0];
		var choose = window.getSelection();
		var myLink = document.location.href;
		var authorLink = "<br /><br />" + istS + ' ' + "<a href='"+myLink+"'>"+myLink+"</a><br />" + copyR;
		var copytext = choose + authorLink;
		var addDiv = document.createElement('div');
		addDiv.style.position='absolute';
		addDiv.style.left='-99999px';
		body_element.appendChild(addDiv);
		addDiv.innerHTML = copytext;
		choose.selectAllChildren(addDiv);
		window.setTimeout(function() {
				body_element.removeChild(addDiv);
		},0);
}
document.oncopy = copyLink;
});


