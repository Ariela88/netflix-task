class DBService {


    static BASE_URL = "https://64b512caf3dbab5a95c6a515.mockapi.io"

    static getAllShows() {
        const url = DBService.BASE_URL + '/NetflixFilm';
        return fetch(url)
            .then(resp => resp.json())
            .then(result => this.convertToShowsArray(result))
            .catch(error => console.log(error));
    }

    static convertToShows(object) {
        const newShow = new Show(object.title, object.creationDate, object.author, object.imageUrl, object.isFinished, object.upVotes, object.downVotes, object.id);
        return newShow;
    }

    static convertToShowsArray(genericArray) {
        const tempArray = [];

        for (const object of genericArray) {

            tempArray.push(this.convertToShows(object));
        }

        return tempArray;
    }
    static addNewShow(show) {

        const url = DBService.BASE_URL + '/NetflixFilm';

        fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(show) }).then(resp => {
            if (resp.ok) {
                return resp.json()
            }
        })
    }


    static updateShow(show) {

        const url = DBService.BASE_URL + '/NetflixFilm/' + show.id;

        fetch(url, {
            method: 'put',
            body: JSON.stringify(show),
            headers: { 'content-type': 'application/json' }
        }).then(resp => resp.json())

    }




    static deleteShow(id) {

        const deleteUrl = DBService.BASE_URL + '/NetflixFilm/' + id;
        return fetch(deleteUrl, { method: 'delete' }).then(resp => resp.json());
    }

    static saveShow(show) {
        const url = DBService.BASE_URL + '/NetflixFilm'
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(show),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(res => this.convertToShows(res))


    }


    static upvote(show){

    show.upVotes++
    return this.updateShow(show)
    }

}