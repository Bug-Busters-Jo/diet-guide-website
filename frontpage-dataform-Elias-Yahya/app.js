firstImage = document.querySelector(".slideshow li")
secondImage = document.querySelectorAll(".slideshow li")[1]
thirdImage = document.querySelectorAll(".slideshow li")[2]
p = document.getElementById("description")
firstImage.addEventListener("animationstart", firstImageInfo)
firstImage.addEventListener("animationiteration", firstImageInfo)
secondImage.addEventListener("animationstart", secondImageInfo)
secondImage.addEventListener("animationiteration", secondImageInfo)
thirdImage.addEventListener("animationstart", thirdImageInfo)
thirdImage.addEventListener("animationiteration", thirdImageInfo)


function firstImageInfo(){
    p.textContent = "First Text"
}
function secondImageInfo(){
    p.textContent = "Second Text"
}
function thirdImageInfo(){
    p.textContent = "Third Text"
}