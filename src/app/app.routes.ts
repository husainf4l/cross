import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { POINTS_ROUTES } from './pages/points/points.routes';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'signin',
        loadComponent: () =>
            import('./pages/signin/signin.component').then(
                (c) => c.SigninComponent
            ),
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./pages/dashboard/dashboard.component').then(
                        (c) => c.DashboardComponent
                    ),
            },
            {
                path: 'orders',
                loadComponent: () =>
                    import('./pages/orders/orders.component').then(
                        (c) => c.OrdersComponent
                    ),
            },
            {
                path: 'order/edit/:orderId',
                loadComponent: () =>
                    import('./pages/orders/edit-order/edit-order.component').then(
                        (c) => c.EditOrderComponent
                    ),
            },
            {
                path: 'operation',
                loadComponent: () =>
                    import('./pages/operation/operation.component').then(
                        (c) => c.OperationComponent
                    ),
            },
            {
                path: 'points',
                children: POINTS_ROUTES,
            },


        ],
    },
];
