import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = 'e8ccc676e299173067a80520c1fee405'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      page: 1,
      sortBy: 'popularity.desc',
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    const { query, page, sortBy } = this.state;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: query,
            page: page,
            sort_by: sortBy,
          },
        }
      );

      this.setState({
        results: response.data.results,
        totalPages: response.data.total_pages,
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  handleSearch = (event) => {
    this.setState({ query: event.target.value }, this.fetchMovies);
  };

  handlePageChange = (newPage) => {
    this.setState({ page: newPage }, this.fetchMovies);
  };

  handleSortChange = (event) => {
    this.setState({ sortBy: event.target.value }, this.fetchMovies);
  };

  render() {
    const { query, results, page, totalPages, sortBy } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Search App</h1>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={this.handleSearch}
          />
          <select value={sortBy} onChange={this.handleSortChange}>
            <option value="popularity.desc">Popularity</option>
            <option value="vote_average.desc">Rating</option>
            <option value="release_date.desc">Release Date</option>
          </select>
          <div className="results">
            {results.map((movie) => (
              <div key={movie.id} className="movie">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
              </div>
            ))}
          </div>
          <div className="pagination">
            {page > 1 && (
              <button onClick={() => this.handlePageChange(page - 1)}>Previous</button>
            )}
            {page < totalPages && (
              <button onClick={() => this.handlePageChange(page + 1)}>Next</button>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
