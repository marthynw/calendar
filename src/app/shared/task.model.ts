export class Task {
    task: string;
    startTime: {
        'hour': number;
        'minute': number;
    };
    endTime: {
        'hour': number;
        'minute': number;
    };
    taskMins: number;
    isEditable: boolean;
    day: string;
    uid: string;
    id?: string;
}
