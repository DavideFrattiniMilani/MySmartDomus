
export const villaPlanGorret = {
  // METADATI VILLA
  id: 3,
  nome: "Villa Plan Gorret",
  indirizzo: "Via Donzelli, 33, Courmayeur",
  immagine: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
  badges: ['Edificio', '5 livelli'],
  
  // PIANI DISPONIBILI (placeholder)
  piani: ["Piano terra", "Primo piano"],
  
  // METEO
  meteo: {
    temperatura: "18°C",
    data: "14 feb 2025"
  },
  
  // AMBIENTI (placeholder - da sostituire con dati reali)
  ambienti: [
    {
      id: 1,
      nome: 'Salotto',
      piano: 'Piano terra',
      temperatura: '22°C',
      immagine: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
    {
      id: 2,
      nome: 'Cucina',
      piano: 'Piano terra',
      temperatura: '21°C',
      immagine: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
    {
      id: 3,
      nome: 'Camera da letto',
      piano: 'Primo piano',
      temperatura: '20°C',
      immagine: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
      dispositivi: {
        luci: [
          { id: 1, nome: 'Luce 1', tipo: 'luce', attivo: false, intensita: 0 },
          { id: 2, nome: 'Luce 2', tipo: 'luce', attivo: false, intensita: 0 },
        ]
      }
    },
  ],
  
  // SCENARI
  scenari: [
    { id: 1, nome: 'Giorno', tipo: 'giorno', attivo: false },
    { id: 2, nome: 'Notte', tipo: 'notte', attivo: false },
    { id: 3, nome: 'Lavoro', tipo: 'lavoro', attivo: false },
  ],
  
  // VIDEOCAMERE
  videocamere: [
    {
      id: 1,
      nome: 'Ingresso',
      immagine: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      datetime: '25/05/2025 Dom 10:00',
      isLive: false,
      isActive: false,
    },
  ],
  
  // ANTINTRUSIONE
  antintrusione: {
    attivo: true,
    porte: [
      { id: 1, nome: 'Porta principale', attivo: true },
    ]
  }
};