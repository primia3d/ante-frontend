import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';
import { useAtom } from 'jotai';
import { CustomIcon } from '../CustomIcon';
import { deliveriesViewAtom, equipmentViewAtom, purchasingViewAtom, warehouseViewAtom } from './assetManagementAtom';

type ViewTogglerProps = {
  type: 'purchasing' | 'warehouse' | 'deliveries' | 'equipment';
};

type ViewType = 'card' | 'list' | 'calendar';

const viewAtoms = {
  purchasing: purchasingViewAtom,
  warehouse: warehouseViewAtom,
  deliveries: deliveriesViewAtom,
  equipment: equipmentViewAtom,
};

const viewOptions: Record<string, ViewType[]> = {
  purchasing: ['card', 'list'],
  warehouse: ['card', 'list'],
  deliveries: ['list', 'calendar'],
  equipment: ['list', 'calendar'],
};

function ButtonGrid({
  currentView,
  setView,
  options,
}: {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  options: ViewType[];
}) {
  return (
    <div className="grid w-full shrink-0 grid-cols-2 divide-x overflow-hidden rounded-lg border lg:max-w-24">
      {options.map((item) => (
        <Button
          key={item}
          className={cn(
            'hover:bg-custom-600 min-w-12 shrink-0 rounded-none p-2 text-custom-200 hover:text-custom-400',
            currentView === item && 'bg-custom-600 text-custom-400',
          )}
          onClick={() => setView(item)}
        >
          <CustomIcon variant={item} />
        </Button>
      ))}
    </div>
  );
}

export function ViewToggler({ type }: ViewTogglerProps) {
  const [currentView, setCurrentView] = useAtom(viewAtoms[type]);
  const options = viewOptions[type];

  return <ButtonGrid currentView={currentView} setView={setCurrentView} options={options} />;
}
