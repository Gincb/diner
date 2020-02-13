window.addEventListener("DOMContentLoaded", fetchCategories);

const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});

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

    myClone.querySelector(".img").style.backgroundImage = `url('https://kea-alt-del.dk/t5/site/imgs/large/${jsonData.image}.jpg')`;

    if(jsonData.soldout == true) {
        myClone.querySelector("#soldout").textContent = "Sold Out";
        myClone.querySelector("#soldout").style.color = "tomato";
        myClone.querySelector("#soldout").style.textDecoration = "underline";
    }else{
        myClone.querySelector("#soldout").style.display = "none"; 
    }

    if(jsonData.vegetarian == false) {
        myClone.querySelector("#vegan").style.display = "none"; 
    }

    if(jsonData.discount > 0) {
        const newPrice = Math.round(jsonData.price - jsonData.price * jsonData.discount / 100);
        myClone.querySelector("#price span").textContent = "Discount! " + newPrice;
        myClone.querySelector("#price").style.backgroundColor = "#FFEC8F";
    }else{
        myClone.querySelector("#price span").textContent = jsonData.price;
    } 

    myClone.querySelector("button").addEventListener("click", () => {
        console.log("click", jsonData)
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${jsonData.id}`)
          .then(res => res.json())
          .then(showDetails);
    });

    function showDetails(data) {
        console.log(data)
        modal.querySelector(".modal-name").textContent = data.name;
        modal.querySelector(".modal-description").textContent = data.longdescription;
        modal.classList.remove("hide");
    }
      
    function dumbStuff() {
    const all = document.querySelectorAll("article, article>*");
    console.log(all)
        setInterval(() => {
        const a = all[Math.floor(Math.random() * all.length)];
        animate(a);
    
    }, 100)
    }
      
    function animate(el) {
        el.style.transition = 'all 3s';
        el.style.transform = `translate(${Math.random()*200-100}vw, ${Math.random()*200-100}vh) scale(${Math.random()+.5})`;
    }
    

    const where = document.querySelector("main");
    document.querySelector(`#${jsonData.category}`).appendChild(myClone);
    where.appendChild(myClone);
}