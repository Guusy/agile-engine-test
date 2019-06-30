import Restclient from "./Restclient";

export default class TransactionsService extends Restclient {
    static getAll() {
        return this.get('/transactions')
    }
}
