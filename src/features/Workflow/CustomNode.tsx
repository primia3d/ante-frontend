import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { EllipsisIcon } from 'lucide-react';
import { Handle, NodeProps, Position } from 'reactflow';

interface CustomNodeProps extends NodeProps {
  deleteNode: (id: string) => void;
  openNodeForm: (id: string) => void;
}

export function CustomNode({ id, data, deleteNode, openNodeForm }: CustomNodeProps) {
  return (
    <div className="group relative z-[1000] min-w-32 max-w-36 rounded border border-black bg-white p-2.5 pr-3.5 text-xs">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="absolute right-1 top-0 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-custom-300 hover:text-custom-400">
            <EllipsisIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => openNodeForm(id)}>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-error-300 focus:text-error-300" onClick={() => deleteNode(id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="">{data.label}</div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
