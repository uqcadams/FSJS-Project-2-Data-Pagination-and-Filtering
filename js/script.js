/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// Set the number of items to display
let itemsPerPage = 9;

// Selects the parent node to host the searchbar
const header = document.querySelector('.header');
// Stores the .student-list <ul> element
const studentList = document.querySelector('.student-list');
// Stores the .link-list <ul> element
const linkList = document.querySelector('.link-list');

// DRY function to concatenate student name
const concatName = (object) => {
   let name = `${object.name.title} ${object.name.first} ${object.name.last} `;
   return name;
}

const showPage = (list, page) => {
   // Dynamically calculates index range
   let startIndex = page * itemsPerPage - itemsPerPage;
   let endIndex = page * itemsPerPage;
   
   // Clears the innerHTML
   studentList.innerHTML = '';

   // Loop to iterate through the data array
   for (let i = 0; i < list.length; i++) {
      
      // Checks if object is within the defined index range
      if ( i >= startIndex && i < endIndex ) {

         // Dynamically generates student profile with template literals
         let studentHTML = 
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture of ${concatName(list[i])}">
                  <h3>${concatName(list[i])}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`;

         // Inserts student profile within the student-list container
         studentList.insertAdjacentHTML('beforeend', studentHTML);
      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list) => {
   // Defines the number of pages to display relative to list length and the defined number of items to display per page.
   let pages = Math.ceil(list.length / itemsPerPage);

   // Clears the innerHTML
   linkList.innerHTML = '';

   // Dynamically generates buttons for each page and inserts into the DOM
   for (let i = 0; i < pages; i++){
      let linkHTML = 
         `<li>
            <button type="button">${i + 1}</button>
         </li>`;

      linkList.insertAdjacentHTML('beforeend', linkHTML);
   };

   // Stores the page button range that has been generated
   let links = linkList.querySelectorAll('button');

   // Applies the "active" class to the first button.
   links[0].classList.add("active");

   // Applies an event listener to the button parent
   linkList.addEventListener('click', (e) => {
      
      // Checks if the click target is a button 
      if (e.target.tagName === "BUTTON") {
   
         // Iterates through all links and removes "active" state.
         for (link of links) {
            if (link.classList.contains("active")) {
               link.classList.remove("active");
            }
         }
         // Applies active class to event target
         e.target.classList.add("active");

         // Calls the showPage() function
         showPage(list, e.target.textContent);
      }
   });
}



// Call functions
// Initialises the showPage content on load

showPage(data, 1);
addPagination(data);



/*
EXTRA CREDIT
Create the 'appendSearchBar function
This function will add the search bar to the DOM 
*/
const appendSearchBar = () => {
   
   // Stores the search bar html and class/id styling in a template literal
   let searchBarHTML = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`;

   // Utilises the insertAdjacentHTML() method to insert the search bar HTML at the end of the parent node 
   header.insertAdjacentHTML('beforeend', searchBarHTML);

   // Add search button event listener
   const searchBar = document.querySelector('#search');
   
   // Fires searchFunction() on user input interaction
   searchBar.addEventListener('input', () => {
      searchFunction();
   })
}

// Implement the search functionality
const searchFunction = () => {

   // Stores the current text entered into the search bar
   let searchTerm = document.querySelector('#search').value;

   // Establishes a new empty search results array
   let searchResults = [];

   // Iterates through the dataset to see if the user search term matches the full name of the students. If the match is positive, the student object is added to the new searchResults array.
   for (let i = 0; i < data.length; i++) {
      let userName = concatName(data[i]);
      if (userName.toLowerCase().includes(searchTerm.toLowerCase())) {
         searchResults.push(data[i]);
      }
   }
   // If the search returns a result, populate the DOM and recalculate page numbers; otherwise, clear the DOM and display the "No Results Found" string.
   if (searchResults.length > 0) {
      showPage(searchResults, 1);
      addPagination(searchResults);
   } else {
      studentList.innerHTML = "";
      linkList.innerHTML = "";
      let noResultsHTML = 
         `<div class="no-results">No Results Found</div>
         `;
      studentList.insertAdjacentHTML('beforeend', noResultsHTML);
   }   
}

appendSearchBar();