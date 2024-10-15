export class divMapa {
    id: string;
    src: string;
    description: string;
    JSON: string;

    constructor(id: string, src: string, description: string, JSON: string) {
        this.id = id;
        this.src = src;
        this.description = description;
        this.JSON = JSON;
    }
}