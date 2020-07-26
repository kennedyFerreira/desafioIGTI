let inputText, button;
let searchResult, statistics;
let usersData;

function start() {

  inputText = document.querySelector('input[type=text]')
  button = document.querySelector('button')
  searchResult = document.querySelector('.users')
  statistics = document.querySelector('.statistics')

  inputText.focus()

  fecthUsers()
  inputActive()
}

async function fecthUsers() {
  const users = await fetch('http://localhost:3000/results')
  const json = await users.json()

  usersData = json.map(element => {
    let {
      name,
      gender,
      dob,
      picture
    } = element

    return {
      name: `${name.first} ${name.last}`,
      gender,
      age: dob.age,
      picture: picture.thumbnail
    }
  }).sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}

function inputActive() {
  let inputValue;

  button.addEventListener('click', () => {
    getResults(inputValue)
    inputText.value = ''
  })

  inputText.addEventListener('keyup', e => {
    inputValue = inputText.value.toLowerCase()
    if (e.key !== 'Enter') {
      return
    }
    getResults(inputValue)
    inputText.value = ''
  })
}

function getResults(inputValue) {
  let usersResult;

  if (inputValue.length >= 1) {

    usersResult = usersData.filter(element => {
      return element.name.toLowerCase().includes(inputValue) == true
    })
    render(usersResult)

  } else if (inputValue === '') {

    usersResult = usersData
    render(usersResult)

  }
}

function render(usersResult) {
  console.log(usersResult)
  searchResult.innerHTML = `<h2>${usersResult.length} Usuarios encontrados</h2>`
  let divResults = document.createElement('div')

  let sumAge = usersResult.map(element => element.age).reduce((acc, cur) => {
    return acc += cur
  })
  let middleAge = usersResult.map(element => element.age).reduce((acc, cur) => {
    return (sumAge / usersResult.length).toFixed(2)
  })
  let userFemale = usersResult.filter(element => element.gender === 'female')
  let userMale = usersResult.filter(element => element.gender === 'male')

  console.log(sumAge)

  usersResult.forEach(element => {
    let img = element.picture
    let name = element.name
    let age = element.age
    let gender = element.gender

    let userDiv = document.createElement('div');

    userDiv.innerHTML = `
      <img src="${img}" alt="">
      <span>${name}</span>,
      <span>${age}</span>
    `
    statistics.innerHTML = `
    <h2>Estatisticas</h2>
    <span>Mulheres: ${userFemale.length}</span><br>
    <span>Homens: </span>${userMale.length}<br>
    <span>Soma das idades: ${sumAge}</span><br>
    <span>Media das idades: ${middleAge} </span><br>
    `
    console.log(element)

    divResults.appendChild(userDiv)


  });

  searchResult.appendChild(divResults)

}

start()