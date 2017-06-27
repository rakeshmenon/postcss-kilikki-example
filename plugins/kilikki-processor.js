const postcss = require('postcss');
const LangMap = require('../language-map');

const prefixer = decl => {
  const prefixes = ['moz', 'webkit', 'ms'];

  prefixes.forEach(prefix => {
    decl.cloneBefore({
      prop: `-${prefix}-${decl.prop}`
    });
  });
};

const declModifier = decl => {
  if (decl.prop === LangMap.KILIKKI.GRAYSCALE) {
    decl.prop = LangMap.ENGLISH.FILTER;

    decl.value = `${LangMap.ENGLISH.GRAYSCALE}(${decl.value})`;
    prefixer(decl);
  }
};

const ruleModifier = rule => {
  if (rule.selector === LangMap.KILIKKI.IMAGE) {
    rule.selector = LangMap.ENGLISH.IMAGE;
    rule.walkDecls(declModifier);
  }
};

module.exports = postcss.plugin('postcss-kilikki', options => {
  return css => {
    css.walkRules(ruleModifier);
  };
});