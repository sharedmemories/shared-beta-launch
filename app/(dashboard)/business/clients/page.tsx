import DataTable from '@/components/ui/data-table';
import { columns } from './columns';
import { getBusinessClients } from '@/lib/queries/business';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function BusinessClients() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect('/');
  }

  const clients = await getBusinessClients();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground">
            Manage and monitor your business&apos; clients
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
