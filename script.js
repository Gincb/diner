fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function(response){
    return response.json()
})
.then(function(data){
    showData(data);

});


function showData(jsonData){
    console.log(jsonData);

    jsonData.forEach(makeDiner);

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

        console.log(jsonData.category);
        const whosYourDaddy = document.querySelector("main");
        whosYourDaddy.appendChild(myClone);
    }
   
}

