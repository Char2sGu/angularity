import { NgDocPage } from '@ng-doc/core';

import { packageIndexOf } from '../../package-index';
import Category from '../ng-doc.category';

const page: NgDocPage = {
  category: Category,
  title: `Config Files`,
  mdFile: './index.md',
  order: packageIndexOf('config-files'),
};

export default page;
