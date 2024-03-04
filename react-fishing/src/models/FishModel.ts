class FishModel {
    id: number;
    commonName: string;
    specieId: number;
    latitude?: number;
    longitude?: number;
    description: string; 
    habitat: string;
    img?: string;


    constructor(id: number, commonName: string, specieId: number, latitude: number, longitude:number, 
        description: string, habitat:string ,img: string) {
            this.id = id;
            this.commonName = commonName;
            this.specieId = specieId;
            this.latitude = latitude;
            this.longitude = longitude;
            this.description = description;
            this.habitat = habitat;
            this.img = img;
        }

}


export default FishModel;