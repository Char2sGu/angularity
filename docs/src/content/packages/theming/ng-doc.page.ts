import { NgDocPage } from '@ng-doc/core';

import { packageIndexOf } from '../../package-index';
import Category from '../ng-doc.category';

const page: NgDocPage = {
  category: Category,
  title: `Theming`,
  mdFile: './index.md',
  order: packageIndexOf('theming'),
};

export default page;
