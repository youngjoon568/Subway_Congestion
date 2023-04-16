import React from 'react';
import { Link } from 'react-router-dom';

export default function TextLink({ size, to, children }) {
  return (
    <Link to={to} style={{ fontSize: `${size}px` }}>{children}</Link>
  );
};