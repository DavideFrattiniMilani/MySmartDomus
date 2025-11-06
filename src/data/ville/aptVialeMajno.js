// src/data/ville/aptVialeMajno.js

export const aptVialeMajno = {
  // METADATI VILLA
  id: 1,
  nome: "Apt Viale Majno",
  indirizzo: "Viale Majno, 43, Milano",
  immagine: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  badges: ['Appartamento', 'Palestra'],
  
  // PIANI DISPONIBILI
  piani: ["Piano terra", "Primo piano", "Mezzanino", "Interrato"],
  
  // METEO
  meteo: {
    temperatura: "22°C",
    data: "14 feb 2025"
  },
  
  // AMBIENTI
  ambienti: [
    // PIANO TERRA
    {
      id: 1,
      nome: 'Sala pranzo',
      piano: 'Piano terra',
      temperatura: '23°C',
      immagine: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      dispositivi: {
        luci: Array(4).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 2,
          intensita: i < 2 ? 75 : 0
        }))
      }
    },
    {
      id: 2,
      nome: 'Cucina',
      piano: 'Piano terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800',
      dispositivi: {
        luci: Array(7).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 4,
          intensita: i < 4 ? 80 : 0
        }))
      }
    },
    {
      id: 3,
      nome: 'Salotto',
      piano: 'Piano terra',
      temperatura: '24°C',
      immagine: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      dispositivi: {
        luci: Array(4).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 3,
          intensita: i < 3 ? 70 : 0
        }))
      }
    },
    {
      id: 4,
      nome: 'Corridoio',
      piano: 'Piano terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: true, intensita: 60 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: true, intensita: 60 },
        ]
      }
    },
    {
      id: 5,
      nome: 'Scale',
      piano: 'Piano terra',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: true, intensita: 50 },
        ]
      }
    },
    {
      id: 6,
      nome: 'Bagno 1',
      piano: 'Piano terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
    {
      id: 7,
      nome: 'Bagno 2',
      piano: 'Piano terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1564540586031-9c7e0e0d8e66?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
    {
      id: 8,
      nome: 'Camera 3',
      piano: 'Piano terra',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },

    // PRIMO PIANO
    {
      id: 9,
      nome: 'Camera 1',
      piano: 'Primo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
      dispositivi: {
        luci: Array(4).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: false,
          intensita: 0
        }))
      }
    },
    {
      id: 10,
      nome: 'Camera 2',
      piano: 'Primo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
      dispositivi: {
        luci: Array(4).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: false,
          intensita: 0
        }))
      }
    },
    {
      id: 11,
      nome: 'Camera principale',
      piano: 'Primo piano',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
      dispositivi: {
        luci: Array(10).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 3,
          intensita: i < 3 ? 65 : 0
        }))
      }
    },
    {
      id: 12,
      nome: 'Bagno principale',
      piano: 'Primo piano',
      temperatura: '23°C',
      immagine: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
      dispositivi: {
        luci: Array(6).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: true,
          intensita: 90
        }))
      }
    },
    {
      id: 13,
      nome: 'Corridoio',
      piano: 'Primo piano',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: true, intensita: 55 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: true, intensita: 55 },
        ]
      }
    },
    {
      id: 14,
      nome: 'Bagno 2',
      piano: 'Primo piano',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800',
      dispositivi: {
        luci: Array(3).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: false,
          intensita: 0
        }))
      }
    },
    {
      id: 15,
      nome: 'Scala',
      piano: 'Primo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      dispositivi: {
        luci: Array(3).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: true,
          intensita: 45
        }))
      }
    },

    // MEZZANINO
    {
      id: 16,
      nome: 'Camera',
      piano: 'Mezzanino',
      temperatura: '20°C',
      immagine: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
      dispositivi: {
        luci: Array(8).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: false,
          intensita: 0
        }))
      }
    },

    // INTERRATO
    {
      id: 17,
      nome: 'Palestra',
      piano: 'Interrato',
      temperatura: '20°C',
      immagine: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      dispositivi: {
        luci: [] // Vuoto (rosso nella tabella)
      }
    },
    {
      id: 18,
      nome: 'Garage',
      piano: 'Interrato',
      temperatura: '18°C',
      immagine: 'https://images.unsplash.com/photo-1580986316031-77b86b1fc6b0?w=800',
      dispositivi: {
        luci: [] // Vuoto (rosso nella tabella)
      }
    },
    {
      id: 19,
      nome: 'Locale tecnico',
      piano: 'Interrato',
      temperatura: '17°C',
      immagine: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
      dispositivi: {
        luci: []
      }
    },
  ],
  
  // SCENARI
  scenari: [
    { id: 1, nome: 'Giorno', tipo: 'giorno', attivo: true },
    { id: 2, nome: 'Notte', tipo: 'notte', attivo: false },
    { id: 3, nome: 'Lavoro', tipo: 'lavoro', attivo: false },
  ],
  
  // VIDEOCAMERE
  videocamere: [
    {
      id: 1,
      nome: 'Salotto',
      immagine: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      datetime: '25/05/2025 Dom 14:30',
      isLive: true,
      isActive: true,
    },
    {
      id: 2,
      nome: 'Ingresso',
      immagine: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      datetime: '25/05/2025 Dom 14:30',
      isLive: false,
      isActive: true,
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