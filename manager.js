class Manager{
    constructor(showsArray=[]){
        this.showsArray=showsArray;

    }

    addShow(show){
        this.showsArray.push(show);
    }

    getShowById(id) {
        return this.showsArray.find(show => show.id === id);
      }

      deleteShow(index) {
        this.showsArray.splice(index, 1);
      }

      


        
}