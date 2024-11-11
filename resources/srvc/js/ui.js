/* 즐겨찾기추가 */
$(document).ready(function () {
  $("#favorite").on("click", function (e) {
    var bookmarkURL = window.location.href;
    var bookmarkTitle = document.title;
    var triggerDefault = false;

    if (window.sidebar && window.sidebar.addPanel) {
      // Firefox version &lt; 23
      window.sidebar.addPanel(bookmarkTitle, bookmarkURL, "");
    } else if (
      (window.sidebar &&
        navigator.userAgent.toLowerCase().indexOf("firefox") < -1) ||
      (window.opera && window.print)
    ) {
      // Firefox version &gt;= 23 and Opera Hotlist
      var $this = $(this);
      $this.attr("href", bookmarkURL);
      $this.attr("title", bookmarkTitle);
      $this.attr("rel", "sidebar");
      $this.off(e);
      triggerDefault = true;
    } else if (window.external && "AddFavorite" in window.external) {
      // IE Favorite
      window.external.AddFavorite(bookmarkURL, bookmarkTitle);
    } else {
      // WebKit - Safari/Chrome
      alert(
        (navigator.userAgent.toLowerCase().indexOf("mac") != -1
          ? "Cmd"
          : "Ctrl") + "+D 를 이용해 이 페이지를 즐겨찾기에 추가할 수 있습니다."
      );
    }

    return triggerDefault;
  });
});

/* header 유틸리티 */
(function ($) {
  $(document).ready(function () {
    $(".language > ul > li > button").click(function () {
      //START 버튼 이외의 화면에서 클릭 시 자동으로 드롭다운이 사라지도록 한다.
      var template = $(this || this.defaultElement || this)[0];
      var document = $(
        template.style ? template.ownerDocument : template.document || template
      );
      document.on("mousedown touchstart", function () {
        if (!$(event.target).closest(".active").length) {
          $(document)
            .find("div.drop_open")
            .each(function () {
              if ($(this).is(":visible")) {
                $(this).slideUp(400, "easeInOutCubic");
              }
            });
        }
      });
      //END   버튼 이외의 화면에서 클릭 시 자동으로 드롭다운이 사라지도록 한다.
      $(".language li").removeClass("active");
      $(this).closest("li").addClass("active");
      var checkElement = $(this).next();
      if (checkElement.is(".drop_open") && checkElement.is(":visible")) {
        $(this).closest("li").removeClass("active");
        checkElement.slideUp(400, "easeInOutCubic");
      }
      if (checkElement.is(".drop_open") && !checkElement.is(":visible")) {
        $(".language ul .drop_open:visible").slideUp(400, "easeInOutCubic");
        checkElement.slideDown(400, "easeInOutCubic");
      }
      if ($(this).closest("li").find(".drop_open").children().length == 0) {
        return true;
      } else {
        return false;
      }
    });
  });
})(jQuery);

/* main 포커스*/
$(document).on("ready", function () {
  $(".mfocus .mfocus_slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    fade: true,
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: false,
    touchMove: false,
  });

  $(".mfocus_pause").on("click", function () {
    var $pauseBtn = $(this);
    if ($pauseBtn.hasClass("paused")) {
      $(".mfocus .mfocus_slider").slick("slickPlay");
      $pauseBtn.removeClass("paused");
    } else {
      $(".mfocus .mfocus_slider").slick("slickPause");
      $pauseBtn.addClass("paused");
    }
  });
});

/* 메인 퀵 배너 */
$(document).on("ready", function () {
  $(".mquick .quick_slider").slick({
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: false,
    arrows: true,
    draggable: false,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

/* 자원검색 포토 */
$(document).on("ready", function () {
  $(".view_head .photo_slider").slick({
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: false,
    arrows: true,
    draggable: false,
    touchMove: true,
    adaptiveHeight: true,
  });
});

/* 표본정보 레이어 팝업 포토 */
$(document).on("ready", function () {
  $(".pop_specimen_view .photo_slider").slick({
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: false,
    arrows: true,
    draggable: false,
    touchMove: true,
    adaptiveHeight: true,
  });
});

/* 페이지 상단 이동 */
$(document).ready(function () {
  $(".page_top").click(function (event) {
    //클릭 시 #붙는 부분 수정처리 2017.11.08 Modified by 송상구
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });
});

/* GNB 메뉴 */
$(function () {
  //#naris가 href에 걸린경우 #표시가 웹브라우저에 붙지 않도록 수정
  $("ul[class='gnb_hero']")
    .find("a")
    .each(function () {
      if ($(this).attr("href") == "#naris") {
        $(this).click(function (event) {
          event.preventDefault();
        });
      }
    });
  //#naris가 href에 걸린경우 #표시가 웹브라우저에 붙지 않도록 수정
  var gnbLi = $(".gnb_hero>li");
  var gnbLia = $(".gnb_hero > li > a");
  var ul = $(".gnb_hero>li>ul");
  var headerMin = $(".gnb_wrap").height() + 8;
  var headerMax = ul.innerHeight() + headerMin;
  var state = false;
  var speed = 10;
  gnbLi.on("mouseenter keyup", function () {
    if (!state) {
      $(".gnb_wrap")
        .stop()
        .animate(
          {
            height: headerMax,
          },
          speed,
          function () {
            ul.stop().fadeIn(speed);
          }
        );
      state = true;
      $(".gnb-mask").css("display", "block");
    }
    ul.removeClass("active");
    $(this).find("ul").addClass("active");
  });

  function close() {
    ul.stop().fadeOut(speed, function () {
      $(".gnb_wrap").stop().animate(
        {
          height: headerMin,
        },
        speed
      );
    });
    state = false;
    $(".gnb-mask").css("display", "none");
  }

  // 마우스 닫힘 제어
  gnbLi.mouseleave(function () {
    $(this).find("ul").removeClass("active");
    $(this).mouseleave(function () {
      close();
    });
  });
  $(".gnb_inner").mouseleave(function () {
    close();
  });

  // 포커스 추가
  gnbLi.keyup(function () {
    gnbLi.removeClass("focus");
    $(this).addClass("focus");
  });
  //첫번째 리스트에서 shift + tab 키 누르면 닫힘
  $(".gnb_hero > li:first-child > a").keydown(function (e) {
    if (e.keyCode === 9 && e.shiftKey) {
      close();
    }
  });
  //마지막 리스트에서 tab 키 누르면 닫힘
  $(".gnb_hero > li:last-child > .depth2 > li:last-child > a").keydown(
    function (e) {
      if (e.keyCode === 9 && !e.shiftKey) {
        close();
      }
    }
  );
  $(document).on("keydown keyup keypress", function (event) {
    if (event.key == "Escape") {
      close();
    }
  });
});

/* 모바일 GNB 메뉴 */
$(document).ready(function () {
  $(".mheader .mgnb_hero .mgnb_bar").click(function () {
    $(".mheader .mgnb_bg").slideToggle(400, "easeInOutCubic");
    return false;
  });
});

/* 서브 로케이션 */
(function ($) {
  $(document).ready(function () {
    $(".location_hero > ul > li > button").click(function () {
      //START 버튼 이외의 화면에서 클릭 시 자동으로 드롭다운이 사라지도록 한다.
      var template = $(this || this.defaultElement || this)[0];
      var document = $(
        template.style ? template.ownerDocument : template.document || template
      );
      document.on("mousedown touchstart", function () {
        if (!$(event.target).closest(".active").length) {
          $(document)
            .find("div.dynamic_depth")
            .each(function () {
              if ($(this).is(":visible")) {
                $(this).slideUp(400, "easeInOutCubic");
              }
            });
        }
      });
      //END   버튼 이외의 화면에서 클릭 시 자동으로 드롭다운이 사라지도록 한다.

      $(".location_hero li").removeClass("active");
      $(this).closest("li").addClass("active");
      var checkElement = $(this).next();
      if (checkElement.is(".dynamic_depth") && checkElement.is(":visible")) {
        $(this).closest("li").removeClass("active");
        checkElement.slideUp(400, "easeInOutCubic");
      }
      if (checkElement.is(".dynamic_depth") && !checkElement.is(":visible")) {
        $(".location_hero ul .dynamic_depth:visible").slideUp(
          400,
          "easeInOutCubic"
        );
        checkElement.slideDown(400, "easeInOutCubic");
      }
      if ($(this).closest("li").find(".dynamic_depth").children().length == 0) {
        return true;
      } else {
        return false;
      }
    });

    $(".dynamic_list")
      .find("a")
      .each(function () {
        if ($(this).attr("href").indexOf("#naris") != -1) {
          $(this).click(function (event) {
            event.preventDefault();
          });
        }
      });
  });
})(jQuery);

/* 자원검색 사이드 검색 */
$(document).ready(function () {
  $(document)
    .find(".search_side .side_tit .respon_tit")
    .each(function () {
      //console.log("target ::: "+$(this).attr("aria-taret"));
      var target_id = $(this).attr("aria-taret");
      $(this).click(function (event) {
        event.preventDefault();
        $("div[id='" + target_id + "']").slideToggle(400, "easeInOutCubic");
      });
    });
  /*
    $(".search_side .side_tit .respon_tit").click(function() {
        $(".search_side .side_form").slideToggle(400, 'easeInOutCubic');
        return false;
    });
    */
});

/* 표본정보 사이드 검색(표본정보 상세검색은 각 페이지에서 컨트롤 하도록 한다) 
$(document).ready(function() {
	\*
	$(document).find(".specimen_side .side_tit .respon_tit").each(function(){
		//console.log("target ::: "+$(this).attr("aria-taret"));
		var target_id = $(this).attr("aria-taret");
		$(this).click(function(event){
			event.preventDefault();
			$("div[id='"+target_id+"']").slideToggle(400, 'easeInOutCubic');
		});
	});
	*\
	\*
    $(".specimen_side .side_tit .respon_tit").click(function() {
        $(".specimen_side .side_form").slideToggle(400, 'easeInOutCubic');
        return false;
    });
    *\
});
*/

/* 지리정보 */
$(document).ready(function () {
  $(".split_btn button").click(function () {
    $(".map_wrap").toggleClass("active");
  });
});

/* 달력 */
$(".calendar").datepicker({
  showOn: "button",
  buttonImage: "/resources/srvc/images/common/ico_calendar.png",
  buttonImageOnly: true,
  buttonText: "달력",
  prevText: "이전달",
  nextText: "다음달",
  showMonthAfterYear: true,
  dateFormat: "yy-mm-dd",
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  yearSuffix: "년",
  dayNames: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  changeMonth: true,
  changeYear: true,
  yearRange: "1950:c+2",
  onSelect: function () {
    var st = Number($("#searchKeywordFrom").val().replaceAll("-", ""));
    var end = Number($("#searchKeywordTo").val().replaceAll("-", ""));
    if (end > 0) {
      var interval = end - st;

      if (interval < 0) {
        commonMsg("검색종료일자는 시작일자보다 크거나 같아야 합니다.");
        $(this).focus();
      }
    }
  },
});

/*** * DATEPICKER * ***/
/* ** datepicker ** */
const dateInput = document.querySelectorAll(".form-btn-datepicker");
const kds_datepicker = {
  init: () => {
    kds_datepicker.open();
    kds_datepicker.selValue();
    kds_datepicker.closeDatepicker();
    kds_datepicker.closeSingle();
  },
  open: () => {
    //datepicker 열기
    dateInput.forEach((e) => {
      const cal = e
        .closest(".datepicker-conts")
        .querySelector(".datepicker-area");
      const colConts = cal.querySelector(".datepicker-wrap");
      e.addEventListener("focus", () => {
        kds_datepicker.close();
        console.log("cal ===> ", cal);

        cal.classList.add("active");
        colConts.setAttribute("tabindex", "0");
        colConts.setAttribute("aria-hidden", "false");

        const activeLayer = cal.querySelector(".datepicker-tbl-wrap");
        activeLayer.classList.add("active");
        activeLayer.setAttribute("tabindex", "0");
        activeLayer.setAttribute("aria-hidden", "false");

        setTimeout(() => {
          colConts.focus();
        }, 50);
      });
    });
  },
  close: () => {
    //datepicker 닫기
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const colConts = e.querySelector(".datepicker-wrap");
      e.classList.remove("active");
      colConts.setAttribute("tabindex", "-1");
      colConts.setAttribute("aria-hidden", "true");
    });
  },
  contentsInitialize: () => {
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const bodyConts = e.querySelectorAll(".datepicker-conts");
      bodyConts.forEach((ele) => {
        ele.classList.remove("active");
        ele.setAttribute("tabindex", "-1");
        ele.setAttribute("aria-hidden", "true");
      });
    });
  },
  selValue: () => {
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const changeCalBtn = e.querySelectorAll(".datepicker-conts .sel .btn");
      const setBtn = e.querySelectorAll(".datepicker-btn-wrap .btn");

      const yearBtn = e.querySelector(".btn-cal-switch.year");
      const monBtn = e.querySelector(".btn-cal-switch.month");

      let activeLayer;
      yearBtn.addEventListener("click", () => {
        //년도 레이어 활성화
        kds_datepicker.contentsInitialize();
        activeLayer = e.querySelector(".datepicker-year-wrap");
        activeLayer.classList.add("active");
        activeLayer.setAttribute("tabindex", "0");
        activeLayer.setAttribute("aria-hidden", "false");
        setTimeout(() => {
          activeLayer.focus();
        }, 50);
      });
      monBtn.addEventListener("click", () => {
        //월 레이어 활성화
        kds_datepicker.contentsInitialize();
        activeLayer = e.querySelector(".datepicker-mon-wrap");
        activeLayer.classList.add("active");
        activeLayer.setAttribute("tabindex", "0");
        activeLayer.setAttribute("aria-hidden", "false");
        setTimeout(() => {
          activeLayer.focus();
        }, 50);
      });
      setBtn.forEach((ele) => {
        //확인 취소버튼 클릭하면 datepicker 닫힘
        ele.addEventListener("click", () => {
          kds_datepicker.close();
        });
      });
      changeCalBtn.forEach((ele) => {
        //년도 또는 월 선택하면 캘린더 레이어 활성화
        ele.addEventListener("click", () => {
          kds_datepicker.contentsInitialize();
          activeLayer = e.querySelector(".datepicker-tbl-wrap");
          activeLayer.classList.add("active");
          activeLayer.setAttribute("tabindex", "0");
          activeLayer.setAttribute("aria-hidden", "false");
          setTimeout(() => {
            activeLayer.focus();
          }, 50);
        });
      });
    });
  },
  closeDatepicker: () => {
    const cal = document.querySelectorAll(".datepicker-area");
    cal.forEach((e) => {
      const bodyConts = e.querySelectorAll(".datepicker-conts");
      let lastElement;
      bodyConts.forEach((ele) => {
        if (ele.classList.contains("datepicker-tbl-wrap")) {
          if (e.classList.contains("range")) {
            lastElement = ele.querySelector(
              ".datepicker-btn-wrap > .btn:last-child"
            );
          } else {
            lastElement = ele.querySelector(
              ".datepicker-tbl tbody tr:last-child > td:last-child .btn-set-date"
            );
          }
        } else {
          lastElement = ele.querySelector(".sel > li:last-child > .btn");
        }
        lastElement.addEventListener("blur", () => {
          kds_datepicker.close();
        });
      });
    });
  },
};
document.addEventListener("click", (e) => {
  kds_datepicker.open();
  kds_datepicker.selValue();
  if (!e.target.closest(".datepicker-conts")) {
    kds_datepicker.close();
  }
});
