const searchField = document.getElementById('search-field');
const totalResults = document.getElementById('results-found');
const emptyError = document.getElementById('empty-input');
const searchResult = document.getElementById('search-result');
const notFound = document.getElementById('not-found');
const hrLine = document.getElementById('hr-line');

const searchBook = () => {

    const searchText = searchField.value;
    searchField.value = '';
    totalResults.innerText = '';

    if(searchText === ''){
        searchResult.textContent = '';
        notFound.classList.add('d-none');
        emptyError.classList.remove('d-none');
        hrLine.classList.remove('d-none');
    }

    else{
        emptyError.classList.add('d-none');
        const url = (`https://openlibrary.org/search.json?q=${searchText}`);
        
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
}

const displaySearchResult = booklist => {
    searchResult.textContent = '';
    //console.log(booklist);
    totalResults.innerText = `About ${booklist.numFound} results found.`
    const books = booklist.docs;

    // console.log(books);

    if(booklist.numFound === 0){
        hrLine.classList.remove('d-none');
        notFound.classList.remove('d-none');
    }

    else{
        hrLine.classList.remove('d-none');
        notFound.classList.add('d-none');


           // take 50 resultfrom total found books 
           books.slice(0, 50).forEach(book => {
           
            // Error img show
            book?.cover_i
            ? (imgUrl = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`) : (imgUrl = "image/img-error.png");

            // default value and error handling
            book?.publisher
                ? (publisher = book?.publisher[0]) : (publisher = "not available");

            book?.author_name
                ? (authorName = book?.author_name[0]) : (authorName = "not available");
            
        // ----- Create card ----
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow h-100">
        <img height="400" src="${imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title fs-4 mb-2">${book.title}</h5>
            <p class="card-text mb-0"><span class="fw-normal">Author Name :</span> ${authorName} </p>
            <p class="card-text mb-0"><span class="">Publisher :</span> ${publisher} </p>
            <p class=""><span class="fw-bold fs-6">First Published :</span> ${book?.first_publish_year} </p>
            
        </div>
        </div>
        `;

        searchResult.appendChild(div);

        });
    
    }


}