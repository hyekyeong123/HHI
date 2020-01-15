$(document).ready(function(){
//#direct_mark를 눌렀을 때 #direct_cont를 보였다 숨겼다
//화살표도 돌려서
    $("#direct_mark").click(function(){
        $("#direct_cont").show();
        $(this).toggleClass("reverse");
    });
    // (!$("#direct_cont")).click(function(){ 
    //         $("#direct_cont").hide();
    // });
    $('html').click(function(e) { if(!$(e.target).hasClass("aaa")) {  $("#direct_cont").hide(); } });

    
     



//#pcnav에 마우스를 올리면 #pcnav(this)의 높이가 340px이 되도록 애니메이션 ,#back을 slidedown
//#pcnav에서 마우스를 치우면 #pcnav(this)의 높이가 80px의 높이가 80px이 
$("#pcnav, #back").mouseover(function(){
    $("#pcnav").stop().animate({
        height:"340px"
    },200);
    $("#back").stop().slideDown(200);
    
});
$("#back, #pcnav").mouseout(function(){
    $("#pcnav").stop().animate({
        height:"80px"
    },200);
    $("#back").stop().slideUp(200);
    });
   
    $("header").after("<div id='dummy'></div>")
    function setheader(){
       var headerH = $("header").height();
       $("#dummy").height(headerH);
    }
       
       $(".mmain>a").append("<span class='plus'>+</span>");
//모바일 메뉴바
//.mmain>a를 눌렀을 때 응당 해야할 일을 멈춰라
    $(".mmain>a").click(function(e){
        e.preventDefault();
    });
//.mmain의눌렀을때
//
//  지금 누른 그것 안에 있는 .msub가 보이고 있는가 ?
//  모든 .mmain으로부터 .active를 일단 뺏기
//      그렇다면 지금누른그것 안에 있는 .msub를 닫기
//      그렇지 않다면 지금 누른 그것 안에 있는 .msub를 열기
//         지금누른그것에 .aactive를 주기
//  열기가 끝나면 지금 누른 그것을 제외한 나머지 .mmain안에있는 .msub를 닫기
    $(".mmain").click(function(){
        $(".mmain").removeClass("aactive");
        $(".mmain").find(".plus").text("+");    
        if($(this).children(".msub").is(":visible")){
            $(this).children(".msub").stop().slideUp();
            
        }else{
            $(this).children(".msub").stop().slideDown();
            $(this).find(".plus").text("-");
            $(this).addClass("aactive");
        }
        
            $(this).siblings().children(".msub").delay(400).slideUp();
    });
    // //////////////////////////////////   
    $("#ham").click(function(){
        $("#mnav").animate({
            right:"0px"
        },300);
        $("#mback").fadeIn(200);
        $("html,body").css("overflow","hidden");
    });
    $("#mback, .msub").click(function() {
        $("#mnav").animate({
            right:"-250px"
        },300);
        $("#mback").fadeOut(200);
        $("html,body").css("overflow","auto");
    })
        //모바일에서 만들어진 각종 부산물들이 pc버전까지 묻어오는 것을 초기화하는 함수
    //화면 가로길이가 1025초과일때 pcini실행
    function pcini() {
        $("#mnav").removeAttr("style");
        $("#mback").removeAttr("style");
    }
    setheader();
    //resize도 function안에 넣기 //문법 헷갈리지 말자ㅠㅠㅠㅠ
    $(window).resize(function(){
        setheader();
        var winW = $(window).outerWidth();
        if(winW>1025){
            pcini();
            $("html,body").css("overflow","auto");
        }
    });
//#linkbtn이 눌렀을 때 #linklist의 value가 무엇인지 알아보고 
//만약 그 값이 공백이 아니면  
//""
//  새 이름으로 새 창을 띄우고 그 해당 value를 방금 띄운 새창에 주소로 삽입한다.
    var count=0;
    $("#linkbtn").click(function(){
        count++;
        var linkval=$("#linklist").value();
        if(linkval != ""){
            window.open(linkval,"pop"+count);
        }
    });
//BreadCrumb 구동부
    var urlset = [
        ["intro0","intro1"],
        ["part0","part1"],
        ["add0","add1"],
        ["manage0","manage1"],
        ["coop0","index"]
    ];
//현재 주소 가져오기 hhi/ 옆에 있는 것만 가져오는 것이 pathname임 
    var path = window.location.pathname;
    var page = path.split("/").pop();
    page=page.split(".").shift();
//  
    //혼자 해보다가 망한 거 
    // var page2;
    // var bbb =[];
    // for(i=0;i<uriset.lenght;i++){
    //     if(urlset[i][0]==page){
    //         bbb[0] = urlset[i][0].push();
    //         for(j=0;j<urlset[i].length;j++){
    //             if(urlset[i][j]==page){
    //                 bbb[1] =urlset[i][j].push();
    //             } 
    //         }
    //     }
    // }
//굳이 i번째 j번째 나눠서 할 필요없자나 한번에 할수 있찌

//urlset라는 아파트에서 page라는 이름을 가진 값이 몇층 몇호에 있는지 수색
//1. 우리 아파트가 몇 층이지?
//2. 각 층별로 수색.
//  2-1. 이번층 복도에는 몇개의 호실이 있지?
//  2-2. 각 호실별로 수색
//      이때 page라는 이름이 같은 값이 발견되면!
//         그때의 층수 =>층수
//          그때의 호수 =>호수
    var mainnum;
    var subnum;
    var level = urlset.length;
    for(i=0;i<level;i++){
        var room = urlset[i].length;
        for(j=0;j<room;j++){
            if(urlset[i][j]==page){
                mainnum=i;
                subnum=j
            }
        }
    }
//mainnum을 보고 depth2에 넣어줄 값을 찾아서 넣어주기 
//예를 들어 두번째 대메뉴를 보고 있다면 =>홍보의 서브메뉴를 찾아야함
    //서브메뉴의 href를 담을 변수 =>subhref[]
    //서브메뉴의 text를 담을 변수 =>subtext[]
//2번째 메인의 childen("ul") ul자식들을 찾아서 
//즉 .main중에 mainnum번째 안에 들어있는 .sub안에 들어있는 li의 갯수대로 반복한 후 
//  그것(li) 안에 있는 a태그이 href속성값과 text를 알아내서 
//  안의 a의 href값과 텍스트값을 위의 변수 배열에 저장
    var subhref =[];
    var subtext =[];
    var lilen = $(".main").eq(mainnum).find("li").length;
    for(i=0;i<lilen;i++){
        subhref[i] = $(".main").eq(mainnum).find("li").eq(i).children("a").attr("href");
        subtext[i] = $(".main").eq(mainnum).find("li").eq(i).children("a").text();
    }
//depth2안쪽에 새로운 a들을 만들어 내는 단계
//li의 갯수만큼  새로운 a들을 만들기 값을 넣어서    
    // for(i=0;i<lilen;i++){
    //     $("#depth2_cont").append("<a href=''></a>");
    //     $("#depth2_cont").children("a").eq(i).attr("href","subhref[i]");
    //     $("#depth2_cont").children("a").eq(i).text("subtext[i]");
    // }
    //훨씬 간단하게 만드는 방법이 있었음......
    for(i=0;i<lilen;i++){
        $("#depth2_cont").append("<a href='"+subhref[i]+"'>"+subtext[i]+"</a>");
    }
//#depth1_mark내용 넣어주기
//#depth1_cont안에 들어있는 a중에 mainnum번째의 글자내용을 알아내서 
//depth1_mark안에 넣어주기
    $("#depth1_mark").text($("#depth1_cont>a").eq(mainnum).text());
//#depth2_mark내용 넣어주기
//#depth2_cont안에 들어있는 a중에 subnum번째의 글자내용을 알아내서 
//depth2_mark안에 넣어주기
    $("#depth2_mark").text($("#depth2_cont>a").eq(subnum).text());
//#depth1을 눌렀을 때 #depth1_cont가 등장 사라지기
    $("#depth2_cont").hide();
    $("#depth1_cont").hide();
    $("#depth1").click(function(){
        $("#depth2_cont").hide();
        $("#depth1_cont").toggle();
    });
//#depht2를 눌렀을때 #depth2를 눌렀을때 depth2_cont가 등장 사라지기
    $("#depth2").click(function(){
        $("#depth1_cont").hide();
        $("#depth2_cont").toggle();
    });
    $("#depth2_cont, #depth1_cont").mouseleave(function(){
        $("#depth1_cont").hide();
        $("#depth2_cont").hide();
    });
//------------------------------------------------------------------------------
//페이지 내 모든 table태그에게 다음과 같이 따로 따로 이야기하겠다.
//그 테이블 안쪽에 있는 내용을 잘 갈무리 해놓고
//그 테이블 아래에 <div class='newtable'></div>를 만들고 원본 삭제
//아까 갈무리한 내용을 그 table 다음의 newtable의 안쪽에 넣어준다. 
                            //콜백함수
    $("table").each(function(){
        var almengi = $(this).html();
        var kkubdegi = this.attributes;
                        //모든 요소의 속성 값 가져오기

                        //new Object();
        var attrlen = this.attributes.length;

        $(this).after("<div class='newtable'><table></table></div>");
        $(this).next(".newtable").children("table").append(almengi);
        for(i=0; i<attrlen;i++){
            var key = kkubdegi[i].name;
            var value = kkubdegi[i].value;
            $(this).next(".newtable").children("table").attr(key,value);
        }
        $(this).remove();
    });
//----------------------------------------------------------------------------   
    //모든 tabcont중에서 nth번째만 다시 보여줌
    $(".tabbtn").click(function(){
        $(".tabbtn").removeClass("tactive");
        $(this).addClass("tactive");
        
        var nth = $(this).index();
        $(".tabcont").hide();
        $(".tabcont").eq(nth).show();
    });
//--------------------------------------------------------------------
//".라는 리스트들의 li태그안쪽에 파란박스, 내용이 들어갈 박스 만들어주기
    function makenum(name){    
        $(name).each(function(){
            $(this).children("li").each(function(){
                var txt = $(this).text();
                var nth = $(this).index();
                $(this).empty();
                $(this).append("<div class='li-num'></div><div class='li-txt'>"+txt+"</div>");
                $(this).children(".li-num").text(nth+1);
            });
        });
    }
    makenum(".list-blue");
    makenum(".list-circle");
    // $(".list-circle").find("li-num").each(function(){
    //     var aaa = $(this).text();
    //     if(aaa>9){
    //         $(this).css("letterSpacing","-0.17em");
    //     }
    // });
    $(".list-circle>li>.li-num").each(function(){
        if($(this).text().length >=2){
            $(this).css({
                letterSpacing:"-0.17em",
                textIndent:"-0.2em"
            });
        }
    });
    $(".box-title").each(function(){
        var cont=$(this).html();
        $(this).empty();
        $(this).append("<span></span>");
        $(this).children("span").html(cont);
    });
//---------------------------------------------------------------














});