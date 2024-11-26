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
                    import('./users-v2/users-v2.component').then(
                        (c) => c.UsersV2Component
                    ),
            },
            {
                path: 'transactionsv2',
                loadComponent: () =>
                    import('./transactions-v2/transactions-v2.component').then(
                        (c) => c.TransactionsV2Component
                    ),
            },
            {
                path: 'userdetails-v2/:id',
                loadComponent: () =>
                    import('./user-details-v2/user-details-v2.component').then(
                        (c) => c.UserDetailsV2Component
                    ),
            },
            {
                path: 'transactionsdetails-v2/:id',
                loadComponent: () =>
                    import('./transactions-details-v2/transactions-details-v2.component').then(
                        (c) => c.TransactionsDetailsV2Component
                    ),
            },

        ],
    },
];
