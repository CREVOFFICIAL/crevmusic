const Data = [
  {
    id: 1,
    user: {
      username: 'Migos',
      avatar_url : 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
    },
    track: {
      id : '13158665',
      created_at: '2011/04/06',
      genre: 'hip-hop',
      username: 'Migos',
      title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
      avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
    },
    count: {
      playback: 30,
      favoritings: 10304,
      comment: 12
    }
  },
  {
    id: 2,
    user: {
      username: 'Migos',
      avatar_url : 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
    },
    track: {
      id : '13158665',
      created_at: '2011/04/06',
      genre: 'hip-hop',
      username: 'Migos',
      title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
      avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
    },
    count: {
      playback: 30,
      favoritings: 10304,
      comment: 12
    }
  }
];

export default {
  list(query) {
    return new Promise(res => {
      setTimeout(()=> {
        res(Data)
      }, 200);
    });
  }
};