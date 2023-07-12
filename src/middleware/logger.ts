/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
 function loggerMiddleware(
    req: Request, res: Response, next: NextFunction
  ): void {
    const { method, url, params, query, body, headers } = req;
  
    console.log('Incoming Request:');
    console.log('Method:', method);
    console.log('URL:', url);
    console.log('Params:', params);
    console.log('Query:', query);
    console.log('Body:', body);
    console.log('Headers:', headers);
    console.log('response:',res);
    
    next();
  }

  export default loggerMiddleware;