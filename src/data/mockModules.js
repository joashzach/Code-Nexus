export const mockModules = [
  {
    id: '1',
    title: 'Authentication Module',
    description: 'A complete authentication system using JWT and Refresh Tokens. Secure, reliable, and ready to drop into any project.',
    fullDescription: 'This module provides a robust authentication layer for your web applications. It includes login, registration, password reset, and token refresh mechanisms. Built with security best practices, it supports JWT signed with private keys and storage in HTTP-only cookies.',
    price: '0.05',
    category: 'Backend',
    seller: '0x1234...abcd',
    stats: { downloads: 120, likes: 45 },
    lastUpdated: '2024-03-20',
    codeSnippet: `// Example usage:
const auth = require('auth-module');

app.post('/login', async (req, res) => {
  const { user, token } = await auth.login(req.body);
  res.cookie('token', token, { httpOnly: true }).json(user);
});`
  },
  {
    id: '2',
    title: 'Dynamic Portfolio Theme',
    description: 'Beautiful, high-performance portfolio template with dark mode and smooth animations using Framer Motion.',
    fullDescription: 'A premium portfolio starter kit for developers. Includes section animations, project showcases, contact form with validation, and fully responsive layout. Optimized for SEO and performance with Next.js features.',
    price: '0.08',
    category: 'Frontend',
    seller: '0x5678...efgh',
    stats: { downloads: 85, likes: 32 },
    lastUpdated: '2024-03-15',
    codeSnippet: `import { motion } from "framer-motion";

export const Hero = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h1>Welcome to my portfolio</h1>
  </motion.div>
);`
  },
  {
    id: '3',
    title: 'Solidity Escrow Contract',
    description: 'Audited escrow smart contract for secure service-for-hire or marketplace payments with dispute resolution.',
    fullDescription: 'This smart contract handles escrow payments between a buyer and a seller. The funds are held in the contract until the buyer confirms the work or a third-party arbitrator resolves a dispute. Supports multi-signature releases and automated fee calculation.',
    price: '0.12',
    category: 'Blockchain',
    seller: '0x9012...ijkl',
    stats: { downloads: 42, likes: 18 },
    lastUpdated: '2024-03-10',
    codeSnippet: `contract Escrow {
    address public buyer;
    address public seller;
    address public arbiter;
    uint public amount;

    function confirmDelivery() external {
        require(msg.sender == buyer);
        payable(seller).transfer(address(this).balance);
    }
}`
  },
  {
    id: '4',
    title: 'Image Compression API',
    description: 'Robust image processing and compression logic using Sharp. Supports WebP transformation and resizing on the fly.',
    fullDescription: 'A microservice-ready module for handling image uploads, resizing, and optimizations. It drastically reduces storage costs and improves site performance by serving next-gen image formats like WebP or AVIF.',
    price: '0.04',
    category: 'DevOps',
    seller: '0x3456...mnop',
    stats: { downloads: 210, likes: 67 },
    lastUpdated: '2024-03-22',
    codeSnippet: `const sharp = require('sharp');

async function processImage(buffer) {
  return await sharp(buffer)
    .webp({ quality: 80 })
    .resize(800)
    .toBuffer();
}`
  },
  {
    id: '5',
    title: 'Real-Time Chat Module',
    description: 'WebSocket-powered real-time chat system with rooms, typing indicators, and message history persistence.',
    fullDescription: 'Drop-in real-time chat module built with Socket.IO and Redis pub/sub. Features include multi-room support, presence tracking (online/offline), typing indicators, and automatic reconnection logic. Easily integrates into any Node.js backend.',
    price: '0.07',
    category: 'Backend',
    seller: '0x7890...qrst',
    stats: { downloads: 94, likes: 41 },
    lastUpdated: '2024-03-18',
    codeSnippet: `const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room);
    io.to(room).emit('user-joined', socket.id);
  });

  socket.on('send-message', ({ room, message }) => {
    io.to(room).emit('receive-message', { sender: socket.id, message });
  });
});`
  },
  {
    id: '6',
    title: 'NFT Minting Contract',
    description: 'ERC-721 compliant NFT minting contract with on-chain metadata, royalties, and whitelist-based launch support.',
    fullDescription: 'A fully audited ERC-721 smart contract template for launching NFT collections. Supports IPFS metadata, configurable royalties (ERC-2981), public and whitelist mint phases, and team reserve allocations. Compatible with OpenSea and all major marketplaces.',
    price: '0.18',
    category: 'Blockchain',
    seller: '0xabc1...uvwx',
    stats: { downloads: 56, likes: 29 },
    lastUpdated: '2024-03-12',
    codeSnippet: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 public mintPrice = 0.05 ether;
    uint256 public maxSupply = 10000;
    uint256 public totalMinted;

    function mint() external payable {
        require(msg.value >= mintPrice, "Insufficient ETH");
        require(totalMinted < maxSupply, "Sold out");
        _safeMint(msg.sender, ++totalMinted);
    }
}`
  },
  {
    id: '7',
    title: 'React Dashboard UI Kit',
    description: '50+ premium React components for building analytics dashboards — charts, tables, KPI cards, and more.',
    fullDescription: 'A comprehensive React component library for admin dashboards and analytics platforms. Includes area charts, bar graphs, data tables with sorting/filtering, KPI stat cards, notification panels, sidebar navigation, and a full dark/light theme system. Built on top of Recharts and Tailwind.',
    price: '0.09',
    category: 'Frontend',
    seller: '0xdef2...yz12',
    stats: { downloads: 178, likes: 88 },
    lastUpdated: '2024-03-21',
    codeSnippet: `import { AreaChart, KPICard, DataTable } from 'react-dash-kit';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <KPICard title="Revenue" value="$48,200" trend="+12%" />
      <KPICard title="Users"   value="3,402"  trend="+5%"  />
      <KPICard title="Orders"  value="918"    trend="-2%"  />
      <AreaChart data={revenueData} className="col-span-3" />
    </div>
  );
}`
  },
  {
    id: '8',
    title: 'Email Notification Service',
    description: 'Transactional email service using SendGrid with queue management, retry logic, and HTML templates.',
    fullDescription: 'A production-ready email notification microservice with support for transactional emails, bulk campaigns, and templated HTML rendering. Includes a message queue powered by Bull, retry on failure, unsubscribe management, and open/click tracking.',
    price: '0.03',
    category: 'DevOps',
    seller: '0x3344...5566',
    stats: { downloads: 302, likes: 101 },
    lastUpdated: '2024-03-23',
    codeSnippet: `const emailService = require('./email-service');

// Send a welcome email
await emailService.send({
  template: 'welcome',
  to: 'user@example.com',
  data: { name: 'Alice', verifyUrl: 'https://...' }
});

// Queue a scheduled digest
await emailService.schedule({
  template: 'weekly-digest',
  to: subscribers,
  sendAt: new Date('2024-04-01T09:00:00Z')
});`
  },
  {
    id: '9',
    title: 'Glassmorphism UI Library',
    description: 'Set of elite Tailwind CSS components featuring advanced glassmorphism, background blurs, and organic gradients.',
    fullDescription: 'A high-end component library designed for modern dApps. Includes frosted-glass sidebars, glowing buttons, and translucent card layouts. Each component is optimized for performance and uses hardware-accelerated CSS blurs for a premium feel.',
    price: '0.11',
    category: 'UI/UX',
    seller: '0x7788...9900',
    stats: { downloads: 145, likes: 58 },
    lastUpdated: '2024-03-24',
    codeSnippet: `<div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
  <h2 className="text-white font-bold text-2xl">Premium UI</h2>
  <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-lg text-white font-semibold">
    Explore
  </button>
</div>`
  }
];
