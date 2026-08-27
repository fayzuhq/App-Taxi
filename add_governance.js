const fs = require('fs');
let code = fs.readFileSync('taxi-grenoble/src/components/SuperAdminDashboard.jsx', 'utf8');

const importCode = `import {
  Activity, Server, Globe, Settings, Users, Key, FileJson, Play, TerminalSquare, X, Plus, Save, KeyRound, Map, ShieldCheck, CreditCard, AlertTriangle, Download, Zap
} from 'lucide-react';`;
code = code.replace(/import {[\s\S]*?} from 'lucide-react';/, importCode);

const govTabButton = `        <button onClick={() => setActiveTab('audit')} className={\`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 \${activeTab === 'audit' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}\`}>
          <TerminalSquare className="w-4 h-4"/> <span className="whitespace-nowrap">Dev Audit Logs</span>
        </button>
        <button onClick={() => setActiveTab('governance')} className={\`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 \${activeTab === 'governance' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}\`}>
          <AlertTriangle className="w-4 h-4"/> <span className="whitespace-nowrap">System Governance</span>
        </button>`;
code = code.replace(/<button onClick={\(\) => setActiveTab\('audit'\)}[\s\S]*?<\/button>/, govTabButton);

const renderGovernance = `  const renderGovernance = () => (
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
  );`;

code = code.replace(/const renderAudit = \(\) => \(/, renderGovernance + '\n  const renderAudit = () => (');
code = code.replace(/\{activeTab === 'audit' && renderAudit\(\)\}/, `{activeTab === 'audit' && renderAudit()}\n        {activeTab === 'governance' && renderGovernance()}`);

fs.writeFileSync('taxi-grenoble/src/components/SuperAdminDashboard.jsx', code);
