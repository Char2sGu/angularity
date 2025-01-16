import { NgDocCategory } from '@ng-doc/core';

import { packageIndexOf } from '../package-index';

const CoreCategory: NgDocCategory = {
  title: 'Theming',
  order: packageIndexOf('theming'),
  expanded: true,
};

export default CoreCategory;
