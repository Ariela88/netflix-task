// let manager = new Manager(DBService.getAllShows());


let manager;

DBService.getAllShows().then(shows => {
    manager = new Manager(shows);
    render();
});

// console.log(manager);






function render() {
    const showsContainer = document.getElementById('main-container');
    showsContainer.innerHTML = '';



    for (let i = 0; i < manager.showsArray.length; i++) {
        const show = manager.showsArray[i];

        const div = document.createElement('div');
        div.classList.add('card');

        console.log(show.title);

        div.appendChild(createElementWithString('strong', show.title));
        div.appendChild(createElementWithString('span', show.creationDate));
        div.appendChild(createElementWithString('span', show.author));


        const imageShow = document.createElement('img')
        imageShow.src = show.imageUrl
        div.appendChild(imageShow)

        div.appendChild(createElementWithString('span', show.isFinished));
        const positiveVoteButton = document.createElement('button');
        positiveVoteButton.innerText = 'Voto positivo';
        positiveVoteButton.addEventListener('click', function () {
            rate(show.id, true);
        });
        div.appendChild(positiveVoteButton);

        const negativeVoteButton = document.createElement('button');
        negativeVoteButton.innerText = 'Voto negativo';
        negativeVoteButton.addEventListener('click', function () {
            rate(show.id, false);
        });
        div.appendChild(negativeVoteButton);

        showsContainer.appendChild(div);

        const sortButton = document.getElementById('sortButton');
        sortButton.addEventListener('click', function() {
          sortByRating();
        });
    }


}





function createElementWithString(elementName, contentString) {
    const element = document.createElement(elementName);
    const node = document.createTextNode(contentString);
    element.appendChild(node);
    return element;
}


function rate(id, isPositive) {
    const show = manager.getShowById(id);
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
    render();
  }

function saveShow() {

    let form = document.querySelector('form')
  let title = form.title.value
  let author = form.author.value
  let creationDate = new Date()
  
  console.log(title)
  
    let show = new Show(title, author, creationDate)
   
  DBService.addNewShow(show)
  manager.addShow(show)
  render()
    
  }