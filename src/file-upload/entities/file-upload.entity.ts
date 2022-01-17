// export class FileUpload {}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';


@Entity('profileFiles')
class FileUpload extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  userId: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  key: string;
}

export default FileUpload;