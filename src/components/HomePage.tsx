
import React from 'react';
import { Link } from 'react-router-dom';

const clubsData = [{
    "ID": "1",
    "nombre": "Club de Aventureros",
    "descripcion": "Explora lugares misteriosos y descubre tesoros ocultos con otros entusiastas de la aventura.",
    "videojuegos": ["1", "3", "11"]
  },
  {
    "ID": "2",
    "nombre": "Club de Estrategia",
    "descripcion": "Reúnete con estrategas brillantes para debatir tácticas, resolver enigmas y conquistar mundos virtuales.",
    "videojuegos": ["4", "15", "16"]
  },
  {
    "ID": "3",
    "nombre": "Club de Constructores",
    "descripcion": "Comparte tus creaciones en Minecraft, diseña estructuras asombrosas y colabora en proyectos épicos.",
    "videojuegos": ["7", "8", "14"]
  },
  {
    "ID": "4",
    "nombre": "Club de Fútbol Virtual",
    "descripcion": "Forma parte de un equipo virtual, compite en torneos y demuestra tus habilidades en FIFA 22.",
    "videojuegos": ["9", "10", "18"]
  },
  {
    "ID": "5",
    "nombre": "Club de Cazadores de Zombis",
    "descripcion": "Únete a otros supervivientes en la lucha contra hordas de no muertos en juegos como Left 4 Dead o Resident Evil.",
    "videojuegos": ["2", "13", "17"]
  }];

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Lista de Clubes</h1>
      {clubsData.map(club => (
        <div key={club.ID}>
          <h2>{club.nombre}</h2>
          <p>{club.descripcion}</p>
          {/* Link a una página de detalles del club - Implementación futura */}
          <Link to={`/clubes/${club.ID}`}>Ver Detalles</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;