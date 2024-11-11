const { hmacUtil } = require('../../dist/common/utils');

exports.command = 'hmac <data>';

exports.desc = 'hmac some data text';

exports.handler = async (argv) => {
  try {
    if (!argv.data) {
      console.error('[hmac] - error: no hmac');
      process.exit(1);
    }

    console.log(argv.data);
    console.log('[hmac] result: %s', hmacUtil.hash(argv.data));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
