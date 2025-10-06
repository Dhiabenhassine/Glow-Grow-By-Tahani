// assets
import { IconCategory , IconPackages , IconCurrencyDollarCanadian , IconWindmill ,IconCurrencyLeu  ,IconPilcrow ,IconHealthRecognition } from '@tabler/icons-react';

// constant
const icons = {
  IconCategory ,
  IconPackages ,
  IconCurrencyDollarCanadian ,
  IconCurrencyLeu ,
  IconWindmill,
  IconPilcrow ,IconHealthRecognition
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-Categories',
      title: 'Categories',
      type: 'item',
      url: '/Categories',
      icon: icons.IconCategory ,
      breadcrumbs: false
    },
    {
      id: 'util-Packs',
      title: 'Packs',
      type: 'item',
      url: '/Packs',
      icon: icons.IconPackages ,
      breadcrumbs: false
    }, 
    {
      id: 'util-Courses',
      title: 'Courses',
      type: 'item',
      url: '/Courses',
      icon: icons.IconCurrencyDollarCanadian ,
      breadcrumbs: false
    },
    {
      id: 'util-Lessons',
      title: 'Lessons',
      type: 'item',
      url: '/Lessons',
      icon: icons.IconCurrencyLeu  ,
      breadcrumbs: false
    },
    {
      id: 'util-Promo',
      title: 'Promo',
      type: 'item',
      url: '/Promo',
      icon: icons.IconPilcrow ,
      breadcrumbs: false
    },
    {
      id: 'util-healthy',
      title: 'healthy',
      type: 'item',
      url: '/healthy',
      icon: icons.IconHealthRecognition ,
      breadcrumbs: false
    }
  ]
};

export default utilities;
