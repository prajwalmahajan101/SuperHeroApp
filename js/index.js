const searchHero = document.getElementById("search-hero");
const searchResults = document.getElementById("results");


searchHero.addEventListener("keyup", function(){
    let xhrRequest = new XMLHttpRequest();
    let searchValue = this.value;
    if(searchValue.length <= 2){
        searchResults.innerHTML = "";
        return;
    }
    xhrRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhrRequest.responseText);
            if(response.response === "error"){
                searchResults.innerHTML = "";
                return;
            }
            const results = response.results;
            // console.log(results);
            let str = "";
            for(let result of results){
                str+=format(result);
            }
            searchResults.innerHTML=str;


        }
    };
    xhrRequest.open("GET", "https://www.superheroapi.com/api.php/3383566708344630/search/"+searchValue, true);
    xhrRequest.send();
});

const format = (data) =>{
    return (
        `<div class="card col-lg-5 col-sm-9 m-4">
            <img src=${data.image.url} class="card-img-top result-img" alt=${data.name}>
            <div class="card-body">
                <h5 class="card-title d-inline">${data.name}</h5>
                <p class="card-text"></p>
                
                <div class="text-left d-flex flex-row-reverse justify-content-between" style="font-size:xx-large">
                    <div class="addFav"><i class="fa-regular fa-heart"></i></div>
                    <a  href="./detail.html?id=${data.id}" class="btn btn-primary">Hero Details</a>
                </div> 
            </div>
        </div>`);

};

const divarr = 


const addFav =(data) =>{
    let oldFavList = JSON.parse(localStorage.getItem("favHeroes")) || [];
    let favItem = {
        id: data.id,
        name: data.name,
        image: data.image.url
    }
    oldFavList.push(favItem);
    console.log(oldFavList);
    
    localStorage.setItem('favHeroes', JSON.stringify(oldFavList));



}