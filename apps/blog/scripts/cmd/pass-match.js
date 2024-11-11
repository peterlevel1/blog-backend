const { bcryptUtil } = require('../../dist/common/utils');

exports.command = 'pass-match <password> <hash>';

exports.desc = 'compare some password with given hash text';

exports.handler = async (argv) => {
  if (!argv.password || !argv.hash) {
    console.error('[pass-match] - error: no password or no hash');
    return;
  }

  const result = await bcryptUtil.matchPassword(argv.password, argv.hash);
  console.log('[pass-match] result: %s', result);
};
