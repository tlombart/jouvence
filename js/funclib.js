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
  const position_clone = [...position]
  // getting the project + a random sample image to display
  project = Object.values(projects)[project]
  const key = get_key_with_value(projects, project)
  const img_sample = project.img_samples[Math.floor(get_random_number(0, project.img_samples.length - 1))]

  // randomizing a bit the position
  const percentage_random = 6
  const pixel_random = 40
  let units = []
  position_clone.forEach(function(value, index){
    if(value.includes('%')) {
      position_clone[index] = Math.round(value.replace('%', '') - 0 + get_random_number(-percentage_random, percentage_random))
      units.push('%')
    }
    if(value.includes('px')) {
      position_clone[index] = Math.round(value.replace('%', '') - 0 + get_random_number(-pixel_random, pixel_random))
      units.push('%')
    }
  })

  // creating the html tree
  let project_to_display = document.createElement("div")
  project_to_display.id = `popup_project_${key}`
  project_to_display.classList.add(...['project-sample', 'flex-col-center-center'])
  project_to_display.style.top = position_clone[0] + units[0]
  project_to_display.style.left = position_clone[1] + units[1]

  let project_sample_header = document.createElement("div")
  project_sample_header.classList.add(...['project-sample-header', 'flex-row-spaceb-center'])

  let project_sample_header_actions = document.createElement("div")
  project_sample_header_actions.classList.add(...['project-sample-header-actions', 'flex-row-spaceb-center'])

  let project_sample_header_actions_close = document.createElement("span")
  project_sample_header_actions_close.id = `psha-close_${project.display_name}`
  project_sample_header_actions_close.classList.add(...['project-sample-header-actions-close'])

  let project_sample_header_title = document.createElement("div")
  project_sample_header_title.classList.add(...['project-sample-header-title'])

  let link = document.createElement("a")
  link.href = project.link
  link.textContent = project.display_name

  let img = document.createElement("img")
  img.src = img_sample
  img.id = `img_${project.display_name}`

  project_sample_header_title.appendChild(link)
  project_sample_header_actions.appendChild(project_sample_header_actions_close)
  project_sample_header.append(project_sample_header_actions, project_sample_header_title)
  project_to_display.append(project_sample_header, img)
  document.body.appendChild(project_to_display)

  // created html tree
  // <div id = "popup_project_${key}" class = "project-sample flex-col-center-center" style = "top : ${position[0] + units[0]}; left : ${position[1] + units[1]}">
  //   <div class = "project-sample-header flex-row-spaceb-center">
  //     <div class = "project-sample-header-actions flex-row-spaceb-center">
  //       <span class = "project-sample-header-actions-close" id = "psha-close_${project.display_name}"></span>
  //     </div>
  //     <div class = "project-sample-header-title">
  //       <a href = "${project.link}">${project.display_name}</a>
  //     </div>
  //   </div>
  //   <img src = "${img_sample}" id = "img_${project.display_name}">
  // </div>

  add_mouse_events(project_to_display)
}

function format_option(project, value = project.length){
  return `<option value = "${value}">${project}</option>`
}

function format_results(results_list, css_class = ['search-result']){
  // takes a list of ints results_list containing all indices of the projects that matched the searches
  // returns a formatted string with html tags
  return results_list.map((result) => nodeToString(get_project_div(result, css_class, has_link = true)))
}

function get_key_with_value(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function get_project_div(project_number, css_class = [], has_link = false){
  const project = Object.values(projects)[project_number]
  const project_key = get_key_with_value(projects, project)
  const display_name = project["display_name"]
  const is_clickable = project["is_clickable"]
  const link = project["link"]

  let project_to_display = document.createElement("div")
  project_to_display.id = [css_class, project_key].join('_')

  let css_classes = css_class
  if(!is_clickable) css_classes.push('disabled-project')

  project_to_display.classList.add(...css_classes)
  project_to_display.style.cssText = "margin-left : 10px; margin-bottom : 5px;"

  if(has_link){
    let link_element = document.createElement("a")
    link_element.href = link
    link_element.textContent = display_name

    project_to_display.appendChild(link_element)
  } else {
    project_to_display.textContent = display_name
  }

  return project_to_display
}

function get_project_index(nb_of_projects){
  // takes an int nb_of_projects
  // returns a random number between 0 and nb_of_projects - 1
  return Math.floor(Math.random() * nb_of_projects)
}

function get_random_number(min, max){
  return Math.random() * (max - min + 1) + min
}

function get_random_word(list_of_words){
  // takes a list of strings
  // returns a string in the intput list randomly
  return list_of_words[Math.floor(Math.random() * list_of_words.length)]
}

// from : https://stackoverflow.com/questions/4239587/create-string-from-htmldivelement
function nodeToString (node) {
   var tmpNode = document.createElement( "div" );
   tmpNode.appendChild( node.cloneNode( true ) );
   var str = tmpNode.innerHTML;
   tmpNode = node = null; // prevent memory leaks in IE
   return str;
}
