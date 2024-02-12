// players.js
const players = [
    {
      name: "Lionel Messi",
      team: "Paris Saint-Germain",
      nationality: "Argentina",
      jerseyNumber: 30,
      age: 34,
      imageUrl: "https://example.com/messi.jpg"
    },
    {
      name: "Kevin De Bruyne",
      team: "Manchester City",
      nationality: "Belgium",
      jerseyNumber: 17,
      age: 30,
      imageUrl: "https://example.com/debruyne.jpg"
    },
    // Add more players as needed
  ];
  
  export default players;
// Player.js
import React from "react";
import Card from "react-bootstrap/Card";

const Player = ({ name, team, nationality, jerseyNumber, age, imageUrl }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Team: {team}<br />
          Nationality: {nationality}<br />
          Jersey Number: {jerseyNumber}<br />
          Age: {age}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Player.defaultProps = {
  name: "Unknown",
  team: "Unknown",
  nationality: "Unknown",
  jerseyNumber: "Unknown",
  age: "Unknown",
  imageUrl: "https://example.com/default.jpg"
};

export default Player;
  
  // PlayersList.js
import React from "react";
import Player from "./Player";
import playersData from "./players";

const PlayersList = () => {
  return (
    <div>
      {playersData.map((player, index) => (
        <Player key={index} {...player} />
      ))}
    </div>
  );
};

export default PlayersList;

// App.js
import React from "react";
import PlayersList from "./PlayersList";

function App() {
  return (
    <div className="App">
      <h1>Soccer Players</h1>
      <PlayersList />
    </div>
  );
}

export default App;

  