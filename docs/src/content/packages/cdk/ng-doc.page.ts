import { NgDocPage } from '@ng-doc/core';

import { packageIndexOf } from '../../package-index';
import CdkCategory from '../ng-doc.category';

const page: NgDocPage = {
  category: CdkCategory,
  title: `CDK`,
  mdFile: './index.md',
  order: packageIndexOf('cdk'),
};

export default page;
