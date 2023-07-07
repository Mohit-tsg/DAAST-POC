import { Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { CmsService } from "@service/cms.service";
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
    // eslint-disable-next-line no-console
    console.log("🚀 ~ file: cms.controller.ts:56 ~ CmsController ~ createbooking= ~ req:", req)
    const {
      // eslint-disable-next-line camelcase
      body: { booking_name, booking_title ,booking_description },
    } = req;

    // console.log(this.cmsService.createbooking(booking_name, booking_title ,booking_description).get)
    const response =await this.cmsService.createbooking(booking_name, booking_title ,booking_description);
    
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  }
}
