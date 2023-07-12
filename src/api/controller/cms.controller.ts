import { Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { CmsService } from "@service/cms.service";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "@config/secret";
// import { traceDecorator } from "@studiographene/nodejs-telemetry";


export class CmsController {
  private responseParser: ResponseParser;
  private cmsService: CmsService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.cmsService = new CmsService();
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
  // @traceDecorator
  public login = async (req: Request, res: Response): Promise<void> => {
    const {
      body: { email, password },
    } = req;
    const response = await this.cmsService.login(email, password);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
  // @traceDecorator
  public create = async (req: Request, res: Response): Promise<void> => {
    const {
      body: { email, password },
    } = req;
    const response = await this.cmsService.create(email, password);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };

  public createbooking = async (req: Request, res: Response): Promise<void> => {
    const {
      // eslint-disable-next-line camelcase
      body: { booking_name, booking_title ,booking_description },
    } = req;

    const authToken = req.header("x-auth-token") as string;
   
    const decodedToken = await jwt.verify(authToken, JWT_SECRET);
    
    req.user = JSON.parse(JSON.stringify(decodedToken));
    // eslint-disable-next-line no-console
    console.log("test",req.user);

    // eslint-disable-next-line camelcase
    const booking_user = req.user.id;

    // eslint-disable-next-line max-len
    const response =await this.cmsService.createbooking(booking_user,booking_name, booking_title ,booking_description);
    
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  }

  public getAllBookings = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
      const response =await this.cmsService.findbooking();
      this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };

  public getSingleBooking = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const {
      // eslint-disable-next-line camelcase
      params: { booking_id },
    } = req;
    const response = await this.cmsService.findSingleBooking(
      // eslint-disable-next-line camelcase
      booking_id.toString(),
    );
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("email_verified"))
      .send(res);
  };
}
