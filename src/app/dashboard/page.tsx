"use client";

import AdminDashboardMain from "@/components/dashboard/AdminDashboardMain";
import BreadCrumb from "@/components/shared/BreadCrumb";
import Wrapper from "@/layout/DefaultWrapper";

const DashboardPage = () => {
  return (
    <Wrapper>
      <main>
        <BreadCrumb title="Dashboard SuperAdmin" subTitleOne="SISTRA SRL" subTitleTwo="Panel Central" />
        <AdminDashboardMain />
      </main>
    </Wrapper>
  );
};

export default DashboardPage;
