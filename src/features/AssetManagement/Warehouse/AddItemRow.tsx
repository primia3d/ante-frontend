import { Input } from '@/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { TableCell, TableRow } from '@/components/Table';
import { cn } from '@/utils/cn';

type AddItemRowProps = {
  itemNumber: number;
  description: string;
  location: string;
  stocks: number;
  totalCost: number;
  unitPrice: number;
  uom: string;
  onDescriptionChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onStocksChange: (value: number) => void;
  onTotalCostChange: (value: number) => void;
  onUnitPriceChange: (value: number) => void;
  onUomChange: (value: string) => void;
};

const TableCellInput = ({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Input
    type={type}
    placeholder={placeholder}
    className="h-10 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200"
    value={value}
    onChange={onChange}
  />
);

export function AddItemRow({
  itemNumber,
  description,
  location,
  stocks,
  totalCost,
  unitPrice,
  uom,
  onDescriptionChange,
  onLocationChange,
  onStocksChange,
  onTotalCostChange,
  onUnitPriceChange,
  onUomChange,
}: AddItemRowProps) {
  return (
    <TableRow>
      <TableCell className="p-5 text-custom-300">{itemNumber.toFixed(1)}</TableCell>
      <TableCell className="min-w-48 p-5 text-custom-300">
        <TableCellInput
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => onDescriptionChange(e.currentTarget.value)}
        />
      </TableCell>
      <TableCell className="min-w-36 p-5 text-custom-300">
        <TableCellInput
          type="number"
          placeholder="0.00"
          value={stocks || ''}
          onChange={(e) => onStocksChange(e.currentTarget.valueAsNumber)}
        />
      </TableCell>
      <TableCell className="min-w-36 p-5 text-custom-300">
        <TableCellInput
          type="text"
          placeholder="U/M..."
          value={uom}
          onChange={(e) => onUomChange(e.currentTarget.value)}
        />
      </TableCell>
      <TableCell className="min-w-36 p-5 text-custom-300">
        <TableCellInput
          type="number"
          placeholder="PHP 0.00"
          value={unitPrice || ''}
          onChange={(e) => onUnitPriceChange(e.currentTarget.valueAsNumber)}
        />
      </TableCell>
      <TableCell className="min-w-36 p-5 text-custom-300">
        <TableCellInput
          type="number"
          placeholder="PHP 0.00"
          value={totalCost || ''}
          onChange={(e) => onTotalCostChange(e.currentTarget.valueAsNumber)}
        />
      </TableCell>
      <TableCell className="min-w-40 p-5 text-custom-300">
        <Select value={location} onValueChange={onLocationChange}>
          <SelectTrigger
            className={cn(
              'h-10 gap-5 rounded-lg border-2 border-custom-100 bg-custom-50 text-custom-300 shadow-none [&_svg:last-child]:text-black',
              location === '' && 'text-custom-200',
            )}
          >
            <SelectValue placeholder={'Select warehouse...'} />
          </SelectTrigger>
          <SelectContent align="end" className="z-[101]">
            <SelectItem value="warehouse1">Warehouse 1</SelectItem>
            <SelectItem value="warehouse2">Warehouse 2</SelectItem>
            <SelectItem value="warehouse3">Warehouse 3</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
}
