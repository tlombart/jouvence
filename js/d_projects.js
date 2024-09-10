const projects = {
  "emrys" : {
    "catalog_id" :    'G001',
    "display_name" :  'happy birthday emrys',
    "link" :          'projects/emrys/',
    "description" :   '2022 happy birthday anniversaire emrys musique music',
    "is_clickable" :  true,
    "img_samples" :   [
      'projects/emrys/img/emrys.png',
    ],
    "year" :          '2022',
    "size" :          {"value" : 58.4, "unit" : 'Mo'},
    "tags" :          ['gift', 'dj mix'],
  },
  "vagalclub" : {
    "catalog_id" :    'PVG',
    "display_name" :  'postmodern laboratory',
    "link" :          'projects/postmodernlab/',
    "description" :   '2022 2023 instagram vagal club post modern lab postmodernlab postmodernlaboratory laboratory pml affiche affiches poster posters event events evenement évènements eco-friendly fashion rainbow green vert blue bleu violet purple',
    "is_clickable" :  true,
    "img_samples" :   [
      'projects/postmodernlab/img/insta-4_1920p.png',
      'projects/postmodernlab/img/insta1_1080p_1024s_f50.png',
      'projects/postmodernlab/img/4_1920p_1024s_f60.png',
    ],
    "year" :          '2023',
    "size" :          {"value" : 47.2, "unit" : 'Mo'},
    "tags" :          ['physical poster', 'logo'],
  },
  "laurena" : {
    "catalog_id" :    'G002',
    "display_name" :  'happy birthday laurena',
    "link" :          'projects/laurena/',
    "description" :   '2022 happy birthday anniversaire laurena marbre marble feu fire castle chateau château purple violet affiche affiches poster posters',
    "is_clickable" :  true,
    "img_samples" :   [
      'projects/laurena/img/d1_2835x3545p.png',
      'projects/laurena/img/f1_2835x3545p.png',
    ],
    "year" :          '2022',
    "size" :          {"value" : 87.4, "unit" : 'Mo'},
    "tags" :          ['gift', 'animated'],
  },
  "dj9gag" : {
    "catalog_id" :    'PD9G',
    "display_name" :  'drip drop by @dj9gag cover art',
    "link" :          'projects/dj9gag/',
    "description" :   '2022 instagram dj9gag @dj9gag minoyimn drip drop dripdrop song chanson music musique water eau underwater sous marin sous-marin algue algues algae mystic mystique blue bleu',
    "is_clickable" :  true,
    "img_samples" :   [
      'projects/dj9gag/img/1dj9gag_dripdrop_1920p-e.png',
      'projects/dj9gag/img/4dj9gag_dripdrop_1080p-e.png',
      'projects/dj9gag/img/5dj9gag_dripdrop_1080p-e.png',
    ],
    "year" :          '2022',
    "size" :          {"value" : 4.3, "unit" : 'Mo'},
    "tags" :          ['musical artwork', 'animated'],
  },
  "charlotte" : {
    "catalog_id" :    'G003',
    "display_name" :  'happy birthday charlotte',
    "link" :          'projects/charlotte/',
    "description" :   '2023 happy birthday anniversaire charlotte karlfroye musique foret forêt forest tree trees arbre arbres végétation vegetation ocarina lune moon night nuit dark sombre mystic mysterious mystique mystérieux mysterieux affiche affiches poster posters vert green',
    "is_clickable" :  true,
    "img_samples" :   [
      'projects/charlotte/img/i2-1080p_512s.png',
      'projects/charlotte/img/ocarinas.png',
      'projects/charlotte/img/a3_1920p.png'
    ],
    "year" :          '2023',
    "size" :          {"value" : 54.3, "unit" : 'Mo'},
    "tags" :          ['gift', 'music'],
  },
  "lvlup092023" : {
    "catalog_id" :    'PLVL',
    "display_name" :  'LVLUP+8',
    "link" :          '',
    "description" :   '2023 lvlup levelup level up + 8 upcoming musique scenography scenographie visuals visuels concert gig live',
    "is_clickable" :  false,
    "img_samples" :   [],
    "year" :          '2023',
    "size" :          {"value" : null, "unit" : null},
    "tags" :          ['concert visuals', 'animated'],
  },
}

// projects vars
const nb_of_projects = Object.keys(projects).length
const descriptions = Object.values(projects).map((project) => (project.description))
const flat_descriptions = [... new Set(descriptions.flat().join(' ').split(' '))]