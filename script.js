// const input = document.getElementById("input");
// const btn = document.getElementById("btn");
// const body = document.querySelector("body");

// // btn.addEventListener("click", () => {
// //     fetch(`https://fakestoreapi.com/products/${input.value}`).then((response) => response.json()).then((data) => {
// //         console.log(data);
// //     })
// // })

// const getData = async () => {
//     let response = await fetch('https://randomuser.me/api/');
//     let data = await response.json();
//     console.log(data);
//     let card = document.createElement("div");
//     card.classList.add("w-[400px]", "h-[450px]", "border", "border-solid", "border-black", "rounded-xl", "p-4")
//     card.innerHTML = `
//         <img src="${data.results[0].picture.large}" alt="">
//         <h2>${data.results[0].name.first}</h2>
//         <p>email</p>
//         <span>tel</span>
//     `
//     // body.append(card)
// }
// getData();

// btn.addEventListener("click", () => {
//     window.location.reload();
// });



const ul = document.getElementById("ul");
const total = document.getElementById("total");
const container = document.getElementById("container");

let totalSum = 0;

function fetchAndRenderProducts() {
  fetch("https://fakestoreapi.com/products?limit=10")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = '';

      data.forEach((product) => {
        const shortDesc = product.description.length > 100
          ? product.description.slice(0, 100) + "..."
          : product.description;

        const card = document.createElement("div");
        card.classList.add(
          "w-[300px]", "p-4", "bg-white", "rounded-xl", "shadow",
          "flex", "flex-col", "items-center", "text-center", "gap-3"
        );

        card.innerHTML = `
          <img src="${product.image}" class="w-[200px] h-[200px] object-contain" alt="${product.title}" />
          <h2 class="text-lg font-bold text-gray-800">${product.title}</h2>
          <p class="text-sm text-gray-600">${shortDesc}</p>
          <div class="flex gap-3 items-center">
            <span class="text-green-500 font-semibold">$${product.price}</span>
            <button class="buy-btn px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Sotib olish
            </button>
          </div>
        `;

        // Savatga qo‘shish uchun tugmani ishlatamiz
        const buyBtn = card.querySelector(".buy-btn");
        buyBtn.addEventListener("click", () => {
          const li = document.createElement("li");
          li.classList.add("text-sm", "text-gray-700");
          li.textContent = `${product.title} - $${product.price}`;
          ul.appendChild(li);

          // Umumiy narxni yangilaymiz
          totalSum += product.price;
          total.textContent = `Umumiy: $${totalSum.toFixed(2)}`;

        });

        container.appendChild(card);
      });
    })
}

// Sahifa yuklanganda chaqiramiz
fetchAndRenderProducts();
