export class Job {

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public necessarySkills: string,
    public percentage: number,
    public time: string,
    public info: string,
    public approved: boolean

  ) {
  }

}
