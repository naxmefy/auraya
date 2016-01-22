var Auraya = global.Auraya; // for code style...?

module.exports = {
  modules: [
    // 'example-auraya-module' // generated property will be ExampleAurayaModule
    // ['example-auraya-module', 'foo'] // generated property will be foo
    // {name: 'example-auraya-module', proeprty: 'bar'} // self explained
  ],

  database: {
    connections: {

      memory: 'auraya-memory',

      disk: {
        adapter: 'auraya-disk',
        name: 'disk' // name will be disk.db
      },

      mysql: {
        adapter: 'auraya-mysql',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: null
      },

      mongo: {
        adapter: 'auraya-mongo',
        style: Auraya.Database.Style.NoSQL, // is default for adapter
        url: 'mongodb://localhost/example'
      },

      redis: {
        adapter: 'auraya-redis',
        style: Auraya.Database.Style.KeyValue, // is default for adapter
        url: 'redis://localhost:1234/5'
      }
    },

    default: {
      connection: 'disk',
      mapping: Auraya.Database.Style.SQL
    }
  },

  session: {
    secret: Auraya.ENV.SecretToken || 'my secret token',
    store: {
      supressFor: Auraya.EnvState.Test, // means won't be used for NODE_ENV === 'test'
      middleware: 'connect-redis',
      connection: 'redis'
    },
    cookie: {
      maxAge: 60 * 60 * 24 * 7,
      expires: Auraya.utils.moment().add(7, 'days')
    }
  },

  mail: {
    connections: {
      // supports every nodemailer known transport ;)
      gmail: {
        transport: Auraya.Mail.Transports.GMAIL,
        user: 'example@gmail.com',
        password: 'mySecretPassword'
      },

      smtp: {
        transport: Auraya.Mail.Transports.SMTP,
        host: Auraya.ENV.SMTP_HOST || 'mySMTPHost',
        port: Auraya.ENV.SMTP_PORT || 465,
        user: Auraya.ENV.SMTP_USER || 'mySMTPUser',
        pass: Auraya.ENV.SMTP_PASS || 'mySMTPPass',
        secure: Auraya.Mail.Secure.SSL // can be ['ssl', 'tls', true, false, undefined === false]
      }
    },

    default: {
      connection: 'gmail'
    }
  }

  // additional configs like
  // port: 1234 // default is Auraya.ENV.PORT or 3000
  // ip: '123.123.123.123' // default is Auraya.ENV.IP or ''

  // this and much more options can be found in our documentation
};
