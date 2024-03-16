import React from 'react';
import './App.css';

interface Team {
  school: string;
  name: string;
  city: string;
  state: string;
}

function Heading() {
  return (
    <div>
      <h1>March Madness!</h1>
      <h2>This site contains info about each NCAA basketball team</h2>
    </div>
  );
}

class TeamCard extends React.Component<{ team: Team }> {
  render() {
    const { school, name, city, state } = this.props.team;
    return (
      <div className="cards">
        <h3>School Name: {school}</h3>
        <h3>Mascot Name: {name}</h3>
        <h3>
          Location: {city}, {state}
        </h3>
      </div>
    );
  }
}

class TeamList extends React.Component {
  state = {
    teams: [] as Team[],
  };

  async componentDidMount() {
    await this.fetchTeams();
  }

  fetchTeams = async () => {
    try {
      const response = await fetch('/CollegeBasketballTeams.json');
      const data = await response.json();
      this.setState({ teams: data.teams });
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  render() {
    return (
      <div>
        {this.state.teams.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Heading />
      <TeamList />
    </div>
  );
}

export default App;
