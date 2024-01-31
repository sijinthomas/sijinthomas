components: {
         'com.revvity.streamrelay': {
            version: '1.0.0',
            publish: {
               repository: 'greengrass-component-com-revvity-streamrelay',
            },
            environment: {
               /* Destination bucket for streamed files /
               destinationBucket: process.env.COMPONENT_STREAMRELAY_DESTINATION_BUCKET ?? 'evoya-data-storage-dev',
               /* Destination path within bucket e.g., tenant/uploads  (no prefix slash, use forward slashes) /
               destinationPath: process.env.COMPONENT_STREAMRELAY_DESTINATION_PATH ?? 'received',
            },
