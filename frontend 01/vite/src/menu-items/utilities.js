// assets
import { IconCategory , IconPackages , IconCurrencyDollarCanadian , IconWindmill ,IconCurrencyLeu  ,IconPilcrow ,IconHealthRecognition,IconReplaceUser  } from '@tabler/icons-react';

// constant
const icons = {
  IconCategory ,
  IconPackages ,
  IconCurrencyDollarCanadian ,
  IconCurrencyLeu ,
  IconWindmill,
  IconPilcrow ,
  IconHealthRecognition,
  IconReplaceUser 
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
      title: 'Healthy',
      type: 'item',
      url: '/healthy',
      icon: icons.IconHealthRecognition ,
      breadcrumbs: false
    },
    {
      id: 'util-users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.IconReplaceUser  ,
      breadcrumbs: false
    }
  ]
};

export default utilities;
