import { NgDocCategory } from '@ng-doc/core';

import { packageIndexOf } from '../package-index';

const CdkCategory: NgDocCategory = {
  title: 'CDK',
  order: packageIndexOf('cdk'),
  expanded: true,
};

export default CdkCategory;
