// src/data/ville/villaMann.js

export const villaMann = {
  // METADATI VILLA
  id: 2,
  nome: "Villa Mann",
  indirizzo: "Via Sporini, 1B, Forte dei Marmi",
  immagine: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
  badges: ['Villa', 'Piscina'],
  
  // PIANI DISPONIBILI
  piani: ["Piano terra", "Primo piano", "Secondo piano", "Interrato"],
  
  // METEO
  meteo: {
    temperatura: "26°C",
    data: "14 feb 2025"
  },
  
  // AMBIENTI
  ambienti: [
    // PIANO TERRA
    {
      id: 1,
      nome: 'Ingresso',
      piano: 'Piano terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: true, intensita: 80 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: true, intensita: 80 },
          { id: 3, nome: 'Luce 3', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
    {
      id: 2,
      nome: 'Cucina',
      piano: 'Piano terra',
      temperatura: '23°C',
      immagine: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800',
      dispositivi: {
        luci: Array(13).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 5,
          intensita: i < 5 ? 75 : 0
        }))
      }
    },
    {
      id: 3,
      nome: 'Camera 1',
      piano: 'Piano terra',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
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
    {
      id: 4,
      nome: 'Bagno 1',
      piano: 'Piano terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: true, intensita: 100 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: true, intensita: 100 },
        ]
      }
    },
    {
      id: 5,
      nome: 'Soggiorno',
      piano: 'Piano terra',
      temperatura: '24°C',
      immagine: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      dispositivi: {
        luci: Array(8).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 3,
          intensita: i < 3 ? 70 : 0
        }))
      }
    },
    {
      id: 6,
      nome: 'Bagno ospiti',
      piano: 'Piano terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1564540586031-9c7e0e0d8e66?w=800',
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
      id: 7,
      nome: 'Portico',
      piano: 'Piano terra',
      temperatura: '20°C',
      immagine: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      dispositivi: {
        luci: Array(13).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: true,
          intensita: 60
        }))
      }
    },

    // PIANO 1
    {
      id: 8,
      nome: 'Soggiorno',
      piano: 'Primo piano',
      temperatura: '23°C',
      immagine: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      dispositivi: {
        luci: Array(24).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 10,
          intensita: i < 10 ? 75 : 0
        }))
      }
    },
    {
      id: 9,
      nome: 'Camera 2',
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
      nome: 'Bagno 2',
      piano: 'Primo piano',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
      dispositivi: {
        luci: Array(5).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: true,
          intensita: 90
        }))
      }
    },
    {
      id: 11,
      nome: 'Bagno ospiti',
      piano: 'Primo piano',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },

    // PIANO 2
    {
      id: 12,
      nome: 'Disimpegno',
      piano: 'Secondo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      dispositivi: {
        luci: Array(3).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: true,
          intensita: 50
        }))
      }
    },
    {
      id: 13,
      nome: 'Camera 3',
      piano: 'Secondo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
      dispositivi: {
        luci: Array(5).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: false,
          intensita: 0
        }))
      }
    },
    {
      id: 14,
      nome: 'Bagno 3',
      piano: 'Secondo piano',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
    {
      id: 15,
      nome: 'Camera 4',
      piano: 'Secondo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
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
      id: 16,
      nome: 'Ballatoio',
      piano: 'Secondo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      dispositivi: {
        luci: Array(3).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: true,
          intensita: 40
        }))
      }
    },
    {
      id: 17,
      nome: 'Bagno 4',
      piano: 'Secondo piano',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1603512500383-2bb6d2b6e498?w=800',
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
      id: 18,
      nome: 'Camera 5',
      piano: 'Secondo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
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
      id: 19,
      nome: 'Cabina armadio',
      piano: 'Secondo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
    {
      id: 20,
      nome: 'Bagno master',
      piano: 'Secondo piano',
      temperatura: '23°C',
      immagine: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800',
      dispositivi: {
        luci: Array(7).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 3,
          intensita: i < 3 ? 85 : 0
        }))
      }
    },
    {
      id: 21,
      nome: 'Camera Master',
      piano: 'Secondo piano',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
      dispositivi: {
        luci: Array(6).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: i < 2,
          intensita: i < 2 ? 70 : 0
        }))
      }
    },
    {
      id: 22,
      nome: 'Esterno',
      piano: 'Secondo piano',
      temperatura: '18°C',
      immagine: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: true, intensita: 100 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: true, intensita: 100 },
        ]
      }
    },

    // INTERRATO
    {
      id: 23,
      nome: 'Entrata',
      piano: 'Interrato',
      temperatura: '19°C',
      immagine: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
    {
      id: 24,
      nome: 'Cantina/Lavanderia',
      piano: 'Interrato',
      temperatura: '18°C',
      immagine: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
      dispositivi: {
        luci: Array(10).fill(null).map((_, i) => ({
          id: i + 1,
          nome: `Luce ${i + 1}`,
          tipo: 'luce',
          attivo: false,
          intensita: 0
        }))
      }
    },
    {
      id: 25,
      nome: 'Locale tecnico',
      piano: 'Interrato',
      temperatura: '17°C',
      immagine: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: true, intensita: 100 },
        ]
      }
    },
  ],
  
  // SCENARI
  scenari: [
    { id: 1, nome: 'Giorno', tipo: 'giorno', attivo: true },
    { id: 2, nome: 'Notte', tipo: 'notte', attivo: false },
    { id: 3, nome: 'Lavoro', tipo: 'lavoro', attivo: true },
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
      { id: 1, nome: 'Porta di ingresso', attivo: true },
      { id: 2, nome: 'Porta retro', attivo: true },
      { id: 3, nome: 'Porta giardino', attivo: false },
    ]
  }
};