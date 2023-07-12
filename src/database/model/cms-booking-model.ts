import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
  } from "typeorm";

  // eslint-disable-next-line import/no-cycle
  import { CmsUser } from "./cms-user.model";
  
  @Entity("cms_booking")
  export class CmsBooking {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @OneToOne(() => CmsUser, (cmsuser) => cmsuser.id,{cascade: true})
    @JoinColumn()
    public booking_user: CmsUser;
  
    @Column()
    public booking_name: string;

    @Column()
    public booking_title: string;

    @Column()
    public booking_description: string;

    @CreateDateColumn({
      select: false,
    })
    public createdAt: Date;
  
    @UpdateDateColumn({
      select: false,
    })
    public updatedAt: Date;
  }
  