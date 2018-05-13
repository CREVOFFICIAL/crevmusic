// export default 전에 변수로 data를 선언하여 사용하는 방법과
// export default안에 넣어 객체로 사용하는 방법의 차이는 무엇인지물어보기
// 만약 변수로 선언하면 접근을 못한다는 차이가 있다면, 변수로 선언하여 접근하려면 어떻게해야할지?
const data = [
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
      username: 'R3HAB',
      avatar_url : 'https://i1.sndcdn.com/avatars-000331299155-65rndv-t200x200.jpg'
    },
    track: {
      id : '1315265',
      created_at: '2011/04/06',
      genre: 'Dance & EDM',
      username: 'R3HAB',
      title: 'The Chainsmokers & Halsey- Closer (R3hab Remix)',
      avatar_url: 'https://i1.sndcdn.com/artworks-000184594631-emlw7d-t500x500.jpg'
    },
    count: {
      playback: 50,
      favoritings: 100304,
      comment: 200
    }
  }
];

export default {
selectedData: [],
list(query) {
  return new Promise(res => {
    setTimeout(()=> {
      res(data);
    }, 200);
  });
},
selected(data = '') {
  if(!data) {
    throw new Error(`해당 데이터가 존재하지 않습니다.`);
  }
  if(this.isSelected(data)) {
    this.remove(data.id);
  } else {
    this.selectedData = [data, ...this.selectedData];
  }
  return this.selectedData;
},
isSelected(data) {
  return _.some(this.selectedData, function(item) {
    return item.id === data.id;
  });
},
remove(id) {
  this.selectedData = _.filter(this.selectedData, function (item) {
    return item.id !== id;
  });
},
find(index) {
  return _.find(data, function(item, i) {
    return i === index;
  });
}
};