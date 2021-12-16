import uniqid from 'uniqid';

const movieData = (() => {
  const apiKey = 'de07222d4a852ac064d69fa7e114b818';
  const getData = async () => {
    const configRequest = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
    const dataRequest = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    try {
      const configResponse = await fetch(configRequest, { mode: 'cors' });
      const dataResponse = await fetch(dataRequest, { mode: 'cors' });

      const data = {
        data: await dataResponse.json(),
        config: await configResponse.json(),
      };

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const formatURLRequest = (data, index) => {
    const baseURL = data.config.images.base_url;
    const posterSize = data.config.images.poster_sizes[1];
    const filePath = data.data.results[index].poster_path;
    return baseURL + posterSize + filePath;
  };

  const getPosterData = async (index) => {
    const data = await getData();
    const imgURL = formatURLRequest(data, index);
    const imgAlt = data.data.results[index].original_title;
    const key = uniqid();
    return { key: key, src: imgURL, alt: imgAlt, uniqid: key };
  };

  return { getPosterData };
})();

export default movieData;
