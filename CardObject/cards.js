document.addEventListener("DOMContentLoaded", function(){ 
   fetch('/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav').innerHTML = data;
    });

});

let cards = new Array()


function Card(name,email,birthdate,address,phone) {
   this.name = name;
   this.email = email;
   this.birthdate = birthdate;
   this.address = address;
   this.phone = phone;
}

document.getElementById("addCard").addEventListener("click", function() {
   
   let name = document.getElementById("name");
   let email = document.getElementById("email")
   let bday = document.getElementById("birthdate")
   let address = document.getElementById("address")
   let phone = document.getElementById("phone")

   cards.push(new Card(name.value, email.value, bday.value, address.value, phone.value));

   name.value = "";
   email.value = "";
   bday.value = "";
   address.value = "";
   phone.value = "";
});

document.getElementById("displayCards").addEventListener("click", function() {
   
   let con = document.getElementById("cardContainer");

   for(let i = 0; i < cards.length; i++){
      const newCard = document.createElement("div");
      newCard.className = "Card";
      let temp = "";
      temp += "<strong>Name: </strong>" + cards[i].name + "<br>";
      temp += "<strong>Email: </strong>" + cards[i].email + "<br>";
      temp += "<strong>Birthdate: </strong>" + cards[i].birthdate + "<br>";
      temp += "<strong>Address: </strong>" + cards[i].address + "<br>";
      temp += "<strong>Phone: </strong>" + cards[i].phone + "<hr>";
      newCard.innerHTML = temp;
      
      con.appendChild(newCard);
   }

   
});


