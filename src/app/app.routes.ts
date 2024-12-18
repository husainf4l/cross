import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { POINTS_ROUTES } from './pages/points/points.routes';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
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
