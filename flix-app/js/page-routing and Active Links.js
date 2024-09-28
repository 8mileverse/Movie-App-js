const global = {

currentPage: window.location.pathname

};


// console.log(global.currentPage)




// INIT THE APP

function init(){

    switch(global.currentPage){

    case '/': console.log('Home');
    break;

    case '/index': console.log('Home');
    break;

    case '/movie-details.html' : console.log('Movies');
    break;

    case '/tv--details.html': console.log('TV Shows');
    break;

    case '/shows.html': console.log(' Shows');
    break;


    case '/search.html.html': console.log('Search  '); 
    break;

    default: console.log('Page does not exist');
    }


}


function highlightActiveLink(){

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {

       if(link.getAttribute('href') === global.currentPage){ // if the link whish has the href attribute, is equal to the current page

           link.classList.add('active'); // add the active class to the link

       }
    })

}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded' , highlightActiveLink);