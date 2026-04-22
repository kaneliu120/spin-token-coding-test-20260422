import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

const STORAGE_KEY = 'spin-auth-profile';

const AuthContext = createContext(null);

const isGmailAddress = (value = '') => /^[^\s@]+@gmail\.com$/i.test(value.trim());

export const AuthProvider = ({ children }) => {
  const { account } = useWeb3React();
  const [gmail, setGmail] = useState('');
  const [mode, setMode] = useState('login');
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.gmail) setGmail(parsed.gmail);
      if (parsed?.mode) setMode(parsed.mode);
      if (parsed?.lastUpdatedAt) setLastUpdatedAt(parsed.lastUpdatedAt);
    } catch (error) {
      console.error('Failed to restore auth profile', error);
    }
  }, []);

  const persist = useCallback((nextProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
  }, []);

  const saveProfile = useCallback((nextGmail, nextMode = 'login') => {
    const profile = {
      gmail: nextGmail.trim(),
      mode: nextMode,
      lastUpdatedAt: new Date().toISOString(),
    };
    setGmail(profile.gmail);
    setMode(profile.mode);
    setLastUpdatedAt(profile.lastUpdatedAt);
    persist(profile);
  }, [persist]);

  const clearProfile = useCallback(() => {
    setGmail('');
    setMode('login');
    setLastUpdatedAt(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({
    gmail,
    mode,
    lastUpdatedAt,
    isGmailConnected: isGmailAddress(gmail),
    walletAddress: account || '',
    isWalletConnected: Boolean(account),
    isAccessReady: isGmailAddress(gmail) && Boolean(account),
    saveProfile,
    clearProfile,
    setMode,
    isGmailAddress,
  }), [account, clearProfile, gmail, lastUpdatedAt, mode, saveProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAppAuth must be used within AuthProvider');
  }
  return context;
};
