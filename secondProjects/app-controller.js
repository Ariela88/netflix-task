class AppController {


    constructor(){

        this.shows = []

}


        init(){

            this.render()

           DBService.getAllShows().then(shows => {
                this.show = shows;
                this.renderShows();
            })

        }


        renderShows(){

            const showsContainer = document.getElementById('shows-container-list')
            for (let i = 0; i < this.shows.length; i++) {

                const show = this.shows[i];
                
                const listElement = document.createElement('li')
                
                const titleNode  = document.createTextNode(show.title)
                listElement.appendChild(titleNode)
                
                

                const upvoteSpan = document.createElement('span')
                upvoteSpan.appendChild(document.createTextNode(show.upVotes))
                listElement.appendChild(upvoteSpan)

              

                const downvoteSpan = document.createElement('span')
                downvoteSpan.appendChild(document.createTextNode(show.downVotes))
                listElement.appendChild(downvoteSpan)

                const downBtn = document.createElement('button')
                downBtn.appendChild(document.createTextNode('Down'))
                downvoteSpan.appendChild(downBtn)
                
                showsContainer.appendChild(listElement)
            }

        }


        render(){

            const appContainer = document.getElementById('app')

            appContainer.innerHTML = 
            `<header>
            <h1> Netflix Score </h1>
            </header>
            <main>
                <ul id="shows-container-list"> 
                </ul>
            </main>
            <footer>
            <p> I diritti sono tutti miei </p>
            </footer>`

        }
    
}