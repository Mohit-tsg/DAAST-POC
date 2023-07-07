/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import createError from "http-errors";
import { CmsUser } from "@database/model/cms-user.model";
import constant from "@config/constant";
import { LoggedInUser,CreateBooking } from "@type/user";
import { JWT_SECRET, TIMEZONE } from "@config/secret";
import i18n from "i18n";
import moment from "moment-timezone";
// import { traceDecorator } from "@studiographene/nodejs-telemetry";
import { CmsBooking } from "@database/model/cms-booking-model";
import { dbConnection } from "../database/db-connection";

export class CmsService {
  private cmsUserRepository;
  private bookingRepository;
  constructor() {
    moment.tz.setDefault(TIMEZONE);
    this.cmsUserRepository = dbConnection.getRepository(CmsUser);
    this.bookingRepository =dbConnection.getRepository(CmsBooking);
  }

  // @traceDecorator
  public async login(email: string, password: string): Promise<LoggedInUser> {
    const user = await this.cmsUserRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      throw new createError.NotFound(i18n.__("user_not_found"));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new createError.Unauthorized(i18n.__("incorrect_password"));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, password: user.password },
      JWT_SECRET,
    );
    return { id: user.id, email: user.email, token };
  }

  /**
   * @param  {string} email user's email
   * @param  {string} password password
   * @returns Promise<CmsUser>
   */
  // @traceDecorator
  public async create(email: string, password: string): Promise<CmsUser> {
    const salt = await bcrypt.genSalt(constant.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.cmsUserRepository.save({ email, password: hashedPassword });
  }
    /**
   * @param  {string} booking_name booking name
   * @param  {string} booking_title booking_title
   * @param {string} booking_description booking_description
   * @returns Promise<CmsUser>
   */

  // eslint-disable-next-line camelcase, max-len
  public async createbooking(booking_name: string,booking_title:string,booking_description:string): Promise<CreateBooking>{
    
     // eslint-disable-next-line camelcase
      const response =  this.bookingRepository.create({booking_name,booking_title,booking_description});
      return response;
      

     


  }
}
