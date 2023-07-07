import express from "express";
import { CmsController } from "@api/controller/cms.controller";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { cmsUser,cmsBooking } from "@api/validator/cms.validator";
import { AuthenticateRequest } from "@middleware/authenticate-request";

class CmsRoute {
  public router: express.Router = express.Router();
  private cmsController: CmsController;
  private httpRequestValidator: HttpRequestValidator;
  private authenticate;

  constructor() {
    this.cmsController = new CmsController();
    this.httpRequestValidator = new HttpRequestValidator();
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
    this.assign();
  }

  private assign(): void {
    this.router.post(
      "/login",
      this.httpRequestValidator.validate("body", cmsUser),
      this.cmsController.login,
    );

    this.router.post(
      "/register",
      this.httpRequestValidator.validate("body", cmsUser),
      this.cmsController.create,
    );

    this.router.post(
      "/createbooking",
      this.authenticate,
      this.httpRequestValidator.validate("body",cmsBooking),
      this.cmsController.createbooking,
      );
    } 
}

export default new CmsRoute().router;
