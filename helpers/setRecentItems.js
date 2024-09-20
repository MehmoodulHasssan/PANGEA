export function setRecentItems(product) {
  const recentlyViewed = JSON.parse(
    window.localStorage.getItem('recentlyViewed')
  );
  if (recentlyViewed) {
    let currentIndex = null;
    recentlyViewed.forEach((element, index) => {
      if (element.id === product.id) {
        currentIndex = index;
      }
    });
    // const isAlreadyViewed = recentlyViewed.some(
    //     (item) => item.id === product.id
    // )
    if (!currentIndex) {
      window.localStorage.setItem(
        'recentlyViewed',
        JSON.stringify([product, ...recentlyViewed])
      );
    } else {
      recentlyViewed.splice(currentIndex, 1);
      window.localStorage.setItem(
        'recentlyViewed',
        JSON.stringify([product, ...recentlyViewed])
      );
    }
  } else {
    window.localStorage.setItem('recentlyViewed', JSON.stringify([product]));
  }
}
