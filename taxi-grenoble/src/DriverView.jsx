import React, { useState } from 'react';
import {
  Play, Square, AlertTriangle, Phone, MessageSquare, MapPin, CheckCircle,
  Plus, Menu, Clock, Navigation, FileText, Camera, X, Ban, Receipt, Upload
} from 'lucide-react';
import { mockRides, mockDrivers } from './mockData';

const DriverView = () => {
  const [shiftActive, setShiftActive] = useState(false);
  const [driveMode, setDriveMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showEndRideModal, setShowEndRideModal] = useState(false);

  const [addRideStatus, setAddRideStatus] = useState('en_cours');

  const driver = mockDrivers[0]; // Active driver

  const activeRide = mockRides.find(r => r.status === 'en_cours' && r.taxiId === driver.taxiId);
  const upcomingRides = mockRides.filter(r => r.status === 'reservation' && r.taxiId === driver.taxiId);
  const completedRides = mockRides.filter(r => r.status === 'terminee' && r.taxiId === driver.taxiId);

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-4rem)] relative pb-20 shadow-xl sm:border-x sm:border-gray-200 dark:sm:border-gray-800">

      {/* Top Summary Card */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-sm rounded-b-xl z-10 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="font-bold text-lg leading-tight">{driver.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Taxi {driver.taxiId} • {driver.carModel}</p>
            </div>
          </div>
          <button
            onClick={() => setShowSosModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg shadow-red-500/30 animate-pulse"
          >
            <AlertTriangle className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-center">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Recette</p>
            <p className="font-bold text-gray-900 dark:text-white">{driver.revenueToday}€</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg text-center">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">Km</p>
            <p className="font-bold text-gray-900 dark:text-white">124 km</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-lg text-center">
            <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Temps</p>
            <p className="font-bold text-gray-900 dark:text-white">5h 12m</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowShiftModal(true)}
            className={`flex-1 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center space-x-2 transition-colors ${
              shiftActive
                ? 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {shiftActive ? <><Square className="w-4 h-4 fill-current"/> <span>Clôturer journée</span></> : <><Play className="w-4 h-4 fill-current"/> <span>Commencer</span></>}
          </button>

          <button
            onClick={() => setDriveMode(!driveMode)}
            className={`px-4 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center border-2 transition-colors ${
              driveMode
                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content: Rides Queue */}
      <div className="p-4 space-y-6">

        {/* En Cours */}
        {activeRide && (
          <section>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Course en cours</h3>
            <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border-l-4 border-blue-500 overflow-hidden ${driveMode ? 'scale-105 transform origin-top' : ''} transition-all`}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold rounded-md mb-2">Immédiat</span>
                    <h4 className="font-bold text-lg">{activeRide.clientName}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{activeRide.phone}</p>
                  </div>
                  {activeRide.cpam && (
                    <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold px-2 py-1 rounded">CPAM</span>
                  )}
                </div>

                <div className="space-y-3 mb-4 relative">
                  <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center z-10 shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    </div>
                    <p className="text-sm font-medium">{activeRide.pickup}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center z-10 shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                    </div>
                    <p className="text-sm font-medium">{activeRide.dropoff}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <button className="col-span-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg flex flex-col items-center justify-center text-gray-700 dark:text-gray-300">
                    <Phone className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium">Appel</span>
                  </button>
                  <button className="col-span-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg flex flex-col items-center justify-center text-gray-700 dark:text-gray-300">
                    <MessageSquare className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium">SMS</span>
                  </button>
                  <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex flex-col items-center justify-center">
                    <Navigation className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Waze / Maps</span>
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button onClick={() => alert(`SMS envoyé : Votre taxi est là (Modèle : ${driver.carModel})`)} className="w-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-bold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-100 dark:hover:bg-green-900/40">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Notify Client (Approche)</span>
                  </button>
                  <button onClick={() => setShowCancelModal(true)} className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-100 dark:hover:bg-red-900/40">
                    <Ban className="w-4 h-4" />
                    <span className="text-sm">Annuler la course</span>
                  </button>
                </div>
              </div>
              <button onClick={() => setShowEndRideModal(true)} className="w-full bg-gray-900 dark:bg-gray-700 text-white font-bold py-3 hover:bg-gray-800 flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Terminer la course</span>
              </button>
            </div>
          </section>
        )}

        {/* Réservations */}
        {!driveMode && upcomingRides.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">À venir</h3>
            <div className="space-y-3">
              {upcomingRides.map(ride => (
                <div key={ride.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="font-bold text-orange-500">{ride.time}</span>
                    </div>
                    <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{ride.id}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{ride.clientName}</h4>
                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate mb-2">
                    De: {ride.pickup} <br/>
                    À: {ride.dropoff}
                  </div>
                  <button onClick={() => setShowCancelModal(true)} className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold py-1.5 rounded flex items-center justify-center space-x-1 hover:bg-red-100 dark:hover:bg-red-900/40">
                    <Ban className="w-3.5 h-3.5" />
                    <span className="text-xs">Annuler</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Terminées */}
        {!driveMode && completedRides.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Terminées</h3>
            <div className="space-y-2">
              {completedRides.map(ride => (
                <div key={ride.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg flex justify-between items-center opacity-75">
                  <div>
                    <h4 className="font-medium text-sm">{ride.clientName}</h4>
                    <span className="text-xs text-gray-500">{ride.time}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{ride.amount}€</span>
                    <span className="block text-[10px] text-gray-500">{ride.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* FABs */}
      {!driveMode && (
        <div className="fixed bottom-6 right-6 lg:absolute lg:bottom-6 lg:right-6 flex flex-col space-y-3 z-20">
          <button
            onClick={() => setShowExpenseModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-95 mx-auto"
            title="Saisir une dépense"
          >
            <Receipt className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-95"
            title="Nouvelle Course"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Modals & Overlays */}

      {/* Sidebar Drawer */}
      {sidebarOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="w-3/4 max-w-sm bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <h2 className="font-bold text-xl">{driver.name}</h2>
              <p className="text-sm text-gray-500">Taxi {driver.taxiId}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Page Principale</h3>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">File: Gare de Grenoble</span>
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">#2</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Historiques et Comptes Rendus</h3>
                <div className="space-y-2">
                  <details className="group bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3">
                      <span>Août 2024</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="text-sm px-3 pb-3">
                      <details className="group/day">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <span>26 Août</span>
                          <span>245.50€</span>
                        </summary>
                        <div className="pl-4 pr-2 py-2 text-xs space-y-2 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
                          <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>10:30 Course CB</span><span>25.50€</span></div>
                          <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>11:15 Dépense (Gasoil)</span><span className="text-red-500">-40.00€</span></div>
                          <button className="mt-2 w-full flex items-center justify-center space-x-1 py-1.5 text-blue-600 bg-blue-50 dark:bg-blue-900/30 rounded">
                            <FileText className="w-4 h-4" />
                            <span>Exporter compte rendu PDF</span>
                          </button>
                        </div>
                      </details>
                    </div>
                  </details>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Documents & Conformité</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Carte Pro</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${driver.docsExpiry.proCard < 30 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{driver.docsExpiry.proCard} j</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Taximètre</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{driver.docsExpiry.taximeter} j</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Assurance</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{driver.docsExpiry.insurance} j</span>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center space-x-2 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                  <Upload className="w-4 h-4" />
                  <span>Envoyer mise à jour / Scan</span>
                </button>
                <p className="text-[10px] text-center text-orange-500 mt-1">En attente de validation par la direction</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}

      {/* SOS Modal */}
      {showSosModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">URGENCE</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Ceci enverra votre position GPS exacte au standard et aux collègues à proximité.</p>
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl uppercase tracking-wider" onClick={() => setShowSosModal(false)}>
                Confirmer l'alerte
              </button>
              <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 rounded-xl" onClick={() => setShowSosModal(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shift Modal */}
      {showShiftModal && (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-4">{shiftActive ? 'Clôturer la journée' : 'Commencer la journée'}</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Kilométrage compteur</label>
                <input type="number" placeholder="ex: 145000" className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-lg" />
              </div>

              {shiftActive && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                  <h3 className="font-medium text-sm">Bilan estimé</h3>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Recette totale</span><span className="font-bold">{driver.revenueToday}€</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Courses CB</span><span>120.00€</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Courses Espèces</span><span>80.00€</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Courses CPAM</span><span>45.50€</span></div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 rounded-xl" onClick={() => setShowShiftModal(false)}>
                Annuler
              </button>
              <button
                className={`flex-1 text-white font-bold py-3 rounded-xl ${shiftActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {
                  setShiftActive(!shiftActive);
                  setShowShiftModal(false);
                }}
              >
                {shiftActive ? 'Clôturer' : 'Commencer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Ride Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 flex flex-col bg-white dark:bg-gray-900">
          <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold">Saisie Course</h2>
            <button onClick={() => setShowAddModal(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><X className="w-5 h-5"/></button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Statut de la course</label>
              <select value={addRideStatus} onChange={(e) => setAddRideStatus(e.target.value)} className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 font-medium">
                <option value="reservation">Réservation (À venir)</option>
                <option value="en_cours">En cours (Volante)</option>
                <option value="terminee">Terminée (Historique)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Client (Nom complet)</label>
              <input type="text" placeholder="Nom du client" className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone</label>
              <input type="tel" placeholder="06..." className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date & Heure</label>
              <input type="datetime-local" className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Départ</label>
              <input type="text" placeholder="Adresse de départ" className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <input type="text" placeholder="Adresse d'arrivée" className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3" />
            </div>

            {addRideStatus === 'terminee' && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border dark:border-gray-700 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Montant final (€)</label>
                  <input type="number" placeholder="0.00" className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 text-xl font-bold" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Moyen de paiement</label>
                  <select className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3">
                    <option>CB</option>
                    <option>Espèces</option>
                    <option>Facture (B2B)</option>
                    <option>CPAM</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border dark:border-gray-700">
              <input type="checkbox" id="cpam" className="w-5 h-5 rounded border-gray-300 text-blue-600" />
              <label htmlFor="cpam" className="font-medium flex-1">Transport Médical (CPAM)</label>
              <button className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Camera className="w-5 h-5"/></button>
            </div>
          </div>
          <div className="p-4 border-t dark:border-gray-800">
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl" onClick={() => setShowAddModal(false)}>
              Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* Cancel Ride Modal */}
      {showCancelModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-red-600 flex items-center space-x-2">
              <Ban className="w-6 h-6" />
              <span>Annuler la course</span>
            </h2>
            <div className="mb-6 space-y-3">
              <label className="block text-sm font-medium">Motif d'annulation :</label>
              <select className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <option>Client absent (No-show)</option>
                <option>Panne / Problème technique</option>
                <option>Bouchons / Retard trop important</option>
                <option>Autre (préciser en note)</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 rounded-xl" onClick={() => setShowCancelModal(false)}>
                Retour
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl" onClick={() => setShowCancelModal(false)}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Receipt className="w-6 h-6 text-orange-500" />
              <span>Saisir une dépense</span>
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Type de dépense</label>
                <select className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <option>Carburant (Gasoil/Essence)</option>
                  <option>Péage</option>
                  <option>Lavage</option>
                  <option>Entretien / Garage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Montant (€)</label>
                <input type="number" placeholder="0.00" className="w-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-lg" />
              </div>
              <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Camera className="w-5 h-5" />
                <span>Scanner le justificatif</span>
              </button>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 rounded-xl" onClick={() => setShowExpenseModal(false)}>
                Annuler
              </button>
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl" onClick={() => setShowExpenseModal(false)}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End Ride Modal */}
      {showEndRideModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 border-t-8 border-green-500">
            <h2 className="text-xl font-bold mb-1">Fin de course</h2>
            <p className="text-sm text-gray-500 mb-6">Veuillez saisir le montant et le mode de paiement.</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-center">Montant affiché au taximètre</label>
                <div className="relative">
                  <input type="number" placeholder="0.00" className="w-full border-2 border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-3xl font-bold text-center text-green-700 dark:text-green-400" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-green-600">€</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mode de paiement</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold py-3 rounded-lg border border-blue-200 dark:border-blue-800">CB</button>
                  <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200">Espèces</button>
                  <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200">Facture</button>
                  <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200">CPAM</button>
                </div>
              </div>
            </div>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg flex items-center justify-center space-x-2" onClick={() => setShowEndRideModal(false)}>
              <CheckCircle className="w-6 h-6" />
              <span>Valider le paiement</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DriverView;
