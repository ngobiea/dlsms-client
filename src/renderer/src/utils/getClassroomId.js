

export const getClassroomId = (inputString) => {
  const trimmedString = inputString.trim(); // Remove any leading/trailing spaces
  const firstSlashIndex = trimmedString.indexOf('/');
  if (firstSlashIndex !== -1) {
    const valueAfterSlash = trimmedString.substring(firstSlashIndex + 1);
    const secondSlashIndex = valueAfterSlash.indexOf('/');
    if (secondSlashIndex !== -1) {
      return valueAfterSlash.substring(0, secondSlashIndex);
    } else {
      return valueAfterSlash; // Return the value if there's only one segment after the first slash
    }
  }
  return ''; // Return empty string if no slash is found
};


