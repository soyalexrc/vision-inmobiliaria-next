import React from 'react';
import { AdminLayout } from '../../../components/layouts';
import { GetServerSideProps } from 'next';
import { parseCookie } from '../../../utils';

export default function AdministrationPage() {
  return (
    <AdminLayout title="Administracion - Vision Inmobiliaria">
      <>
        <div>hello world from index</div>
      </>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!parseCookie('isAuthenticated', req.headers.cookie!)) {
    return {
      redirect: {
        destination: '/autenticacion/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
