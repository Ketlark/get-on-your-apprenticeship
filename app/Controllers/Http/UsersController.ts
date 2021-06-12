import got from 'got'

export default class UsersController {
  public async dummy() {
    return ([
      {
        name: 'Harry Potter',
        house: 'Gryffindor'
      },
      {
        name: 'Hermione Granger',
        house: 'Gryffindor'
      },
      {
        name: 'Ron Weasley',
        house: 'Gryffindor'
      },
      {
        name: 'Neville Longbottom',
        house: 'Gryffindor'
      },
      {
        name: 'Luna Lovegood',
        house: 'Ravenclaw'
      }
    ])
  }

  public async real() {
    return await got('http://hp-api.herokuapp.com/api/characters').json();
  }

  public async rand() {
    const students: object[] = await got('http://hp-api.herokuapp.com/api/characters').json();
    const randomIndex = Math.floor(Math.random() * students.length);

    return students[randomIndex];
  }
}
