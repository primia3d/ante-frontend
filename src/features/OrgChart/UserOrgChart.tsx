// OrgChart.tsx
import { useQuery } from '@tanstack/react-query';
import { Tree, TreeNode } from 'react-organizational-chart';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MapInteractionCSS } from 'react-map-interaction';

import { UserOrgChartCard } from './UserOrgChartCard';

import { getUserTree } from '@/api/user/getUserTree';
import { TUserTree } from '@/types/userTree';

export default function UserOrgChart() {
  const {
    data: userTree,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getUserTree'],
    queryFn: () => getUserTree(),
  });

  const rootUser = userTree ? userTree[0] : null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const renderTreeNode = (user: TUserTree) => {
    return (
      <TreeNode key={user.id} label={<UserOrgChartCard user={user} />}>
        {user.child && user.child.map((childUser) => renderTreeNode(childUser))}
      </TreeNode>
    );
  };

  return (
    <MapInteractionCSS
      showControls
      defaultValue={{
        scale: 1,
        translation: { x: 300, y: 120 },
      }}
      minScale={0.5}
      maxScale={3}
    >
      <Tree
        label={rootUser ? <UserOrgChartCard user={rootUser} /> : null}
        nodePadding="10px"
        lineWidth="1px"
        lineColor="#bbc"
        lineBorderRadius="12px"
      >
        {rootUser && rootUser.child && rootUser.child.map((childUser) => renderTreeNode(childUser))}
      </Tree>
    </MapInteractionCSS>
  );
}
