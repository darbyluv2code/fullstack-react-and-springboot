class AdminMessageRequest {
    id: number;
    response: string;

    constructor(id: number, response: string) {
        this.id = id;
        this.response = response;
    }
}

export default AdminMessageRequest;