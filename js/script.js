
console.log("Javascript file connected");

let sortAllPets = [];
let sortPetsByCategory = []

const loadAllCategoriesBtn = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories")
    const data = await response.json();
    displayAllCategoriesBtn(data.categories)
}

const displayAllCategoriesBtn = (categories) => {
    // console.log(categories)

    const categoryButtonContainer = document.getElementById("category-buttons");

    categories.forEach(button => {
        // console.log(button)
        const div = document.createElement("div");
        div.innerHTML = `
        <button id="btn-${button.category}" onclick="loadPetsByCategory('${button.category}')" class="category-active-btn border border-blue-100 rounded-lg px-3 md:px-8 lg:px-12 py-2 md:py-3 cursor-pointer flex items-center gap-1 md:gap-2  hover:bg-blue-50">
        <img class="w-4 h-4  md:w-10 md:h-10" src="${button.category_icon}" />
        <h2 class="text-base md:text-xl font-bold text-color-primary">${button.category}</h2>
        </button>
        `;
        categoryButtonContainer.appendChild(div)

    })

}

const loadAllCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
    const data = await response.json();
    sortAllPets = data.pets;
    displayAllCategories(data.pets);
}



const displayAllCategories = (pets) => {

    // console.log(pets)

    const petsContainer = document.getElementById("pets-container");
    document.getElementById("pets-container").innerHTML = "";

    if (pets.length < 1) {
        const div = document.createElement("div");
        petsContainer.classList.remove("grid");

        div.classList = " "
        div.innerHTML = `
        <div class="text-center min-h-96 rounded-lg bg-blue-50 flex flex-col items-center justify-center">
            <img class="w-20 h-auto md:w-auto" src="images/error.webp" />
            <h2 class="font-bold text-xl md:text-2xl lg:text-3xl text-color-primary mt-6 mb-4">No Information Available</h2>
            <p class="w-11/12 md:w-10/12">No information available at the moment. Please check back later for updates or feel free to contact us for further details.</p>
        <div>

        `
        petsContainer.appendChild(div)
    } else {
        petsContainer.classList.add("grid")
    }


    pets.forEach(pet => {
        // console.log(pet)
        const div = document.createElement("div");
        div.classList = "border rounded-lg p-5 flex flex-col gap-4"
        const { breed, category, date_of_birth, gender, image, pet_name, price, pet_details, petId, vaccinated_status } = pet;


        // console.log(petId)
        div.innerHTML = `
        <div class=" h-48 md:h-40 w-full">
            <img class="rounded-lg w-full h-full object-cover " src="${image}" />
        </div>
        <div class="flex flex-col gap-1">
            <h2 class="text-lg font-bold text-color-primary" >${pet_name}</h2>
            <div class="flex items-center gap-1 w-full">
                <img class="w-4 h-4" src="images/breed.png" />
                <p>Breed: ${breed ? breed : `Not Available`}</p>
            </div>
            <div class="flex items-center gap-1 w-full">
                <img class="w-4 h-4" src="images/calender.png" />
                <p>Birth: ${date_of_birth ? date_of_birth : `Not Available`}</p>
            </div>
            <div class="flex items-center gap-1 w-full">
                <img class="w-4 h-4" src="images/gender.png" />
                <p>Gender: ${gender ? gender : `Not Available`}</p>
            </div>
            <div class="flex items-center gap-1 w-full">
                <img class="w-4 h-4" src="images/dolar-icon.png" />
                <p>Price: ${price ? price : `Not Available`}</p>
            </div>

            <div class="border my-2"></div>

            <div class="flex items-center gap-1 justify-between">
                <button onclick="likePetsHistory('${image}')" class="text-base font-semibold text-color-third border rounded-lg px-2 py-1 bg-white hover:bg-blue-50 transition ease-linear duration-200" ><img class="w-6 h-6" src="images/like-icon.png" /></button>
                <button id="btn-${petId}" onclick="showAdoptModal(3, '${petId}')" class="text-base font-semibold text-color-third border rounded-lg px-2 py-1 bg-white hover:bg-blue-50 transition ease-linear duration-200" >Adopt</button>
                
                <button onclick="loadPetDetails('${petId}')" class="text-base font-semibold text-color-third border rounded-lg px-2 py-1 bg-white hover:bg-blue-50 transition ease-linear duration-200" >Details</button>
            </div>
        </div>
        
        `
        petsContainer.appendChild(div);

    })
}

const likePetsHistory = (image) => {
    // console.log(image)
    const likePetHistoryContainer = document.getElementById("like-pet-history-container")
    // console.log(likePetHistoryContainer)

    const div = document.createElement("div")
    div.innerHTML = `
        <img class="rounded-lg w-full h-full object-cover" src="${image}" />
    `
    likePetHistoryContainer.appendChild(div)
}

const removeActiveClass = () => {
    const categoryButtons = document.getElementsByClassName("category-active-btn");
    //  console.log(categoryButtons)

    for (let btn of categoryButtons) {
        btn.classList.remove("active")
    }
}


const loadPetsByCategory = async (category) => {
    //   console.log(category)

    document.getElementById("loading-spinner").style.display = "block"
    document.getElementById("show-result").style.visibility = "hidden"

    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await response.json();
     
    sortPetsByCategory = data.data;

    removeActiveClass();

    const activeCategoryBtn = document.getElementById(`btn-${category}`);
    activeCategoryBtn.classList.add("active")

    setTimeout(() => {
        document.getElementById("loading-spinner").style.display = "none"
        document.getElementById("show-result").style.visibility = "visible"
        displayAllCategories(data.data)
    }, 2000);

    if(data.data.length < 1){
           sortAllPets = data.data;
     }
}

const loadPetDetails = async (petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);

    const data = await response.json();
    displayDetails(data.petData);
}

const displayDetails = (petData) => {

    const modalContainer = document.getElementById("my_modal_1")


    console.log(petData);


    const { breed, category, date_of_birth, gender, image, petId, pet_details, pet_name, price, vaccinated_status } = petData;

    // console.log(breed)


    modalContainer.innerHTML = ` <div class="modal-box flex flex-col gap-4">
    <div class="w-full max-h-80">
        <img class="w-full h-full object-cover rounded-lg" src="${image}" />
    </div>
    <div>
        <h3 class="text-xl md:text-2xl mb-2 font-bold text-color-primary">${pet_name}</h3>
        <div>
            <div class= "flex flex-col md:flex-row items-center md:gap-3 md:justify-between">
                <div class="flex items-center gap-1 w-full">
                    <img class="w-4 h-4" src="images/breed.png" />
                    <p>Breed: ${breed ? breed : `Not Available`}</p>
                </div>
                <div class="flex items-center gap-1 w-full">
                    <img class="w-4 h-4" src="images/calender.png" />
                    <p>Birth: ${date_of_birth ? date_of_birth : `Not Available`}</p>
                </div>
            </div>
            <div class= "flex flex-col md:flex-row items-center md:gap-3 md:justify-between">
                <div class="flex items-center gap-1 w-full">
                    <img class="w-4 h-4" src="images/gender.png" />
                    <p>Gender: ${gender ? gender : `Not Available`}</p>
            </div>
                <div class="flex items-center gap-1 w-full">
                <img class="w-4 h-4" src="images/dolar-icon.png" />
                <p>Price: ${price ? price : `Not Available`}</p>
                </div>
            </div>
            <div class= flex items-center gap-3 justify-between>
                <div class="flex items-center gap-[2px] w-full">
                    <img class="w-[18px] h-auto" src="https://image.shutterstock.com/image-vector/injection-noodle-icon-trendy-flat-260nw-738082048.jpg" />
                    <p>Vaccinated status: ${vaccinated_status ? vaccinated_status : `Not Available`}</p>
                </div>
            </div>
        </div>
        <div class="border my-4"></div>
        
        <div>
           <h2 class="text-lg font-bold text-color-primary">Details Information:</h2>
            <p class="pt-2">${pet_details}</p>
        </div>
    </div>
    <div class="modal-action justify-center border rounded-lg border-color-third ">
      <form method="dialog" class="w-full">
        <button class="btn w-full text-base md:text-xl bg-blue-50 hover:bg-blue-200 py-3 text-color-third">Cancel</button>
      </form>
    </div>
  </div>`

    my_modal_1.showModal()
}

const showAdoptModal = (seconds, petId) => {

    const adoptModal = document.getElementById("adopt_modal")
    const countText = document.getElementById("count");

    // console.log(seconds)
    let time = parseInt(seconds);
    // console.log(typeof time)
    adoptModal.classList.remove("hidden");

    const countdownInterval = setInterval(() => {
        // console.log(time)
        time--;
        countText.innerText = time;

        if (time < 1) {
            clearInterval(countdownInterval);
            adoptModal.classList.add('hidden');
            countText.innerText = 3;
        }
    }, 1000);

    const adoptBtn = document.getElementById(`btn-${petId}`)
    setTimeout(() => {
        // console.log(adoptBtn)
        adoptBtn.setAttribute("disabled", true)
        adoptBtn.classList = "text-base font-semibold text-color-secondary border rounded-lg px-2 py-1 bg-gray-200"
        adoptBtn.innerText = "Adopted"

    }, 3000)

}

// Sort part 

const sortPetByPrice = () => {
//   console.log(sortAllPets)
//  console.log(sortPetsByCategory)

 let toShortData ;

 if(sortPetsByCategory.length > 0){
    toShortData = sortPetsByCategory;
 }else{
    toShortData = sortAllPets;
 }

//  console.log(toShortData)

 toShortData.sort(function(a, b){
    return b.price - a.price
 })

 toShortData.sort(function(a, b){
    return b.price - a.price;
 })

 document.getElementById("loading-spinner").style.display = "block";
 document.getElementById("show-result").style.visibility = "hidden";

 setTimeout(() => {
     document.getElementById("loading-spinner").style.display = "none";
     document.getElementById("show-result").style.visibility = "visible";
     displayAllCategories(toShortData); 
 }, 2000);

}


loadAllCategoriesBtn()
loadAllCategories()

