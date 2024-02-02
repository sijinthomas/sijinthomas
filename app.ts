import 'dotenv/config';

import { App } from './lib/moniot';
import { AppOptions, AppConfigOptions } from './lib/moniot/types';

global.app = new App(<AppOptions>{
   name: 'iot-bootstrap',
   description: 'IoT Bootstrap',
   logLevel: process.env.LOG_LEVEL ?? 'error',
});

/**
 * TODO Automate version bumps (NEXT_PATCH)
 *
 * Increment component build versions here in unity
 */
const componentRevision = '1.0.1-beta';

app.configure({
   development: {
      local: process.env.DEVELOPMENT_LOCAL === 'true' ?? false,
      hubConfig: {
         tenantId: '',
         serialNumber: '',
      },
   },
   demo: {
      ec2: process.env.EC2_DEMO === 'true' ?? false,
      allowedCidrBlocks: process.env.EC2_ALLOWED_CIDR_BLOCKS
         ? process.env.EC2_ALLOWED_CIDR_BLOCKS.split(',').filter((n) => n) ?? []
         : [],
   },
   aws: {
      account: process.env.AWS_ACCOUNT ?? '874901147556',
      region: process.env.AWS_REGION ?? 'eu-central-1',
      iotDataEndpoint: process.env.AWS_IOT_DATA_ENDPOINT ?? 'a3kinjowd5hxis-ats.iot.eu-central-1.amazonaws.com',
      iotCredentialEndpoint:
         process.env.AWS_IOT_CREDENTIAL_ENDPOINT ?? 'c2cmsmno55csbh.credentials.iot.eu-central-1.amazonaws.com',
   },
   datadog: {
      enabled: process.env.DATADOG_ENABLED === 'true' ?? false,
      apiKey: process.env.DATADOG_APIKEY ?? '',
      appKey: process.env.DATADOG_APPKEY ?? '',
      agentEnabled: process.env.DATADOG_AGENT_ENABLED === 'true' ?? false,
      datadogsAwsAccount: '464622532012', // DO NOT CHANGE
   },
   product: process.env.PRODUCT ?? 'evoya-iot-alpha',
   project: process.env.PROJECT ?? 'alpha',
   environment: process.env.ENVIRONMENT ?? 'alpha',
   repoName: process.env.REPONAME ?? 'evoya-iot',
   auth0: {
      domain: process.env.AUTH0_DOMAIN ?? 'evoya-iot-tm.eu.auth0.com',
   },
   tenantManager: {
      apiGatewayId: process.env.TENANTMANAGER_APIGATEWAYID ?? 'l6t5yoht5l',
   },
   greengrass: {
      environment: {
         THING_NAME: process.env.GREENGRASS_ENVIRONMENT_THINGNAME ?? 'EvoyasLocalGreengrassCore',
      },
   },
   library: {
      github: {
         roleToAssume: 'TerraformAssumeRole',
      },
      components: {
         'com.revvity.streamrelay': {
            version: '1.0.2',
            publish: {
               repository: 'greengrass-component-com-revvity-streamrelay',
            },
            environment: {
               /** Destination bucket for streamed files */
               destinationBucket: process.env.COMPONENT_STREAMRELAY_DESTINATION_BUCKET ?? 'evoya-data-storage-alpha',
               /** Destination path within bucket e.g., tenant/uploads  (no prefix slash, use forward slashes) */
               destinationPath: process.env.COMPONENT_STREAMRELAY_DESTINATION_PATH ?? 'received',
            },
         },
         'com.revvity.mqttrelay': {
            version: '1.0.9',
            publish: {
               repository: 'greengrass-component-com-revvity-mqttrelay',
            },
         },
         'com.revvity.nifi': {
            version: '1.0.10',
            publish: {
               repository: 'greengrass-component-com-revvity-nifi',
            },
            environment: {
               TOPIC_PUBLISH: 'evoya/punchresponse/punchers',
               TOPIC_SUBSCRIBE: 'evoya/punchrequest/punchers',
            },
         },
         'com.revvity.sprox': {
            version: componentRevision,
            publish: {
               repository: 'greengrass-component-com-revvity-sprox',
            },
         },
         'com.revvity.dashboard': {
            version: componentRevision,
            publish: {
               repository: 'greengrass-component-com-revvity-dashboard',
            },
         },
      },
   },
});

app.synth().then(() => {
   logger.info(app.excitedMessage('Synth Complete!'));
});
