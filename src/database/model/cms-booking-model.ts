import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from "typeorm";

  import { CmsUser } from "./cms-user.model";
  
  @Entity("cms_booking")
  export class CmsBooking {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @OneToOne(() => CmsUser) 
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
  