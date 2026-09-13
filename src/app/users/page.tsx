"use client";

import AdminUsersTable from "@/components/users/AdminUsersTable";
import BreadCrumb from "@/components/shared/BreadCrumb";
import Wrapper from "@/layout/DefaultWrapper";

const UsersPage = () => {
  return (
    <Wrapper>
      <main>
        <BreadCrumb
          title="Gestión de Usuarios y Membresías"
          subTitleOne="SuperAdmin"
          subTitleTwo="Control de Cuentas"
        />
        <div className="mt-6 px-4 sm:px-6 lg:px-8 mb-10">
          <AdminUsersTable />
        </div>
      </main>
    </Wrapper>
  );
};

export default UsersPage;
