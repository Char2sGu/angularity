import { NgDocConfiguration } from '@ng-doc/builder';
import { ngKeywordsLoader, rxjsKeywordsLoader } from '@ng-doc/keywords-loaders';

const config: NgDocConfiguration = {
  keywords: {
    loaders: [ngKeywordsLoader(), rxjsKeywordsLoader()],
  },
};

export default config;
