class DBService {


   

    static getAllShows() {

      
        const url = "https://64b512caf3dbab5a95c6a515.mockapi.io/NetflixFilm"
        return fetch(url)
            .then(resp => resp.json())
            

            
    }

   
    
    static addNewShow(show) {

        const url = "https://64b512caf3dbab5a95c6a515.mockapi.io/NetflixFilm"

        fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(show) }).then(resp => {
            if (resp.ok) {
                return resp.json()
            }
        })
    }


    static updateShow(show) {

        const url = "https://64b512caf3dbab5a95c6a515.mockapi.io/NetflixFilm" + show.id;

        fetch(url, {
            method: 'put',
            body: JSON.stringify(show),
            headers: { 'content-type': 'application/json' }
        }).then(resp => resp.json())

    }




    static deleteShow(id) {

        const url = "https://64b512caf3dbab5a95c6a515.mockapi.io/NetflixFilm" + id;
        return fetch(deleteUrl, { method: 'delete' }).then(resp => resp.json());
    }

   


    static upvote(show){

    show.upVotes++
    return this.updateShow(show)
    }

}