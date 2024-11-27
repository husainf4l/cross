import { Routes } from '@angular/router';

export const POINTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./points.component').then((c) => c.PointsComponent),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./dashboard/dashboard.component').then(
                        (c) => c.DashboardComponent
                    ),
            },
            {
                path: 'usersv2',
                loadComponent: () =>
                    import('./pointsv2/users-v2/users-v2.component').then(
                        (c) => c.UsersV2Component
                    ),
            },
            {
                path: 'transactionsv2',
                loadComponent: () =>
                    import('./pointsv2/transactions-v2/transactions-v2.component').then(
                        (c) => c.TransactionsV2Component
                    ),
            },
            {
                path: 'userdetails-v2/:id',
                loadComponent: () =>
                    import('./pointsv2/user-details-v2/user-details-v2.component').then(
                        (c) => c.UserDetailsV2Component
                    ),
            },
            {
                path: 'userdetails-v2/edit/:id',
                loadComponent: () =>
                    import('./pointsv2/user-details-v2/edit/edit.component').then(
                        (c) => c.EditComponent
                    ),
            },
            {
                path: 'transactionsdetails-v2/:id',
                loadComponent: () =>
                    import('./pointsv2/transactions-details-v2/transactions-details-v2.component').then(
                        (c) => c.TransactionsDetailsV2Component
                    ),
            },

            //v1

            {
                path: 'usersv1',
                loadComponent: () =>
                    import('./pointsv1/users-v1/users-v1.component').then(
                        (c) => c.Usersv1Component
                    ),
            },

            {
                path: 'userdetails-v1/:id',
                loadComponent: () =>
                    import('./pointsv1/user-details-v1/user-details-v1.component').then(
                        (c) => c.UserDetailsv1Component
                    ),
            },
            {
                path: 'userdetails-v1/edit/:id',
                loadComponent: () =>
                    import('./pointsv1/user-details-v1/edit/edit.component').then(
                        (c) => c.EditComponent
                    ),
            },
            {
                path: 'transactionsdetails-v1/:id',
                loadComponent: () =>
                    import('./pointsv1/transactions-details-v1/transactions-details-v1.component').then(
                        (c) => c.TransactionsDetailsv1Component
                    ),
            },


        ],
    },
];
