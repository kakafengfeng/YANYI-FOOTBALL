import React from 'react';
import { X, Trophy, Footprints, Activity } from 'lucide-react';
import { Player } from '../types';

interface PlayerModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, isOpen, onClose }) => {
  if (!isOpen || !player) return null;

  const stats = [
    { label: '进球', value: player.stats.goals, icon: Trophy, color: 'text-yellow-500' },
    { label: '助攻', value: player.stats.assists, icon: Footprints, color: 'text-green-500' },
    { label: '出场', value: player.stats.appearances, icon: Activity, color: 'text-blue-500' },
  ];

  // Calculate max value for bar scaling, default to at least 10 to avoid division by zero or huge bars for small stats
  const maxVal = Math.max(...stats.map(s => s.value), 10);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0">
          <img 
            src={player.image} 
            alt={player.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-yanyi-blue to-transparent p-6 pt-20">
            <h2 className="text-5xl font-black text-white leading-none tracking-tighter">
                <span className="text-yanyi-red text-6xl mr-2">#{player.number}</span>
                <br/>
                {player.name}
            </h2>
            <p className="text-gray-300 text-lg font-medium mt-2">{player.position} | {player.nationality}</p>
          </div>
        </div>

        {/* Stats Side */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-yanyi-blue mb-4 flex items-center gap-2">
                <Activity className="h-6 w-6 text-yanyi-red" />
                赛季数据
            </h3>
            
            <p className="text-gray-600 mb-8 italic border-l-4 border-yanyi-red pl-4">
                "{player.bio}"
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                        <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                        <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Custom CSS Bar Chart */}
            <div className="w-full bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-around items-end h-48 space-x-8">
                    {stats.map((stat, i) => {
                        const heightPercent = (stat.value / maxVal) * 100;
                        return (
                            <div key={i} className="flex flex-col items-center justify-end h-full w-full group">
                                <div className="relative w-full max-w-[60px] flex items-end h-full bg-gray-100 rounded-t-lg overflow-hidden">
                                     <div 
                                        style={{ height: `${heightPercent}%` }}
                                        className={`w-full transition-all duration-1000 ease-out ${i === 0 ? 'bg-yanyi-red' : 'bg-yanyi-blue'} group-hover:opacity-90 relative`}
                                     >
                                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/20 to-transparent h-1/2"></div>
                                     </div>
                                </div>
                                <span className="mt-3 text-sm font-bold text-gray-500">{stat.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};