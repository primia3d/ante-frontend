import { Button } from '@/components/Button';
import { CustomEdge, CustomNode, EdgeForm, NodeForm } from '@/features/Workflow';
import { useBoolean } from '@/hooks/useBoolean';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { EyeOffIcon, PlusIcon } from 'lucide-react';

import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  MiniMap,
  Node,
  NodeChange,
  NodeProps,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: {
      label: 'Default Node',
    },
    position: { x: 100, y: 100 },
    type: 'customNode',
  },
  { id: '3', data: { label: 'Another Node' }, position: { x: 400, y: 100 }, type: 'customNode' },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    label: 'Label',
  },
];

export default function Workflow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isMinimapShown, setIsMinimapShown] = useState(true);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [currentEdgeId] = useState<string | null>(null);

  const { value: isAddNodeFormOpen, set: setIsAddNodeFormOpen } = useBoolean(false);
  const { value: isEditNodeFormOpen, set: setIsEditNodeFormOpen } = useBoolean(false);
  const { value: isEditEdgeFormOpen, set: setIsEditEdgeFormOpen } = useBoolean(false);

  const openNodeForm = (id: string) => {
    setCurrentNodeId(id);
    setIsEditNodeFormOpen(true);
  };

  // const openEdgeForm = (id: string) => {
  //   setCurrentEdgeId(id);
  //   setIsEditEdgeFormOpen(true);
  // };

  const onConnect = useCallback(
    (connection: Edge | Connection) => {
      const edge = {
        ...connection,
        type: 'customEdge',
        label: 'Label',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        animated: true,
        data: { onClick: () => setIsEditEdgeFormOpen(true) },
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const addNode = (label: string) => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: 'customNode',
    };
    setNodes((nds) => [...nds, newNode]);
    setIsAddNodeFormOpen(false);
  };

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  }, []);

  const updateNodeLabel = useCallback(
    (label: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === currentNodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  label,
                },
              }
            : node,
        ),
      );
      setIsEditNodeFormOpen(false);
    },
    [currentNodeId],
  );

  const updateEdgeLabel = (label: string) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === currentEdgeId
          ? {
              ...edge,
              label,
            }
          : edge,
      ),
    );
    setIsEditEdgeFormOpen(false);
  };

  const nodeTypes = useMemo(
    () => ({
      customNode: (nodeProps: NodeProps) => (
        <CustomNode {...nodeProps} deleteNode={deleteNode} openNodeForm={openNodeForm} />
      ),
    }),
    [deleteNode, updateNodeLabel],
  );

  const edgeTypes = useMemo(
    () => ({
      customEdge: CustomEdge,
    }),
    [],
  );

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div className="absolute left-0 top-5 z-50 flex flex-col gap-2">
        <Button variant={'outline'} className="px-4 py-2" onClick={() => setIsAddNodeFormOpen(true)}>
          <span className="shrink-0">
            <PlusIcon className="h-4 w-4" />
          </span>
          <span className="w-full text-left leading-4">Add Node</span>
        </Button>
        <Button
          variant={'outline'}
          className="justify-between px-4 py-2"
          onClick={() => setIsMinimapShown((prev) => !prev)}
        >
          <span className="shrink-0">
            {isMinimapShown ? <EyeOpenIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
          </span>
          <span className="w-full text-left leading-4">{isMinimapShown ? 'MiniMap' : 'MiniMap'}</span>
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        attributionPosition="top-right"
        fitView
      >
        <Controls />
        {isMinimapShown && <MiniMap />}
        <Background variant={BackgroundVariant.Dots} gap={20} size={2} />
      </ReactFlow>
      <NodeForm isOpen={isAddNodeFormOpen} setIsOpen={setIsAddNodeFormOpen} onSubmit={addNode} mode="add" />
      <NodeForm
        isOpen={isEditNodeFormOpen}
        setIsOpen={setIsEditNodeFormOpen}
        onSubmit={updateNodeLabel}
        initialLabel={nodes.find((node) => node.id === currentNodeId)?.data.label || ''}
        mode="edit"
      />
      <EdgeForm
        isOpen={isEditEdgeFormOpen}
        setIsOpen={setIsEditEdgeFormOpen}
        onSubmit={updateEdgeLabel}
        // initialLabel={edges.find((edge) => edge.id === currentEdgeId)?.label || ''}
        mode="edit"
      />
    </div>
  );
}
