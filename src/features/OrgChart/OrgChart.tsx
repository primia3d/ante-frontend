// OrgChart.tsx
import { useQuery } from '@tanstack/react-query';
import { Tree, TreeNode } from 'react-organizational-chart';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MapInteractionCSS } from 'react-map-interaction';

import { OrgChartCard } from './OrgChartCard';

import { getRoleTree } from '@/api/role/getRoleTree';
import { TRoleTree } from '@/types/roleTree';

export default function OrgChart() {
  const {
    data: roleTree,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getRoleTree'],
    queryFn: () => getRoleTree(),
  });

  const rootRole = roleTree ? roleTree[0] : null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const renderTreeNode = (role: TRoleTree) => {
    return (
      <TreeNode key={role.id} label={<OrgChartCard role={role} />}>
        {role.child && role.child.map((childRole) => renderTreeNode(childRole))}
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
        label={rootRole ? <OrgChartCard role={rootRole} /> : null}
        nodePadding="10px"
        lineWidth="1px"
        lineColor="#bbc"
        lineBorderRadius="12px"
      >
        {rootRole && rootRole.child && rootRole.child.map((childRole) => renderTreeNode(childRole))}
      </Tree>
    </MapInteractionCSS>
  );
}
