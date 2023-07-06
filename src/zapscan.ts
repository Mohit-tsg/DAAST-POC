import { ZapClient } from 'zap-client';

const zapApiKey = 'your_zap_api_key';
const targetUrl = 'https://example.com/rest-api';
const contextName = 'target_api_context';
const bearerToken = 'your_bearer_token';

async function runActiveScan() {
  try {
    const zap = new ZapClient({ apiKey: zapApiKey });

    // Create a new context
    await zap.context.newContext(contextName);

    // Include the target URL in the context
    await zap.context.includeInContext(contextName, targetUrl);

    // Set the authentication method to HTTP headers
    await zap.authentication.setAuthenticationMethod(contextName, 'httpAuthentication');

    // Configure the authentication headers
    await zap.authentication.setAuthenticationHeaders(contextName, { Authorization: `Bearer ${bearerToken}` });

    // Perform the active scan
    await zap.spider.scan(targetUrl);
    await zap.ascan.scan(targetUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error running ZAP active scan:', error);
  }
}

runActiveScan();
