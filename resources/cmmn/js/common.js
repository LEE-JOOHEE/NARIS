/*******************************************************************/
/** 공통 사용 Javascript 페이지에서 Jquery 관련 스크립트 Import후 사용해야함. **/
/*******************************************************************/

/**
 * DIV팝업창을 오픈한다.
 * @param layerDiv  : 배경으로 띄울 DIV명
 * @param insertDiv : 삽입할 DIV오프젝트
 * @param targetDiv : 삽입대상 DIV오브젝트명
 * @param pWidth    : 팝업창 가로사이즈
 * @param pHeight   : 팝업창 세로사이즈
 */
var divOpenPop = function (layerDiv, insertDiv, targetDiv, pWidth, pHeight) {
  $("div[id=" + insertDiv + "]").html($("div[id=" + targetDiv + "]").html());
  $("div[id=" + targetDiv + "]").html("");
  var _win = jQuery(window);

  var cw = _win.width(); //화면 넓이
  var ch = _win.height(); //화면 높이

  var ml = (cw - pWidth) / 2;
  var mt = (ch - pHeight) / 2;

  var _w = pWidth;
  var _h = pHeight;

  $("div[id=" + insertDiv + "]").css({
    left: ml + "px",
    top: mt + "px",
    width: _w,
    height: _h,
    position: "absolute",
    zIndex: 100001,
  });
  $("div[id=" + insertDiv + "]").show();

  $("div[id=" + layerDiv + "]").css({
    width: $(window).width(),
    height: $(document).height(),
    zIndex: 9000,
  });
  $("div[id=" + layerDiv + "]").fadeIn(1000);
  $("div[id=" + layerDiv + "]").fadeTo("slow", 0.4);
  //팝업 오픈 후 스크롤 방지
  $("body")
    .css({
      overflow: "hidden",
    })
    .bind("touchmove", function (e) {
      e.preventDefault();
    });
};

/**
 * DIV팝업창을 오픈한다.(해당하는 오브젝트에 대하여 팝업창으로 띄운다.)
 * @param layerDiv  : 배경으로 띄울 DIV명
 * @param targetDiv : 팝업대상 DIV오브젝트명
 * @param pWidth    : 팝업창 가로사이즈
 * @param pHeight   : 팝업창 세로사이즈
 */
var divOpenPop2 = function (layerDiv, targetDiv, pWidth, pHeight) {
  var _win = jQuery(window);

  var cw = _win.width(); //화면 넓이
  var ch = _win.height(); //화면 높이

  var ml = (cw - pWidth) / 2;
  var mt = (ch - pHeight) / 2;

  var _w = pWidth;
  var _h = pHeight;

  if (mt < 0) {
    mt = 40;
  }

  $("div[id=" + targetDiv + "]").css({
    left: ml + "px",
    top: mt + "px",
    width: _w,
    height: _h,
    position: "absolute",
    zIndex: 100001,
  });
  $("div[id=" + targetDiv + "]").show();

  $("div[id=" + layerDiv + "]").css({
    width: $(window).width(),
    height: $(document).height(),
    zIndex: 9000,
  });
  $("div[id=" + layerDiv + "]").fadeIn(1000);
  $("div[id=" + layerDiv + "]").fadeTo("slow", 0.4);
  //팝업 오픈 후 스크롤 방지
  $("body")
    .css({
      overflow: "hidden",
    })
    .bind("touchmove", function (e) {
      e.preventDefault();
    });
};

/**
 * DIV팝업창을 닫는다.
 * @Param layerDiv  : 배경으로 띄울 DIV명
 * @Param insertDiv : 삽입할 DIV오프젝트
 * @Param insertDiv : 삽입대상 DIV오브젝트명
 */
var divClosePopup = function (layerDiv, insertDiv, targetDiv) {
  $("div[id=" + targetDiv + "]").html($("div[id=" + insertDiv + "]").html());
  $("div[id=" + insertDiv + "]").html("");
  $("div[id=" + insertDiv + "]").hide();
  $("div[id=" + layerDiv + "]").hide();
  $("body").unbind("touchmove");
  $("body").removeAttr("style");
};

/**
 * DIV팝업창을 닫는다.
 * @Param layerDiv  : 배경으로 띄울 DIV명
 * @Param insertDiv : 삽입할 DIV오프젝트
 * @Param insertDiv : 삽입대상 DIV오브젝트명
 */
var divClosePopup2 = function (layerDiv, targetDiv) {
  $("div[id=" + targetDiv + "]").removeAttr("style");
  $("div[id=" + targetDiv + "]").hide();
  $("div[id=" + layerDiv + "]").hide();
  $("body").unbind("touchmove");
  $("body").removeAttr("style");
};

/**
 * 브라우저 가운데에 팝업창을 오픈한다.
 */
var openPopup = function (url, pWidth, pHeight) {
  var cw = screen.availWidth; //화면 넓이
  var ch = screen.availHeight; //화면 높이

  var ml = (cw - pWidth) / 2;
  var mt = (ch - pHeight) / 2;

  return window.open(
    url,
    "popup",
    "width=" +
      pWidth +
      ",height=" +
      pHeight +
      ",top=" +
      mt +
      ",left=" +
      ml +
      ",toolbar=no,status=no,location=no, scrollbars=yes, menubar=no, resizable=no"
  );
};

/**
 * 브라우저 가운데에 팝업창을 오픈한다.
 */
var openPopup2 = function (url, pWidth, pHeight, id) {
  var cw = screen.availWidth; //화면 넓이
  var ch = screen.availHeight; //화면 높이

  var ml = (cw - pWidth) / 2;
  var mt = (ch - pHeight) / 2;

  return window.open(
    url,
    id,
    "width=" +
      pWidth +
      ",height=" +
      pHeight +
      ",top=" +
      mt +
      ",left=" +
      ml +
      ",toolbar=no,status=no,location=no, scrollbars=yes, menubar=no, resizable=no"
  );
};

/************************************************************************
 * 함수명 : replaceAll
 * 설 명 : 문자열 전체 치환
 * 인 자 :
 *        @param str : 원본 문자열
 *        @param checker : 교체할 대상 문자열
 *        @param changer : 치환될 문자열
 * 사용법 : private 사용
 * 작성일 : 2010.10.27
 * 작성자 : 조정필
 * 수정일   수정자    수정내용
 * ------ ------ -------------------
 *
 ***********************************************************************/
String.prototype.replaceAll = function (checker, changer) {
  if (checker.indexOf("/") > -1) {
    var array = checker.split("/");
    var temp = "";
    for (var i = 0; i < array.length; i++) {
      temp += "\\/";
      temp += array[i];
    }
    checker = temp;
  }
  eval("var pattern = /" + checker + "/g;");
  return this.replace(pattern, changer);
};

//공통메시지 처리 부분
var commonMsg = function (msg) {
  $("div[id=dialogMsg] span[id=messageSpan]").html(msg);
  $("div[id=dialogMsg]").dialog("open");
};

//문자열치환
var nullConvert = function (data, type) {
  if (data == "null" || data == null || data == undefined) {
    if (type == "int") {
      return "0";
    } else {
      return "";
    }
  }
  return data;
};

$.validator.setDefaults({
  invalidHandler: function (form, validator) {
    var errors = validator.numberOfInvalids();
    if (errors) {
      var elementId = $(validator.errorList[0].element).attr("id");
      if (elementId.split("_").length > 1) {
        $("ul[id='lang_tab']")
          .find('a[href="#' + elementId.split("_")[1] + '"]')
          .click();
      }
      validator.errorList[0].element.focus();
    }
  },
  errorElement: "div",
  errorPlacement: function (error, element) {
    element.next("div.error").remove();
    error.addClass("mgt05");
    error.appendTo($(element).parent());
  },
});

//Ajax 파일 다운로드
jQuery.download = function (url, data, method) {
  // url과 data를 입력받음
  if (url && data) {
    // data 는  string 또는 array/object 를 파라미터로 받는다.
    data = typeof data == "string" ? data : jQuery.param(data);
    // 파라미터를 form의  input으로 만든다.
    var inputs = "";
    jQuery.each(data.split("&"), function () {
      var pair = this.split("=");
      inputs +=
        '<input type="hidden" name="' +
        pair[0] +
        '" value="' +
        pair[1] +
        '" />';
    });
    // request를 보낸다.
    jQuery(
      '<form action="' +
        url +
        '" method="' +
        (method || "post") +
        '">' +
        inputs +
        "</form>"
    )
      .appendTo("body")
      .submit()
      .remove();
  }
};

/**
 * 화면에 표시할 파일 크기 문자열 생성(Byte, KB, MB)
 * @param fileSize 바이트 크기 정수
 * @return 생성된 문자열
 */
var fn_FileSizeDisplayString = function (fileSize) {
  var displayString = "";

  if (fileSize < 1024) {
    displayString = fileSize + " Byte";
  } else if (fileSize >= 1024 && fileSize < 1024 * 1024) {
    displayString = (fileSize / 1024).toFixed(1) + " KB";
  } else if (fileSize >= 1024 * 1024) {
    displayString = (fileSize / 1024 / 1024).toFixed(1) + " MB";
  }
  return displayString;
};
