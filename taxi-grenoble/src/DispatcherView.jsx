import React, { useState } from 'react';
import { mockRides, mockDrivers } from './mockData';
import { MapPin, Phone, Car, Clock, User, X, ChevronRight, Check } from 'lucide-react';

const DispatcherView = () => {
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);

  const columns = [
    { id: 'en_attente', title: 'En attente', bgColor: 'bg-red-50 dark:bg-red-900/20', borderColor: 'border-red-200 dark:border-red-800' },
    { id: 'client_attend', title: 'Client attend', bgColor: 'bg-orange-50 dark:bg-orange-900/20', borderColor: 'border-orange-200 dark:border-orange-800' },
    { id: 'en_cours', title: 'Pris en charge', bgColor: 'bg-blue-50 dark:bg-blue-900/20', borderColor: 'border-blue-200 dark:border-blue-800' },
    { id: 'reservation', title: 'Réservations', bgColor: 'bg-purple-50 dark:bg-purple-900/20', borderColor: 'border-purple-200 dark:border-purple-800' },
    { id: 'terminee', title: 'Terminées', bgColor: 'bg-gray-50 dark:bg-gray-900/20', borderColor: 'border-gray-200 dark:border-gray-800' },
  ];

  const getDriver = (taxiId) => mockDrivers.find(d => d.taxiId === taxiId);

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Standard & Dispatch</h1>
          <p className="text-gray-500 text-sm">Gestion des courses en temps réel</p>
        </div>
        <button
          onClick={() => setShowDispatchModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center space-x-2"
        >
          <Phone className="w-4 h-4" />
          <span>Nouvelle Course</span>
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">

        {/* Kanban Board */}
        <div className="lg:col-span-3 flex space-x-4 overflow-x-auto pb-4">
          {columns.map(col => (
            <div key={col.id} className={`flex-none w-80 flex flex-col rounded-xl border ${col.borderColor} bg-white dark:bg-gray-800/50 shadow-sm overflow-hidden`}>
              <div className={`p-3 border-b ${col.borderColor} ${col.bgColor} font-bold flex justify-between items-center`}>
                <span>{col.title}</span>
                <span className="bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded text-xs">
                  {mockRides.filter(r => r.status === col.id).length}
                </span>
              </div>

              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {mockRides.filter(r => r.status === col.id).map(ride => {
                  const driver = getDriver(ride.taxiId);
                  return (
                    <div
                      key={ride.id}
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                      onClick={() => setSelectedRide(ride)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{ride.id}</span>
                        <div className="flex items-center space-x-1 text-xs font-medium text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{ride.time}</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm mb-1">{ride.clientName}</h4>

                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                        <div className="flex items-start space-x-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0"></div><span className="truncate">{ride.pickup}</span></div>
                        <div className="flex items-start space-x-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0"></div><span className="truncate">{ride.dropoff}</span></div>
                      </div>

                      {driver ? (
                        <div className="flex justify-between items-center pt-2 border-t dark:border-gray-700">
                          <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {driver.taxiId} - {driver.name}
                          </span>
                          <button className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"><Phone className="w-4 h-4"/></button>
                        </div>
                      ) : (
                        <button className="w-full mt-2 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-xs font-bold text-gray-700 dark:text-gray-300">
                          Assigner un taxi
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-1 bg-gray-200 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden relative flex flex-col">
          <div className="absolute top-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-2 rounded-lg shadow z-10 flex items-center justify-between text-sm font-medium border border-gray-200 dark:border-gray-700">
            <span>Flotte Active: 42/50</span>
            <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-green-500"></div><span>Connectés</span></div>
          </div>

          {/* Mock Map Background */}
          <div className="flex-1 bg-[url('https://maps.wikimedia.org/osm-intl/13/4231/2936.png')] bg-cover bg-center opacity-60 dark:opacity-40 relative">
            <MapPin className="absolute top-1/4 left-1/4 w-8 h-8 text-blue-600 drop-shadow-lg" />
            <MapPin className="absolute top-1/2 left-1/3 w-8 h-8 text-blue-600 drop-shadow-lg" />
            <MapPin className="absolute top-1/3 left-2/3 w-8 h-8 text-blue-600 drop-shadow-lg" />
            <MapPin className="absolute bottom-1/4 left-1/2 w-8 h-8 text-red-500 drop-shadow-lg animate-bounce" />
          </div>
        </div>

      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-600"/>
                <span>Nouvelle Course</span>
              </h2>
              <button onClick={() => setShowDispatchModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><X className="w-5 h-5"/></button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">

                {/* Form Left */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-gray-500 uppercase">Client</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom / Téléphone</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Recherche ou nouveau..." className="w-full pl-9 pr-3 py-2 border dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date & Heure</label>
                    <select className="w-full p-2 border dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <option>Immédiat (Asap)</option>
                      <option>Planifié...</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-bold text-sm text-gray-500 uppercase mb-3">Trajet</h3>
                    <div className="space-y-3 relative">
                      <div className="absolute left-2.5 top-5 bottom-5 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      <div>
                        <input type="text" placeholder="Adresse de départ..." defaultValue="Gare de Grenoble" className="w-full pl-8 pr-3 py-2 border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <input type="text" placeholder="Adresse d'arrivée..." className="w-full pl-8 pr-3 py-2 border dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Right (Dispatch) */}
                <div className="border-l dark:border-gray-700 pl-6 space-y-4 flex flex-col">
                  <h3 className="font-bold text-sm text-gray-500 uppercase">Assignation</h3>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border dark:border-gray-700">
                    <label className="flex items-center space-x-2 text-sm font-medium cursor-pointer">
                      <input type="radio" name="assign" defaultChecked className="text-blue-600" />
                      <span>Auto-dispatch (Plus proche)</span>
                    </label>
                    <p className="text-xs text-gray-500 ml-6 mt-1">Recherche dans un rayon de 3km</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border dark:border-gray-700 opacity-50">
                    <label className="flex items-center space-x-2 text-sm font-medium cursor-pointer">
                      <input type="radio" name="assign" className="text-blue-600" />
                      <span>Assignation manuelle</span>
                    </label>
                  </div>

                  <div className="mt-auto pt-4 space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm">Course CPAM</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm">Van / Break requis</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl flex justify-end space-x-3">
              <button onClick={() => setShowDispatchModal(false)} className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">Annuler</button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center space-x-2">
                <Check className="w-4 h-4"/>
                <span>Valider et Diffuser</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DispatcherView;
