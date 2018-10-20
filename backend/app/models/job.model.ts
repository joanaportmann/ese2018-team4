import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export class Job extends Model<Job> {

  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  necessarySkills!: string;

  toSimplification(): any {
    return {
      'id': this.id,
      'name': this.name,
      'description': this.description,
      'necessarySkills': this.necessarySkills
    };
  }

  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
    this.description = simplification['description'];
    this.necessarySkills = simplification['necessarySkills'];
  }

}
