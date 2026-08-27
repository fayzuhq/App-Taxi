const fs = require('fs');
let code = fs.readFileSync('taxi-grenoble/src/components/SuperAdminDashboard.jsx', 'utf8');

const importCode = `import {
  Activity, Server, Globe, Settings, Users, Key, FileJson, Play, TerminalSquare, X, Plus, Save, KeyRound, Map, ShieldCheck, CreditCard
} from 'lucide-react';`;
code = code.replace(/import {[\s\S]*?} from 'lucide-react';/, importCode);

const apisButton = `<button onClick={() => setActiveTab('apis')} className={\`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 \${activeTab === 'apis' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}\`}>
          <KeyRound className="w-4 h-4"/> <span className="whitespace-nowrap">API & Secrets</span>
        </button>
        <button onClick={() => setActiveTab('config')}`;

code = code.replace(/<button onClick={\(\) => setActiveTab\('config'\)}/, apisButton);

const renderApisCode = `
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
              <textarea rows="2" defaultValue="-----BEGIN CERTIFICATE-----\nMIIDXT..." className="w-full p-2 text-sm border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg font-mono text-xs"></textarea>
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
`;

code = code.replace(/const renderConfig = \(\) => \(/, renderApisCode + '\n  const renderConfig = () => (');

code = code.replace(/\{activeTab === 'users' && renderUsers\(\)\}/, `{activeTab === 'users' && renderUsers()}\n        {activeTab === 'apis' && renderApis()}`);

fs.writeFileSync('taxi-grenoble/src/components/SuperAdminDashboard.jsx', code);
