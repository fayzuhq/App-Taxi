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
    docsExpiry: { proCard: 15, taximeter: 45, insurance: 120 },
    dues: { status: 'Paid', amount: 150 }
  },
  {
    id: 'D02',
    taxiId: 'T02',
    name: 'Laurent',
    carModel: 'Peugeot 508',
    status: 'available',
    ridesToday: 6,
    revenueToday: 180.00,
    docsExpiry: { proCard: 200, taximeter: 10, insurance: 300 },
    dues: { status: 'Pending', amount: 150 }
  },
  {
    id: 'D03',
    taxiId: 'T08',
    name: 'Sarah',
    carModel: 'Skoda Octavia',
    status: 'inactive',
    ridesToday: 0,
    revenueToday: 0,
    docsExpiry: { proCard: 5, taximeter: 90, insurance: 30 },
    dues: { status: 'Overdue', amount: 150 }
  },
  {
    id: 'D04',
    taxiId: 'T22',
    name: 'Paul',
    carModel: 'Renault Talisman',
    status: 'available',
    ridesToday: 2,
    revenueToday: 45.00,
    docsExpiry: { proCard: 100, taximeter: 200, insurance: 50 },
    dues: { status: 'Paid', amount: 150 }
  }
];

export const mockKpis = {
  totalRoyalties: 1250.00,
  globalBusinessVolume: 15480.00,
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
  { id: 1, time: '10:05', user: 'Admin - Marc V.', action: 'Généré carte pro D03' },
  { id: 2, time: '09:30', user: 'Operateur #02 - Jean D.', action: 'Assignation manuelle T14 -> R1001' },
  { id: 3, time: '08:15', user: 'Operateur #01 - Sophie L.', action: 'Annulation course R0998 client no-show' }
];

export const mockSystemTelemetry = {
  services: [
    { name: 'Database (PostgreSQL)', status: 'operational', latency: '12ms' },
    { name: 'WebSocket Server', status: 'operational', latency: '45ms' },
    { name: 'SMS Gateway (Twilio)', status: 'degraded', latency: '450ms' },
    { name: 'GPS Dispatch Engine', status: 'operational', latency: '8ms' },
  ],
  metricsGraph: [
    { time: '10:00', memory: 400, apiLatency: 45, errorRate: 0.1 },
    { time: '10:10', memory: 410, apiLatency: 48, errorRate: 0.2 },
    { time: '10:20', memory: 430, apiLatency: 120, errorRate: 2.5 },
    { time: '10:30', memory: 420, apiLatency: 50, errorRate: 0.1 },
    { time: '10:40', memory: 415, apiLatency: 47, errorRate: 0.0 },
    { time: '10:50', memory: 425, apiLatency: 49, errorRate: 0.1 },
  ]
};

export const mockTenantSettings = {
  companyName: 'Taxis Grenoble Coop.',
  siret: '123 456 789 00012',
  supportEmail: 'support@taxis-grenoble.fr',
  dispatchRadiusKm: 3,
  fallbackTimeoutSeconds: 300,
  licenseActive: true,
  tier: 'Enterprise'
};

export const mockGlobalUsers = [
  { id: 'U001', name: 'Jean Dupont', role: 'driver', identifier: 'chauffeur01', lastActive: 'Il y a 5 min' },
  { id: 'U002', name: 'Marc V.', role: 'admin', identifier: 'admin_marc', lastActive: 'En ligne' },
  { id: 'U003', name: 'Sophie L.', role: 'dispatcher', identifier: 'disp_sophie', lastActive: 'En ligne' },
  { id: 'U004', name: 'System Dev', role: 'superadmin', identifier: 'dev_root', lastActive: 'En ligne' },
];

export const mockGlobalConfig = {
  enableCpamScanner: true,
  autoGeofencingStations: false,
  liveSmsTracking: true,
  smsWebhookUrl: 'https://api.taxis-grenoble.fr/webhooks/sms'
};

export const mockRawAuditLogs = [
  { id: 'EV-9021', timestamp: '2024-08-27T10:23:45Z', level: 'ERROR', service: 'SMS_GATEWAY', message: 'Failed to deliver SMS to +33612345678', payload: '{"code": 21614, "reason": "Number unreachable"}' },
  { id: 'EV-9020', timestamp: '2024-08-27T10:15:10Z', level: 'WARN', service: 'AUTH', message: 'Failed login attempt (IP: 192.168.1.45)', payload: '{"user": "chauffeur_unknown", "attempts": 3}' },
  { id: 'EV-9019', timestamp: '2024-08-27T10:10:00Z', level: 'INFO', service: 'DISPATCH', message: 'Auto-dispatch timeout for ride R1004, falling back to manual', payload: '{"rideId": "R1004", "radius_km": 3, "candidates": 0}' },
  { id: 'EV-9018', timestamp: '2024-08-27T09:45:22Z', level: 'INFO', service: 'ADMIN_OP', message: 'Admin modified dispatch radius', payload: '{"adminId": "U002", "oldValue": 5, "newValue": 3}' }
];
