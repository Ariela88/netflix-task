


let manager;

DBService.getAllShows().then(shows => {
    manager = new Manager(shows);
    render();
    console.log(shows)
});


show1 = {
    "title": "Breaking Bad",
    "creationDate": "2022-09-13T02:53:50.807Z",
    "author": "Vince Villigan",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShkU5g5OK8nD-I1yRRUq0RjZSOlbHLrW9woj3E-Nnk_MuAC6aT",
    "isFinished": false,
    "upVotes": 0,
    "downVotes": 0,
    "id": "0"
   }

   show1.upVotes++
   console.log(show1)



function render() {
    const showsContainer = document.getElementById('main-container');
    showsContainer.innerHTML = '';



    for (let i = 0; i < manager.showsArray.length; i++) {
        const show = manager.showsArray[i];

        const div = document.createElement('div');
        div.classList.add('card');



        div.appendChild(createElementWithString('strong', show.title));
        div.appendChild(createElementWithString('span', show.creationDate));
        div.appendChild(createElementWithString('span', show.author));


        const imageShow = document.createElement('img')
        imageShow.src = show.imageUrl
        div.appendChild(imageShow)

        const spacer = document.createElement('div');

        div.appendChild(spacer)
        spacer.classList.add('spacer')

        div.appendChild(createElementWithString('span', show.isFinished ? 'Serie Conclusa' : 'In corso'));


        const positiveVoteButton = document.createElement('button');
        positiveVoteButton.innerText = '👍';
        positiveVoteButton.addEventListener('click', function(){
            show.upVotes++
        });
        div.appendChild(positiveVoteButton);


        const negativeVoteButton = document.createElement('button');
        negativeVoteButton.innerText = '👎';
        negativeVoteButton.addEventListener('click', DBService.upvote(show))
        
                                          


        negativeVoteButton.classList.add('rate-down-btn')
        positiveVoteButton.classList.add('rate-up-btn')

        div.appendChild(negativeVoteButton);

        const deleteBtn = document.createElement('button')
        const deleteNodeBtn = document.createTextNode('Elimina')
        deleteBtn.appendChild(deleteNodeBtn)
        div.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', () => {
            DBService.deleteShow(show.id).then(() => {
                manager.deleteShow(i);
                render(show)

            })
        })


        showsContainer.appendChild(div);

        const sortButton = document.getElementById('sortButton');
        sortButton.addEventListener('click', function () {


        })
    }
}





function createElementWithString(elementName, contentString) {
    const element = document.createElement(elementName);
    const node = document.createTextNode(contentString);
    element.appendChild(node);
    return element;
}


function rate(id, isPositive) {
    let show = manager.getShowById(id);
    show = 0
    if (show) {
        if (isPositive) {
            show.upVotes++;
        } else {
            show.downVotes++;
        }

        const totalVotes = show.upVotes + show.downVotes;
        show.rating = show.upVotes / totalVotes;
        render();
    }
}

function calculateRating(upVotes, totalVotes) {
    return upVotes / totalVotes;
}

function sortByRating() {

    manager.showsArray.sort((a, b) => b.rating - a.rating);

}

function saveShow() {



    let form = document.querySelector('form')
    let title = form.title.value
    let author = form.author.value
    let creationDate = new Date()

    if (title.trim() !== '') {

        let show = new Show(title, author, creationDate)

        DBService.addNewShow(show)
        manager.addShow(show)
        input.value = '';
        render()


    }
}