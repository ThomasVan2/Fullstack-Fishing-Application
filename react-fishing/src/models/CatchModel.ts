
class CatchModel {
    userId: number;
    fishId: number;
    date: string;
    location?: string;
    size?: number;
    weight?: number;
    baitUsed?: string;
    description?: string;
    image?: string;
    userName: string;



    constructor(userId: number, fishId: number, date: string, location: string, 
        size: number, weight: number, baitUsed: string, description: string, image: string, userName:string) {
   
            this.userId = userId;
            this.fishId = fishId;
            this.date = date;
            this.location = location;
            this.size = size;
            this.weight = weight;
            this.baitUsed = baitUsed;
            this.description = description;
            this.image = image;
            this.userName = userName;

        }

}

export default CatchModel;