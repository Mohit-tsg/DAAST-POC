import {CmsService} from "../src/service/cms.service";
import ZapClient from 'zaproxy';
let cmsService = new CmsService();


const zapOptions = {
  apiKey: 'lmtl61itcg9k241vc50kpffk8v',
  proxy: {
    host: 'localhost',
    port: 3001,
  },
};



describe('Registration API', () => {
  const zaproxy = new ZapClient(zapOptions);
  
  it('should return a success response for valid credentials', async () => {
    
    try {
  
     const result= await cmsService.create(
         "mohit.bhardwaj@studiographene.com",
         "Test@1234",
      );

      await zaproxy.authentication.setAuthenticationMethod(
        'http://localhost:3001/cms/registration',
        'formBasedAuthentication',
      );
      await zaproxy.authentication.setLoginCredentials(
        'http://localhost:3001/cms/registration',
        'username',
        'password',
        'mohit.bhardwaj@studiographene.com',
        'Test@1234',
      );

      // Start the ZAP scan
      await zaproxy.spider.scan('http://localhost:3001/cms/registration');
      await zaproxy.ascan.scan('http://localhost:3001/cms/registration');

      
      expect(result).toBeDefined();
    } catch (error) {
     console.log(error);
    }
  });
});

