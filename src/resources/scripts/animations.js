export function animationBtnNode(e) {
  for (let i = 0; i < 100; i++) {
    let spark = document.createElement("i");
    spark.classList.add("spark");

    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";

    const randomX = (Math.random() - 0.5) * window.innerWidth;
    const randomY = (Math.random() - 0.5) * window.innerHeight;
    spark.style.setProperty("--x", randomX + "px");
    spark.style.setProperty("--y", randomY + "px");

    const randomSize = Math.random() * 8 + 2;
    spark.style.width = randomSize + "px";
    spark.style.height = randomSize + "px";

    const duration = Math.random() * 2 + 0.5;
    spark.style.animation = `animate ${duration}s ease-out forwards`;

    document.body.appendChild(spark);

    setTimeout(function () {
      spark.remove();
    }, 2000);
  }
}
