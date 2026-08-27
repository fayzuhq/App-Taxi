const fs = require('fs');
let code = fs.readFileSync('taxi-grenoble/src/components/SuperAdminDashboard.jsx', 'utf8');

const modalStateCode = `
  const [activeTab, setActiveTab] = useState('health');
  const [selectedLog, setSelectedLog] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserRole, setNewUserRole] = useState('Chauffeur');
`;
code = code.replace(/const \[activeTab, setActiveTab\] = useState\('health'\);\n  const \[selectedLog, setSelectedLog\] = useState\(null\);/, modalStateCode);

const importCode = `import {
  Activity, Server, Globe, Settings, Users, Key, FileJson, Play, TerminalSquare, X, Plus, Save
} from 'lucide-react';`;
code = code.replace(/import {\n  Activity, Server, Globe, Settings, Users, Key, FileJson, Play, TerminalSquare, X\n} from 'lucide-react';/, importCode);


const renderUsersNew = `  const renderUsers = () => (
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
                    <Play className="w-3 h-3 inline mr-1" />
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
  );`;

const oldRenderUsersRegex = /const renderUsers = \(\) => \([\s\S]*?<\/div>\n    <\/div>\n  \);/;
code = code.replace(oldRenderUsersRegex, renderUsersNew);

fs.writeFileSync('taxi-grenoble/src/components/SuperAdminDashboard.jsx', code);
