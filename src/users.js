import faker from 'faker';

export default function getUsers() {
  let res = [];
  for (let i = 0; i < 5; i++) {
    res.push({
		avatar: faker.image.people(),
      name: faker.name.firstName(),
      age: parseInt(Math.floor(Math.random() * 12 + 18)),
      gender: Math.random() > 0.5 ? 'female' : 'male',
      url: `https://i.picsum.photos/id/${parseInt(Math.random() * 200)}/600/1000.jpg`
    });
  }
  return res;
}
