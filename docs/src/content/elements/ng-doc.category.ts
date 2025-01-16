import { NgDocCategory } from '@ng-doc/core';

import { packageIndexOf } from '../package-index';

const CoreCategory: NgDocCategory = {
  title: 'Elements',
  order: packageIndexOf('elements'),
  expanded: true,
};

export default CoreCategory;
