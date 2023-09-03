//KT02cx98ml0O5ZlqO0iifPd62tdyF6tgvsKpx9wN 
const currentDate = new Date().toISOString().split("T")[0];

let date_input = document.getElementById(`search-input`);
let section = document.getElementById('current-image-container');
let press_btn = document.getElementById(`btn`);
let apiKey = `KT02cx98ml0O5ZlqO0iifPd62tdyF6tgvsKpx9wN`;
let ApiendPoint = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`;
let ul=document.getElementById('search-history');
let div=document.getElementById('div-container');
let dataArr=[];


function getCurrentImageOfTheDay() {
    fetchData(currentDate);
}
// Call the function when the page loads
window.addEventListener('load', getCurrentImageOfTheDay);

press_btn.addEventListener(`click`, function (event) {
    event.preventDefault();
    getImageOfTheDay();
});

function getImageOfTheDay() {
    // event.preventDefault();
    const selected_Date = date_input.value;
    fetchData(selected_Date);
    saveSearch(selected_Date);
}


function fetchData(date){

    ApiendPoint = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    section.innerHTML = " ";

    fetch(ApiendPoint)
        .then(response => response.json())
        .then(data => {

            const imageUrl = data.url;
            const heading = data.title;
            const info = data.explanation;
            const head=document.createElement('h2');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const imageElement = document.createElement('img');
            h2.innerText = `Picture On ${date}`;
            imageElement.src = imageUrl;
            head.innerHTML=heading;
            p.textContent = info;

            section.appendChild(h2);
            section.appendChild(imageElement);
            section.appendChild(head);
            section.appendChild(p);
        })
        .catch(error => {
            console.error('Error fetching Image of the Day:', error);
        });
}

function saveSearch(date){
    let data={
        'date':date,
    }
    dataArr.push(data);
    localStorage.setItem('searches',JSON.stringify(dataArr));
    addSearchToHistory(date);
}

function addSearchToHistory(date){
    let li=document.createElement(`li`);
    li.innerText=date
    ul.appendChild(li);
    div.appendChild(ul);

    li.addEventListener('click',function(event){
       event.preventDefault();
        fetchData(date);
    });
}


