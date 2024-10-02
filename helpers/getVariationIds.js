export default function getVariationIds(products) {
  let ids = [];
  let locationCount = 0;
  for (let i = 0; i < products.length; i++) {
    const location_overrides =
      products[i]?.item_data?.variations[0]?.item_variation_data
        ?.location_overrides;
    if (
      location_overrides &&
      location_overrides[0]?.inventory_alert_threshold
    ) {
      ids.push(products[i].item_data.variations[0].id);
    }
  }
  //   console.log(locationCount);
  return ids;
}
