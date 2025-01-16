import { NgDocCategory } from '@ng-doc/core';

import { packageIndexOf } from '../package-index';

const CoreCategory: NgDocCategory = {
  title: 'Theming / Material',
  order: packageIndexOf('theming-material'),
  expanded: true,
};

export default CoreCategory;
