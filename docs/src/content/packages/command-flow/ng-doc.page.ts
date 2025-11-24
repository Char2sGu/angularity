import { NgDocPage } from '@ng-doc/core';

import { packageIndexOf } from '../../package-index';
import Category from '../ng-doc.category';

const page: NgDocPage = {
  category: Category,
  title: `Command Flow`,
  mdFile: './index.md',
  order: packageIndexOf('command-flow'),
};

export default page;
