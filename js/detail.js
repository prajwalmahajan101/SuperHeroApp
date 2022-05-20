const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());



const details = document.getElementById('details');
// console.log(params);


let id = params['id'];

console.log(id);



let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(xhttp.responseText);
        if(response.response === "error"){
            console.log("error fetching data");
            return;
        }

        //showing the data on screen
        details.innerHTML = format(response);
        addButton(response.id,response.name,response.image.url);
    }
};

xhttp.open("GET", "https://www.superheroapi.com/api.php/3383566708344630/"+id, true);
xhttp.send();



const format = (data) =>{
    return (
        `<div class="card col-lg-10 col-sm-9 m-4">
            <img src=${data.image.url} class="card-img-top result-img" alt=${data.name}>
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">
                    <ul>
                        <li>Aliases: ${listdata(data.biography.aliases)}</li>
                        <li>Intelligence: ${data.powerstats.intelligence}</li>
                        <li>Strength: ${data.powerstats.strength}</li>
                        <li>Speed: ${data.powerstats.speed}</li>
                        <li>Durability: ${data.powerstats.durability}</li>
                        <li>Power: ${data.powerstats.power}</li>
                        <li>Combat: ${data.powerstats.combat}</li>
                    </ul>

                </p>
                <div class="text-left d-flex flex-row-reverse" style="font-size:xx-large">
                <div id="button${data.id}">
                
                </div>
                </div>    
            </div>
        </div>`);

};


const listdata = (list) =>{
    let str = "";
    // console.log(list);
    for(let a of list) str+=a+', '
    if(str!="") return str.substring(0,str.length-2);
    return "Loding.....";
}




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
    div.innerHTML = `<div onclick="remFav(${id},'${name}','${url}')"><i class="fa-solid fa-heart-circle-minus"></i></div>`;
};

const remFav = (id,name,url) =>{
    let oldFavList = JSON.parse(localStorage.getItem("fav")) || [];
    for(let i=0;i<oldFavList.length;i++){
        if(oldFavList[i].id==id) oldFavList.splice(i, 1);
    }
    localStorage.setItem('fav', JSON.stringify(oldFavList));
    div = document.getElementById('button'+id);
    div.innerHTML = `<div onclick="addFav(${id},'${name}','${url}')"><i class="fa-regular fa-heart"></i></div>`;
};




const addButton = (id,name,url)=>{
    // console.log("Adding button");
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








