import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Job extends Model<Job> {

  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  necessarySkills!: string;

  @Column
  percentage!: number;

  @Column
  time!: string;

  @Column
  info!: string;

  @Column
  approved!: boolean;

  @Column
  owner!: string;

  toSimplification(): any {
    return {
      'id': this.id,
      'name': this.name,
      'description': this.description,
      'necessarySkills': this.necessarySkills,
      'percentage': this.percentage,
      'time': this.time,
      'info': this.info,
      'approved': this.approved,
      'owner': this.owner
    };
  }

  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
    this.description = simplification['description'];
    this.necessarySkills = simplification['necessarySkills'];
    this.percentage = simplification['percentage'];
    this.time = simplification['time'];
    this.info = simplification['info'];
    this.owner = simplification['owner'];
  }

}
