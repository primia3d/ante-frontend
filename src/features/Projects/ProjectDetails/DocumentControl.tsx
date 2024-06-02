import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Separator } from '@/components/Separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { CustomIcon } from '@/features/CustomIcon';
import { cn } from '@/utils/cn';

const data = [
  {
    id: '101',
    filename: 'Document1',
    extension: 'pdf',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '202',
    filename: 'Document2',
    extension: 'pdf',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '303',
    filename: 'Document3',
    extension: 'pdf',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '404',
    filename: 'Document4',
    extension: 'doc',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '505',
    filename: 'Document5',
    extension: 'doc',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '606',
    filename: 'Document6',
    extension: 'doc',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '707',
    filename: 'Document7',
    extension: 'xls',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '808',
    filename: 'Document8',
    extension: 'xls',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '809',
    filename: 'Document9',
    extension: 'xls',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
  {
    id: '819',
    filename: 'Document10',
    extension: 'pdf',
    author: 'Juan Dela Cruz',
    type: 'RFI',
  },
];

type DocumentControlProps = {
  className?: string;
};

export function DocumentControl({ className }: DocumentControlProps) {
  const getFileColor = (ext: string) => {
    if (ext === 'pdf') return 'text-error-300';
    if (ext === 'xls') return 'text-success-300';
    return 'text-primary-100';
  };
  return (
    <Card className={cn('appear flex flex-col', className)}>
      <CardHeader className="h-20 flex-row justify-between">
        <CardTitle className="text-xl font-bold">Document Control</CardTitle>
        <div>
          <Select defaultValue="ALL">
            <SelectTrigger className="w-auto gap-2 rounded-full border-none bg-custom-100 px-4 font-bold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="ATC">ATC</SelectItem>
              <SelectItem value="NTC">NTC</SelectItem>
              <SelectItem value="RFI">RFI</SelectItem>
              <SelectItem value="VO">VO</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="place-items-content no-scrollbar grid max-h-[21rem] flex-1 overflow-y-auto py-6">
        <ul className="grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 ">
          {data.map(({ author, extension, filename, id }) => (
            <li key={id} className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 hover:bg-custom-100">
              <div>
                <CustomIcon variant="document" className={cn('h-9 w-9', getFileColor(extension))} />
              </div>
              <div>
                <p className="font-bold">{`${filename}.${extension}`}</p>
                <p className="flex items-center gap-1 text-sm text-custom-300">
                  <CustomIcon variant="user" className="shrink-0 text-custom-200" /> {author}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
