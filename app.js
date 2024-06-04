let inp = document.querySelector('input');
let btn = document.querySelector('button');
let list = document.querySelector('#list');


btn.addEventListener('click' , function(){
    let inputText = inp.value;
    movieSearch(inputText);
    inp.value = '';
   
})


// using keyboard enter button search
inp.addEventListener('keypress' , function(e){
    if(e.which == 13){
        let inputText = inp.value;
        inp.value = '';
        movieSearch(inputText);
    }
})


function movieSearch(name){
    axios.get(`https://api.tvmaze.com/search/shows?q=${name}`)
        .then(function(resp){
            console.log(resp.data);

            // remove already present movies

            while(list.firstChild){
                list.firstChild.remove();
            }


            // add
            for(let data of resp.data){
                let figure = document.createElement('figure');

                if (data.show.image){
                    figure.innerHTML = `
                    <img src = ${data.show.image.original}>;
                    <h2>${data.show.name}</h2>

                    `
                    list.appendChild(figure);
                }
            }



        })
}