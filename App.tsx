import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PlayerModal } from './components/PlayerModal';
import { Player, NewsItem, Match, Product } from './types';
import { ChevronRight, Calendar, MapPin, Instagram, Twitter, Facebook, Mail, Trophy, Users, Star, ArrowRight, Shield } from 'lucide-react';

// --- DATA MOCKING ---
// 使用 Unsplash 图片提升视觉质量
const playersData: Player[] = [
  { id: 1, name: "马库斯·索恩", number: 9, position: '前锋', nationality: '英格兰', image: "https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&w=600&q=80", bio: "俱乐部队长，连续三个赛季的最佳射手。", stats: { goals: 22, assists: 8, appearances: 28 } },
  { id: 2, name: "迭戈·席尔瓦", number: 10, position: '中场', nationality: '巴西', image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80", bio: "中场的魔术师，以不可思议的传球闻名。", stats: { goals: 12, assists: 19, appearances: 30 } },
  { id: 3, name: "陈莎拉", number: 4, position: '后卫', nationality: '中国', image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=600&q=80", bio: "后防线上的磐石，兼具速度与战术智慧。", stats: { goals: 3, assists: 5, appearances: 32 } },
  { id: 4, name: "大卫·沃尔斯", number: 1, position: '门将', nationality: '苏格兰', image: "https://images.unsplash.com/photo-1552065860-25c276f532f6?auto=format&fit=crop&w=600&q=80", bio: "岩意之墙。联赛零封次数最多。", stats: { goals: 0, assists: 1, appearances: 32 } },
  { id: 5, name: "科菲·门萨", number: 7, position: '前锋', nationality: '加纳', image: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&w=600&q=80", bio: "边路具有爆发力的速度。", stats: { goals: 15, assists: 12, appearances: 25 } },
  { id: 6, name: "亚历山大·罗西", number: 21, position: '中场', nationality: '意大利', image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=600&q=80", bio: "深层中场的建筑师。", stats: { goals: 4, assists: 10, appearances: 29 } },
  { id: 7, name: "詹姆斯·卡特", number: 5, position: '后卫', nationality: '英格兰', image: "https://images.unsplash.com/photo-1626025437642-0b05076ca301?auto=format&fit=crop&w=600&q=80", bio: "青训出身，现已成为一线队常规首发。", stats: { goals: 2, assists: 1, appearances: 20 } },
  { id: 8, name: "利亚姆·奥康纳", number: 8, position: '中场', nationality: '爱尔兰', image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=600&q=80", bio: "全场飞奔的能量引擎。", stats: { goals: 6, assists: 6, appearances: 26 } },
];

const newsData: NewsItem[] = [
  { id: 1, title: "岩意FC锁定前四席位", date: "2024年5月20日", summary: "戏剧性的最后一轮胜利确保了欧冠联赛重返塘外竞技场。", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", author: "约翰·史密斯" },
  { id: 2, title: "青训学院：下一代", date: "2024年5月18日", summary: "深入了解统治地区联赛的U18梯队。", image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80", author: "莎拉·李" },
  { id: 3, title: "球场扩建计划获批", date: "2024年5月15日", summary: "市议会已批准将容量增加至65,000人的计划。", image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80", author: "迈克·布朗" },
];

const matchesData: Match[] = [
    { opponent: "伦敦城 FC", date: "8月24日 周六", time: "15:00", venue: "主场", price: "£45" },
    { opponent: "北方联队", date: "9月01日 周日", time: "17:30", venue: "客场", price: "£50" },
    { opponent: "西区流浪者", date: "9月14日 周六", time: "15:00", venue: "主场", price: "£40" },
];

const productsData: Product[] = [
    { id: 1, name: "24/25 主场球衣", price: "£75.00", image: "https://images.unsplash.com/photo-1577212017184-80cc3d0c2479?auto=format&fit=crop&w=400&q=80", category: "球衣" },
    { id: 2, name: "训练服", price: "£45.00", image: "https://images.unsplash.com/photo-1517963879466-db092d5d71a6?auto=format&fit=crop&w=400&q=80", category: "训练" },
    { id: 3, name: "俱乐部围巾", price: "£15.00", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=400&q=80", category: "配饰" },
    { id: 4, name: "签名足球", price: "£25.00", image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=400&q=80", category: "收藏品" },
];

// --- APP COMPONENT ---

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsLimit, setNewsLimit] = useState(3);

  const filteredPlayers = selectedCategory === '全部' 
    ? playersData 
    : playersData.filter(p => p.position === selectedCategory);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&w=1920&q=80" 
            alt="Stadium" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yanyi-blue via-yanyi-blue/60 to-transparent opacity-90"></div>
          {/* Particle effect simulation via CSS pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto transform translate-y-[-10%]">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-2xl">
            胜利的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yanyi-red to-orange-500">咆哮</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light tracking-wide max-w-2xl mx-auto">
            岩意足球俱乐部官方网站。北方的骄傲。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#team" className="bg-yanyi-red text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-red-700 transition-all hover:scale-105 shadow-lg border-2 border-transparent">
              探索球队
            </a>
            <a href="#tickets" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-yanyi-blue transition-all hover:scale-105 shadow-lg">
              购买门票
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* CLUB HIGHLIGHTS (Home Sub-section) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-20">
                {[
                    { title: "5次英超冠军", icon: <Trophy className="h-10 w-10 text-yanyi-gold" />, desc: "自1995年以来统治联赛。" },
                    { title: "塘外竞技场", icon: <MapPin className="h-10 w-10 text-yanyi-red" />, desc: "60,000人容量的堡垒。" },
                    { title: "全球社区", icon: <Users className="h-10 w-10 text-blue-500" />, desc: "全球超过5000万球迷。" },
                    { title: "精英学院", icon: <Star className="h-10 w-10 text-purple-500" />, desc: "培养未来的传奇。" }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-yanyi-blue group">
                        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                        <h3 className="text-xl font-bold text-slate-800 uppercase mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
                <div>
                    <h4 className="text-yanyi-red font-bold uppercase tracking-widest mb-2">我们的历史</h4>
                    <h2 className="text-4xl md:text-5xl font-black text-yanyi-blue mb-6">从草根业余到 <br/>全球豪门</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                    岩意足球俱乐部成立于1892年，由码头工人创立，现已崛起成为韧性和卓越的象征。我们的使命很简单：<span className="text-slate-900 font-bold">"培养天才，征服中国，走向世界。"</span>
                </p>
                
                {/* Timeline */}
                <div className="border-l-2 border-gray-200 pl-8 space-y-8 relative">
                    <div className="relative">
                        <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full bg-yanyi-red border-4 border-white shadow"></span>
                        <h5 className="font-bold text-slate-900">1892</h5>
                        <p className="text-sm text-gray-500">俱乐部成立，原名“岩意港口”</p>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full bg-yanyi-blue border-4 border-white shadow"></span>
                        <h5 className="font-bold text-slate-900">1995</h5>
                        <p className="text-sm text-gray-500">首次获得英超联赛冠军</p>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full bg-yanyi-gold border-4 border-white shadow"></span>
                        <h5 className="font-bold text-slate-900">2012</h5>
                        <p className="text-sm text-gray-500">欧洲冠军联赛决赛入围者</p>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                    <iframe 
                        title="Club Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5464674398163!2d-0.1277583842301826!3d51.50735097963518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c38c8cd1d9%3A0xb78f2474b9a45aa9!2sBig%20Ben!5e0!3m2!1sen!2suk!4v1629813952763!5m2!1sen!2suk" 
                        width="100%" 
                        height="500" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                     <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg">
                        <h5 className="font-bold text-yanyi-blue">塘外竞技场</h5>
                        <p className="text-xs text-gray-600">第九区，胜利路</p>
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-24 bg-yanyi-blue text-white relative overflow-hidden">
        {/* Decorative background logo */}
        <Shield className="absolute -right-20 -top-20 text-white/5 h-96 w-96 rotate-12" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <h4 className="text-yanyi-red font-bold uppercase tracking-widest mb-2">一线队</h4>
                <h2 className="text-4xl md:text-5xl font-black text-white">认识球队</h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['全部', '门将', '后卫', '中场', '前锋'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full border border-white/20 font-medium transition-all ${
                            selectedCategory === cat 
                            ? 'bg-yanyi-red text-white border-yanyi-red shadow-[0_0_20px_rgba(255,0,0,0.5)]' 
                            : 'bg-transparent text-gray-300 hover:bg-white/10'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredPlayers.map(player => (
                    <div 
                        key={player.id} 
                        onClick={() => handlePlayerClick(player)}
                        className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                    >
                        <div className="aspect-[3/4] overflow-hidden">
                            <img 
                                src={player.image} 
                                alt={player.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <div className="text-yanyi-red text-xs font-bold uppercase tracking-wider mb-1">{player.position}</div>
                            <div className="flex justify-between items-end">
                                <h3 className="text-xl font-bold text-white leading-tight w-2/3">{player.name}</h3>
                                <span className="text-4xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                                    {player.number}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section id="news" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h4 className="text-yanyi-red font-bold uppercase tracking-widest mb-2">俱乐部新闻</h4>
                    <h2 className="text-4xl font-black text-yanyi-blue">最新动态</h2>
                </div>
                <button className="hidden md:flex items-center text-yanyi-blue font-bold hover:text-yanyi-red transition-colors">
                    查看归档 <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {newsData.slice(0, newsLimit).map(news => (
                    <article key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                        <div className="h-48 overflow-hidden relative">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 bg-yanyi-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                                新闻
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center text-gray-500 text-xs mb-3 space-x-2">
                                <Calendar className="h-3 w-3" />
                                <span>{news.date}</span>
                                <span>•</span>
                                <span>{news.author}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{news.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-1">{news.summary}</p>
                            <a href="#" className="text-yanyi-red font-bold text-sm uppercase tracking-wide hover:underline mt-auto inline-block">
                                阅读全文
                            </a>
                        </div>
                    </article>
                ))}
            </div>
            
            {newsLimit < 6 && (
                <div className="text-center mt-12">
                    <button 
                        onClick={() => setNewsLimit(prev => prev + 3)}
                        className="bg-gray-100 text-slate-800 px-8 py-3 rounded-full font-bold uppercase hover:bg-gray-200 transition-colors"
                    >
                        加载更多新闻
                    </button>
                </div>
            )}
        </div>
      </section>

      {/* TICKETS & SHOP SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Tickets */}
          <section id="tickets" className="py-20 px-4 sm:px-12 bg-slate-900 text-white">
              <h2 className="text-3xl font-black mb-8 flex items-center">
                  <span className="bg-yanyi-red w-2 h-8 mr-4 block"></span>
                  近期赛事
              </h2>
              <div className="space-y-4">
                  {matchesData.map((match, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between hover:bg-white/10 transition-colors group">
                          <div className="flex items-center space-x-6 mb-4 sm:mb-0 w-full sm:w-auto">
                              <div className="text-center bg-white/10 p-2 rounded w-16">
                                  <span className="block text-xs uppercase text-gray-400">{match.date.split(' ')[0]}</span>
                                  <span className="block text-lg font-bold text-white">{match.date.split(' ')[1]}</span>
                              </div>
                              <div>
                                  <div className="text-xs text-yanyi-red font-bold uppercase mb-1">{match.venue} • {match.time}</div>
                                  <h3 className="text-xl font-bold text-white group-hover:text-yanyi-gold transition-colors">{match.opponent}</h3>
                              </div>
                          </div>
                          <button className="w-full sm:w-auto bg-white text-slate-900 px-6 py-2 rounded font-bold uppercase hover:bg-yanyi-red hover:text-white transition-colors">
                              购买 {match.price}
                          </button>
                      </div>
                  ))}
              </div>
          </section>

          {/* Shop */}
          <section id="shop" className="py-20 px-4 sm:px-12 bg-gray-100">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 flex items-center">
                    <span className="bg-yanyi-blue w-2 h-8 mr-4 block"></span>
                    官方商店
                </h2>
                <a href="#" className="text-yanyi-blue font-bold text-sm">访问商店</a>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {productsData.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow group">
                        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
                             <img src={product.image} alt={product.name} className="object-cover w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform" />
                             <button className="absolute bottom-2 right-2 bg-yanyi-blue text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Users className="h-4 w-4" />
                             </button>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{product.name}</h4>
                        <p className="text-yanyi-red font-bold">{product.price}</p>
                    </div>
                ))}
             </div>
          </section>
      </div>

      {/* Modals */}
      <PlayerModal 
        player={selectedPlayer} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <footer className="bg-yanyi-blue text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                     <div className="flex items-center mb-6">
                        <Shield className="h-10 w-10 text-yanyi-red mr-3" />
                        <div>
                            <span className="block font-black text-2xl leading-none">岩意 FC</span>
                            <span className="text-xs text-gray-400 tracking-widest">EST. 1892</span>
                        </div>
                     </div>
                     <p className="text-gray-400 text-sm leading-relaxed">
                         城市的中心，比赛的灵魂。加入我们通往荣耀的旅程。
                     </p>
                </div>
                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-6">俱乐部</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white">关于我们</a></li>
                        <li><a href="#" className="hover:text-white">职业机会</a></li>
                        <li><a href="#" className="hover:text-white">球场介绍</a></li>
                        <li><a href="#" className="hover:text-white">联系方式</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-6">支持</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white">帮助中心</a></li>
                        <li><a href="#" className="hover:text-white">隐私政策</a></li>
                        <li><a href="#" className="hover:text-white">服务条款</a></li>
                        <li><a href="#" className="hover:text-white">无障碍服务</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-6">连接</h4>
                    <div className="flex space-x-4 mb-6">
                        <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yanyi-red transition-colors"><Twitter className="h-5 w-5" /></a>
                        <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yanyi-red transition-colors"><Instagram className="h-5 w-5" /></a>
                        <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yanyi-red transition-colors"><Facebook className="h-5 w-5" /></a>
                    </div>
                    <div className="relative">
                        <input type="email" placeholder="订阅我们的通讯" className="w-full bg-slate-800 border-none rounded-full py-3 px-4 text-sm focus:ring-2 focus:ring-yanyi-red" />
                        <button className="absolute right-1 top-1 bg-yanyi-red p-2 rounded-full hover:bg-red-700 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} 岩意足球俱乐部. 保留所有权利.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;