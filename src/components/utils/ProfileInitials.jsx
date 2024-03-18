import React from 'react'

export default function ProfileInitials({ firstName, lastName }) {
  const initials = firstName.charAt(0) + lastName.charAt(0);
  return initials;
}
