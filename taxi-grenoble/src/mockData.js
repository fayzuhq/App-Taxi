export const mockRides = [
  {
    id: 'R1001',
    status: 'en_cours',
    clientName: 'Jean Dupont',
    phone: '06 12 34 56 78',
    pickup: 'Gare de Grenoble',
    dropoff: 'CHU Grenoble Alpes',
    time: '14:30',
    type: 'immediate',
    taxiId: 'T14',
    cpam: true,
  },
  {
    id: 'R1002',
    status: 'reservation',
    clientName: 'Marie Curie',
    phone: '06 98 76 54 32',
    pickup: 'Stade des Alpes',
    dropoff: 'Presqu\'île, Minatec',
    time: '16:00',
    type: 'scheduled',
    taxiId: 'T14',
    cpam: false,
  },
  {
    id: 'R1003',
    status: 'terminee',
    clientName: 'Lucie Martin',
    phone: '07 11 22 33 44',
    pickup: 'A480 Sortie 3',
    dropoff: 'Gare de Grenoble',
    time: '11:15',
    type: 'immediate',
    taxiId: 'T14',
    cpam: false,
    amount: 25.50,
    paymentMethod: 'CB',
  },
  {
    id: 'R1004',
    status: 'en_attente',
    clientName: 'Paul Bernard',
    phone: '06 55 44 33 22',
    pickup: 'Place Victor Hugo',
    dropoff: 'Seyssins',
    time: 'Immédiat',
    type: 'immediate',
    taxiId: null,
    cpam: false,
  },
  {
    id: 'R1005',
    status: 'client_attend',
    clientName: 'Sophie Petit',
    phone: '07 66 77 88 99',
    pickup: 'IKEA Saint-Martin-d\'Hères',
    dropoff: 'Gare de Grenoble',
    time: 'Immédiat',
    type: 'immediate',
    taxiId: 'T02',
    cpam: false,
  }
];

export const mockDrivers = [
  {
    id: 'D01',
    taxiId: 'T14',
    name: 'Ahmed',
    carModel: 'Toyota Prius',
    status: 'active',
    ridesToday: 8,
    revenueToday: 245.50,
    docsExpiry: { proCard: 15, taximeter: 45, insurance: 120 }
  },
  {
    id: 'D02',
    taxiId: 'T02',
    name: 'Laurent',
    carModel: 'Peugeot 508',
    status: 'active',
    ridesToday: 6,
    revenueToday: 180.00,
    docsExpiry: { proCard: 200, taximeter: 10, insurance: 300 }
  },
  {
    id: 'D03',
    taxiId: 'T08',
    name: 'Sarah',
    carModel: 'Skoda Octavia',
    status: 'inactive',
    ridesToday: 0,
    revenueToday: 0,
    docsExpiry: { proCard: 5, taximeter: 90, insurance: 30 }
  }
];

export const mockKpis = {
  totalRevenue: 4580.00,
  conversionRate: 85,
  paymentBreakdown: [
    { name: 'CB', value: 2400 },
    { name: 'Espèces', value: 680 },
    { name: 'CPAM', value: 1200 },
    { name: 'B2B', value: 300 }
  ],
  dispatchFairness: [
    { name: 'T14', rides: 8 },
    { name: 'T02', rides: 6 },
    { name: 'T08', rides: 0 },
    { name: 'T22', rides: 7 },
    { name: 'T19', rides: 9 },
  ]
};

export const mockAuditLogs = [
  { id: 1, time: '10:05', user: 'Admin', action: 'Généré carte pro D03' },
  { id: 2, time: '09:30', user: 'Standard', action: 'Assignation manuelle T14 -> R1001' },
  { id: 3, time: '08:15', user: 'Standard', action: 'Annulation course R0998 client no-show' }
];
