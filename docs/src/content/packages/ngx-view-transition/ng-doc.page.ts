import { NgDocPage } from '@ng-doc/core';

import { packageIndexOf } from '../../package-index';
import Category from '../ng-doc.category';

const page: NgDocPage = {
  category: Category,
  title: `NGX View Transition`,
  mdFile: './index.md',
  order: packageIndexOf('ngx-view-transition'),
};

export default page;
