import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

/**
 * example: https://www.npmjs.com/package/typeorm
 * https://github.com/harblaith7/typeorm-crash-course/tree/main/src/entities
 */

// 1. connection in app
// 2. transaction decorator in typeorm
// 3. more decorator

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  userGUID!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  profileImageGUID!: string;

  @Column()
  password!: string;

  @Column()
  dob!: string;

  @Column()
  gender!: string;

  @Column()
  isDeleted!: boolean;

  @Column()
  isProfileCompleted!: boolean;

  @Column()
  isVerfied!: boolean;

  @Column()
  createdAt!: string;

  @Column()
  updatedAt!: string;

  // static findByName(firstName: string, lastName: string) {
  //   return this.createQueryBuilder("user")
  //     .where("user.firstName = :firstName", { firstName })
  //     .andWhere("user.lastName = :lastName", { lastName })
  //     .getMany();
  // }
}
