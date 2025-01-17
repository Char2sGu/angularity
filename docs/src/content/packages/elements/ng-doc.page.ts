import { NgDocPage } from '@ng-doc/core';

import { packageIndexOf } from '../../package-index';
import Category from '../ng-doc.category';

const page: NgDocPage = {
  category: Category,
  title: `Elements`,
  mdFile: './index.md',
  order: packageIndexOf('elements'),
};

export default page;
