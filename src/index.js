let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
//code below
const toyContainer = document.getElementById("toy-collection");

//add server data to UI
function loadDOM(){
fetch("http://localhost:3000/toys")
.then(re => re.json())
.then(function(toyData){
  for(let i = 0; i < toyData.length; i++){
    let gridItem = document.createElement("div")
    toyContainer.append(gridItem)
    gridItem.setAttribute("class", "card")
    gridItem.innerHTML = `<h1>${toyData[i].name}</h2>
      <img src=${toyData[i].image} class='toy-avatar'>
      <p>${toyData[i].likes}</p>
      <button class='like-btn' id=${toyData[i].id}>Like ❤️</button>
      `
    // delete if
    function increaseLikes(){
      let likeButton = document.getElementById(toyData[i].id);
      likeButton.addEventListener('click', function(){
        fetch(`http://localhost:3000/toys/${toyData[i].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": `${++toyData[i].likes}`
          })
        })
        .then(re => re.json())
        .then(function(){
          let newestLike = likeButton.previousElementSibling;
          newestLike.textContent = toyData[i].likes;
        })
      })
      
    }
    increaseLikes()
    
  }

})
.catch(error => console.log(error.message))
}
loadDOM()

// work on the create new toy

function createNewToy(){
  let createToyForm = document.querySelector("form.add-toy-form");
  createToyForm.addEventListener("submit", function(event){
    event.preventDefault();
    let newToys = document.querySelectorAll("input.input-text");
    let newToyName = newToys[0].value
    let newToyImage = newToys[1].value
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": newToyName,
        "image": newToyImage,
        "likes": 0
      }) // could go south from here
    })
    loadDOM() // will dynamically load without refresh
  })
}

// only creates toy when add new toy button is clicked
function updateDom(){
  let addNewToy = document.getElementById("new-toy-btn");
  addNewToy.addEventListener("click", function(){
    createNewToy()
  })
}
updateDom()

//increase the likes upon click
/*function increaseLikes(){
  let likeButton = document.getElementById(toyData[i].id);
  likeButton.addEventListener('click', function(){
    fetch(`http://localhost:3000/toys/${toyData[i].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": `${toyData[i].likes ++}`
      })
    })
  })
  
}*/


  













});
