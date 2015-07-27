#Task Runner

##SASS/CSS
3 folders:
- SCSS (Follows SMACSS setup)
- Vendor (Files I just want to drop in and not edit)
- Production (Place where files are output)

SCSS Task:
- Compile with Libsass
- UnCSS
- Auto prefix
- Concat to one file
- Add my header file
- Output to production folder

Vendor:
- UnCSS
- Auto prefix?
- Minify
- Add header to file

#Images/Assets
- Minify assets. Only do this once per asset using a 'newer' function

#JS
2 Categories
- My stuff
- Vendor

Task
- JShint MY files only, stop with errors
- ES6 to ES5
- Concat/minify to one file
- Add my header

Leave vendor code alone

#Testing
Have tests for the important stuff (both CSS and JS testing)

#HTML
- W3C valid markup
- Accessibility testing
- SEO testing

#Server
Browsersync for live reload

#Tasks
Run all tasks for each save so I develop with production code