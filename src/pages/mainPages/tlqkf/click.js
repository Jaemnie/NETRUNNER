document.addEventListener('click', function(e) {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    spark.style.top = `${e.pageY - 5}px`;
    spark.style.left = `${e.pageX - 5}px`;
    document.body.appendChild(spark);
  
    // 애니메이션이 끝난 후 스파크 요소 제거
    spark.addEventListener('animationend', () => {
      spark.remove();
    });
  });