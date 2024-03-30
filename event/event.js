$(document).ready(function() {
    // Accordion 기본적으로 숨김 처리
    $("#accordion").hide();

    // icon1 클릭 이벤트 처리
    $("#icon1").click(function() {
        // Accordion 표시/숨김 토글
        $("#accordion").toggle();
    });
});
