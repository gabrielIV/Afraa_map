$(document).ready(function () {
  fetchCSV()
});

// var airports = []
// $(".cls-7").each(function (num, val) {
//   var a = {
//     id: $(val).attr("id"),
//     name: $(val).attr("data-name"),
//     logo: "img/air2.jpg"
//   }
//   // console.log($(val).attr("data-name"))

//   airports.push(a)
// })
// console.log(JSON.stringify(airports))

$(".cls-1").hover(function (e) {

  $(".cls-1.active-color").removeClass("active-color")
  $(this).addClass("active-color")

  var id = $(this).attr("id")
  // console.log(slideIndex[id])
  if (slideIndex[id] != undefined) {
    mySwiper.slideTo(slideIndex[id])
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    scrollToMapContent()

  } else {


    $(".hover-item.active").removeClass("active");
    // $(".hover-item.active-coo").removeClass("active");
    var id = $(this)
      .attr("id")
      .replace(".", "");
    var w = $(this)[0].getBoundingClientRect().width
    var h = $(this)[0].getBoundingClientRect().height

    var x = $(e.target).offset().left;
    var y = $(e.target).offset().top;

    $("." + id).css({
      left: x + (w / 2) + "px",
      top: y - 198 + (h / 2) + "px"
    });
    $("." + id).addClass("active");


  }

});

$(".cls-1").hover(function () {
  // adding radar waves

  var p = $(this).parent();
  $(".visible-radar").removeClass("visible-radar");
  if (p[0].tagName == "g") {
    var r = $(".radar-item");
    p.find(".cls-7").each(function (num, val) {
      var l = $(val).offset().left;
      var t = $(val).offset().top;

      // console.log(l);
      $(r[num]).addClass("visible-radar");
      $(r[num]).css({ top: t - 3.5 + "px", left: l - 3.5 + "px" });
    });
  }
});

function addHoverElements() {
  $(".cls-7").each(function () {
    var id = $(this).attr("id");
    var name = $(this).attr("data-name");
    var clone =
      '<div class="hover-item hover-item-clone ' +
      id.replace(".", "") +
      '">' +
      '      <div class="hover-content">' +
      '        <div class="header">' +
      name +
      "</div>" +
      '        <img src="img/air2.jpg" class="image" alt="" />' +
      '      </div><div class="concetric"></div>' +
      "    </div>";

    // $(clone).find(".header").html(id.replace("_"," "))
    $("body").prepend(clone);
    // console.log(clone)
  });
}





$("g .cls-7").each(function (num, val) {
  $(val).parent().find(".cls-1").addClass("active")
})

var mySwiper = new Swiper('.swiper-container', {
  speed: 400,
  spaceBetween: 100,
  effect: "fade",
  allowTouchMove: false,
  fadeEffect: {
    crossFade: true
  }
});




function fetchCSV() {


  $.ajax({
    url: './res/map_data.csv',
    method: 'get',
    success: function (data) {
      var d = csvJSON(data)
      console.log(d)
      var d2 = {}
      $.each(d, function (n, v) {
        d2[v.id] = v
      })


      addSlides(d2)
    }, error: function (e) {
      console.error(e)
    }
  })

}




function addSlides(MapData) {

  // console.log(MapData)


  slideIndex = {}

  var slides = [];
  $(".afraa_map g").each(function (num, val) {
    var m = $(val).find(".cls-1");
    var i = $(val).find(".cls-7");

    if (i.length != 0) {
      slideIndex[$(m).attr("id")] = num

      var id = $(m).attr("id");


      var hover_item = '<div class="hover-item hover-item-clone text-white ' +
        id +
        '">' +
        '      <div class="hover-content">' +
        '        <div class="header">' +
        id.replace(/\_/g, " ") +
        "</div>"



      var slide = '<div class="swiper-slide d-flex"><div class="align-self-center v-center  mt-0 px-3 mr-md-3 pr-5">'
      $(i).each(function (num, val) {

        var id2 = $(val).attr("id").replace(".", "")

        // console.log(id2)

        slide += '              <div class="mb-3">  <img src="' + MapData[id2]["logo"] + '" class="airline-logo mb-5" alt="" />  <h3 class="animated slideInUp"><b>' + MapData[id2].name + '</b></h3>'
          + '                  <div class=" animated slideInUp">'
          + '                    <p class="text-justify">'
          // + MapData[id2].description
          + '                    </p>'
          + ''
          + '                    </a> </div></div>'

        var name = MapData[id2].name
        hover_item += '  <div class="p-2"> <b class="d-block sub-topic">' + name + '</b>     <img src="' + MapData[id2]["logo"] + '" class="image" alt="" /> </div>'


      })

      hover_item += "  </div> <div class='concetric'></div></div>"
      slide += "</div></div>"

      // $("body").prepend(hover_item);
      slides.push(slide)
      // return false;
    }

  })


  mySwiper.appendSlide(slides)


}




function csvJSON(csv) {

  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }


  return result; //JSON

}

function scrollToMapContent() {
  $('html,body').animate({
    scrollTop: $(".swiper-slide").offset().top
  }, 1000, 'swing');
}