import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubsList.css';

interface Club {
  ID: string;
  nombre: string;
  descripcion: string;
  videojuegos: string[];
}

interface Juego extends Club {
  genero: string;
}

const clubsData: Club[] = [
  {
    ID: "1",
    nombre: "Club de Aventureros",
    descripcion: "Explora lugares misteriosos y descubre tesoros ocultos con otros entusiastas de la aventura.",
    videojuegos: ["1", "3", "11"]
  },
  {
    ID: "2",
    nombre: "Club de Estrategia",
    descripcion: "Reúnete con estrategas brillantes para debatir tácticas, resolver enigmas y conquistar mundos virtuales.",
    videojuegos: ["4", "15", "16"]
  },
  {
    ID: "3",
    nombre: "Club de Constructores",
    descripcion: "Comparte tus creaciones en Minecraft, diseña estructuras asombrosas y colabora en proyectos épicos.",
    videojuegos: ["7", "8", "14"]
  },
  {
    ID: "4",
    nombre: "Club de Fútbol Virtual",
    descripcion: "Forma parte de un equipo virtual, compite en torneos y demuestra tus habilidades en FIFA 22.",
    videojuegos: ["9", "10", "18"]
  },
  {
    ID: "5",
    nombre: "Club de Cazadores de Zombis",
    descripcion: "Únete a otros supervivientes en la lucha contra hordas de no muertos en juegos como Left 4 Dead o Resident Evil.",
    videojuegos: ["2", "13", "17"]
  }
];

const videojuegosData: { [key: string]: {titulo: string, genero: string, descripcion: string} } = {
  "1": {
    "titulo": "The Witcher 3: Wild Hunt",
    "genero": "RPG",
    "descripcion": "Un épico juego de rol de mundo abierto con una trama envolvente y gráficos impresionantes."
  },
  "2": {
    "titulo": "Red Dead Redemption 2",
    "genero": "Acción/Aventura",
    "descripcion": "Un juego de vaqueros ambientado en el Salvaje Oeste con una narrativa profunda y un vasto mundo abierto."
  },
  "3": {
    "titulo": "The Legend of Zelda: Breath of the Wild",
    "genero": "Aventura",
    "descripcion": "Una aventura épica con un vasto mundo, rompecabezas desafiantes y una historia cautivadora."
  },
  "4": {
    "titulo": "Dark Souls III",
    "genero": "Acción/RPG",
    "descripcion": "Un juego desafiante con combates intensos y un mundo oscuro y misterioso."
  },
  "5": {
    "titulo": "Super Mario Odyssey",
    "genero": "Plataformas",
    "descripcion": "Una colorida aventura de plataformas con un fontanero saltarín y mundos imaginativos."
  },
  "6": {
    "titulo": "Overwatch",
    "genero": "FPS",
    "descripcion": "Un juego de disparos en equipo con héroes únicos y emocionantes partidas."
  },
  "7": {
    "titulo": "Minecraft",
    "genero": "Sandbox",
    "descripcion": "Un mundo abierto de construcción y exploración donde puedes crear tus propias aventuras."
  },
  "8": {
    "titulo": "Fortnite",
    "genero": "Battle Royale",
    "descripcion": "Un juego de supervivencia en línea con construcción y combates intensos."
  },
  "9": {
    "titulo": "FIFA 22",
    "genero": "Deportes",
    "descripcion": "El simulador de fútbol más popular con equipos reales y modos de juego variados."
  },
  "10": {
    "titulo": "Call of Duty: Warzone",
    "genero": "Battle Royale",
    "descripcion": "Un juego de disparos en línea con acción frenética y mapas enormes."
  },
  "11": {
    "titulo": "Assassin's Creed Valhalla",
    "genero": "Acción/Aventura",
    "descripcion": "Una aventura vikinga con combates, exploración y una historia intrigante."
  },
  "12": {
    "titulo": "Cyberpunk 2077",
    "genero": "RPG",
    "descripcion": "Un futuro distópico lleno de tecnología, crimen y decisiones morales."
  },
  "13": {
    "titulo": "Among Us",
    "genero": "Multijugador",
    "descripcion": "Un juego de engaño y deducción en el espacio con amigos o desconocidos."
  },
  "14": {
    "titulo": "Animal Crossing: New Horizons",
    "genero": "Simulación",
    "descripcion": "Una vida tranquila en una isla paradisíaca con actividades relajantes."
  },
  "15": {
    "titulo": "League of Legends",
    "genero": "MOBA",
    "descripcion": "Batallas estratégicas en línea con campeones y habilidades únicas."
  },
  "16": {
    "titulo": "Genshin Impact",
    "genero": "Acción/RPG",
    "descripcion": "Un mundo de fantasía con personajes elementales y una jugabilidad cautivadora."
  },
  "17": {
    "titulo": "Apex Legends",
    "genero": "Battle Royale",
    "descripcion": "Combates en equipo en un mundo futurista con héroes y habilidades únicas."
  },
  "18": {
    "titulo": "World of Warcraft",
    "genero": "MMORPG",
    "descripcion": "Un vasto mundo de fantasía con razas, clases y misiones épicas."
  },
  "19": {
    "titulo": "Control",
    "genero": "Acción/Aventura",
    "descripcion": "Explora una agencia secreta y descubre poderes sobrenaturales en este juego intrigante."
  },
  "20": {
    "titulo": "Hades",
    "genero": "Roguelike",
    "descripcion": "Embárcate en un viaje al inframundo y desafía a los dioses en este juego de acción y mitología."
  }
};

const ClubsList = () => {
  const navigate = useNavigate();
  const [clubStates, setClubStates] = useState<boolean[]>(() => {
    const storedStates = localStorage.getItem('clubStates');
    return storedStates ? JSON.parse(storedStates) : clubsData.map(() => false);
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResultsClubs, setSearchResultsClubs] = useState<Club[]>([]);
  const [searchResultsGames, setSearchResultsGames] = useState<Juego[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const toggleJoin = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Evitar la propagación del evento
    setClubStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      localStorage.setItem('clubStates', JSON.stringify(newStates));
      return newStates;
    });
  };

  useEffect(() => {
    const filteredClubs = clubsData.filter(club =>
      club.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResultsClubs(filteredClubs);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResultsGames([]);
      return;
    }
    
    const filteredGames = clubsData.flatMap(club =>
      club.videojuegos.filter(juego =>
        videojuegosData[juego].titulo.toLowerCase().startsWith(searchTerm.toLowerCase())
      ).map(juego => ({
        ID: juego,
        nombre: videojuegosData[juego].titulo,
        descripcion: videojuegosData[juego].descripcion,
        genero: videojuegosData[juego].genero,
        videojuegos: [juego]
      }))
    );
    setSearchResultsGames(filteredGames);
  }, [searchTerm]);

  const handleGameDetails = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleClubDetails = (clubId: string) => {
    navigate(`/clubes/${clubId}`);
  };

  return (
    <div className="clubsListContainer">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {!searchTerm && (
        <div className="clubsContainer">
          {searchResultsClubs.map((club, index) => (
            <div
              key={club.ID}
              className="clubCard"
            >
              <h2>{club.nombre}</h2>
              <p>{club.descripcion}</p>
              <div className="buttonsContainer">
                <button className="detailsButton" onClick={() => handleClubDetails(club.ID)}>Detalles</button>
                <button className="joinButton" onClick={(e) => toggleJoin(index, e)}>
                  {clubStates[index] ? 'Salir' : 'Unirse'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {searchTerm && searchResultsGames.length > 0 && (
        <div className="gamesContainer">
          {searchResultsGames.map(game => (
            <div
              key={game.ID}
              className="gameCard"
              onClick={() => handleGameDetails(game.ID)}
            >
              <h2>{game.nombre}</h2>
              <p>Género: {game.genero}</p>
              <p>Descripción: {game.descripcion}</p>
            </div>
          ))}
        </div>
      )}
      {selectedGame && (
        <div className="gameDetails">
        </div>
      )}
    </div>
  );
};

export default ClubsList;
