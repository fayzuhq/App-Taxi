import React, { useState } from 'react';
import { mockRides, mockDrivers } from './mockData';
import { MapPin, Phone, Car, Clock, User, X, Check, ChevronDown, ChevronUp, Edit, Trash2, MessageSquare, Plus } from 'lucide-react';

const DispatcherView = () => {
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);

  const [mapExpanded, setMapExpanded] = useState(false);
  const [collapsedColumns, setCollapsedColumns] = useState({});

  const toggleColumn = (id, e) => {
    e.stopPropagation();
    setCollapsedColumns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const columns = [
    { id: 'en_attente', title: 'En attente', bgColor: 'bg-red-50 dark:bg-red-900/20', borderColor: 'border-red-200 dark:border-red-800', textColor: 'text-red-800 dark:text-red-200' },
    { id: 'client_attend', title: 'Client attend son chauffeur', bgColor: 'bg-orange-50 dark:bg-orange-900/20', borderColor: 'border-orange-200 dark:border-orange-800', textColor: 'text-orange-800 dark:text-orange-200' },
    { id: 'en_cours', title: 'Pris en charge', bgColor: 'bg-blue-50 dark:bg-blue-900/20', borderColor: 'border-blue-200 dark:border-blue-800', textColor: 'text-blue-800 dark:text-blue-200' },
    { id: 'reservation', title: 'Réservations', bgColor: 'bg-purple-50 dark:bg-purple-900/20', borderColor: 'border-purple-200 dark:border-purple-800', textColor: 'text-purple-800 dark:text-purple-200' },
    { id: 'terminee', title: 'Terminées', bgColor: 'bg-gray-50 dark:bg-gray-900/20', borderColor: 'border-gray-200 dark:border-gray-800', textColor: 'text-gray-800 dark:text-gray-200' },
  ];

  const getDriver = (taxiId) => mockDrivers.find(d => d.taxiId === taxiId);

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col relative overflow-hidden">

      <div className="flex justify-between items-center mb-4 flex-shrink-0">
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

      <div className={`flex-1 grid grid-cols-1 ${mapExpanded ? 'lg:grid-cols-1' : 'lg:grid-cols-4'} gap-6 min-h-0`}>

        {/* Ride Queue (Vertical Stack) */}
        {!mapExpanded && (
          <div className="lg:col-span-1 flex flex-col overflow-hidden h-full">
            <div className="overflow-y-auto space-y-4 pb-4 pr-2 max-h-full">
              {columns.map(col => {
                const ridesInCol = mockRides.filter(r => r.status === col.id);
                if (ridesInCol.length === 0) return null;
                const isCollapsed = collapsedColumns[col.id];

                return (
                  <div key={col.id} className={`flex flex-col rounded-xl border ${col.borderColor} bg-white dark:bg-gray-800/50 shadow-sm overflow-hidden flex-shrink-0`}>
                    <div
                      className={`p-3 border-b ${col.borderColor} ${col.bgColor} font-bold flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm bg-opacity-90 cursor-pointer`}
                      onClick={(e) => toggleColumn(col.id, e)}
                    >
                      <div className="flex items-center space-x-2">
                        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        <span className={col.textColor}>{col.title}</span>
                      </div>
                      <span className="bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded text-xs">
                        {ridesInCol.length}
                      </span>
                    </div>

                    {!isCollapsed && (
                      <div className="p-3 space-y-3">
                        {ridesInCol.map(ride => {
                          const driver = getDriver(ride.taxiId);
                          return (
                            <div
                              key={ride.id}
                              className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer group flex flex-col relative"
                              onClick={() => setSelectedRide(ride)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{ride.id}</span>
                                <div className="flex items-center space-x-2">
                                  {ride.cpam && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 rounded">CPAM</span>}
                                  <div className="flex items-center space-x-1 text-xs font-medium text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{ride.time}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-sm">{ride.clientName}</h4>
                                <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded flex items-center"><Phone className="w-3 h-3 mr-1"/> {ride.phone}</span>
                              </div>

                              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                                <div className="flex items-start space-x-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0"></div><span className="truncate">{ride.pickup}</span></div>
                                <div className="flex items-start space-x-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0"></div><span className="truncate">{ride.dropoff}</span></div>
                              </div>

                              {driver ? (
                                <div className="flex justify-between items-center pt-2 border-t dark:border-gray-700">
                                  <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                    {driver.taxiId} - {driver.name}
                                  </span>
                                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 text-gray-400 hover:text-blue-600 bg-gray-100 dark:bg-gray-700 rounded" onClick={(e) => { e.stopPropagation(); /* action */ }}><Phone className="w-3 h-3"/></button>
                                    <button className="p-1 text-gray-400 hover:text-blue-600 bg-gray-100 dark:bg-gray-700 rounded" onClick={(e) => { e.stopPropagation(); /* action */ }}><MessageSquare className="w-3 h-3"/></button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex space-x-2 mt-auto">
                                  <button className="flex-1 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center space-x-1">
                                    <Car className="w-3 h-3"/>
                                    <span>Assigner</span>
                                  </button>
                                </div>
                              )}

                              {/* Quick actions overlay for Edit/Cancel */}
                              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 text-gray-400 hover:text-blue-600 bg-white/80 dark:bg-gray-800/80 rounded shadow-sm" onClick={(e) => { e.stopPropagation(); setSelectedRide(ride); }}><Edit className="w-3 h-3"/></button>
                                {['en_attente', 'client_attend', 'reservation'].includes(ride.status) && (
                                  <button className="p-1 text-gray-400 hover:text-red-600 bg-white/80 dark:bg-gray-800/80 rounded shadow-sm" onClick={(e) => { e.stopPropagation(); /* cancel */ }}><Trash2 className="w-3 h-3"/></button>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Map Placeholder */}
        <div className={`${mapExpanded ? 'lg:col-span-1 h-full' : 'lg:col-span-3'} bg-gray-200 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden relative flex flex-col cursor-pointer transition-all duration-300 shadow-inner`} onClick={() => !mapExpanded && setMapExpanded(true)}>
          <div className="absolute top-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-2 rounded-lg shadow z-10 flex items-center justify-between text-sm font-medium border border-gray-200 dark:border-gray-700">
            <span>Flotte Active: 42/50</span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="hidden sm:inline">Connectés</span></div>
              {mapExpanded && (
                <button onClick={(e) => { e.stopPropagation(); setMapExpanded(false); }} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><X className="w-4 h-4"/></button>
              )}
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-3 rounded-lg shadow z-10 text-xs font-medium border border-gray-200 dark:border-gray-700 space-y-2 pointer-events-none">
            <p className="font-bold border-b dark:border-gray-700 pb-1 mb-1">Légende</p>
            <div className="flex items-center space-x-2"><Car className="w-4 h-4 text-green-500"/><span>Taxi Libre</span></div>
            <div className="flex items-center space-x-2"><Car className="w-4 h-4 text-orange-500"/><span>Taxi En Course</span></div>
            <div className="flex items-center space-x-2"><User className="w-4 h-4 text-blue-500"/><span>Client (Attente Chauffeur)</span></div>
            <div className="flex items-center space-x-2"><User className="w-4 h-4 text-red-500"/><span>Client (Non assigné)</span></div>
            <div className="flex items-center space-x-2"><User className="w-4 h-4 text-purple-500"/><span>Réservation</span></div>
          </div>

          {/* Mock Map Background */}
          <div className="flex-1 bg-[url('https://maps.wikimedia.org/osm-intl/13/4231/2936.png')] bg-cover bg-center opacity-60 dark:opacity-40 relative">
            <Car className="absolute top-1/4 left-1/4 w-6 h-6 text-green-500 drop-shadow-lg" />
            <Car className="absolute top-1/2 left-1/3 w-6 h-6 text-orange-500 drop-shadow-lg" />
            <Car className="absolute top-1/3 left-2/3 w-6 h-6 text-green-500 drop-shadow-lg" />

            <User className="absolute bottom-1/4 left-1/2 w-6 h-6 text-red-500 drop-shadow-lg animate-bounce" />
            <User className="absolute top-1/5 left-3/4 w-6 h-6 text-blue-500 drop-shadow-lg" />
            <User className="absolute bottom-1/3 left-1/4 w-6 h-6 text-purple-500 drop-shadow-lg" />
          </div>
        </div>

      </div>

      {/* Ride Details Modal / Slide-over */}
      {selectedRide && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 p-0 backdrop-blur-sm" onClick={() => setSelectedRide(null)}>
          <div className="bg-white dark:bg-gray-900 w-full max-w-md h-full shadow-2xl flex flex-col transform transition-transform" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
              <h2 className="text-lg font-bold flex items-center space-x-2">
                <span>Détails Course</span>
                <span className="text-xs font-bold text-gray-500 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">{selectedRide.id}</span>
              </h2>
              <button onClick={() => setSelectedRide(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Client</h3>
                <p className="font-bold text-lg">{selectedRide.clientName}</p>
                <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2 mt-1"><Phone className="w-4 h-4"/> <span>{selectedRide.phone}</span></p>
              </div>

              <div className="space-y-4 relative">
                <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center z-10 shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Départ</p>
                    <p className="font-medium">{selectedRide.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center z-10 shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Arrivée</p>
                    <p className="font-medium">{selectedRide.dropoff}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Statut</span>
                  <span className="font-bold">{columns.find(c => c.id === selectedRide.status)?.title || selectedRide.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Heure</span>
                  <span className="font-bold">{selectedRide.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type</span>
                  <span className="font-bold capitalize">{selectedRide.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Médical</span>
                  <span className="font-bold">{selectedRide.cpam ? 'Oui (CPAM)' : 'Non'}</span>
                </div>
              </div>

              {['en_attente', 'client_attend', 'reservation'].includes(selectedRide.status) && (
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 font-bold py-2 rounded-lg">
                    Annuler course
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 font-bold py-2 rounded-lg">
                    Modifier
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                      <div className="relative">
                        <input type="text" placeholder="Adresse de départ..." defaultValue="Gare de Grenoble" className="w-full pl-8 pr-3 py-2 border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        <div className="absolute z-20 left-0 right-0 mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg">
                           <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm">Gare de Grenoble, 38000 Grenoble</div>
                           <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm">CHU Grenoble Alpes, 38700 La Tronche</div>
                        </div>
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

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                    <label className="flex items-center space-x-2 text-sm font-medium cursor-pointer">
                      <input type="radio" name="assign" defaultChecked className="text-blue-600" />
                      <span>Auto-dispatch géolocalisé</span>
                    </label>
                    <div className="ml-6 mt-2 space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Rayon de recherche</span>
                        <span className="font-bold text-blue-600">3 km</span>
                      </div>
                      <input type="range" className="w-full" min="1" max="10" defaultValue="3" />
                      <p className="text-[10px] text-gray-500 mt-1">Bascule en assignation manuelle si aucun chauffeur n'accepte d'ici 5 minutes.</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border dark:border-gray-700 opacity-70">
                    <label className="flex items-center space-x-2 text-sm font-medium cursor-pointer">
                      <input type="radio" name="assign" className="text-gray-600" />
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
                      <span className="text-sm">Van requis</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm">Break requis</span>
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
