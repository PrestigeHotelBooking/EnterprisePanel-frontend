import privateRoute from '@/Global/authMiddleware/privateRoute';
import Layout from '@/components/sidebar/sidebar';
import InventoryManagement from '@/modals/dashboard/inventory';
import React from 'react';

const Inventory = () => {
  return (
    <Layout>
        <InventoryManagement/>
    </Layout>
  );
};

export default privateRoute(Inventory);
