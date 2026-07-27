export const LocalImages = {
  background: require('../assets/images/background.png'),
  adicto: require('../assets/images/adicto.png'),
  bebo: require('../assets/images/bebo.png'),
  mambita: require('../assets/images/mambita.png'),
  night: require('../assets/images/night.png'),
  summer: require('../assets/images/summer.png'),
};

export const getEventImageSource = (imageUri: string, eventTitle: string = '') => {
  // If the imageUri is a valid web URL, try to use it.
  // Note: if the image fails to load, Image component will show empty, or we can default to local asset.
  if (imageUri && (imageUri.startsWith('http://') || imageUri.startsWith('https://')) && !imageUri.includes('placeholder')) {
    return { uri: imageUri };
  }

  const title = eventTitle.toLowerCase();
  if (title.includes('adicto')) {
    return LocalImages.adicto;
  }
  if (title.includes('bebo') || title.includes('sensual nights') || title.includes('outdoor')) {
    return LocalImages.bebo;
  }
  if (title.includes('mambita') || title.includes('open level')) {
    return LocalImages.mambita;
  }
  if (title.includes('night') || title.includes('salsa')) {
    return LocalImages.night;
  }
  if (title.includes('summer') || title.includes('ssd')) {
    return LocalImages.summer;
  }

  // Fallback to a stable index based on event title length
  const fallbacks = [
    LocalImages.adicto,
    LocalImages.bebo,
    LocalImages.mambita,
    LocalImages.night,
    LocalImages.summer,
  ];
  const idx = eventTitle ? (eventTitle.length % fallbacks.length) : 0;
  return fallbacks[idx];
};


export const getEventImageSources = (eventId: string) => {
  switch (eventId) {
    case '7':
      return LocalImages.adicto;

    case '59':
      return LocalImages.bebo;

    case '60':
      return LocalImages.mambita;

    case '61':
      return LocalImages.night;

    default:
      return LocalImages.summer;
  }
};