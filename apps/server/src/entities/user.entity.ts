import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', onCreate: () => uuidv4() })
  uuid = uuidv4();

  @Property()
  username!: string;

  @Property({ hidden: true })
  password!: string;
}
