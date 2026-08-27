import React, { useState } from 'react';
import {
  Activity, Server, Globe, Settings, Users, Key, FileJson, Play, TerminalSquare, X, Plus, Save, KeyRound, Map, ShieldCheck, CreditCard, AlertTriangle, Download, Zap, Eye
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { mockSystemTelemetry, mockTenantSettings, mockGlobalUsers, mockGlobalConfig, mockRawAuditLogs } from '../mockData';

const SuperAdminDashboard = ({ setRole }) => {

  const [activeTab, setActiveTab] = useState('health');
  const [selectedLog, setSelectedLog] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserRole, setNewUserRole] = useState('Chauffeur');


  const renderHealth = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockSystemTelemetry.services.map(service => (
          <div key={service.name} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm">{service.name}</h3>
              <span className={`w-3 h-3 rounded-full ${service.status === 'operational' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{service.status}</p>
            <p className="text-xl font-bold mt-2">{service.latency}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-4 flex items-center space-x-2"><Activity className="w-5 h-5 text-purple-500"/> <span>API Latency & Memory Usage</span></h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockSystemTelemetry.metricsGraph} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
              <RechartsTooltip contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: 'white'}} />
              <Line yAxisId="left" type="monotone" dataKey="apiLatency" stroke="#3b82f6" strokeWidth={2} name="Latency (ms)" />
              <Line yAxisId="right" type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} name="Memory (MB)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderTenant = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl">
      <h3 className="font-bold mb-6 flex items-center space-x-2"><Settings className="w-5 h-5 text-gray-500"/> <span>Company & Provisioning Settings</span></h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom de la société</label>
            <input type="text" defaultValue={mockTenantSettings.companyName} className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SIRET</label>
            <input type="text" defaultValue={mockTenantSettings.siret} className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email support technique</label>
          <input type="email" defaultValue={mockTenantSettings.supportEmail} className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rayon recherche par défaut (km)</label>
            <input type="number" defaultValue={mockTenantSettings.dispatchRadiusKm} className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timeout assignation (sec)</label>
            <input type="number" defaultValue={mockTenantSettings.fallbackTimeoutSeconds} className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg" />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t dark:border-gray-700 flex items-center justify-between">
          <div>
            <h4 className="font-bold">Abonnement ({mockTenantSettings.tier})</h4>
            <p className="text-sm text-gray-500">Statut de la licence SaaS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={mockTenantSettings.licenseActive} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <div className="mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Sauvegarder</button>
      </div>
    </div>
  );

    const renderUsers = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-bold flex items-center space-x-2"><Users className="w-5 h-5 text-blue-500"/> <span>Global User & Credential Vault</span></h3>
        <button onClick={() => setIsAddUserModalOpen(true)} className="px-3 py-1.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-1">
          <Plus className="w-4 h-4" /> <span>Ajouter un utilisateur</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 font-medium border-b dark:border-gray-700">
            <tr>
              <th className="px-4 py-3">ID / Utilisateur</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Dernière activité</th>
              <th className="px-4 py-3">Mode appareil unique</th>
              <th className="px-4 py-3 text-right">Actions d'urgence</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {mockGlobalUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3">
                  <div className="font-bold">{user.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{user.identifier}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-bold uppercase">{user.role}</span>
                </td>
                <td className="px-4 py-3">{user.lastActive}</td>
                <td className="px-4 py-3">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded flex-inline items-center space-x-1">
                    <Key className="w-3 h-3 inline mr-1" />
                    Reset
                  </button>
                  <button onClick={() => setRole(user.role)} className="px-3 py-1.5 text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 rounded flex-inline items-center space-x-1">
                    <Eye className="w-3 h-3 inline mr-1" />
                    Impersonate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-8">
            <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
              <h3 className="font-bold">Ajouter un utilisateur (Strict Identity Creation)</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom & Prénom *</label>
                  <input type="text" className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Numéro de téléphone direct *</label>
                  <input type="tel" className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Adresse email *</label>
                  <input type="email" className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Référence CNI / Pièce d'identité *</label>
                  <input type="text" className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg" required placeholder="Pour traçabilité" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rôle assigné *</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <option value="Chauffeur">Chauffeur</option>
                    <option value="Standardiste / Dispatcher">Standardiste / Dispatcher</option>
                    <option value="Direction / Admin">Direction / Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Statut *</label>
                  <select className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <option value="Actif">Actif</option>
                    <option value="Suspendu">Suspendu</option>
                    <option value="Archivé">Archivé</option>
                  </select>
                </div>
              </div>

              {newUserRole === 'Chauffeur' && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-4 border border-blue-100 dark:border-blue-900/50 mt-4">
                  <h4 className="font-bold text-sm text-blue-800 dark:text-blue-300">Informations Véhicule & Rattachement</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Numéro de taxi (ex: T14)</label>
                      <input type="text" className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Modèle du véhicule</label>
                      <input type="text" className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Plaque d'immatriculation</label>
                      <input type="text" className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Station de rattachement</label>
                      <select className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
                        <option>Gare de Grenoble</option>
                        <option>Presqu'île</option>
                        <option>CHU</option>
                        <option>Aucune</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t dark:border-gray-800 flex justify-end space-x-3 bg-gray-50 dark:bg-gray-800">
              <button onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">Annuler</button>
              <button onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2">
                <Save className="w-4 h-4" /> <span>Créer l'identité</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );


  const renderApis = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-6 flex items-center space-x-2"><KeyRound className="w-5 h-5 text-indigo-500"/> <span>API Keys & Integrations Management</span></h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SMS */}
          <div className="p-4 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 space-y-4">
            <h4 className="font-bold flex items-center space-x-2 text-blue-600"><Server className="w-4 h-4"/> <span>Passerelle SMS</span></h4>
            <div>
              <label className="block text-xs font-medium mb-1">Provider</label>
              <select className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
                <option>Twilio</option>
                <option>OVH Telecom</option>
                <option>MessageBird</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">API Key</label>
                <input type="password" defaultValue="sk_test_12345" className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Auth Token</label>
                <input type="password" defaultValue="tok_test_12345" className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Sender ID</label>
              <input type="text" defaultValue="TAXI GRENOBLE" className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono" />
            </div>
            <button className="w-full mt-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 py-2 rounded-lg text-sm font-medium transition-colors">
              Tester l'envoi SMS
            </button>
          </div>

          {/* Cartographie */}
          <div className="p-4 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 space-y-4">
            <h4 className="font-bold flex items-center space-x-2 text-green-600"><Map className="w-4 h-4"/> <span>Cartographie & Géocodage</span></h4>
            <div>
              <label className="block text-xs font-medium mb-1">Provider</label>
              <select className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
                <option>Google Maps API</option>
                <option>Mapbox</option>
                <option>OpenStreetMap/Nominatim</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">API Key</label>
              <input type="password" defaultValue="AIzaSyA..." className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 flex justify-between">
                <span>Geofencing Radius (Stations)</span>
                <span className="text-gray-500">200m</span>
              </label>
              <input type="range" min="50" max="1000" defaultValue="200" className="w-full" />
            </div>
            <button className="w-full mt-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 py-2 rounded-lg text-sm font-medium transition-colors">
              Tester la connexion API
            </button>
          </div>

          {/* CPAM */}
          <div className="p-4 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 space-y-4">
            <h4 className="font-bold flex items-center space-x-2 text-purple-600"><ShieldCheck className="w-4 h-4"/> <span>Télétransmission CPAM</span></h4>
            <div>
              <label className="block text-xs font-medium mb-1">Endpoint URL</label>
              <input type="text" defaultValue="https://ws.ameli.fr/teletrans" className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Partner Certificate / Key</label>
              <textarea rows="2" defaultValue="-----BEGIN CERTIFICATE-----
MIIDXT..." className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono text-xs"></textarea>
            </div>
            <button className="w-full mt-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 py-2 rounded-lg text-sm font-medium transition-colors">
              Ping Status
            </button>
          </div>

          {/* Paiement */}
          <div className="p-4 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 space-y-4">
            <h4 className="font-bold flex items-center space-x-2 text-orange-600"><CreditCard className="w-4 h-4"/> <span>Passerelle de Paiement</span></h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">Public Key</label>
                <input type="text" defaultValue="pk_test_123" className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Secret Key</label>
                <input type="password" defaultValue="sk_test_123" className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Active Webhook URL</label>
              <input type="text" defaultValue="https://api.taxis-grenoble.fr/stripe/webhook" disabled className="w-full p-2 text-sm border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-gray-500" />
            </div>
            <button className="w-full mt-2 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200 py-2 rounded-lg text-sm font-medium transition-colors">
              Vérifier Webhooks
            </button>
          </div>

        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg flex items-center space-x-2">
            <Save className="w-4 h-4" /> <span>Sauvegarder les clés</span>
          </button>
        </div>
      </div>
    </div>
  );

    const renderConfig = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl">
      <h3 className="font-bold mb-6 flex items-center space-x-2"><Globe className="w-5 h-5 text-indigo-500"/> <span>Global Configuration & Feature Flags</span></h3>

      <div className="space-y-6">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 pb-2">Expérience Client & Communication</h4>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">SMS d'approche automatique</p>
            <p className="text-xs text-gray-500">Envoie un SMS 5 min avant l'arrivée du chauffeur.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Lien de suivi GPS en direct</p>
            <p className="text-xs text-gray-500">Envoie un SMS au client avec la position GPS du taxi.</p>
          </div>
          <input type="checkbox" defaultChecked={mockGlobalConfig.liveSmsTracking} className="w-5 h-5 rounded text-blue-600" />
        </div>

        <h4 className="font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 pb-2 mt-6">Dispatch & Logistique</h4>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Auto-dispatch géolocalisé</p>
            <p className="text-xs text-gray-500">Privilégier le dispatch géo-localisé par rapport à l'attribution manuelle.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Gestion de file d'attente virtuelle aux stations</p>
            <p className="text-xs text-gray-500">Gare de Grenoble, Presqu'île.</p>
          </div>
          <input type="checkbox" defaultChecked={mockGlobalConfig.autoGeofencingStations} className="w-5 h-5 rounded text-blue-600" />
        </div>

        <h4 className="font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 pb-2 mt-6">Opérations & Administratif</h4>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Scanner et validation automatique des ordonnances CPAM</p>
            <p className="text-xs text-gray-500">Active la fonctionnalité OCR pour les chauffeurs.</p>
          </div>
          <input type="checkbox" defaultChecked={mockGlobalConfig.enableCpamScanner} className="w-5 h-5 rounded text-blue-600" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Mode conduite simplifié pour l'application chauffeur</p>
            <p className="text-xs text-gray-500">Interface épurée pendant la conduite.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Export comptable automatique journalier (PDF / CSV)</p>
            <p className="text-xs text-gray-500">Génération et envoi automatique en fin de journée.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600" />
        </div>

      </div>
    </div>
  );

    const renderGovernance = () => (
    <div className="space-y-6 max-w-4xl">

      {/* Maintenance Mode */}
      <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/50">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500 mt-1" />
            <div>
              <h3 className="font-bold text-red-800 dark:text-red-400 text-lg">Mode Maintenance</h3>
              <p className="text-sm text-red-600 dark:text-red-500/80 mt-1">Suspend l'accès à l'application pour les chauffeurs et standardistes. Seuls les administrateurs peuvent se connecter.</p>

              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-red-800 dark:text-red-400">Bannière d'annonce (visible par tous)</label>
                <textarea
                  rows="2"
                  defaultValue="🛠️ Opération de maintenance en cours. L'application sera de nouveau disponible d'ici 30 minutes. Merci de votre patience."
                  className="w-full p-3 text-sm border-red-300 dark:border-red-800 bg-white dark:bg-gray-900 rounded-lg text-gray-800 dark:text-gray-200"
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer mt-2">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Diagnostics & Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Export JSON */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold mb-2 flex items-center space-x-2"><Download className="w-5 h-5 text-blue-500"/> <span>Sauvegarde et Audit State</span></h3>
          <p className="text-sm text-gray-500 mb-6">Télécharger une archive JSON complète de l'état actuel (Mock State) pour l'analyse locale.</p>

          <button onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ mockSystemTelemetry, mockTenantSettings, mockGlobalUsers, mockGlobalConfig, mockRawAuditLogs }, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href",     dataStr);
            downloadAnchorNode.setAttribute("download", "taxi-grenoble-state-export.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          }} className="w-full flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 py-3 rounded-lg font-bold transition-colors">
            <FileJson className="w-5 h-5" />
            <span>Export Sauvegarde complète</span>
          </button>
        </div>

        {/* Sandbox Demo */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold mb-2 flex items-center space-x-2"><Zap className="w-5 h-5 text-yellow-500"/> <span>Générateur de Démo</span></h3>
          <p className="text-sm text-gray-500 mb-6">Peuple instantanément la base de données avec des courses, des chauffeurs et des clients fictifs pour les présentations.</p>

          <button className="w-full flex items-center justify-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 py-3 rounded-lg font-bold transition-colors border border-yellow-200 dark:border-yellow-900/50">
            <Play className="w-5 h-5" />
            <span>Générer flotte de test (Sandbox)</span>
          </button>
        </div>

      </div>

    </div>
  );
  const renderAudit = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col max-h-[80vh]">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
        <h3 className="font-bold flex items-center space-x-2"><TerminalSquare className="w-5 h-5 text-gray-600 dark:text-gray-400"/> <span>Raw Developer Audit Stream</span></h3>
      </div>
      <div className="overflow-auto flex-1 p-0">
        <table className="w-full text-xs font-mono text-left whitespace-nowrap">
          <thead className="bg-gray-100 dark:bg-gray-900 sticky top-0 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2 text-right">Payload</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {mockRawAuditLogs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-2 text-gray-500">{log.timestamp}</td>
                <td className="px-4 py-2">
                  <span className={`px-1.5 py-0.5 rounded font-bold ${log.level === 'ERROR' ? 'bg-red-100 text-red-700' : log.level === 'WARN' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {log.level}
                  </span>
                </td>
                <td className="px-4 py-2 font-bold text-gray-700 dark:text-gray-300">{log.service}</td>
                <td className="px-4 py-2 truncate max-w-xs" title={log.message}>{log.message}</td>
                <td className="px-4 py-2 text-right">
                  <button onClick={() => setSelectedLog(log)} className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded inline-flex items-center space-x-1">
                    <FileJson className="w-3 h-3" /> <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
              <h3 className="font-bold font-mono text-sm">Payload {selectedLog.id}</h3>
              <button onClick={() => setSelectedLog(null)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><X className="w-4 h-4"/></button>
            </div>
            <div className="p-4 overflow-auto bg-gray-900 text-green-400 font-mono text-sm p-4 h-64">
              <pre>{JSON.stringify(JSON.parse(selectedLog.payload), null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6 border-b dark:border-gray-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Server className="w-6 h-6 text-purple-600" />
            <span>Super Admin & Dev Portal</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Opérations système, télémétrie et gestion globale</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit mb-6 overflow-x-auto max-w-full">
        <button onClick={() => setActiveTab('health')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === 'health' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
          <Activity className="w-4 h-4"/> <span className="whitespace-nowrap">System Health</span>
        </button>
        <button onClick={() => setActiveTab('tenant')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === 'tenant' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
          <Settings className="w-4 h-4"/> <span className="whitespace-nowrap">Tenant Provisioning</span>
        </button>
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === 'users' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
          <Users className="w-4 h-4"/> <span className="whitespace-nowrap">User Vault</span>
        </button>
        <button onClick={() => setActiveTab('apis')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === 'apis' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
          <KeyRound className="w-4 h-4"/> <span className="whitespace-nowrap">API & Secrets</span>
        </button>
        <button onClick={() => setActiveTab('config')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === 'config' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
          <Globe className="w-4 h-4"/> <span className="whitespace-nowrap">Global Config</span>
        </button>
                <button onClick={() => setActiveTab('audit')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === 'audit' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
          <TerminalSquare className="w-4 h-4"/> <span className="whitespace-nowrap">Dev Audit Logs</span>
        </button>
        <button onClick={() => setActiveTab('governance')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === 'governance' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
          <AlertTriangle className="w-4 h-4"/> <span className="whitespace-nowrap">System Governance</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="pb-10">
        {activeTab === 'health' && renderHealth()}
        {activeTab === 'tenant' && renderTenant()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'apis' && renderApis()}
        {activeTab === 'config' && renderConfig()}
        {activeTab === 'audit' && renderAudit()}
        {activeTab === 'governance' && renderGovernance()}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
