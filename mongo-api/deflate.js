const zlib = require('zlib');

const body = {
  reports: [
    {
      network: {
        isRoaming: false,
        networkType: 'UMTS',
        dataConnection: 'wifi',
        simOperator: 'Free',
        countryIso: 'fr',
        networkOperator: 'Free'
      },
      platform: {
        device: 'smartphone',
        API: 16,
        system: 'Android',
        model: 'GT-I8190L',
        manufacturer: 'samsung',
        batteryLevel: 94
      },
      control: {
        reportId: 0,
        reportUnixDate: 1527861496329
      },
      traffic: null
    },
    {
      network: {
        isRoaming: false,
        networkType: 'UMTS',
        dataConnection: 'wifi',
        simOperator: 'Free',
        countryIso: 'fr',
        networkOperator: 'Free'
      },
      platform: {
        device: 'smartphone',
        API: 16,
        system: 'Android',
        model: 'GT-I8190L',
        manufacturer: 'samsung',
        batteryLevel: 94
      },
      control: {
        reportId: 1,
        reportUnixDate: 1527861506369
      },
      traffic: {
        sum: {
          packets: {
            tx: null,
            rx: null
          },
          bytes: {
            tx: 914,
            rx: 46
          }
        }
      }
    },
    {
      network: {
        isRoaming: false,
        networkType: 'UMTS',
        dataConnection: 'wifi',
        simOperator: 'Free',
        countryIso: 'fr',
        networkOperator: 'Free'
      },
      platform: {
        device: 'smartphone',
        API: 16,
        system: 'Android',
        model: 'GT-I8190L',
        manufacturer: 'samsung',
        batteryLevel: 94
      },
      control: {
        reportId: 2,
        reportUnixDate: 1527861506369
      },
      traffic: {
        sum: {
          packets: {
            tx: null,
            rx: null
          },
          bytes: {
            tx: 914,
            rx: 46
          }
        }
      }
    }
  ]
};

zlib.deflate(JSON.stringify(body), (err, result) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Deflate: ', result.toString('base64'));
  }
});
