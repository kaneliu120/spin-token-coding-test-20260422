// SPIN Token — Static Data Constants

export const SPIN_COLORS = {
  purple: '#7c3aed',
  cyan: '#06b6d4',
  magenta: '#d946ef',
  gold: '#f59e0b',
  darkBg: '#0a0a0f',
  darkCard: '#13132b',
  darkBorder: 'rgba(124,58,237,0.25)',
};

export const SITE_CONFIG = {
  tokenName: 'SPIN',
  totalSupply: 1_000_000_000,
  contractAddress: null, // null = TBA
  blockchain: 'Ethereum (ERC-20)',
  whitepaperUrl: null,   // null = Coming Soon
  communityLinks: {
    discord: 'https://discord.gg/spinbattles',
    telegram: 'https://t.me/spinbattles',
    twitter: 'https://twitter.com/spinbattles',
  },
  contactEmail: 'contact@spinbattles.io',
  audit: {
    firmName: 'Pending',
    reportUrl: null,
    status: 'pending',
  },
  securityMeasures: [
    'Timelock on admin functions',
    'Multi-signature wallet for treasury',
    'Renounced ownership post-launch',
    'Anti-whale transaction limits',
  ],
  legalDisclaimer: 'SPIN is a utility token designed for use within the SpinBattles gaming ecosystem. It does not constitute a security, financial instrument, or investment advice.',
  jurisdictionDisclaimer: 'SPIN tokens may not be available in all jurisdictions. Please consult applicable local regulations before participating.',
  copyrightYear: new Date().getFullYear(),
};

export const SPIN_SALE_INFO = {
  eyebrow: 'Private Sale',
  title: 'Private sale details for the SPIN token',
  summary:
    'Review the confirmed private-sale terms before entering the purchase flow. Pricing, payment methods, and allocation limits are now defined, while the claim and vesting start date remains to be announced.',
  tokenPrice: {
    value: '$0.10',
    helper: 'Each SPIN token is currently offered at a private-sale price of $0.10.',
  },
  status: {
    label: 'Private sale terms confirmed',
    note: 'Claim and vesting start date is still TBA and will be published once the post-sale schedule is finalized.',
  },
  metrics: [
    {
      id: 'accepted-payment-methods',
      label: 'Accepted Payment Methods',
      value: ['USDT', 'ETH', 'Credit Card'],
      helper: 'Buyers can participate using stablecoin, native crypto, or card checkout during the current private sale.',
      accent: '#06b6d4',
    },
    {
      id: 'current-sale-stage',
      label: 'Current Sale Stage',
      value: 'Private Sale',
      helper: 'The current live sale window is the private-sale round.',
      accent: '#a78bfa',
    },
    {
      id: 'minimum-purchase',
      label: 'Minimum Purchase',
      value: '$100',
      helper: 'The private sale opens at a minimum contribution of $100 per purchase.',
      accent: '#f59e0b',
    },
    {
      id: 'maximum-purchase',
      label: 'Maximum Purchase',
      value: '$10,000',
      helper: 'The current private-sale cap is $10,000 per purchase allocation.',
      accent: '#d946ef',
    },
    {
      id: 'supported-network',
      label: 'Supported Network',
      value: 'ERC-20',
      helper: 'Wallet-based participation is currently structured around the Ethereum ERC-20 network.',
      accent: '#22c55e',
    },
    {
      id: 'claim-vesting-start',
      label: 'Claim / Vesting Start',
      value: 'TBA',
      helper: 'Claim and vesting timing will be announced once the final distribution schedule is confirmed.',
      accent: '#f97316',
    },
  ],
};

export const SPIN_ALLOCATIONS = [
  { name: 'Ecosystem & Rewards', percentage: 35, tokenAmount: 350_000_000, color: '#7c3aed', vestingSchedule: 'Released over 36 months, 10% at TGE', lockupMonths: 0 },
  { name: 'Team & Founders',     percentage: 15, tokenAmount: 150_000_000, color: '#06b6d4', vestingSchedule: '12-month cliff, then 24-month linear vesting', lockupMonths: 12 },
  { name: 'Liquidity',           percentage: 20, tokenAmount: 200_000_000, color: '#d946ef', vestingSchedule: '50% at TGE, remainder over 6 months', lockupMonths: 0 },
  { name: 'Treasury',            percentage: 15, tokenAmount: 150_000_000, color: '#f59e0b', vestingSchedule: '6-month cliff, then 30-month linear vesting', lockupMonths: 6 },
  { name: 'Marketing',           percentage: 10, tokenAmount: 100_000_000, color: '#10b981', vestingSchedule: '20% at TGE, remainder over 18 months', lockupMonths: 0 },
  { name: 'Investors / Private', percentage: 5,  tokenAmount: 50_000_000,  color: '#f97316', vestingSchedule: '6-month cliff, then 12-month linear vesting', lockupMonths: 6 },
];

export const SPIN_ROADMAP = [
  { phaseNumber: 1, title: 'Brand & Token Setup',    status: 'completed', quarter: 'Q4 2023', milestones: ['Brand identity & logo', 'Smart contract development', 'Website launch', 'Whitepaper v1'] },
  { phaseNumber: 2, title: 'Community Growth',        status: 'completed', quarter: 'Q1 2024', milestones: ['Discord & Telegram launch', 'Social media presence', 'Ambassador program', '5K community members'] },
  { phaseNumber: 3, title: 'Token Launch',            status: 'active',    quarter: 'Q2 2024', milestones: ['Public token sale', 'DEX listing', 'CoinGecko & CMC listing', 'Liquidity lock'] },
  { phaseNumber: 4, title: 'SPIN Utility in Games',  status: 'upcoming',  quarter: 'Q3 2024', milestones: ['In-game SPIN purchases', 'Player reward system', 'Tournament entry fees', 'Beta game launch'] },
  { phaseNumber: 5, title: 'NFT, Staking & Rewards', status: 'upcoming',  quarter: 'Q4 2024', milestones: ['NFT marketplace integration', 'Staking pools live', 'Governance voting', 'CEX listing'] },
  { phaseNumber: 6, title: 'Full Gaming Ecosystem',  status: 'upcoming',  quarter: 'Q1 2025', milestones: ['Full 3D game release', 'Cross-chain bridge', 'eSports partnerships', 'Mobile app launch'] },
];

export const SPIN_UTILITIES = [
  { icon: '🛒', title: 'In-Game Purchases',  description: 'Buy weapons, skins, and power-ups directly with SPIN inside SpinBattles.' },
  { icon: '🏆', title: 'Player Rewards',     description: 'Earn SPIN tokens for winning matches, completing quests, and ranking on leaderboards.' },
  { icon: '🔒', title: 'Staking',            description: 'Lock SPIN to earn passive yield and unlock exclusive in-game perks.' },
  { icon: '⚔️', title: 'Tournament Entry',   description: 'Use SPIN to enter competitive tournaments with prize pools paid in SPIN.' },
  { icon: '✨', title: 'NFT Upgrades',       description: 'Spend SPIN to upgrade, craft, or trade NFT game assets on the marketplace.' },
  { icon: '🌐', title: 'Ecosystem Access',   description: 'Unlock premium game modes, early access content, and partner platform benefits.' },
  { icon: '🗳️', title: 'Governance Voting',  description: 'Hold SPIN to vote on ecosystem proposals and shape the future of SpinBattles.' },
];

export const SPIN_FAQ = [
  { question: 'What is SPIN?', answer: 'SPIN is the utility token powering the SpinBattles gaming ecosystem. It is used for in-game purchases, player rewards, staking, tournament entry, NFT upgrades, and governance voting.' },
  { question: 'Which blockchain is SPIN deployed on?', answer: 'SPIN is currently positioned as an ERC-20 token, with wallet participation structured around the Ethereum network standard.' },
  { question: 'How do I buy SPIN?', answer: 'SPIN is currently offered through the private sale on this site. Buyers can participate using USDT, ETH, or credit card, subject to the current purchase limits shown in the sale overview.' },
  { question: 'What can I do with SPIN tokens?', answer: 'SPIN tokens are used within the SpinBattles ecosystem for in-game purchases, entering tournaments, staking for rewards, upgrading NFT assets, and participating in governance votes.' },
  { question: 'When is the token launch?', answer: 'SPIN is currently in the private-sale stage. Follow the official channels for updates on the public-sale timeline and broader launch milestones.' },
  { question: 'How does staking work?', answer: 'Token holders can lock SPIN in staking pools to earn yield over time. Staking also unlocks exclusive in-game benefits. Staking pools launch in Phase 5.' },
  { question: 'Is the game available now?', answer: 'SpinBattles is currently in development. A beta version is planned for Phase 4. Follow our roadmap and community channels for progress updates.' },
  { question: 'Is SPIN a financial investment?', answer: 'SPIN is a utility token designed for use within the SpinBattles gaming ecosystem. It does not constitute a security, financial instrument, or investment advice. Participation involves risk and SPIN may not be available in all jurisdictions.', isRiskDisclaimer: true },
];

export const SPIN_TEAM = [
  { name: 'Alex Rivera',   role: 'Founder & CEO',           bio: 'Visionary behind SpinBattles with a decade of experience in gaming and blockchain technology. Previously led product at two Web3 gaming startups.', avatar: null, linkedinUrl: '' },
  { name: 'Jordan Kim',    role: 'Technical Lead',           bio: 'Leads smart contract development and game backend architecture with 8+ years in Web3 engineering. Expert in Solidity and distributed systems.', avatar: null, linkedinUrl: '' },
  { name: 'Sam Patel',     role: 'Community & Growth Lead',  bio: 'Drives community growth, partnerships, and marketing strategy across all channels. Built communities of 100K+ in previous Web3 projects.', avatar: null, linkedinUrl: '' },
  { name: 'Morgan Chen',   role: 'Gaming Industry Advisor',  bio: 'Brings deep expertise from AAA game studios to guide SpinBattles product direction. Shipped titles with over 10M players worldwide.', avatar: null, linkedinUrl: '' },
];
