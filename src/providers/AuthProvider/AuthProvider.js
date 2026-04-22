import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

const STORAGE_KEY = 'spin-auth-profile';

const AuthContext = createContext(null);

const isGmailAddress = (value = '') => /^[^\s@]+@gmail\.com$/i.test(value.trim());
const normalizeWalletAddress = (value = '') => value.toLowerCase();

export const AuthProvider = ({ children }) => {
  const { account } = useWeb3React();
  const [profiles, setProfiles] = useState({});
  const [legacyDraft, setLegacyDraft] = useState(null);
  const [mode, setModeState] = useState('login');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.profiles) {
        setProfiles(parsed.profiles);
        if (parsed?.mode) setModeState(parsed.mode);
        if (parsed?.legacyDraft) setLegacyDraft(parsed.legacyDraft);
        return;
      }

      if (parsed?.gmail || parsed?.mode || parsed?.lastUpdatedAt) {
        setLegacyDraft({
          gmail: parsed?.gmail?.trim() || '',
          mode: parsed?.mode || 'login',
          lastUpdatedAt: parsed?.lastUpdatedAt || null,
        });
        if (parsed?.mode) setModeState(parsed.mode);
      }
    } catch (error) {
      console.error('Failed to restore auth profile', error);
    }
  }, []);

  const persist = useCallback((nextProfiles, nextMode, nextLegacyDraft) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      profiles: nextProfiles,
      mode: nextMode,
      legacyDraft: nextLegacyDraft,
    }));
  }, []);

  const saveProfile = useCallback((nextGmail, nextMode = 'login') => {
    if (!account) {
      return false;
    }

    const walletAddress = account.trim();
    const walletKey = normalizeWalletAddress(walletAddress);
    const profile = {
      gmail: nextGmail.trim(),
      mode: nextMode,
      walletAddress,
      lastUpdatedAt: new Date().toISOString(),
    };

    const nextProfiles = {
      ...profiles,
      [walletKey]: profile,
    };

    setProfiles(nextProfiles);
    setLegacyDraft(null);
    setModeState(nextMode);
    persist(nextProfiles, nextMode, null);
    return true;
  }, [account, persist, profiles]);

  const clearProfile = useCallback(() => {
    if (!account) {
      setLegacyDraft(null);
      persist(profiles, mode, null);
      return;
    }

    const walletKey = normalizeWalletAddress(account);
    const nextProfiles = { ...profiles };
    delete nextProfiles[walletKey];
    setProfiles(nextProfiles);
    persist(nextProfiles, mode, legacyDraft);
  }, [account, legacyDraft, mode, persist, profiles]);

  const setMode = useCallback((nextMode) => {
    setModeState(nextMode);
    persist(profiles, nextMode, legacyDraft);
  }, [legacyDraft, persist, profiles]);

  const activeProfile = useMemo(() => {
    if (!account) return null;
    return profiles[normalizeWalletAddress(account)] || null;
  }, [account, profiles]);

  const gmail = activeProfile?.gmail || '';
  const lastUpdatedAt = activeProfile?.lastUpdatedAt || null;
  const prefillGmail = gmail || legacyDraft?.gmail || '';

  const value = useMemo(() => ({
    gmail,
    mode,
    lastUpdatedAt,
    prefillGmail,
    isGmailConnected: isGmailAddress(gmail),
    walletAddress: account || '',
    isWalletConnected: Boolean(account),
    isAccessReady: isGmailAddress(gmail) && Boolean(account),
    hasLegacyDraft: Boolean(legacyDraft?.gmail),
    saveProfile,
    clearProfile,
    setMode,
    isGmailAddress,
  }), [account, clearProfile, gmail, lastUpdatedAt, legacyDraft, mode, prefillGmail, saveProfile, setMode]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAppAuth must be used within AuthProvider');
  }
  return context;
};
