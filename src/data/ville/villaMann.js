// src/data/ville/villaMann.js

export const villaMann = {
  // METADATI VILLA
  id: 2,
  nome: "Villa Mann",
  indirizzo: "Via Sporini, 1B, Forte dei Marmi",
  immagine: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
  badges: ['Villa', 'Piscina'],
  
  // PIANI DISPONIBILI
  piani: ["Piano Interrato", "Piano Terra", "Piano Primo", "Piano Secondo", "Esterno"],
  
  // METEO
  meteo: {
    temperatura: "26°C",
    data: "14 feb 2025"
  },
  
  // AMBIENTI
  ambienti: [
    // ===== PIANO INTERRATO =====
    {
      id: 1,
      nome: 'Scala PI/PT',
      piano: 'Piano Interrato',
      temperatura: '20°C',
      immagine: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Tubolari - Scala PI/PT', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 2,
      nome: 'Sottoscala PI',
      piano: 'Piano Interrato',
      temperatura: '20°C',
      immagine: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Applique - Sottoscala PI', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 3,
      nome: 'Lavanderia',
      piano: 'Piano Interrato',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Plafoniere - Lavanderia', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 4,
      nome: 'Box',
      piano: 'Piano Interrato',
      temperatura: '19°C',
      immagine: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Plafoniere - Box', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },

    // ===== PIANO TERRA =====
    {
      id: 5,
      nome: 'Scala PT',
      piano: 'Piano Terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretto - Fronte Scala PT', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 6,
      nome: 'Cucina',
      piano: 'Piano Terra',
      temperatura: '23°C',
      immagine: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti - Cucina', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Led Pensili Lavandino - Cucina', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Led Pensili Induzione - Cucina', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 7,
      nome: 'Sogg./Pranzo',
      piano: 'Piano Terra',
      temperatura: '24°C',
      immagine: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti - Sogg./Pranzo', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Led Scalini - Sogg./Pranzo', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Sospensione - Sogg./Pranzo', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 8,
      nome: 'Bagno Piscina',
      piano: 'Piano Terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Centro - Antib. e Bagno Piscina', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Applique - Bagno Piscina', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Aspiratore - Bagno Piscina', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 9,
      nome: 'Camera PT',
      piano: 'Piano Terra',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Centro+Applique - Camera PT', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Lamp. Lettura Sx - Camera PT', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Lamp. Lettura Dx - Camera PT', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 4, nome: 'Centro - Bagno Camera PT', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 5, nome: 'Applique - Bagno Camera PT', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },

    // ===== PIANO PRIMO =====
    {
      id: 10,
      nome: 'Fronte Scala P1',
      piano: 'Piano Primo',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti - Fronte Scala P1', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 11,
      nome: 'Soppalco P1',
      piano: 'Piano Primo',
      temperatura: '23°C',
      immagine: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti - Soppalco P1', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 12,
      nome: 'Camera P1',
      piano: 'Piano Primo',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Centro - Camera P1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Lamp. Lettura Sx - Camera P1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Lamp. Lettura Dx - Camera P1', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 13,
      nome: 'Bagno Servizio P1',
      piano: 'Piano Primo',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Applique - Bagno di Servizio P1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Applique - Bagno Camera P1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Specchio - Bagno Camera P1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 4, nome: 'Led Scalini - Bagno Camera P1', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },

    // ===== PIANO SECONDO =====
    {
      id: 14,
      nome: 'Fronte Scala P2',
      piano: 'Piano Secondo',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Applique - Fronte Scala P2', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 15,
      nome: 'Scala P2',
      piano: 'Piano Secondo',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Sospensione - Scala P2', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 16,
      nome: 'Camera P2',
      piano: 'Piano Secondo',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Centro+Applique - Camera P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Lamp. Lettura Sx - Camera P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Lamp. Lettura Dx - Camera P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 4, nome: 'Applique - Bagno Camera P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 5, nome: 'Led Scalini - Bagno Camera P2', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 17,
      nome: 'Cameretta Sud P2',
      piano: 'Piano Secondo',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Centro - Cameretta Sud P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Applique - Ingr. Bagno Camera Master P2', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 18,
      nome: 'Cameretta Nord P2',
      piano: 'Piano Secondo',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Centro - Cameretta Nord P2', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 19,
      nome: 'Cam. Sud e Nord P2',
      piano: 'Piano Secondo',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Centro - Bagno Cam. Sud e Nord P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Specchio - Bagno Cam. Sud e Nord P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Specchio Ingr. Sx - Bagno Cam. Sud e Nord P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 4, nome: 'Specchio Dx - Bagno Camera Master P2', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 5, nome: 'Led Scalini - Bagno Cam. Sud e Nord P2', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },

    // ===== ESTERNO =====
    {
      id: 20,
      nome: 'Giardino',
      piano: 'Esterno',
      temperatura: '25°C',
      immagine: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti Esterni Cucina - Giardino', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Faretti Esterni Camera PT - Giardino', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 3, nome: 'Incassi Giardino - Giardino Zona PDC', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 4, nome: 'Palo Tavolo Ping Pong - Giardino', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 5, nome: 'Led Scalini - Giardino', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 6, nome: 'Faretti Piante - Giardino', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 21,
      nome: 'Casa Principale',
      piano: 'Esterno',
      temperatura: '25°C',
      immagine: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti a Parete - Ingresso Casa Principale', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 22,
      nome: 'Piscina',
      piano: 'Esterno',
      temperatura: '26°C',
      immagine: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti - Piscina', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 23,
      nome: 'Portico Piscina',
      piano: 'Esterno',
      temperatura: '26°C',
      immagine: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Sospensione Tavolo - Portico Piscina', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Faretti - Portico Piscina', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 24,
      nome: 'Cancello Pedonale Principale',
      piano: 'Esterno',
      temperatura: '24°C',
      immagine: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti a Parete - Cancello Pedonale (Isola Ecologica)', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 25,
      nome: 'Cancello Pedonale Ping Pong',
      piano: 'Esterno',
      temperatura: '24°C',
      immagine: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti a Parete - Cancello Pedonale (Ping Pong)', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 26,
      nome: 'Rampa Box',
      piano: 'Esterno',
      temperatura: '23°C',
      immagine: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti - Rampa Box', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 27,
      nome: 'Terrazzo P2',
      piano: 'Esterno',
      temperatura: '25°C',
      immagine: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Applique+Fioriera - Terrazzo P2', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 28,
      nome: 'Balcone P1',
      piano: 'Esterno',
      temperatura: '25°C',
      immagine: 'https://images.unsplash.com/photo-1600573472605-4ac5e5d5ae52?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti - Balcone P1', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 29,
      nome: 'Lato Tettoia Biciclette',
      piano: 'Esterno',
      temperatura: '24°C',
      immagine: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Incassi Giardino - Lato Tettoia Biciclette', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Strip Led - Tettoia Biciclette', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    },
    {
      id: 30,
      nome: 'Cancello Carraio',
      piano: 'Esterno',
      temperatura: '24°C',
      immagine: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Faretti a Parete - Cancello Carraio', tipo: 'luce', attivo: false, intensita: 0 }
        ]
      }
    }
  ],

  // VIDEOCAMERE
  videocamere: [
    {
      id: 1,
      nome: 'Soggiorno',
      immagine: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      datetime: '25/05/2025 Dom 11:26',
      isLive: true,
      isActive: true,
    },
    {
      id: 2,
      nome: 'Cucina',
      immagine: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800',
      datetime: '25/05/2025 Dom 11:26',
      isLive: false,
      isActive: false,
    },
    {
      id: 3,
      nome: 'Ingresso',
      immagine: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      datetime: '25/05/2025 Dom 11:26',
      isLive: false,
      isActive: false,
    },
  ],

  // ANTINTRUSIONE
  antintrusione: {
    attivo: true,
    porte: [
      { id: 1, nome: 'Porta principale', attivo: true },
      { id: 2, nome: 'Porta servizio', attivo: true },
    ]
  }
};