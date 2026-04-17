# SpinBattles — SPIN Token Platform

The official web platform for the **SPIN** utility token powering the SpinBattles gaming ecosystem.

Built for player rewards, digital ownership, and next-generation 3D gaming experiences.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 17 (CRA) |
| UI | Material UI v5 |
| Routing | React Router v5 |
| Web3 | web3-react, ethers.js, Moralis |
| Charts | Recharts v2 |
| Backend | Node.js / Express |
| Database | MongoDB (Mongoose) |
| Auth | Passport.js + JWT |

---

## Pages

| Route | Description |
|---|---|
| `/spin` | SPIN Token launch landing page (Hero, Tokenomics, Roadmap, Team, FAQ) |
| `/pre-sale` | SPIN Token public pre-sale |
| `/private-sale` | SPIN Token private sale |
| `/stake` | Staking pools |
| `/swap` | Token swap |
| `/gallery` | NFT gallery |
| `/about` | About SpinBattles |

---

## Quick Start

Clone the repo:

```sh
git clone https://github.com/your-org/spinbattles-token.git
cd spinbattles-token
```

Install dependencies:

```sh
npm install
```

Set up environment variables — copy `.env.example` to `.env` and fill in your values.

Start the full stack (frontend + backend):

```sh
npm start
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

---

## Environment Variables

```env
REACT_APP_MORALIS_APP_ID=
REACT_APP_MORALIS_SERVER_URL=
REACT_APP_CHAIN_ID=56
MONGODB_URI=
JWT_SECRET=
```

---

## Token Info

- **Token**: SPIN
- **Blockchain**: BNB Chain (BSC)
- **Total Supply**: 1,000,000,000 SPIN
- **Contract**: TBA

---

## Community

- Twitter: [@spinbattles](https://twitter.com/spinbattles)
- Telegram: [t.me/spinbattles](https://t.me/spinbattles)
- Discord: [discord.gg/spinbattles](https://discord.gg/spinbattles)
- Email: contact@spinbattles.io

---

## License

MIT © SpinBattles
