// -----------------------------------------------------------------------------
// on page startup
// -----------------------------------------------------------------------------
window.onload = function() {
  // focuses on the search bar to have the little bar blinking
  document.getElementById("looking_search").focus()
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
      results_div.innerHTML = format_results(results_list).join(' ')
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

// -----------------------------------------------------------------------------
// suggestions popups events
// -----------------------------------------------------------------------------
// // on page startup, we suggest 2 projects for the user to click on
let suggestions_ = document.getElementById("suggestions_")
const nb_of_projects_to_get = 2 // don't forget to add a new position in positions if you increase this number
let random_projects = []
while (random_projects.length < nb_of_projects_to_get) {
  random_projects.push(get_project_index(nb_of_projects))
}
random_projects = [... new Set(random_projects)]

const positions = [['18%', '8%'], ['31%', '72%'], ['24%', '34%']]
// for each random project selected :
// => we display the suggestion in the suggestions_ div (add a div for each suggestion)
// => we open a popup with the linked project
// => we add an event to the suggested project div in suggestions_
//    this event opens/closes the project on click
random_projects.forEach(function(value, index){
  project = Object.values(projects)[value]
  key = Object.keys(projects)[value]

  let suggestion_div = get_project_div(value, ['search-suggestion'])
  suggestions_.appendChild(suggestion_div)

  if(project["is_clickable"]){
    display_project_popup(value, positions[index])
    add_events_for_popup(project)

    // wip for an event to close/open the popup on click on the suggestion_div
    // this doesn't work for now because only the last suggestion with be listened to
    // TODO: make the event work for all suggestions
    // suggestion_div.addEventListener("click", function(e){
    //   let suggestion_popup = document.getElementById(`popup_project_${key}`)
    //   let is_popup_open = !!suggestion_popup
    //   if(is_popup_open) document.body.removeChild(suggestion_popup)
    //   else display_project_popup(value, positions[index]); add_events_for_popup(project)
    // })
  }
})

function add_events_for_popup(project){
  let popup_close_button = document.getElementById(`psha-close_${project.display_name}`)
  let popup_img = document.getElementById(`img_${project.display_name}`)

  // toggle between open and close
  popup_close_button.addEventListener("click", function(e){
    if(popup_close_button.classList.contains('project-sample-header-actions-close')){
      popup_img.classList.add('hidden')
      popup_close_button.classList = ['project-sample-header-actions-open']
    } else {
      popup_img.classList.remove('hidden')
      popup_close_button.classList = ['project-sample-header-actions-close']
    }
  })
}
