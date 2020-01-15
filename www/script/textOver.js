//GNU 라이센스
//소프트웨어의 실행, 연구, 공유, 수정의 자유를 최종 사용자에게 보장

//    GNU GENERAL PUBLIC LICENSE
//Version 2, June 1991
//Copyright (C) 1989, 1991 Free Software Foundation, Inc.,
//51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
//Everyone is permitted to copy and distribute verbatim copies
//of this license document, but changing it is not allowed.

//본 스크립트는 대우직업전문학교 한지호가 제작하였으며 누구나 수정, 배포 할 수 있습니다. 
//개발일자 2019년 11월 11일
//
//1. 본문에서 .txtover라는 상자를 찾아서 각 상자마다 다음과 같이 이야기하겠다.
//2. .txtover라는 상자의 내용을 잘 저장해 두고 그 상자를 비운다.

//3. 그 상자 안에 .compare라는 상자를 만든다.
//4. 아까 갈무리해준 내용을 " "기준으로 다진다.
//5. 다져진 단어 수 만큼 반복
//  5-1. i번째 단어를 <span>으로 묶어서 그 상자 안에 있는 .compare에 추가한다. +" "
//  5-2. .compare의 높이를 재고 그 높이가 그 상자의 높이보다 크다면 
//      그 상자 안에 있는 compare안에 있는 span중에 마지막을 지운다. 
//      ...(&hellip;)을 추가한 후 반복문을 중지한다.  

// $(".txtover").each(function(){ 
//     var bbb= $(this).text();
//     $(this).empty();
//     $(this).append("<div class='.compare'></div>");
//     var fff=bbb.split(" ");
//     var hhh= $(this).height();  //예를 들어서 70이라고 해보자
    
    
//     for(i=0;i<fff.length;i++){
//                                         //띄어쓰기 넣어줘야함
//         var ccc=fff.eq(i).append("<span>"+eq(i)+"</span>");
//         $(this).children(".compare").text(ccc);
//         var comh = $(this).children(".compare").height();
        
//         if(comh>hhh){
//             $(this).children(".compare").eq(fff.length-1).remove();
//                                         //("span:last-of-type")
//             $(this).children(".compare").eq(fff.length-1)+"...";
//             break;
//             //반복문 중지를 안해서???
//         }
//     }
// });


$(document).ready(function(){
    function textover(){
        $(".txtover").each(function(){
            var oldtxt;
            if(!this.hasAttribute("title")){
                oldtxt = $(this).text();
                $(this).attr("title",oldtxt);
            }else{
                oldtxt = $(this).attr("title");
            }
            
            
            
            $(this).html("<div class='compare'></div>");
            //html은 지우고 다시 만드는 거임
            var oldword = oldtxt.split(" ");
            var originH = $(this).height();
            
            
            for(i=0; i<oldword.length; i++){
                $(this).children(".compare").append("<span>"+oldword[i]+" </span>");
                var newH =$(this).children(".compare").height();
                
                if(originH < newH){
                    $(this).children(".compare").children("span:last-of-type").remove();
                    $(this).children(".compare").append("&hellip;");
                    break;
                }
            }
        });
    };
    textover();
    $(window).resize(function(){
        textover();
    });
});
    
    