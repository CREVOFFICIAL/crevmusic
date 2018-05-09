const Data = [
  {
    id: 1,
    tracklist: [
      {
        user: {
          username: 'coldplay',
          avatar_url: 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
        },
        track: {
          id : '12',
          created_at: '2011/04/06',
          genre: 'hip-hop',
          username: 'Migos',
          title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
          avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
        }
      },
      {
        user: {
          username: 'coldplay',
          avatar_url: 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
        },
        track: {
          id : '34',
          created_at: '2011/04/06',
          genre: 'hip-hop',
          username: 'Migos',
          title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
          avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
        }
      },
      {
        user: {
          username: 'coldplay',
          avatar_url: 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
        },
        track: {
          id : '56',
          created_at: '2011/04/06',
          genre: 'hip-hop',
          username: 'Migos',
          title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
          avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
        }
      },
      {
        user: {
          username: 'coldplay',
          avatar_url: 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
        },
        track: {
          id : '78',
          created_at: '2011/04/06',
          genre: 'hip-hop',
          username: 'Migos',
          title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
          avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
        }
      }
    ],
    title: '카페에서 듣기 좋은 노래',
    date: '18.05.10'
  },
  {
    id: 2,
    tracklist: [
      {
        user: {
          username: 'coldplay',
          avatar_url: 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
        },
        track: {
          id : '12',
          created_at: '2011/04/06',
          genre: 'hip-hop',
          username: 'Migos',
          title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
          avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
        }
      },
      {
        user: {
          username: 'coldplay',
          avatar_url: 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
        },
        track: {
          id : '34',
          created_at: '2011/04/06',
          genre: 'hip-hop',
          username: 'Migos',
          title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
          avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
        }
      },
      {
        user: {
          username: 'coldplay',
          avatar_url: 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
        },
        track: {
          id : '56',
          created_at: '2011/04/06',
          genre: 'hip-hop',
          username: 'Migos',
          title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
          avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
        }
      },
      {
        user: {
          username: 'coldplay',
          avatar_url: 'https://i1.sndcdn.com/avatars-000317082346-2eyhya-t200x200.jpg'
        },
        track: {
          id : '78',
          created_at: '2011/04/06',
          genre: 'hip-hop',
          username: 'Migos',
          title: 'Bad and Boujee (Feat. Lil Uzi Vert) [Prod. By Metro Boomin]',
          avatar_url: 'https://i1.sndcdn.com/artworks-000179057945-14v79p-t500x500.jpg'
        }
      }
    ],
    title: '감성을 자극하는 노래',
    date: '18.05.10'
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