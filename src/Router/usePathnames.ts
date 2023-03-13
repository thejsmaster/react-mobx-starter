import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export function usePathnames() {
  let pathArr = window.location.pathname.split('/').splice(1);
  console.log('in path names');

  return pathArr;
}
