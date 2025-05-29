export function getInitials(fullName: string) {
  const names = fullName.trim().split(' ');
  const initials =
    names.length === 1
      ? names[0].slice(0, 2)
      : names[0][0] + names[names.length - 1][0];
  return initials.toUpperCase();
}
