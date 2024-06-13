import { useState } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import { useToast } from '@/components/Toaster';
import {
  assetManagementTabAtom,
  ViewToggler,
  WarehouseContent,
  WarehouseForm,
  WarehouseFormProps,
} from '@/features/AssetManagement';
import { CustomIcon } from '@/features/CustomIcon';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { getSearchWarehouseByKey } from '@/api/warehouse/getSearchWarehouseByKey';
import { TViewWarehouse } from '@/types/warehouseList';
export default function AssetManagementPage() {
  const { toast } = useToast();
  const [tab, setTab] = useAtom(assetManagementTabAtom);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onTabChange = (value: string) => {
    setTab(value);
  };

  const handleSubmit: WarehouseFormProps['onSubmit'] = async () => {
    try {
      toast({
        description: 'New Warehouse has successfully created!',
        className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    } catch (error) {
      toast({
        description: 'Oops! something went wrong',
        className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    }
  };

  const handleSearch = async (searchText: string) => {
    setSearchKeyword(searchText);
    try {
      const {
        data: { list: warehouseData = [] },
      } = await getSearchWarehouseByKey({ page: 1, perPage: 50, sortType: 'asc', search: searchText });
      let dataList = warehouseData.map((warehouse) => warehouse.name);
      setSuggestions(dataList);
    } catch (error) {
      console.log('Search Failed', error);
    }
  };

  return (
    <Tabs value={tab} onValueChange={onTabChange} className="flex h-full flex-col gap-10">
      <h2 className="text-xl font-bold text-custom-400">Asset Management</h2>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <TabsList className="no-scrollbar h-auto justify-start gap-5 overflow-x-auto">
          {['purchasing', 'warehouse', 'deliveries', 'equipment'].map((tab, index) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="shrink-0 rounded-full px-5 py-2.5 capitalize transition duration-300 data-[state=active]:bg-custom-100 data-[state=inactive]:bg-white data-[state=active]:font-bold data-[state=active]:text-custom-400 data-[state=inactive]:text-custom-300"
            >
              {index === 0 ? 'project purchasing' : tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex flex-col items-center justify-end gap-2 lg:flex-row">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-9 min-w-52 rounded border bg-white placeholder:font-semibold placeholder:text-custom-200 lg:min-w-72"
            />
            <CustomIcon variant="search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-custom-200" />
            <div className="absolute z-10 mt-1 max-h-32 w-full overflow-y-auto rounded bg-white shadow-md">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  {suggestion}
                </div>
              ))}
            </div>
          </div>

          <TabsContent value="purchasing" className="mt-0 w-full">
            <ViewToggler type="purchasing" />
          </TabsContent>
          <TabsContent value="warehouse" className="mt-0 w-full">
            <ViewToggler type="warehouse" />
          </TabsContent>
          <TabsContent value="deliveries" className="mt-0 w-full">
            <ViewToggler type="deliveries" />
          </TabsContent>
          <TabsContent value="equipment" className="mt-0 w-full">
            <ViewToggler type="equipment" />
          </TabsContent>
        </div>
      </div>
      <div className="flex-1">
        <TabsContent value="purchasing" className="h-full">
          Project Purchasing
        </TabsContent>
        <TabsContent value="warehouse" className="h-full">
          <WarehouseContent />
          <WarehouseForm
            variant="create"
            button={
              <Button
                className="fixed bottom-28 right-8 h-14 w-14 rounded-full bg-primary-100 text-white shadow hover:bg-primary-100/90 sm:bottom-32 sm:right-14"
                title="Create/Assign Task"
              >
                <Plus />
              </Button>
            }
            onSubmit={handleSubmit}
          />
        </TabsContent>
        <TabsContent value="deliveries" className="h-full">
          Deliveries
        </TabsContent>
        <TabsContent value="equipment" className="h-full">
          Equipments
        </TabsContent>
      </div>
    </Tabs>
  );
}
