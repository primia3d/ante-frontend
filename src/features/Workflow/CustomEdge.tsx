import { Button } from '@/components/Button';
import { X } from 'lucide-react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from 'reactflow';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  label,
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} label={label} />
      <EdgeLabelRenderer>
        <Button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX + 25}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="h-4 w-4 rounded-full border bg-white"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          <X className="h-2 w-2" />
        </Button>
        <span
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="bg-white px-0.5 text-[10px] leading-none text-custom-400"
        >
          {label}
        </span>
      </EdgeLabelRenderer>
    </>
  );
};
