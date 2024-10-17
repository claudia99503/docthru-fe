import { useQuery } from '@tanstack/react-query';
import { getWorkList } from '@/service/api/work';

export function useGetWorkList(id) {
  return useQuery({
    queryKey: ['worksList'],
    queryFn: () => getWorkList(id),
    enabled: !!id,
  });
}
