import { NgDocCategory } from '@ng-doc/core';

import { packageIndexOf } from '../package-index';

const CoreCategory: NgDocCategory = {
  title: 'Router',
  order: packageIndexOf('router'),
  expanded: true,
};

export default CoreCategory;
