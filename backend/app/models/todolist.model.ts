import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import {TodoItem} from './todoitem.model';

@Table
export class TodoList extends Model<TodoList> {

  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  necessarySkills!: string;

  @HasMany(() => TodoItem)
  todoItems!: TodoItem[];

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
