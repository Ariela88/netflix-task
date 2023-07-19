
let manager;

DBService.getAllShows().then(shows => {
    manager = new Manager(shows);
    render();
});








function render() {
    const showsContainer = document.getElementById('main-container');
    showsContainer.innerHTML = '';



    for (let i = 0; i < manager.showsArray.length; i++) {
        const show = manager.showsArray[i];

        const div = document.createElement('div');
        div.classList.add('card');

        ;

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
        positiveVoteButton.addEventListener('click', function () {
            rate(show.id, true);
        });
        div.appendChild(positiveVoteButton);


        const negativeVoteButton = document.createElement('button');
        negativeVoteButton.innerText = '👎';
        negativeVoteButton.addEventListener('click', function () {
            rate(show.id, false);
        });
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
        sortButton.addEventListener('click', sortByRating())

            ;
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