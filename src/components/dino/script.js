const goose = document.getElementById("goose");
const cactus = document.getElementById("cactus");

document.addEventListener("keydown" function(event) {
    jump();
});
function jump () {
    if (goose.classList !="jump") {
        goose.classList.add("jump")
    }
    setTimeout( function() {
        goose.classList.remove("jump")
    }, 300)
}