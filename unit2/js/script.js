/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const itemsPerPage = 9
const studentList = document.querySelector(".student-list");

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

//This function will show the "contacts" in each page, we chose 9 contacts per page

function showPage (list, page) {
  let startIndex = (page * itemsPerPage) - 9
  let endIndex = page * itemsPerPage

  studentList.innerHTML = '';
  for(let i = 0; i < list.length; i++){
   if (i >= startIndex && i < endIndex){
      const studentItem = ` <li class="student-item cf">
      <div class="student-details">
      <img class="avatar" src=" ${list[i].picture.large} "alt="Profile Picture">
      <h3>${list[i].name.first} ${list[i].name.last}</h3>
      <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">${list[i].registered.date}</span>
      </div>
      </li>`
      studentList.insertAdjacentHTML("beforeend", studentItem)
   }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

//This function create the page numbers and let you navigate through pages, it adds the buttons and create event listenrer for clicks

function addPagination (list) {
   const numOfPages =  Math.ceil(list.length / itemsPerPage)  
   const linkList = document.querySelector(".link-list")
   linkList.innerHTML = ""
   for(let i = 1; i <= numOfPages; i ++){
      const button = `<li>
      <button type="button">${i}</button>
      </li>`
      linkList.insertAdjacentHTML("beforeend", button)
      const firsrBtn = document.querySelector("button")
      firsrBtn.className = "active"
      linkList.addEventListener("click", (e) => {
         if(e.target.tagName === "BUTTON"){
            const firstElement = document.querySelector(".active")
            firstElement.className = ""
            e.target.className = "active"
            showPage(list,e.target.textContent)

         }

      })
   }
}


// Calling both functions

showPage(data, 1)

addPagination(data);

// search bar for exceeds expectations, Iv'e created a search bar and placed it into the headr

const header = document.querySelector("header")
const searchBar = `<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`
      header.insertAdjacentHTML("beforeend", searchBar)


const search = document.getElementById("search"); 
const errorMessage = document.createElement('p'); 
errorMessage.style.color = 'red';
header.parentNode.appendChild(errorMessage);

// This function filters through the names, changed all to lower case so it will be insensitive.
//I also added an erorr mesaage directly to the page whic will appear in red color.

function searchFilter(inputName, studentsList){
   let filteredName = [];
   errorMessage.textContent = '';
   for(let i = 0 ; i < studentsList.length; i++){
      if(studentsList[i].name.first.toLowerCase().includes(inputName.toLowerCase()) || 
      studentsList[i].name.last.toLowerCase().includes(inputName.toLowerCase()) ){
         filteredName.push(studentsList[i]);
         errorMessage.style.display="none";
      } else if (filteredName.length == 0) { 
         errorMessage.textContent = `${inputName} IS NOT FOUND, PLEASE TRY A DIFFERENT NAME.`;
         errorMessage.style.display="block";
      }
   }
   showPage(filteredName,1);
   addPagination(filteredName);
}

const inputSearch = document.querySelector("#search");
inputSearch.addEventListener("keyup", (e) => {
   searchName = e.target.value;
   searchFilter(searchName, data);
 });





















