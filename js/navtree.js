// the idea is to use the projects variable from index_script to dynamically create a tree for all pages

// -----------------------------------------------------------------------------
// display navigation menu with appropriate choices
// -----------------------------------------------------------------------------
function display_navtree(page = 'index'){
  let nav_span = document.getElementById("header-file-path_")

  // getting the select options
  let options = ''
  if(page == 'index') options += format_option('index')
  Object.values(projects).forEach(function(key, value){
    options += format_option(key.display_name)
  })
  nav_span.innerHTML = `<a href = "">jouvence</a>/<select id = "nav-menu">` + options + `</select>`
}
