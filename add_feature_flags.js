const fs = require('fs');
let code = fs.readFileSync('taxi-grenoble/src/components/SuperAdminDashboard.jsx', 'utf8');

const newRenderConfig = `  const renderConfig = () => (
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
  );`;

const oldRenderConfigRegex = /const renderConfig = \(\) => \([\s\S]*?<\/div>\n    <\/div>\n  \);/;
code = code.replace(oldRenderConfigRegex, newRenderConfig);

fs.writeFileSync('taxi-grenoble/src/components/SuperAdminDashboard.jsx', code);
