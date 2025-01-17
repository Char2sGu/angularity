import { NgDocCategory } from '@ng-doc/core';

import { packageIndexOf } from '../package-index';

const Category: NgDocCategory = {
  title: 'Endpoints',
  order: packageIndexOf('endpoints'),
  expanded: true,
};

export default Category;
