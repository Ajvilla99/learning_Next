export const revalidate = 0;

import { getPaginatedUsers } from '@/actions';
import { Pagination, Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function UsersPage() {

  const { ok, users = [] } = await getPaginatedUsers();

  if ( !ok ) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Mantenimiento de usuario" />

      <div className="mb-10">
        <UsersTable users={ users } />

        <Pagination totalPages={ 3 } />
      </div>
    </>
  );
}