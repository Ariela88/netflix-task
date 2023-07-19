class Show {
    constructor(title,creationDate= new Date(),author,imageUrl = 'https://cdn1.edgedatg.com/aws/v2/abc/TheBachelor/blog/2985989/18dd10c000d4950299cff6a8433c00a5/330x186-Q90_18dd10c000d4950299cff6a8433c00a5.jpg',isFinished = false,upVotes = 0,downVotes = 0,id){
        this.title=title;
        this.creationDate=creationDate;
        this.author=author;
        this.imageUrl=imageUrl;
        this.isFinished=isFinished;
        this.upVotes=upVotes;
        this.downVotes=downVotes;
        this.id=id;
    }

}