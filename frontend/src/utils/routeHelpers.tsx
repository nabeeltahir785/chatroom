import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/routeGuards/ProtectedRoute';
import PublicRoute from '../components/routeGuards/PublicRoute';

interface RouteDefinition {
    path: string;
    component: React.ComponentType;
    isPublic?: boolean;
}

export const generateRoutes = (routes: RouteDefinition[]) => {
    return routes.map(({ path, component: Component, isPublic }) => {
        const RouteWrapper = isPublic ? PublicRoute : ProtectedRoute;

        return (
            <Route key={path} path={path} element={<RouteWrapper><Component /></RouteWrapper>} />
        );
    });
};