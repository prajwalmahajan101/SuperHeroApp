
// Search Bar
const searchHero = document.getElementById("search-hero");

// Div to Show the Results
const searchResults = document.getElementById("results");




// For Showing the Results
searchHero.addEventListener("keyup", function () {
    let xhrRequest = new XMLHttpRequest();
    let searchValue = this.value;
    // if value's length is less then 3 return 
    if (searchValue.length <= 2) {
        searchResults.innerHTML = "";
        return;
    }
    // making call 
    xhrRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhrRequest.responseText);
            if (response.response === "error") {
                searchResults.innerHTML = "";
                return;
            }
            const results = response.results;
            let str = "";
            // Fromating Data
            for (let result of results) str += format(result);
            // Showing data
            searchResults.innerHTML = str;
            // Adding Buttons
            for (let result of results) addButton(result.id,result.name,result.image.url);


        }
    };
    xhrRequest.open("GET", "https://www.superheroapi.com/api.php/3383566708344630/search/" + searchValue, true);
    xhrRequest.send();
});


// Format the Json data to Html Code
const format = (data) => {


    return (
        `<div class="card col-lg-5 col-sm-9 m-4">
            <img src=${data.image.url} class="card-img-top result-img" alt=${data.name}>
            <div class="card-body">
                <h5 class="card-title d-inline">${data.name}</h5>
                <p class="card-text"></p>
                
                <div class="text-left d-flex flex-row-reverse justify-content-between" style="font-size:xx-large">
                    <div id="button${data.id}"></div>
                    <a  href="./detail.html?id=${data.id}" class="btn btn-primary">Hero Details</a>
                </div> 
            </div>
        </div>`);

};


// Add to Fav clickHandler
const addFav = (id, name, url) => {
    let oldFavList = JSON.parse(localStorage.getItem("fav")) || [];
    for (let i = 0; i < oldFavList.length; i++) {
        if (oldFavList[i].id == id) return;
    }
    let favItem = {
        id: id,
        name: name,
        image: url
    }
    oldFavList.push(favItem);
    localStorage.setItem('fav', JSON.stringify(oldFavList));
    div = document.getElementById('button'+id);
    // Change button to Remove for Fav
    div.innerHTML = `<div onclick="remFav(${id},'${name}','${url}')"><i class="fa-solid fa-heart-circle-minus"></i></div>`;
};


// Remove from Fav Handler
const remFav = (id,name,url) =>{
    let oldFavList = JSON.parse(localStorage.getItem("fav")) || [];
    for(let i=0;i<oldFavList.length;i++){
        if(oldFavList[i].id==id) oldFavList.splice(i, 1);
    }
    localStorage.setItem('fav', JSON.stringify(oldFavList));
    div = document.getElementById('button'+id);
    // Change button to Add to fav
    div.innerHTML = `<div onclick="addFav(${id},'${name}','${url}')"><i class="fa-regular fa-heart"></i></div>`;
};

// Add Button According to the Fav list
const addButton = (id,name,url)=>{
    console.log("Adding button");
    let oldFavList = JSON.parse(localStorage.getItem("fav")) || [];
    div = document.getElementById('button'+id);
    for (let i = 0; i < oldFavList.length; i++) {
        if (oldFavList[i].id == id) {
            div.innerHTML = `<div onclick="remFav(${id},'${name}','${url}')"><i class="fa-solid fa-heart-circle-minus"></i></div>`;
            return;
        }
    }
    div.innerHTML = `<div onclick="addFav(${id},'${name}','${url}')"><i class="fa-regular fa-heart"></i></div>`;

}


