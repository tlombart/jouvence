const projects = {
  "laurena" : {
    "display_name" :  'happy birthday laurena',
    "link" :          'projects/laurena/',
    "description" :   '2022 happy birthday anniversaire laurena marbre marble feu fire castle chateau château purple violet affiche affiches poster posters',
    "is_clickable" :  true,
  },
  "vagalclub" : {
    "display_name" :  'vagal club + post modern lab',
    "link" :          'projects/vagalclub/',
    "description" :   '2022 2023 instagram vagal club post modern lab pml affiche affiches poster posters event events evenement évènements eco-friendly fashion rainbow green vert blue bleu violet purple',
    "is_clickable" :  true,
  },
  "dj9gag" : {
    "display_name" :  'drip drop by @dj9gag cover art',
    "link" :          'projects/dj9gag/',
    "description" :   '2022 instagram dj9gag minoyimn drip drop dripdrop song chanson music musique water eau underwater sous marin sous-marin algue algues algae mystic mystique blue bleu',
    "is_clickable" :  true,
  },
  "emrys" : {
    "display_name" :  'happy birthday emrys',
    "link" :          'projects/emrys/',
    "description" :   '2022 happy birthday anniversaire emrys musique music',
    "is_clickable" :  true,
  },
  "charlotte" : {
    "display_name" :  'happy birthday charlotte',
    "link" :          'projects/charlotte/',
    "description" :   '2023 happy birthday anniversaire charlotte karlfroye musique foret forêt forest tree trees arbre arbres végétation vegetation ocarina lune moon night nuit dark sombre mystic mysterious mystique mystérieux mysterieux affiche affiches poster posters vert green',
    "is_clickable" :  true,
  },
  "lvlup092023" : {
    "display_name" :  '2023 sept project',
    "link" :          '',
    "description" :   '2023 upcoming musique',
    "is_clickable" :  false,
  },
}

// projects vars
const nb_of_projects = Object.keys(projects).length
const descriptions = Object.values(projects).map((project) => (project.description))
const flat_descriptions = [... new Set(descriptions.flat().join(' ').split(' '))]

// -----------------------------------------------------------------------------
// page startup index_script
// -----------------------------------------------------------------------------
// on page startup
window.onload = function() {
  // focuses on the search bar to have the little bar blinking
  document.getElementById("looking_search").focus()

  // on page startup, we suggest 2 projects for the user to click on
  let suggestions_ = document.getElementById("suggestions_")
  let [project1, project2] = [get_project_index(nb_of_projects), get_project_index(nb_of_projects)]
  while (project1 == project2) {
    project2 = get_project_index(nb_of_projects)
  }

  let random_projects = [project1, project2]
  for(let i = 0; i < random_projects.length; i++){
    suggestions_.innerHTML += get_project_html(random_projects[i])
  }
}

// -----------------------------------------------------------------------------
// text search script
// -----------------------------------------------------------------------------
// listening to text input to mimic text search
const search_bar = document.getElementById("looking_search")
const results_div = document.getElementById("results")

// setting the default value for the div
const default_result = `try looking for a keyword in the search bar...`
results_div.innerHTML = default_result

// declaring a searchevent so we can trigger it whenever we want using js
// listening to each input made in the search bar and processing each input
let search_event = new Event('input')
search_bar.addEventListener("input", function(e){
  const text_search = e.target.value

  // if there is no input, we return the default text and set a css class
  if(text_search.length == 0){
    results_div.innerHTML = default_result
    results_div.classList.add("no-result")
  }
  // if there is an input, we try to find a match
  else {
    let results_list = []

    // check input vs list of descriptions for each project
    // if an element matches, its index is pushed in the results_list
    for(let description = 0; description < descriptions.length; description++){
      if(descriptions[description].includes(text_search)) {
        results_list.push(description)
      }
    }

    // if we find a result, we format it then display it
    if(results_list.length > 0){
      results_div.classList.remove("no-result")
      results_div.innerHTML = format_results(results_list)
    }
    // else, we make a random word suggestion from all the words in our descriptions
    // and set an event for the user to search this suggestion directly
    else {
      const random_word_suggestion = get_random_word(flat_descriptions)
      results_div.innerHTML = `oh... i couldn't find anything for... <span class = "weird-result">` + text_search + `</span>... maybe try <span class = "weird-result-suggestion" id = "weird_result_suggestion_">` + random_word_suggestion + '</span> instead.. ?'
      results_div.classList.add("no-result")

      // listening to the click on the result suggestion
      const weird_result_suggestion = document.getElementById("weird_result_suggestion_")

      weird_result_suggestion.addEventListener("click", function(e){
        // if the user clicks on the suggested word, we set the text input value to this word, and manually retrigger the event that triggered this whole function in the first place
        search_bar.value = random_word_suggestion
        search_bar.dispatchEvent(search_event)})
    }
  }
})
//
// -----------------------------------------------------------------------------
// function library
// -----------------------------------------------------------------------------
function get_project_index(nb_of_projects){
  // takes an int nb_of_projects
  // returns a random number between 0 and nb_of_projects
  return Math.floor(Math.random() * nb_of_projects)
}

function get_project_html(project_number, css_class = ['search-suggestion']){
  // takes an int project_number that is the index of the project in the projects Object
  //return a formatted string with html tags
  css_class = css_class.join(' ')
  const display_name = Object.values(projects)[project_number]["display_name"]
  const link = Object.values(projects)[project_number]["link"]
  const html_link = '<a href = "' + link + '">' + display_name + '</a>'
  const is_clickable = Object.values(projects)[project_number]["is_clickable"]

  // if project is not clickable, it gets a funny new css class and doesn't point to anything
  return '<div class = "' + [css_class, is_clickable ? '':'disabled-project'].join(' ') + '" style = "margin-left : 10px; margin-bottom : 5px;">' + (is_clickable ? html_link:display_name) + '</div>'
}

function format_results(results_list, css_class = ['search-result']){
  // takes a list of ints results_list containing all indices of the projects that matched the searches
  // returns a formatted string with html tags
  return results_list.map((result) => get_project_html(result, css_class)).join('')
}

function get_random_word(list_of_words){
  // takes a list of strings
  // returns a string in the intput list randomly
  return list_of_words[Math.floor(Math.random() * list_of_words.length)]
}
