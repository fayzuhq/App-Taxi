import React from 'react';
import { mockKpis, mockDrivers, mockAuditLogs, mockRawAuditLogs } from './mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, Users, Euro, ShieldCheck, AlertCircle, FileText, Lock } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const AdminView = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">

      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold">Direction & Gouvernance</h1>
          <p className="text-gray-500 text-sm">Vue d'ensemble de la coopérative</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Période</p>
          <select className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg px-3 py-1 font-medium">
            <option>Aujourd'hui</option>
            <option>Cette semaine</option>
            <option>Ce mois</option>
          </select>
        </div>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg"><Euro className="w-6 h-6"/></div>
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-tight mb-1">Total des redevances et cotisations perçues</p>
            <p className="text-xl sm:text-2xl font-bold">{mockKpis.totalRoyalties} €</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg"><TrendingUp className="w-6 h-6"/></div>
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-tight mb-1">Volume d'affaires global transitant par le groupement</p>
            <p className="text-xl sm:text-2xl font-bold">{mockKpis.globalBusinessVolume} €</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg"><Users className="w-6 h-6"/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Chauffeurs Actifs</p>
            <p className="text-2xl font-bold">{mockDrivers.filter(d=>d.status==='active').length} / {mockDrivers.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg"><ShieldCheck className="w-6 h-6"/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Alertes Conformité</p>
            <p className="text-2xl font-bold text-orange-600">2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Charts: Fairness & Payments */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold mb-4 flex items-center space-x-2"><TrendingUp className="w-5 h-5 text-blue-500"/> <span>Algorithme d'Équité (Courses attribuées)</span></h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockKpis.dispatchFairness} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: 'white'}} />
                <Bar dataKey="rides" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold mb-4 flex items-center space-x-2"><Euro className="w-5 h-5 text-green-500"/> <span>Répartition des Paiements</span></h3>
          <div className="h-64 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockKpis.paymentBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {mockKpis.paymentBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: 'white'}} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Driver Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-bold flex items-center space-x-2"><Users className="w-5 h-5 text-purple-500"/> <span>Flotte & Chauffeurs</span></h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Voir tout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 font-medium border-b dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3">ID Taxi</th>
                  <th className="px-4 py-3">Chauffeur</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Conformité (Carte / Taxi / Assur.)</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {mockDrivers.map(driver => (
                  <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3 font-bold">{driver.taxiId}</td>
                    <td className="px-4 py-3">
                      <div>{driver.name}</div>
                      <div className="text-xs text-gray-500">{driver.carModel}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                        {driver.status === 'active' ? 'En service' : 'Déconnecté'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-1">
                        <div className={`w-2 h-6 rounded-sm ${driver.docsExpiry.proCard < 30 ? 'bg-red-500' : 'bg-green-500'}`} title={`Carte Pro: ${driver.docsExpiry.proCard}j`}></div>
                        <div className={`w-2 h-6 rounded-sm ${driver.docsExpiry.taximeter < 30 ? 'bg-red-500' : 'bg-green-500'}`} title={`Taximètre: ${driver.docsExpiry.taximeter}j`}></div>
                        <div className={`w-2 h-6 rounded-sm ${driver.docsExpiry.insurance < 30 ? 'bg-red-500' : 'bg-green-500'}`} title={`Assurance: ${driver.docsExpiry.insurance}j`}></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-100 dark:bg-gray-700 rounded"><FileText className="w-4 h-4"/></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-100 dark:bg-gray-700 rounded"><Lock className="w-4 h-4"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="font-bold flex items-center space-x-2"><AlertCircle className="w-5 h-5 text-orange-500"/> <span>Journal d'Audit</span></h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {mockRawAuditLogs.map(log => (
              <div key={log.id} className="flex items-start space-x-3 text-sm">
                <div className="mt-0.5 text-gray-400 font-mono text-xs">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">{log.service}:</span>
                  <span className="text-gray-600 dark:text-gray-400">{log.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold flex items-center space-x-2"><Euro className="w-5 h-5 text-green-500"/> <span>Suivi des Cotisations</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 font-medium border-b dark:border-gray-700">
              <tr>
                <th className="px-4 py-3">Chauffeur</th>
                <th className="px-4 py-3">ID Taxi</th>
                <th className="px-4 py-3">Montant Cotisation</th>
                <th className="px-4 py-3">Statut du paiement</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {mockDrivers.map(driver => (
                <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 font-medium">{driver.name}</td>
                  <td className="px-4 py-3 text-gray-500">{driver.taxiId}</td>
                  <td className="px-4 py-3 font-bold">{driver.dues?.amount || 0} €</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      driver.dues?.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      driver.dues?.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {driver.dues?.status || 'Inconnu'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminView;
