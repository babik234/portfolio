let icon = document.getElementById("hamburger");
let x = 1;

function changeImg() {
    console.log("DAS");
    if (x == 1) {
        icon.src = "imgs/X.png";
        document.getElementById("nav").style.height = 40 + "vh";
        document.getElementById("a").style.display = "flex";
        x = 0;
    } else {
        icon.src = "imgs/Hamburger_icon.svg.png";
        document.getElementById("a").style.display = "none";
        document.getElementById("nav").style.height = 10 + "vh";
        x++;
    }
}
