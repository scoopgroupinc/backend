import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class ProfileFiles {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;
}

export default ProfileFiles;
