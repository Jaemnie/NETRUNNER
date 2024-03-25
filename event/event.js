$(document).ready(function() {
    // 초기에 #accordion과 #shop 숨김
    $("#accordion, #shop, #feedback, #selectable").hide();


    $("#accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "fill",
    });

    $("#accordion-resizer").resizable({
        minHeight: 140,
        minWidth: 200,
        resize: function() {
            $("#accordion").accordion("refresh");
        }
    });

    // #icon1 클릭 이벤트 처리
    $("#icon1").click(function() {
        // #shop을 숨기고 #accordion 표시/숨김 토글
        $("#shop, #feedback, #selectable").hide();
        $("#accordion").toggle();
    });

    // #icon2 클릭 이벤트 처리
    $("#icon2").click(function() {
        // #accordion을 숨기고 #shop 표시/숨김 토글
        $("#accordion").hide();
        $("#shop, #feedback, #selectable").toggle();
    });
    
});

$( function() {
    $( "#selectable" ).selectable({
      stop: function() {
        var result = $( "#select-result" ).empty();
        $( ".ui-selected", this ).each(function() {
          var index = $( "#selectable li" ).index( this );
          result.append( " #" + ( index + 1 ) );
        });
      }
    });
  } );