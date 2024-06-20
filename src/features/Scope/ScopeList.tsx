import { Checkbox } from '@/components/Checkbox';
import { TScopeTree } from '@/types/scope';

interface ScopeListProps {
  scopes: TScopeTree[];
  field: {
    value: string[];
    onChange: (value: string[]) => void;
  };
  depth?: number;
}

interface ScopeItemProps {
  scope: TScopeTree;
  field: {
    value: string[];
    onChange: (value: string[]) => void;
  };
  depth?: number;
}

export function ScopeList({ scopes, field, depth = 0 }: ScopeListProps) {
  return (
    <ul className="list-none">
      {scopes.map((scope) => (
        // eslint-disable-next-line no-use-before-define
        <ScopeItem key={scope.id} scope={scope} field={field} depth={depth} />
      ))}
    </ul>
  );
}

function ScopeItem({ scope, field, depth = 0 }: ScopeItemProps) {
  const isChecked = field.value?.includes(scope.id);

  const handleChange = (checked: boolean) => {
    field.onChange(checked ? [...field.value, scope.id] : field.value?.filter((value) => value !== scope.id));
  };

  return (
    <li className={`${depth > 0 ? 'ml-4' : ''}`} value={scope.id}>
      <div className="flex items-center gap-2">
        <Checkbox checked={isChecked} onCheckedChange={handleChange} />
        <span>{scope.name}</span>
      </div>
      {scope.child && scope.child.length > 0 && <ScopeList scopes={scope.child} field={field} depth={depth + 1} />}
    </li>
  );
}
