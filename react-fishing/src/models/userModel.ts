class userModel {

     userId : number;
     userEmail: string;
     userName: string;

    
    constructor(userId : number, userEmail: string, userName: string) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
    } 


}

export default userModel;