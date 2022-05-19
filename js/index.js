const searchHero = document.getElementById("search-hero");
const searchResults = document.getElementById("results");


searchHero.addEventListener("keyup", function(){
    var xhrRequest = new XMLHttpRequest();
    var searchValue = this.value;
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
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text"></p>
                <a href="./detail.html?id=${data.id}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`);

};