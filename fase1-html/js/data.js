// Datos de ejemplo inventados para Sonora. Ninguna canción, artista ni portada es real.
// La duración está en segundos. En la fase 2 esto vive en el modelo Track (base de datos).

const canciones = [
  { id: 1,  titulo: "Calle de sal",     artista: "Faro Lento",    album: "Mareas",              dur: 214 },
  { id: 2,  titulo: "Siete vientos",    artista: "Las Brújulas",  album: "Rosa de los vientos", dur: 247 },
  { id: 3,  titulo: "Papel y tinta",    artista: "Coral Norte",   album: "Cuaderno",            dur: 189 },
  { id: 4,  titulo: "Luz de cocina",    artista: "Nube Baja",     album: "Domingos",            dur: 263 },
  { id: 5,  titulo: "Ruta 45",          artista: "Faro Lento",    album: "Mareas",              dur: 301 },
  { id: 6,  titulo: "Hojas secas",      artista: "Tierra Tibia",  album: "Otoño largo",         dur: 228 },
  { id: 7,  titulo: "Mapa sin norte",   artista: "Las Brújulas",  album: "Rosa de los vientos", dur: 196 },
  { id: 8,  titulo: "Ventana abierta",  artista: "Nube Baja",     album: "Domingos",            dur: 242 },
  { id: 9,  titulo: "Café a las seis",  artista: "Coral Norte",   album: "Cuaderno",            dur: 175 },
  { id: 10, titulo: "Río arriba",       artista: "Tierra Tibia",  album: "Otoño largo",         dur: 286 },
];

const playlists = [
  { id: "manana-tranquila",  nombre: "Mañana tranquila",  descripcion: "Para empezar el día sin prisa", canciones: [4, 9, 3, 8, 1] },
  { id: "para-concentrarte", nombre: "Para concentrarte", descripcion: "Pistas largas y sin sobresaltos", canciones: [5, 10, 2, 6, 3, 7] },
  { id: "camino-a-casa",     nombre: "Camino a casa",     descripcion: "El regreso con buena compañía", canciones: [1, 7, 5, 2, 8] },
  { id: "domingo-lento",     nombre: "Domingo lento",     descripcion: "Café, sol y nada pendiente", canciones: [8, 4, 6, 9, 10, 1, 3] },
];

// Los álbumes se arman a partir de las canciones
const albumes = [...new Set(canciones.map(c => c.album))].map(nombre => {
  const pistas = canciones.filter(c => c.album === nombre);
  return {
    id: nombre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-"),
    nombre,
    artista: pistas[0].artista,
    canciones: pistas.map(c => c.id),
  };
});

const cancionPorId = id => canciones.find(c => c.id === id);
const coleccionPorId = id => playlists.find(p => p.id === id) || albumes.find(a => a.id === id);
const esAlbum = col => albumes.includes(col);
