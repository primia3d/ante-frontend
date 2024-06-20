import { Link, Outlet, useLocation } from 'react-router-dom';

import { cn } from '@/utils/cn';

export function SettingsLayout() {
  const location = useLocation();
  const currentUser = {
    role: {
      roleScopes: [
        { scope: { id: 'ROLES_FEATURE' } },
        { scope: { id: 'SCOPE_FEATURE' } },
        { scope: { id: 'USERS_FEATURE' } },
        { scope: { id: 'ROLE_GROUP_FEATURES' } },
      ],
    },
  };

  const hasRole = currentUser?.role?.roleScopes?.some(({ scope }) => scope?.id === 'ROLES_FEATURE');
  const hasScope = currentUser?.role?.roleScopes?.some(({ scope }) => scope?.id === 'SCOPE_FEATURE');
  const hasUsers = currentUser?.role?.roleScopes?.some(({ scope }) => scope?.id === 'USERS_FEATURE');
  const hasRoleGroup = currentUser?.role?.roleScopes?.some(({ scope }) => scope?.id === 'ROLE_GROUP_FEATURES');

  const subRoutes = [
    hasRole && {
      path: '/settings/users',
      title: 'Users',
    },
    hasScope && {
      path: '/settings/roles',
      title: 'Roles',
    },
    hasUsers && {
      path: '/settings/scope',
      title: 'Scope',
    },
    hasRoleGroup && {
      path: '/settings/role-group',
      title: 'Role Group',
    },
    {
      path: '/settings/org-chart',
      title: 'Org Chart',
    },
    {
      path: '/settings/user-org-chart',
      title: 'User Org Chart',
    },
    {
      path: '/settings/workflow',
      title: 'Workflow',
    },
  ].filter(Boolean);

  return (
    <div className="flex h-full gap-4">
      <div className="w-1/6 rounded-2xl bg-white p-8">
        <div className="text-sm text-gray-500">
          <h1 className="py-2 text-center text-xs font-bold">SYSTEM ADMINISTRATOR SETTINGS</h1>
          <div>
            {subRoutes.map(({ path, title }) => (
              <Link
                to={path}
                key={path}
                className={cn('block p-2 hover:bg-gray-50', path === location.pathname && 'bg-gray-50')}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-5/6 overflow-hidden rounded-2xl bg-white p-8">
        <Outlet />
      </div>
    </div>
  );
}
