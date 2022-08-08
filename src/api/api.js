class Api {
  #apiBase = 'https://rickandmortyapi.com/api';

  async getAllEpisodes() {
    const data = [];
    let url = `${this.#apiBase}/episode`;
    do {
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(url, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        } else {
          return response.json();
        }
      });
      url = res.info.next;
      data.push(...res.results);
    } while (url);

    return data;
  }

  getCharacter(id) {
    return fetch(`${this.#apiBase}/character/${id}`, {
      method: 'GET',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      } else {
        return response.json();
      }
    });
  }
}

const api = new Api();
export default api;
