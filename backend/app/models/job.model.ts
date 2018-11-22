import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export class Job extends Model<Job> {

  @Column
  name!: string;

  @Column
  percentage!: number;

  @Column
  time!: string;

  @Column
  necessarySkills!: string;

  @Column
  description!: string;

  @Column
  approved!: boolean;

  toSimplification(): any {
    return {
      'id': this.id,
      'name': this.name,
      'percentage': this.percentage,
      'time': this.time,
      'necessarySkills': this.necessarySkills,
      'description': this.description

    };
  }

  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
    this.percentage = simplification['percentage'];
    this.time = simplification['time'];
    this.necessarySkills = simplification['necessarySkills'];
    this.description = simplification['description'];

  }

}
