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
    title: 'wookga님의 플레이 리스트',
    date: '05.10'
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
    title: 'shim_z님의 플레이 리스트',
    date: '05.10'
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