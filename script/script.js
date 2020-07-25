let userResults, userStatistics, inputText;
let usersGender, usersNames, usersAge, userData;

window.addEventListener('load', async () => {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
  const data = await res.json()
  
  // userData = data.results
  
  // usersGender = userData.map(element => element.gender)
  userData = data.results.map(element => {
    let {first, last} = element.name
    let gender = element.gender
    let {age} = element.dob
    
    
  })
  // usersAge = userData.map(element => element.dob.age)

  userResults = document.querySelector('div.searchResult')
  userStatistics = document.querySelector('div.statistics')
  inputText = document.querySelector('input[type=text')
  
  console.log(userData)

  innputActive()
  
  
})

// function innputActive(){
//   inputText.addEventListener('keyup', event => {
//     if(event.key === 'Enter'){
//       resultSearch()
//     }
//   })
// }

// function resultSearch() {
//   let valueSearch = inputText.value

//   let namesResults = usersNames.filter(element => element.first.toLowerCase() == valueSearch || element.last.toLowerCase() == valueSearch)

//   console.log(namesResults)
// }
