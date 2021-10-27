const config = {
  ...require('@oakfinch/prettier-config'),
  bracketSpacing: true,
};

delete config.jsxBracketSameLine;
module.exports = config;
