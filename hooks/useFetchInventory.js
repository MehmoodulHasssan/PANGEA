import getVariationIds from '@/helpers/getVariationIds';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchInventory = (dataArray) => {
  const [inventoryArray, setInventoryArray] = useState([]);

  useEffect(() => {
    if (dataArray?.length === 0) return;
    const fetchInventoryCounts = async () => {
      setInventoryArray([]);
      const variationIds = getVariationIds(dataArray);
      console.log(variationIds);
      try {
        const response = await axios.post(
          '/api/get-inventory-count',
          variationIds
        );
        setInventoryArray(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInventoryCounts();
  }, [dataArray]);

  return { inventoryArray };
};

export default useFetchInventory;
