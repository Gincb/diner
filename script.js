window.addEventListener("DOMContentLoaded", fetchCategories);

function fetchCategories(e){
    fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories);
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        showData(data);
    });
}

function createCategories(data) {
    console.log(data);
    data.forEach(function(oneCat) {
        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat}`);
        a.textContent = `${oneCat}`;
        document.querySelector(".categories").appendChild(a);
        console.log(oneCat);
        const section = document.createElement("section");
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);
        document.querySelector("main").appendChild(section);
    });
    getProducts();
}

function showData(jsonData){
    console.log(jsonData);

    jsonData.forEach(makeDiner);   
}

function makeDiner(jsonData) {
    const templateElement = document.querySelector("#template").content;
    const myClone = templateElement.cloneNode(true);

    myClone.querySelector("h1").textContent = jsonData.name;
    myClone.querySelector(".sd").textContent = jsonData.shortdescription;
    myClone.querySelector(".p").textContent = jsonData.price;

    if(jsonData.soldout == true) {
        myClone.querySelector("#soldout").textContent = "Sold Out";
    }else{
        myClone.querySelector("#soldout").style.display = "none"; 
    }

    if(jsonData.vegetarian == true) {
        myClone.querySelector("#vegan").textContent = "Vegan";
    }else{
        myClone.querySelector("#vegan").style.display = "none"; 
    }

    if(jsonData.discount > 0) {
        myClone.querySelector("#price").style.textDecoration = "line-through";
        myClone.querySelector("#price").style.textDecorationColor = "tomato";
        myClone.querySelector("#discount span").textContent = jsonData.discount;
    }else{
        myClone.querySelector("#discount").style.display = "none"; 
    } 

    const where = document.querySelector("main");
    document.querySelector(`#${jsonData.category}`).appendChild(myClone);
    where.appendChild(myClone);
}