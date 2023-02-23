export enum Status {
  Completed = 'completed',
  NotCompleted = 'not_completed',
}

export class Routine {
  constructor(public status: Status, public name: string) {}
}
