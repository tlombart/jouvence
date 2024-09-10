// -----------------------------------------------------------------------------
// dynamically creates a div for each project in projects.js>projects
// -----------------------------------------------------------------------------
// calling the div container where we will append all projectrs
const project_table = document.getElementById('projects-table')

// creating the header of the table
// columns from projects.js>projects keys
const columns_to_display = {
  "catalog_id" : 'Catalog ID',
  "year" : 'Project year',
  "display_name" : 'Project name',
  "size" : 'Project size',
  "tags" : 'Tags'
}
let project_table_header_tr = document.createElement('tr')
Object.entries(columns_to_display).forEach(function(col, col_nb){
  let display_name = col[1]
  let column_header = document.createElement('th')
  column_header.textContent = display_name
  project_table_header_tr.appendChild(column_header)
})

project_table.appendChild(project_table_header_tr)

// for each project, we want to add a line in the table
Object.keys(projects).forEach(function(project_name){
  const project_value = projects[project_name]

  // we create a tr element (a row)
  let project_table_tr = document.createElement('tr')

  // for each column, we create a td element
  Object.entries(columns_to_display).forEach(function(col, col_nb){
    let row_data = document.createElement('td')
    let row_link = document.createElement('a')

    // special column display
    switch (col[0]) {
      case 'size':
        row_data.textContent = [project_value[col[0]]["value"], project_value[col[0]]["unit"]].join(' ')
        if(row_data.textContent.trim().length == 0) row_data.textContent = 'empty project'
        break;
      case 'tags':
        // for each tag, let's create a span
        const tags = project_value[col[0]].sort()
        tags.forEach(function(tag){
          let tag_span = document.createElement('span')
          tag_span.textContent = tag
          tag_span.classList.add(...['project-tag', tag.replace(' ', '-')])
          row_data.appendChild(tag_span)
        })
        break;

      default:
        row_data.textContent = project_value[col[0]]
    }

    project_table_tr.appendChild(row_data)
  })

  project_table.appendChild(project_table_tr)
})
