

export class TODOItem {
    public id: number = -1;
    public userId: number = -1;
    public title: string = "-";
    public completed: boolean = false;



    toRaw() {
        return {
            id: this.id,
            userId: this.userId,
            title: this.title,
            completed: this.completed,
        }
    }

    toString() {
        return this.id + " UserId:" + this.userId + " Title:" + this.title + "|" + this.completed;
    }
}