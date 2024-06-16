import { createBrowserRouter, redirect, RouteObject } from 'react-router-dom';

import LoginPage from './auth/login';
import AssetManagementPage from './home/asset-management';
import DashboardPage from './home/dashboard';
import LeadsPage from './home/leads';
import ManpowerPage from './home/manpower';
import ProjectsPage from './home/projects';
import ProjectDetails from './home/projects/ProjectDetails';
import OrgChart from './home/settings/org-chart';
import RoleGroupManagement from './home/settings/roleGroup';
import RoleManagement from './home/settings/roles';
import ScopeManagement from './home/settings/scope';
import UserOrgChart from './home/settings/user-org-chart';
import Users from './home/settings/users';
import TreasuryPage from './home/treasury';

import { IS_LOGGED_IN } from '@/constants/common';
import { RootLayout } from '@/layouts/RootLayout';
import { SettingsLayout } from '@/layouts/SettingsLayout';
import Inventory from './home/asset-management/Inventory';
import Workflow from './home/settings/workflow';

const authRouter: RouteObject[] = [
  {
    path: '/',
    loader: async () => {
      return redirect('/auth/login');
    },
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
];

const homeRouter: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/projects',
        element: <ProjectsPage />,
      },
      {
        path: '/projects/:id',
        element: <ProjectDetails />,
      },
      {
        path: '/asset-management',
        element: <AssetManagementPage />,
      },
      {
        path: '/asset-management/warehouse/:id',
        element: <Inventory />,
      },
      {
        path: '/manpower',
        element: <ManpowerPage />,
      },
      {
        path: '/treasury',
        element: <TreasuryPage />,
      },
      {
        path: '/leads',
        element: <LeadsPage />,
      },
      {
        path: '/settings',
        element: <SettingsLayout />,
        children: [
          {
            path: '/settings/users',
            element: <Users />,
          },
          {
            path: '/settings/roles',
            element: <RoleManagement />,
          },
          {
            path: '/settings/role-group',
            element: <RoleGroupManagement />,
          },
          {
            path: '/settings/scope',
            element: <ScopeManagement />,
          },
          {
            path: '/settings/org-chart',
            element: <OrgChart />,
          },
          {
            path: '/settings/user-org-chart',
            element: <UserOrgChart />,
          },
          {
            path: '/settings/workflow',
            element: <Workflow />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter([...(IS_LOGGED_IN ? homeRouter : authRouter)]);
