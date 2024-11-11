const { bcryptUtil } = require('../../dist/common/utils');

exports.command = 'pass-hash <password>';

exports.desc = 'hash some password text';

exports.handler = async (argv) => {
  try {
    if (!argv.password) {
      console.error('[pass-hash] - error: no password');
      return;
    }

    const result = await bcryptUtil.hashPassword(argv.password);
    console.log('[pass-pass] result: %s', result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
