const fav = document.getElementById("favList");

const remFav = (id) =>{
    let oldFavList = JSON.parse(localStorage.getItem("fav")) || [];
    for(let i=0;i<oldFavList.length;i++){
        if(oldFavList[i].id==id) oldFavList.splice(i, 1);
    }
    localStorage.setItem('fav', JSON.stringify(oldFavList));
    location.reload()
}


const button = (data) =>{
    str = "";
    let oldFavList = JSON.parse(localStorage.getItem("fav")) || [];
    for(let i=0;i<oldFavList.length;i++){
        if(oldFavList[i].id==data.id){
            str=`<div onclick="remFav(${data.id})"><i class="fa-solid fa-heart-circle-minus"></i></div>`;
        }
        if(str=="") str = `<div onclick="addFav(${data.id},'${data.name}','${data.image.url}')"><i class="fa-regular fa-heart"></i></div>`;
    }
}


const format = (data) =>{
    
    
    return (
        `<div class="card col-lg-5 col-sm-9 m-4">
            <img src=${data.image} class="card-img-top result-img" alt=${data.name}>
            <div class="card-body">
                <h5 class="card-title d-inline">${data.name}</h5>
                <p class="card-text"></p>
                
                <div class="text-left d-flex flex-row-reverse justify-content-between" style="font-size:xx-large">
                <div onclick="remFav(${data.id})"><i class="fa-solid fa-heart-circle-minus"></i></div>    
                <a  href="./detail.html?id=${data.id}" class="btn btn-primary">Hero Details</a>
                </div> 
            </div>
        </div>`);

};



let favList = JSON.parse(localStorage.getItem("fav")) || [];
let str = "";

for (let data of favList){
    str+=format(data);
}

fav.innerHTML=str;


