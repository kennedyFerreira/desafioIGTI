let inputText, button;
let searchResult, statistics;
let usersData;

function start() {
  inputText = document.querySelector('input[type=text]')
  button = document.querySelector('button')
  searchResult = document.querySelector('.users')
  statistics = document.querySelector('.statistics')

  fecthUsers()
  inputActive()
}

async function fecthUsers() {
  const users = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
  const json = await users.json()

  usersData = json.results.map(element => {
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

  button.addEventListener('click', () => getResults(inputValue))

  inputText.addEventListener('keyup', e => {
    inputValue = inputText.value.toLowerCase()
    if (e.key !== 'Enter') {
      return
    }
    getResults(inputValue)
  })
}

function getResults(inputValue) {
  let usersResult = usersData.filter(element => {
    return element.name.toLowerCase().includes(inputValue) == true
  })
  console.log(usersResult)

  render(usersResult)
}

function render(usersResult) {
  searchResult.innerHTML = `
  <img src="${usersResult.picture}" alt="foto"> 
  <span>${usersResult.name}</span>, 
  <span>${usersResult.age}</span>
  `
}


start()