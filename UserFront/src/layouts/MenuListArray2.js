export const MenuListArray2 = [
   {
  title: 'Home',
  to: '/home-2',       // direct link to home page
  classChange: '',     // remove sub-menu styling
  content: []          // no submenu needed
}
,
    {
        title: 'Pages',
        classChange: 'sub-menu-down',
        content: [
            {
                title: 'About Us',
                to: '/about-us',
            },
            {
                title: 'Team',
                to: '/team',
            },
            /*   {
            {
                title: 'FAQ',
                to: '/faq',
            },
                title: 'Pricing',
                to: '/pricing',
            },*/
            {
                title: 'Weight Calculator',
                to: '/weight-calculator',
            },
           {
                title: 'Appointment',
                to: '/appointment',
            },
           /*  {
                title: 'Schedule',
                to: '/schedule',
            },
            {
                title: 'Coming Soon',
                to: '/coming-soon',
            },
            {
                title: 'Error 404',
                to: '/error-404',
            },
            {
                title: 'Under Maintenance',
                to: '/under-maintenance',
            },*/

        ],
    },
    {
        title: 'Packages',
        to: '/Packages',
        classChange: '',
        content: [
           
          /*  {
                title: 'Portfolio Details',
                to: '/portfolio-details',
            },*/
        ],
    },

    {
        title: 'Services',
        classChange: 'sub-menu-down',
        content: [
            {
                title: 'Services',
                to: '/services',
            },
            {
                title: 'Services Details',
                to: '/services-details',
            },

        ],
    },
   /* {
        title: 'Blog',
        classChange: 'sub-menu-down',
        content: [
            {
                title: 'Blog Grid',
                to: '/blog-grid',
            },
            {
                title: 'Blog Large Sidebar',
                to: '/blog-large-sidebar',
            },
            {
                title: 'Blog List Sidebar',
                to: '/blog-list-sidebar',
            },
            {
                title: 'Blog Details',
                to: '/blog-details',
            },

        ],
    },*/
    {
        title: 'Contact Us',
        to: '/contact-us',
    },
 
]