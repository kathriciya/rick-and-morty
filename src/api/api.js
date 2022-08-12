class Api {
  _apiBase = 'https://rickandmortyapi.com/api';

  getAllResource = async (endpoint) => {
    const data = [];
    let url = `${this._apiBase}/${endpoint}`;
    do {
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(url, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        } else {
          return response.json();
        }
      });
      url = res.info.next;
      data.push(...res.results);
    } while (url);

    return data;
  };

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const result = await res.json();
    return result;
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`/character/${id}`);
    return this._transformCharacter(res);
  };

  getLocation = async (id) => {
    const res = await this.getResource(`/location/${id}`);
    return res;
  };

  getAllEpisodes = async () => {
    const res = await this.getAllResource('/episode');
    return res;
  };

  getAllLocations = async () => {
    const res = await this.getAllResource('/location');
    return res;
  };

  getPageLocations = async (page = 1) => {
    const res = await this.getResource(`/location?page=${page}`);
    return res.results;
  };

  getPageCharacters = async (page = 1) => {
    const res = await this.getResource(`/character?page=${page}`);
    return res.results;
  };

  getAllCharacters = async () => {
    const res = await this.getAllResource('/character');
    return res.map(this._transformAllCharacters);
  };

  // eslint-disable-next-line class-methods-use-this
  _transformAllLocations = (location) => {
    return {
      id: location.id,
      name: location.name,
    };
  };

  // eslint-disable-next-line class-methods-use-this
  _transformAllCharacters = (char) => {
    return {
      id: char.id,
      name: char.name,
      image: char.image,
    };
  };

  // eslint-disable-next-line class-methods-use-this
  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      image: char.image,
      species: char.species,
      gender: char.gender,
      status: char.status,
      origin: char.origin.name,
      location: char.location.name,
      episode: [...char.episode],
    };
  };
}

const api = new Api();
export default api;
