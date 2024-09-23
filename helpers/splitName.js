export function splitName(name) {
  if (!name.trim().includes(' ')) {
    return {
      firstName: name,
      lastName: '',
    };
  } else {
    const firstName = name.split(' ')[0];
    const spaceIndex = name.indexOf(' ');
    const lastName = name.slice(spaceIndex + 1);

    return {
      firstName,
      lastName,
    };
  }
}
