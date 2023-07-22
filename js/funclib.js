// -----------------------------------------------------------------------------
// function library
// -----------------------------------------------------------------------------
function add_mouse_events(div){
  var mousePosition;
  var offset = [0,0];
  var isDown = false;

  div.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
  }, true);

  document.addEventListener('mouseup', function() {
      isDown = false;
  }, true);

  document.addEventListener('mousemove', function(event) {
      event.preventDefault();
      if (isDown) {
          mousePosition = {

              x : event.clientX,
              y : event.clientY

          };
          div.style.left = (mousePosition.x + offset[0]) + 'px';
          div.style.top  = (mousePosition.y + offset[1]) + 'px';
      }
  }, true);
}

function display_project_popup(project, position){
  // getting the project + a random sample image to display
  project = Object.values(projects)[project]
  key = Object.keys(projects)[project]

  const img_sample = project.img_samples[Math.floor(get_random_number(0, project.img_samples.length - 1))]

  // randomizing a bit the position
  const percentage_random = 6
  const pixel_random = 40
  let units = []
  position.forEach(function(value, index){
    if(value.includes('%')) {
      position[index] = Math.round(value.replace('%', '') - 0 + get_random_number(-percentage_random, percentage_random))
      units.push('%')
    }
    if(value.includes('px')) {
      position[index] = Math.round(value.replace('%', '') - 0 + get_random_number(-pixel_random, pixel_random))
      units.push('%')
    }
  })

  let project_to_display = document.createElement("div")
  project_to_display.id = `popup_project_${key}`
  project_to_display.classList.add('project-sample')
  project_to_display.classList.add('flex-col-center-center')
  project_to_display.style.top = position[0] + units[0]
  project_to_display.style.left = position[1] + units[1]

  let html = `
    <div class = "project-sample-header flex-row-spaceb-center">
      <div class = "project-sample-header-actions flex-row-spaceb-center">
        <span class = "project-sample-header-actions-close" id = "psha-close_${project.display_name}"></span>
      </div>
      <div class = "project-sample-header-title"><a href = "${project.link}">${project.display_name}</a></div>
    </div>
    <img src = "${img_sample}" id = "img_${project.display_name}">`

  project_to_display.innerHTML = html
  document.body.appendChild(project_to_display)
  add_mouse_events(project_to_display)
}

function format_option(project, value = project.length){
  return `<option value = "${value}">${project}</option>`
}

function format_results(results_list, css_class = ['search-result']){
  // takes a list of ints results_list containing all indices of the projects that matched the searches
  // returns a formatted string with html tags
  return results_list.map((result) => get_project_html(result, css_class)).join('')
}

function get_project_index(nb_of_projects){
  // takes an int nb_of_projects
  // returns a random number between 0 and nb_of_projects - 1
  return Math.floor(Math.random() * nb_of_projects)
}

function get_project_html(project_number, css_class = ['search-suggestion'], id = ''){
  // takes an int project_number that is the index of the project in the projects Object
  //return a formatted string with html tags
  css_class = css_class.join(' ')
  const display_name = Object.values(projects)[project_number]["display_name"]
  const is_clickable = Object.values(projects)[project_number]["is_clickable"]

  // if project is not clickable, it gets a funny new css class and doesn't point to anything
  return `<div id = ${[css_class, id].join('_')} class = "${[css_class, is_clickable ? '':'disabled-project'].join(' ')}" style = "margin-left : 10px; margin-bottom : 5px;">${display_name}</div>`
}

function get_random_number(min, max){
  return Math.random() * (max - min + 1) + min
}

function get_random_word(list_of_words){
  // takes a list of strings
  // returns a string in the intput list randomly
  return list_of_words[Math.floor(Math.random() * list_of_words.length)]
}
